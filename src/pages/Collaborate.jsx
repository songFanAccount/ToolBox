import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { PageParagraph, PageTitle, SectionBox } from "../components/UI/DefaultLayout";

export default function Collaborate() {
    return (
        <Box>
            <Helmet>
                <title>Collaborate</title>
            </Helmet>
            
            <PageTitle title="What ideas are we looking for?"/>
            <SectionBox>
                <PageParagraph 
                    text={
                        `Does it have to be academic? Does it have to be professional? The answer to both of these questions is no. In fact, the tool doesn't even have
                        to be useful! The purpose of ToolBox is to create a shared collection of tools across all sorts of topics and categories. The nature of the tools
                        may vary greatly, some aim to share knowledge of how to solve a type of problem, some aim to provide convenience in otherwise very tedious tasks,
                        and some may even be just for creating fun activities. The categories listed in our navigation bar show some of the paths we're thinking of exploring,
                        but we're certainly not limited to only them.`
                    }
                />
                <Box>
                    <PageParagraph text="In short," bold/>
                    <PageParagraph 
                        text={
                            ` any idea can become a tool, as long as it is appropriate and we believe it would be interesting and/or helpful for the community.`
                        }
                    />
                </Box>
                    
                <PageParagraph 
                    text={
                        `As mentioned above, the tools do not have to be strictly academic, but they would typically be prioritised over casual ideas. The team consists of two uni friends
                        wanting to make something cool of our own, while hopefully giving something good to the community. We don't plan on expanding in the foreseeable future, as such,
                        we must pick and develop the ideas that seem the most worthwhile.`
                    }
                />
            </SectionBox>
            <PageTitle title="Who can collaborate?"/>
            <SectionBox>
                <PageParagraph text="Anyone! We do not discriminate anyone, as long as you respect us, we will respect you too."/>
                <PageParagraph 
                    text={
                        `However, in most cases you will need to demonstrate that you really do know your stuff. This may vary depending on the nature of the tool, but it is
                        especially important for academic tools. We'd rather have no tool than make a broken one. The demonstration process is explained below.`
                    }
                />
            </SectionBox>
            <PageTitle title="What's in it for you?"/>
            <SectionBox>
                <Box>
                    <PageParagraph 
                        text={
                            `Nothing... much? Contributing here will `
                        }
                    />
                    <PageParagraph text="probably" bold/>
                    <PageParagraph 
                        text={
                            ` not dramatically increase your chances of getting a job anywhere.`
                        }
                    />
                </Box>
                <Box>
                    <PageParagraph 
                        text={
                            `However, we will do our best to make sure your efforts are recognised. Once the tool is developed and published, we will highlight your contributions
                            in the `
                        }
                    />
                    <PageParagraph text="Collaborator Info" bold/>
                    <PageParagraph 
                        text={
                            ` section on that particular tool page. This section allows you to introduce and promote yourself, and provide ways to reach you like via LinkedIn or social media.`
                        }
                    />
                </Box>
                <PageParagraph 
                    text={
                        ` `
                    }
                />
            </SectionBox>
        </Box>
    )
}

/* <Box 
        sx={{
            display: 'flex',
            alignItems: 'flex-end',
            columnGap: 2
        }}
    >
        <PageTitle title="All ideas are equal! " inline mb={0}/>
        <PageTitle fs={12} title="(kinda...)" inline mb={1.2}/>
    </Box> */