export function getChemEqnInfo(eqn) {
    /* Pre-processing */
    eqn = eqn.replaceAll(' ', '')
    const eqnLen = eqn.length
    if(eqnLen === 0) {
        return {
            success: false,
            errorMsg: 'Empty input!'
        }
    }
    const periodicTable = require('../Data/chem.json') // Getting periodic table data
    /* Initialising return values */
    let reactants = []
    let products = []
    let latex = ''
    /* Initialising variables for parsing */
    let onProductsSide = false
    let additionCompounds = []
    let lastCompound = [], lastCoefficient = '', lastCompoundSubscript = '', compoundSubscriptMode = false
    let lastElement = '', lastElementSubscript = ''
    let numOpenParens = 0
    let bracesMode = false
    let lastChar = ''
    let arrow = '', arrowMode = false
    let compoundStorage = [] // Used for the purpose of processing nested parentheses
    const allowedArrows = ['->', '<=>', '<->', '<-']
    const allowedArrowsMsg = allowedArrows.join(', ')
    function resetElementVars() {
        lastElement = ''
        lastElementSubscript = ''
    }
    function resetCompoundVars() {
        lastCompound = []
        lastCoefficient = ''
        lastCompoundSubscript = ''
    }
    function processLastElement() {
        if(lastElement === '') return
        /* 
        last element is guaranteed to be either a single capital letter or a upper+lower two letter str 
        -> Validate it using periodic table data
        */
        const matchingElement = periodicTable[lastElement]
        if(!matchingElement) throw new Error("Invalid element: " + lastElement)
        /*
        Coefficient is guaranteed to take positive numerical values in 3 possible forms:
        1. Integer
        2. Decimal: Only supporting .5
        3. Fractional: Only supporting positive int / positive int

        Subscript is guaranteed to be a positive integer
        */
        if(lastElementSubscript === '') lastElementSubscript = '1' // Defaults to 1
        lastCompound.push({
            ...matchingElement,
            symbol: lastElement,
            subscript: parseInt(lastElementSubscript)
        })
        /* Reset all pushed values for new elements */
        resetElementVars()
    }
    function processLastCompound() {
        if(!lastCompound.length) return
        if(lastCoefficient === '') lastCoefficient = '1' // Defaults to 1
        if(lastCompoundSubscript === '') lastCompoundSubscript = '1' // Defaults to 1
        additionCompounds.push({
            compound: lastCompound,
            coefficient: parseInt(lastCoefficient),
            subscript: parseInt(lastCompoundSubscript)
        })
        resetCompoundVars()
    }
    function addCompleteCompound() {
        if(!additionCompounds.length) return
        onProductsSide ? products.push(additionCompounds[0]) : reactants.push(additionCompounds[0]) // Buggy with addition compounds and IDK WHY????
        additionCompounds = []
    }
    function addLastCharToLatex() {
        switch (lastChar) {
            case '+':
                latex += ' + '
                break
            default:
                latex += lastChar
        }
    }
    function processArrow() {
        if(!allowedArrows.includes(arrow)) throw new Error("Invalid arrow: " + arrow + ". Allowed arrows are " + allowedArrowsMsg)
        arrowMode = false
        onProductsSide = true
    }
    function storeLastCompound() {
        if(lastCompoundSubscript !== '') throw new Error("ALERT DEVS: storeLastCompound")
        compoundStorage.push({
            coefficient: lastCoefficient,
            compound: lastCompound
        })
        resetCompoundVars()
    }
    function processCompoundSubcript(char) {
        if(char >= '0' && char <= '9') {
            if(char === '0' && lastCompoundSubscript === '') throw new Error("Subscript cannot start with 0!")
            if(lastCompoundSubscript.length >= 2) throw new Error("Cannot support subscript of longer than 2 digits: " + lastCompoundSubscript + char)
        } else {
            /* Disallow empty subscripts if parentheses are used */
            if(lastCompoundSubscript === '') throw new Error("Parentheses must be followed with a valid subscript!")
            processLastCompound()
            /* need to concatenate with previous compound from storage if there are any */
            compoundSubscriptMode = false
            const lastStoredCompound = compoundStorage.pop()
            if(lastStoredCompound) {
                /* Restore last compound value */
                lastCoefficient = lastStoredCompound.coefficient
                lastCompound = lastStoredCompound.compound
            }
            lastCompound.push(additionCompounds)
            additionCompounds = []
        }
    }
    function processChar(char) {
        if(arrowMode && !['<', '>', '-', '='].includes(char)) processArrow()
        if(compoundSubscriptMode) processCompoundSubcript(char)
        if(char >= 'A' && char <= 'Z') {
            /* 
            Capital letter, should:
            - Terminate lastElement building -> Either insert as new valid element, or invalidate if not valid element
            - Update lastElement as this new char, even if given char cannot be the start of a new element, just assign it and validate later
            */
            processLastElement()
            lastElement = char
        } else if(char >= 'a' && char <= 'z') {
            /*
            Lower case letter, should:
            - Invalidate if: lastElement is '' (elements cannot start with a lower case letter) or already has length 2 (elements cannot be longer than 2 letters)
                -> This means validify by checking lastElement.length === 1, since lastElement is guaranteed to start with a capital letter
            - If valid as above, simply concatenate with lastElement
            - Doesn't matter if the result isn't a valid element, will invalidate later
            */
           if(lastElement.length !== 1) throw new Error("Invalid element: " + lastElement + char)
           lastElement += char
        } else if(char >= '0' && char <= '9') {
            /*
            Number, few cases where this occurs, break them down.
            - lastElement !== '' -> Currently processing a new element, seeing a number means it has to be part of this elements subscript:
                - If lastElementSubscript === '': The new number becomes the subscript, unless if it's 0. Design choice to disallow 0 starting subscript
                - Else: Simply concatenate it with lastElementSubscript. Design choice to disallow length > 2
            - lastElement === '' -> lastElement is cleared either because of a +, ->, .
                - In all cases, this number is concatenated to the coefficient. Design choice to disallow length > 2 as well as starting 0
            - Braces mode -> Using numbers in braces like {3+} may be enabled in the future, but disallow it for now
            */
            if(bracesMode) throw new Error("Numbers in braces currently disallowed!")
            if(compoundSubscriptMode) lastCompoundSubscript += char
            else {
                if(lastElement === '') {
                    if(char === '0' && lastCoefficient === '') throw new Error("Coefficient must not start with 0!")
                    if(lastCoefficient.length >= 2) throw new Error("Cannot support coefficients with 3 or more digits: " + lastCoefficient + char)
                    lastCoefficient += char
                } else {
                    if(char === '0' && lastElementSubscript === '') throw new Error("Subscript must not start with 0!")
                    if(lastElementSubscript.length >= 2) throw new Error("Cannot support subscripts with 3 or more digits: " + lastElementSubscript + char)
                    lastElementSubscript += char
                }
            }
        } else { // Account for other symbols
            switch(char) {
                case '+':
                    if(numOpenParens) throw new Error("Must close all parentheses before '+'!")
                    if(lastElement === '' && !lastCompound.length) throw new Error("Invalid usage of '+'!")
                    /*
                    + should terminate the last element along with the last compound
                    */
                    processLastElement()
                    processLastCompound()
                    addCompleteCompound()
                    break
                case '.':
                    throw new Error("Cannot support decimals or addition compounds!")
                    // /* Should only be allowed if lastElement is not empty, since . must follow another compound */
                    // if(lastElement === '' && !lastCompound.length) throw new Error("Cannot support decimal coefficients!")
                    // /*
                    // . should terminate the last element along with the last compound, 
                    // but should not complete the compound as it should indicate more addition compounds are expected
                    // */
                    // processLastElement()
                    // processLastCompound()
                    // break
                case '-': 
                case '<':
                case '>':
                case '=':
                    if(numOpenParens) throw new Error("Must close all parentheses before reaction arrow!")
                    /*
                    Enter arrow mode if possible
                    */
                    if(!arrowMode) {
                        if(arrow === '') {
                            arrowMode = true; 
                            processLastElement()
                            processLastCompound()
                            addCompleteCompound()
                        }
                        else throw new Error("Only one reaction arrow expected!")
                    }
                    /*
                    Potential arrow detected, enter arrow mode which is just arrow !== ''
                    */
                    arrow += char
                    break
                case '(':
                    numOpenParens++
                    /*
                    Opening a bracket should 1. temporarily terminate the current compound 2. Store in somewhere accessible later 3. Reset element/compound vars for
                    the compound inside the parentheses
                    */
                    processLastElement()
                    storeLastCompound()
                    break
                case ')':
                    if(lastElement === '' && !lastCompound.length) throw new Error("Invalid use of parentheses!")
                    numOpenParens--
                    if(numOpenParens < 0) throw new Error("Too many closing parentheses!")
                    /*
                    Closing a bracket should enter compound subscript mode such that the following characters
                    must strictly be non-negative integers. Once a non-integer character is detected, process the current
                    compound
                    */
                    compoundSubscriptMode = true
                    /* Terminating compound wrapped in parentheses */
                    processLastElement()
                    break
                case '/':
                    if(lastElement === '' && lastCoefficient !== '') throw new Error("Cannot support fractional coefficients! You can convert all coefficients to integers by multiplying every term by the lowest common denominator.")
                    throw new Error("Invalid character: " + char)
                default:
                    throw new Error("Invalid character: " + char)
            }
        }
        addLastCharToLatex()
        lastChar = char
    }
    function processLastChar(char) {
        if(numOpenParens) throw new Error("Invalid equation, must close all parentheses with subscripts!")
        if(compoundSubscriptMode && lastCompoundSubscript === '') throw new Error("Parentheses must be followed with a valid subscript!")
        if(char >= '0' && char <= '9') {
            if(lastElement === '' && !lastCompound.length && !compoundSubscriptMode) throw new Error("Compound cannot be just a single number: " + char) //
            else addLastCharToLatex()
            if(compoundSubscriptMode) processCompoundSubcript('')
        }
        if(['<', '>', '-', '='].includes(char)) {
            addLastCharToLatex()
            return // Don't need to do the processing below, this arrow already took care of that
        }
        processLastElement()
        processLastCompound()
        addCompleteCompound()
        if((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            addLastCharToLatex()
        }
    }
    for(let i = 0; i < eqnLen; i++) {
        try {
            processChar(eqn[i])
        } catch (err) {
            return {
                success: false,
                errorMsg: err.message
            }
        }
    }
    try {
        processLastChar(lastChar)
    } catch (err) {
        return {
            success: false,
            errorMsg: err.message
        }
    }
    return {
        success: true,
        reactants: reactants,
        products: products,
        latex: latex
    }
}

// FOR TESTING PURPOSES: 3HCl + 2As2O3 + 7NaNO3 + 4H2O -> 2NO + 2H3AsO4 + 9NaCl
// (((NH3)2N)4.KOH)8