export function getChemEqnInfo(eqn) {
    /* Pre-processing */
    eqn = eqn.replaceAll(' ', '')
    const eqnLen = eqn.length
    /* Initialising return values */
    let reactants = []
    let products = []
    /* Initialising variables for parsing */
    let lastChar = ''
    function processChar(char) {

        lastChar = char
    }
    for(let i = 0; i < eqnLen; i++) {
        processChar(eqn[i])
    }
    return {
        reactants: reactants,
        products: products
    }
}