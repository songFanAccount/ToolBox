const mathsTools = {
    displayName: 'Maths',
    tools: {
        'latex-converter': {
            displayName: 'LaTeX Converter',
            sectionTitles: ['The Tool', 'How to use', 'Limitations', 'How it works']
        }
    },
    subCategories: {
        differentiation: {
            displayName: 'Differentiation',
            tools: {
                'stationary-points': 'Stationary points'
            },
            subCategories:  {
                estimation: {
                    displayName: 'Estimation techniques',
                    tools: null,
                    subCategories: {
                        TEMPORARY: {
                            displayName: 'Temporary',
                            tools: null,
                            subCategories: null
                        }
                    }
                }
            }
        }
    }
}

const chemistryTools = {
    displayName: 'Chemistry',
    tools: null,
    subCategories: null
}
const physicsTools = {
    displayName: 'Physics',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'Physics Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Physics Category 11',
                    tools: null,
                    subCategories: null
                }
            }
        }
    }
}

const engineeringTools = {
    displayName: 'Engineering',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'Engineering Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Engineering Category 11',
                    tools: null,
                    subCategories: null
                }
            }
        }
    }
}

const irlGamesTools = {
    displayName: 'IRL Games',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'IRL Games Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'IRL Games Category  11',
                    tools: null,
                    subCategories: null
                }
            }
        }
    }
}

const videoGamesTools = {
    displayName: 'Video Games',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'Video Games Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Video Games Category 11',
                    tools: null,
                    subCategories: null
                }
            }
        }
    }
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
                },
                'chem-expression-parser': {
                    displayName: 'Chemistry expression parser',
                    sectionTitles: ['The Tool']
                }
            },
            subCategories: null
        }
    }
}
export const tools = {
    subCategories: {
        maths: mathsTools,
        chemistry: chemistryTools,
        physics: physicsTools,
        compsci: compsciTools,
        engineering: engineeringTools,
        irlGames: irlGamesTools,
        videoGames: videoGamesTools
    }
}