import { Box } from "@mui/material"
import { Helmet } from "react-helmet"
import { PageParagraph, PageTextList, SectionBox, ToolLink } from "../components/UI/DefaultLayout"

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
                        You can read more about how to `
                    }/>
                    <ToolLink name="collab" linkText="collaborate with us"/>
                    <PageParagraph text=" here! All tools and services our website provide will be free for now, and forever."/>
                </Box>
            </SectionBox>
            <SectionBox title="Our motivation & values" usePageTitle>
                <PageParagraph text={
                    `Why did we make ToolBox? When we came up with the idea, we the largest concern was the overwhelming amount of resources already existing on the internet.
                    This meant that there already existed tools for a lot of ideas we've had in mind!`
                }/>
                <SectionBox title="Academic tools">
                    <PageTextList
                        listName="However, we noticed some major flaws in existing academic tools:"
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
                    <PageTextList
                        listName="And so, we committed ourselves to creating academic tools according to these values:"
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
                                <PageParagraph text="Provision of proofs: " bold/>
                                <PageParagraph text={
                                    ` Proofs have largely been taken for granted. When given a formula, we found it is uncommon that students are curious as to
                                    why it works, `
                                }/>
                            </Box>
                        ]}
                    />
                </SectionBox>
            </SectionBox>
            <SectionBox title="Meet the devs!" usePageTitle>

            </SectionBox>
            <SectionBox title="Meet the devs!" usePageTitle>

            </SectionBox>
            <SectionBox title="Meet the devs!" usePageTitle>

            </SectionBox>
        </Box>  
    )
}
export default AboutUs