const mathsTools = {
    displayName: 'Maths',
    tools: {
        'latex-converter': {
            displayName: 'LaTeX Converter',
            sectionTitles: ['The Tool', 'How to use', 'Limitations', 'How it works']
        }
    },
    subCategories: null
}

const chemistryTools = {
    displayName: 'Chemistry',
    tools: {
        'chem-equation-balancer': {
            displayName: 'Chemical Equation Balancer',
            sectionTitles: ['The Tool']
        }
    },
    subCategories: null
}

const compsciTools = {
    displayName: "Computer Science",
    tools: null,
    subCategories: {
        parsing: {
            displayName: 'Parsing',
            tools: {
                'maths-expression-parser': {
                    displayName: 'Maths expression parser',
                    sectionTitles: ['The Tool', 'How it works', 'Limitations']
                }
            },
            subCategories: null
        },
        AI: {
            displayName: 'Artificial Intelligence',
            tools: null,
            subCategories: {
                resourceAlloc: {
                    displayName: "Resource Allocation",
                    tools: {
                        'EF1-generator': {
                            displayName: 'EF1 Allocation Algorithm',
                            sectionTitles: ['The Tool', 'How it works']
                        },
                        'student-proposing-DA': {
                            displayName: 'Student Proposing Deferred Acceptance',
                            sectionTitles: ['The Tool', 'How it works']
                        },
                    },
                    subCategories: null
                }
            }
        },
        compilers: {
            displayName: 'Compilers',
            tools: null,
            subCategories: null
        }
    }
}

export const tools = {
    displayName: "All categories",
    subCategories: {
        maths: mathsTools,
        chemistry: chemistryTools,
        compsci: compsciTools,
    }
}