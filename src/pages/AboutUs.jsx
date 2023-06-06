import { Box } from "@mui/material"
import { Helmet } from "react-helmet"
import { CollapseSectionBox, ExternalLink, PageParagraph, PageTextList, SectionBox, ToolLink } from "../components/UI/DefaultLayout"

function AboutUs() {
    return (
        <Box>
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <SectionBox title="What is ToolBox?" usePageTitle>
                <PageParagraph 
                    text={
                        `ToolBox is a collection of tools for all sorts of categories, from algorithmic maths calculators to even helping you out with video games. 
                        But what exactly is a tool here in ToolBox? Our tools can vary greatly in nature and aim to achieve different goals, but
                        generally speaking, each tool will fall under one of these categories:`
                    }
                />
                <PageTextList
                    list={[
                        'A guide on how to solve particular types of problems with step-by-step working out',
                        'Proof or demonstration of how and why something works',
                        'A tool that helps you with tedious tasks',
                        'A more casual tool that makes something more fun and interesting'
                    ]}
                />
                <Box>
                    <PageParagraph text={
                        `Our goal is to collaborate with the community to share what we know, so that ToolBox can become a reliable place for people in need of help.
                        You can learn about how to `
                    }/>
                    <ToolLink name="collab" linkText="collaborate with us"/>
                    <PageParagraph text={
                        ` here! `
                    }/>
                </Box>
                <Box>
                    <PageParagraph text={
                        `All tools and services our website provide will be free for now, and forever. Additionally, for the developers, our code
                        will remain open source on our `
                    }/>
                    <ExternalLink href="https://github.com/songFanAccount/ToolBox">GitHub.</ExternalLink>
                </Box>
            </SectionBox>
            <CollapseSectionBox title="Our motivation & values" usePageTitle startClosed={true}>
                <PageParagraph text={
                    `Why did we make ToolBox? Let's break this down into academic and casual tools. `
                }/>
                <SectionBox title="Academic tools">
                    <PageParagraph text={
                        `As recent graduates ourselves, we understand very well the struggles of studying. While it is true that there are more resources online than ever
                        before, the truth is a lot of it is decentralised and can be frustrating to navigate. The long term goal of ToolBox is to create a united collection of 
                        tools for all categories so you don't have to wander around the web yourself!`
                    }/>
                    <PageParagraph text={
                        `When we came up with the idea, our largest concern was the overwhelming amount of resources already existing on the internet.
                        This meant that there already existed tools for a lot of ideas we've had in mind! However, we noticed some major flaws in existing academic tools:`
                    }/>
                    <PageTextList
                        list={[
                            `Insufficient explanation: Many tools prioritised their basic functionality, which is to take user input and output the correct solution. But there
                            was very little explanation or working out.`,
                            `Lack of visuals and animation: Certain topics are best explained in conjunction with a nice diagram. We noticed this was missing in a lot of existing
                            tools, or typically, diagrams were static and did not change to reflect user inputs.`,
                            <Box>
                                <PageParagraph text={`Lack of proofs: Explanation and working out entails why we want to do step X, whereas proof explains `}/>
                                <PageParagraph text="why" bold/>
                                <PageParagraph text={` we're allowed to take step X. This was also typically missing.`}/>
                            </Box>
                        ]}
                    />
                    <PageParagraph text="And so, we committed ourselves to creating academic tools according to these values:"/>
                    <PageTextList
                        list={[
                            <Box>
                                <PageParagraph text="Clear and concise working out: " bold/>
                                <PageParagraph text={
                                    ` We believe that a correct understanding of the process is far more important than a correct answer!
                                    If you can only blindly follow an algorithm, what makes you different from some lines of code? Understanding the steps to
                                    solving any problem equips you with new interesting ways of approaching new problems. Eventually, facing new challenges will no
                                    longer feel like an impenetrable wall, but instead a game to figure out which tools will break that wall down, layer by layer.`
                                }/>
                            </Box>,
                            <Box>
                                <PageParagraph text="Visualisation of solutions: " bold/>
                                <PageParagraph text={
                                    ` Everyone learns differently, but for us, we believe that visualisation of the solving process is often the best way to absorb
                                    content. As such, we aim to do our best to animate our tools with dynamic visualisations, making the diagrams change according
                                    to user inputs.`
                                }/>
                            </Box>,
                            <Box>
                                <PageParagraph text="Provision of proofs wherever applicable: " bold/>
                                <PageParagraph text={
                                    ` Proofs have largely been taken for granted. When given a formula, we found it is rare for many students to think about
                                    why it works, let alone putting in the effort to research it online. We want to encourage students to have the mindset of
                                    wanting to know why formulae work. As such, we aim to either provide proofs in the tools ourselves, or if there already exist
                                    such resources online, find and provide the best ones for you.`
                                }/>
                            </Box>
                        ]}
                    />
                </SectionBox>
                <SectionBox title="Casual tools">
                    <PageParagraph text={
                        `By casual, really it means we want ToolBox to be "general purpose", so that you can come to us for help with anything, not just your studies.
                        As of now, we think this idea is only applicable for video games and IRL games like board and card games. Overall, the goal of these tools is to
                        make those experiences more enjoyable.`
                    }/>
                </SectionBox>
            </CollapseSectionBox>
            <SectionBox title="Our history" usePageTitle>
                <PageParagraph text={
                    `The development of ToolBox began in May, 2023. //TODO 😴`
                }/>
            </SectionBox>
            <SectionBox title="Meet the devs!" usePageTitle> 
                <PageParagraph text="//TODO 😴"/>
            </SectionBox>
        </Box>  
    )
}
export default AboutUs