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
                    `Why did we make ToolBox? When we came up with the idea, the largest concern was the overwhelming amount of resources already existing on the internet.
                    This meant that there already existed tools for a lot of ideas we've had in mind!`
                }/>
                <PageTextList
                    listName="However, we noticed some major flaws:"
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
                <Box>
                    <PageParagraph text="&#8756;" fs={30}/>
                    <PageParagraph text="hello"/>
                </Box>
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