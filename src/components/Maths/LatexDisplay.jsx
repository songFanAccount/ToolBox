const tokenTypes = {
    'none': -1,
    'number': 0,
    'variable': 1,
    'operator': 2,
    'function': 3
}
const supportedOperators = {
    '+': '+',
    '-': '-',
    '*': '\\cdot',
    '/': '\\dfrac',
    '^': '^',
    '(': '(',
    ')': ')',
    '@': '\\cdot'
}
const precedence = {
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    '^': 4,
    '(': 0,
    ')': 0,
    'function': 6,
    '@': 5
}
const associativity = {
    '+': -1,
    '-': -1,
    '*': -1,
    '/': -1,
    '^': 1,
    '(': 0,
    ')': 0,
    '@': -1
}
const supportedFunctions = {
    'sin': '\\sin',
    'cos': '\\cos',
    'tan': '\\tan',
    'cosec': '\\csc',
    'csc': '\\csc',
    'sec': '\\sec',
    'cot': '\\cot',
    'arcsin': '\\arcsin',
    'arccos': '\\arccos',
    'arctan': '\\arctan',
    'sqrt': '\\sqrt',
    'log': '\\ln',
    'ln': '\\ln'
}
function getTokens(expr) {
    let tokens = []
    let curToken = ''
    let curType = tokenTypes.none
    let numOpenBrac = 0
    let isUnary = false
    let causeUnaryPrec = -1
    let needNegate = false
    let decimalMode = false
    for(let i = 0; i < expr.length; i++) {
        // console.log("curToken = " + curToken + " of type " + curType)
        const newChar = expr[i]
        let newType = tokenTypes.none
        if(newChar >= '0' && newChar <='9') { // Number
            newType = tokenTypes.number
        } else if((newChar >= 'a' && newChar <= 'z') || (newChar >= 'A' && newChar <= 'Z')) { // Letter
            newType = tokenTypes.variable
        } else if(supportedOperators[newChar]) { // Symbol checking
            newType = tokenTypes.operator
            if(newChar === '(') { // Need to keep count of '(' to make sure the number of ')' does not exceed
                numOpenBrac++
            } else if (newChar === ')') {
                numOpenBrac--
                if(numOpenBrac < 0) { // Too many closing brackets
                    throw new Error('Invalid expression: Too many closing brackets!')
                }
            }
        } else {
            if(newChar === '.') { // Special case for decimal numbers
                if(decimalMode) { // Already in decimal mode, not allowed e.g. 5.4.6
                    throw new Error("Invalid decimal: Detected '.' when already in decimal mode")
                } else { // Code for entering decimal mode
                    if(curType === tokenTypes.number) {
                        decimalMode = true
                        curToken += newChar
                    }
                    continue
                }
            }
            // All other characters are invalid/unsupported
            throw new Error(`Invalid character: ${newChar}`)
        }
        if(decimalMode && newType !== tokenTypes.number) { // If in decimal mode: Turn off decimal mode if decimal is in a finished state, if not finished, complain
            if(curToken.at(-1) === '.') {throw new Error("Invalid expression: Unfinished decimal number -> " + curToken)}
            decimalMode = false
        }
        // console.log("new char = " + newChar + " of type = " + newType)
        if(isUnary) {
            if(newChar === '-') {
                needNegate = !needNegate
            } else {
                if(newType === tokenTypes.operator && newChar !== '(') {
                    throw new Error("Invalid expression: -" + newChar)
                }
                if(needNegate) {
                    tokens.push({token: '1', type: tokenTypes.number, negate: true})
                    if(causeUnaryPrec >= precedence['*']) {
                        tokens.push({token: '@', type: tokenTypes.operator, autoAdded: true})
                    } else {
                        tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                    }
                    needNegate = false
                }
                isUnary = false
                curToken = newChar
                curType = newType
            }
            continue
        }
        switch(curType) {
            case tokenTypes.none:
                if(newType === tokenTypes.operator) {
                    if(newChar === '-') {
                        isUnary = true
                        needNegate = true
                    } else if (newChar !== '(') {
                        throw new Error("Cannot start expression with " + newChar + "!")
                    }
                }
                curToken = newChar
                curType = newType
                break
            case tokenTypes.number:
                switch(newType) {
                    case tokenTypes.number:
                        curToken += newChar
                        break
                    case tokenTypes.variable:
                        tokens.push({
                            token: parseFloat(curToken).toString(),
                            type: curType,
                        })
                        needNegate = false
                        tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                        curToken = newChar
                        curType = newType
                        break
                    case tokenTypes.operator:
                        tokens.push({
                            token: parseFloat(curToken).toString(),
                            type: curType,
                        })
                        needNegate = false
                        if(newChar === '(') { // e.g. 5( should be intepreted as 5 * (
                            tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                        }
                        curToken = newChar
                        curType = newType
                        break
                    case tokenTypes.function:
                        throw new Error("Unexpected: A number cannot directly find function token")
                    default:
                        throw new Error("Invalid token type")
                }
                continue
            case tokenTypes.variable:
                switch(newType) {
                    case tokenTypes.number:
                        throw new Error("Invalid expression: Cannot have number immediately after variables!")
                    case tokenTypes.variable:
                        tokens.push({token: curToken, type: curType})
                        needNegate = false
                        tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                        curToken = newChar
                        break
                    case tokenTypes.operator:
                        let formsFunction = false
                        if(newChar === '(') { // Should act as a function detector to see whether the previous variables form a supported function
                            // Loop backwards in the tokens array to find longest variable chain
                            // console.log("Checking potential function")
                            let potentialFunc = curToken
                            if(supportedFunctions[potentialFunc]) { // Single character function names, unlikely but do for completeness
                                curType = tokenTypes.function
                            } else if(tokens.length > 0) {
                                let i = 0
                                let startFunctionIndex = -1
                                // e.g. t * a * n ( -> processing new char '(', so curToken = n -> variable
                                // console.log("Looping through tokens to check previous variables")
                                for(i = tokens.length - 1; i >= 0; i--) {
                                    const ithToken = tokens[i]
                                    // console.log("Processing " + ithToken.token)
                                    if(ithToken.token === '*' && ithToken['autoAdded']) { 
                                        // If we found a * and it was autoadded by a number or variable, ignore. If it wasn't autoadded, it breaks the variable chain
                                        continue
                                    } else if (ithToken.type === tokenTypes.variable) { // Finds variable, prepend it to potentialFunc and check if it is a supported function
                                        potentialFunc = ithToken.token + potentialFunc
                                        if(supportedFunctions[potentialFunc]) { // We found a matching function, but keep going to find longest possible
                                            formsFunction = true
                                            curToken = potentialFunc
                                            startFunctionIndex = i
                                            needNegate = ithToken.negate !== undefined ? ithToken.negate : false
                                        }
                                    } else { // If we found anything else, then that would break the variable chain, so cannot be a function
                                        break
                                    }
                                }
                                if(formsFunction) { // Update tokens array accordingly by merging the appropriate variables into a function
                                    curType = tokenTypes.function
                                    tokens = tokens.slice(0, startFunctionIndex) // First get rid of all merged variables and their autoadded *s
                                    // Inserting the merged function token will be taken care of, as we have modified curToken and curType, they'll be inserted below
                                }
                            }
                        }
                        tokens.push({token: curToken, type: curType})
                        needNegate = false
                        if(newChar === '(' && !formsFunction) { // e.g. x( should be intepreted as x * (
                            tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                        }
                        curToken = newChar
                        curType = newType
                        break
                    default:
                        throw new Error("Invalid token type")
                }
                continue
            case tokenTypes.operator:
                switch(newType) {
                    case tokenTypes.number: // Operator followed by number should behave the same as variables do
                    case tokenTypes.variable:
                        tokens.push({token: curToken, type: curType})
                        if(curToken === ')') {tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})}
                        curToken = newChar
                        curType = newType
                        break
                    case tokenTypes.operator:
                        if(newChar === '-' && curToken !== ')') {
                            if(curToken === '-') {
                                curToken = '+'
                            } else if (curToken === '+') {
                                curToken = '-'
                            } else {
                                isUnary = true
                                causeUnaryPrec = precedence[curToken]
                                tokens.push({token: curToken, type: curType})
                                needNegate = true
                            }
                            continue  
                        } 

                        if(curToken !== ')' && newChar !== '(') {throw new Error(`Operator problem: ${curToken + newChar}`)}
                        tokens.push({token: curToken, type: curType,})
                        if(curToken === ')' && newChar === '(') {
                            tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                        }
                        needNegate = false
                        curToken = newChar
                        break
                    default:
                        throw new Error("Invalid token type!")
                }
                continue
            default:
                throw new Error("Invalid token type")
        }
    }
    // Push last token
    if(!isUnary) {
        if(curType === tokenTypes.number) {
            tokens.push({
                token: parseFloat(curToken).toString(),
                type: curType,
            })
        } else {
            tokens.push({token: curToken, type: curType})
        }
    }
    // Matching open parentheses:
    // If the last token was a '(', need to manually supply an argument before closing parentheses
    if(curType === tokenTypes.operator && curToken !== ')') {
        tokens.push({token: '?', type: tokenTypes.number, fillArg: true, autoAdded: true})
    }
    // Push right parentheses until all left parentheses are matched
    for(let i = 0; i < numOpenBrac; i++) {
        tokens.push({token: ')', type: tokenTypes.operator, autoAdded: true})
    }
    return tokens
}
function tokensToString(tokens) {
    let ret = ''
    tokens.forEach((e) => ret += e.token)
    return ret
}
/*
Implemented using Shunting-Yard algorithm https://en.wikipedia.org/wiki/Shunting_yard_algorithm 
*/
function getTokensInPostfix(tokens) {
    let output = []
    let operatorStack = []
    function outputPush(token) {
        output.push(token)
    }
    function logOutput() {
        let ret = ''
        output.forEach((e) => ret += e.token)
        console.log(ret)
    }
    // function logOPStack() {
    //     let ret = ''
    //     operatorStack.forEach((e) => ret += e.token)
    //     console.log(ret)
    // }
    function processToken(token) {
        const value = token.token
        const type = token.type
        switch(type) {
            case tokenTypes.number:
            case tokenTypes.variable:
                outputPush(token)
                break
            case tokenTypes.function:
                operatorStack.unshift(token)
                break
            case tokenTypes.operator:
                if(value === '(') {
                    operatorStack.unshift(token)
                } else if (value === ')') {
                    if(operatorStack.length === 0) {throw new Error("Cannot find matching '(' for this ')'")}
                    while(operatorStack[0].token !== '(') {
                        outputPush(operatorStack.shift())
                        if(operatorStack.length === 0) {
                            throw new Error("Cannot find matching '(' for this ')'")
                        }
                    }
                    // Popping the ( and discard it
                    operatorStack.shift()
                    if(operatorStack.length !== 0 && operatorStack[0].type === tokenTypes.function) {
                        outputPush(operatorStack.shift())
                    }
                } else {
                    if(operatorStack.length > 0) {
                        let opStackTop = operatorStack[0].token
                        const O1Prec = precedence[value]
                        let O2Prec = precedence[opStackTop]
                        if(operatorStack[0].type === tokenTypes.function) {O2Prec = precedence['function']}
                        const O1Assoc = associativity[value]
                        while(opStackTop !== '(' && 
                            (O2Prec > O1Prec || (O2Prec === O1Prec && O1Assoc === -1))) {
                            outputPush(operatorStack.shift())
                            // Update each variable
                            if(operatorStack.length <= 0) {break}
                            opStackTop = operatorStack[0].token
                            O2Prec = precedence[opStackTop]
                            if(operatorStack[0].type === tokenTypes.function) {O2Prec = precedence['function']}
                        }
                    }
                    operatorStack.unshift(token)
                }
                break
            default:
                throw new Error("Invalid token type!")
        }
    }
    for(let i = 0; i < tokens.length; i++) {
        processToken(tokens[i])
    }
    while(operatorStack.length !== 0) {
        const opStackTop = operatorStack.shift()
        if(opStackTop.token === '(') {
            throw new Error("Mismatch of parentheses!")
        }
        outputPush(opStackTop)
    }
    logOutput()
    return output
}
function generateNode(tokens, iArray) {
    const i = iArray[0]
    if(i < 0) {return null}
    const value = tokens[i]
    let node = {
        value: value,
        left: null,
        right: null
    }
    iArray[0] = i-1
    if(value.type === tokenTypes.number || value.type === tokenTypes.variable) {return node}
    const right = generateNode(tokens, iArray)
    const left = value.type === tokenTypes.function ? null : generateNode(tokens, iArray)
    node.left = left
    node.right = right
    return node
}
/* Assumes tokens given in postfix, read from right to left to produce expression tree */
/* This is the function that sets up conditions for recursion */
function generateExprTree(tokens) {
    return generateNode(tokens, [tokens.length - 1])
}
function insertStr(str, i, insertStr) {
    return str.slice(0, i) + insertStr + str.slice(i)
}
function treeToLatex(tree, msgArray, controlNegate) {
    if(!tree) {return -1}
    const curToken = tree.value
    const needNegate = curToken.negate ? 1 : 0
    if(needNegate) {return 1}
    const left = tree.left
    const right = tree.right
    switch(curToken.type) {
        case tokenTypes.variable:
        case tokenTypes.number:
            if(!controlNegate && needNegate) {
                msgArray[0] += '-'
            }
            msgArray[0] += curToken.fillArg ? '?' : curToken.token
            return needNegate
        case tokenTypes.function:
            // Current implementation ensures left will be null
            // Get the Latex string of the function, and wrap the arguments in parenthese
            msgArray[0] += supportedFunctions[curToken.token] + '{'
            msgArray[0] += '('
            treeToLatex(right, msgArray, false)
            msgArray[0] += ')'
            msgArray[0] += '}'
            return needNegate
        case tokenTypes.operator:
            let addParenthesesLeft
            let addParenthesesRight
            let insertIndex
            let sign
            let subExprNegate
            let negateIndex
            switch(curToken.token) {
                case '+': // Dont need to do anything fancy
                    treeToLatex(left, msgArray, false)
                    insertIndex = msgArray[0].length
                    subExprNegate = treeToLatex(right, msgArray, true)
                    sign = subExprNegate ? '-' : '+'
                    msgArray[0] = insertStr(msgArray[0], insertIndex, sign)
                    return subExprNegate
                case '-': // Dont need to do anything to left side, but if right is +/-, will need to wrap in parentheses
                    treeToLatex(left, msgArray, false)
                    insertIndex = msgArray[0].length
                    addParenthesesRight = right?.value?.token === '+' || right?.value?.token === '-'
                    if(addParenthesesRight) {msgArray[0] += '('}
                    subExprNegate = treeToLatex(right, msgArray, true)
                    if(addParenthesesRight) {msgArray[0] += ')'}
                    sign = subExprNegate ? '+' : '-'
                    msgArray[0] = insertStr(msgArray[0], insertIndex, sign)
                    return subExprNegate
                case '@':
                    negateIndex = msgArray[0].length
                    addParenthesesRight = precedence['*'] > precedence[right?.value.token]
                    if(addParenthesesRight) {msgArray[0] += '('}
                    subExprNegate = !treeToLatex(right, msgArray, true)
                    if(addParenthesesRight) {msgArray[0] += ')'}
                    if(!controlNegate && subExprNegate) {
                        msgArray[0] = insertStr(msgArray[0], negateIndex, '-')
                    }
                    return subExprNegate
                case '*': // In all scenarios, a multiply sign is only needed if the beginning of the right expression is a number
                    negateIndex = msgArray[0].length
                    addParenthesesLeft = precedence[curToken.token] > precedence[left?.value.token]
                    if(addParenthesesLeft) {msgArray[0] += '('}
                    subExprNegate = treeToLatex(left, msgArray, true)
                    if(addParenthesesLeft) {msgArray[0] += ')'}
                    // Store current index in the message for \cdot insertion later
                    insertIndex = msgArray[0].length
                    addParenthesesRight = precedence[curToken.token] > precedence[right?.value.token]
                    if(addParenthesesRight) {msgArray[0] += '('}
                    if(treeToLatex(right, msgArray, true)) {subExprNegate = !subExprNegate}
                    if(addParenthesesRight) {msgArray[0] += ')'}
                    if(msgArray[0].length < insertIndex) {
                        throw new Error("Invalid expression: Nothing on the right of *?")
                    } else {
                        let firstRightNum
                        if(msgArray[0][insertIndex] === '{') {
                            firstRightNum = msgArray[0][insertIndex+1] >= '0' && msgArray[0][insertIndex+1] <= '9'
                        } else {
                            firstRightNum = msgArray[0][insertIndex] >= '0' && msgArray[0][insertIndex] <= '9'
                        }
                        let leftIsNegate = left?.value?.negate
                        if(!leftIsNegate && firstRightNum) { // Start of right expression is a number, add \cdot
                            msgArray[0] = msgArray[0].slice(0, insertIndex) + supportedOperators['*'] + ' ' + msgArray[0].slice(insertIndex)
                        }
                    }
                    if(!controlNegate && subExprNegate) {
                        msgArray[0] = insertStr(msgArray[0], negateIndex, '-')
                    }
                    return subExprNegate
                case '/': // Using dfrac: \dfrac{left}{right}
                    negateIndex = msgArray[0].length
                    msgArray[0] += supportedOperators['/'] + '{'
                    subExprNegate = treeToLatex(left, msgArray, true)
                    msgArray[0] += '}{'
                    if(treeToLatex(right, msgArray, true)) {subExprNegate = !subExprNegate}
                    msgArray[0] += '}'
                    if(!controlNegate && subExprNegate) {
                        msgArray[0] = insertStr(msgArray[0], negateIndex, '-')
                    }
                    return subExprNegate
                case '^': // Wrap left in parentheses if needed, wrap right in braces for Latex
                    addParenthesesLeft = precedence[curToken.token] >= precedence[left?.value.token] || left?.value.negate
                    msgArray[0] += '{'
                    if(addParenthesesLeft) {msgArray[0] += '('}
                    treeToLatex(left, msgArray, false)
                    if(addParenthesesLeft) {msgArray[0] += ')'}
                    msgArray[0] += '}'
                    msgArray[0] += '^{'
                    treeToLatex(right, msgArray, false)
                    msgArray[0] += '}'
                    return subExprNegate
                default:
                    throw new Error("Invalid token type!")
            }
        default:
            throw new Error("Invalid token type!")
    }
}
/*
Should return:
- Tokens
- Tokens in Postfix (via Shunting-Yard algorithm)
- Expression tree
- Raw LaTex string
- Rendered LaTex display
*/
export function exprToLatex(mathExpr) {
    if(mathExpr === undefined || mathExpr === null) {throw new Error("LatexDisplay needs mathExpr!")}
    mathExpr = mathExpr.replaceAll(' ', '') // Getting rid of all spaces
    if(mathExpr === '') {
        return {
            success: false,
            errorMsg: 'Empty input!'
        }
    }
    let ret
    try {
        const tokens = getTokens(mathExpr)
        console.log(tokensToString(tokens))
        const postfixTokens = getTokensInPostfix(tokens)
        console.log(tokensToString(postfixTokens))
        console.log(postfixTokens)
        const tree = generateExprTree(postfixTokens)
        let latexArray = ['']
        treeToLatex(tree, latexArray)
        const latex = latexArray[0]
        ret = {
            success: true,
            tokens: tokens,
            postfixTokens: postfixTokens,
            tree: tree,
            latex: latex
        }
    } catch (e) {
        ret = {
            success: false,
            errorMsg: e.message
        }
    }
        
    return ret
}

// FOR TESTING PURPOSES: ((-(x+t))^(2(-x+z))-4.5)/(x+4(5x+-------7))*-------arcsin(-x/4/(7n/-9))+9-----8k^2+x*4*y^2/-tan(-xcos(y)/csc(m)