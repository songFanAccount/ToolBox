import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { CollapseSectionBox, ExternalLink, PageParagraph, PageSectionTitle, PageTextList, SectionBox, ToolLink } from "../components/UI/DefaultLayout";

export default function Collaborate() {
    return (
        <Box>
            <Helmet>
                <title>Collaborate</title>
            </Helmet>
            <SectionBox title="What ideas are we looking for?" usePageTitle>
                <Box>
                    <PageParagraph 
                        text={
                            `Does it have to be academic? Does it have to be professional? The answer to both of these questions is no. In fact, the tool doesn't even have
                            to be useful! The purpose of ToolBox is to create a shared collection of tools across all sorts of topics and categories. The nature of the tools
                            may vary greatly, some aim to share knowledge of how to solve a type of problem, some aim to provide convenience in otherwise very tedious tasks,
                            and some may even be just for creating fun activities. You should check out our `
                        }
                    />
                    <ToolLink name="about" linkText="About Us"/>
                    <PageParagraph text=" page for a better understanding of the different type of tools."/>
                </Box>
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
                        wanting to make something cool of our own, while hopefully giving something good to the community. As such, we are limited with time and must pick and develop 
                        the ideas that seem the most worthwhile.`
                    }
                />
            </SectionBox>
            <SectionBox title="Who can collaborate?" usePageTitle>
                <PageParagraph text="Anyone! We do not discriminate anyone, as long as you respect us, we will respect you too."/>
                <PageParagraph 
                    text={
                        `However, in most cases you will need to demonstrate that you really do know your stuff. This may vary depending on the nature of the tool, but it is
                        especially important for academic tools. We'd rather have no tool than make a broken one. The demonstration process is part of the step 2
                        in the how-to section below.`
                    }
                />
                <PageParagraph text={
                    `Alternatively, if you have an idea but you're not confident in collaborating, you can still send us the idea!`
                }/>
            </SectionBox>
            <SectionBox title="What's in it for you?" usePageTitle>
                <Box>
                    <PageParagraph 
                        text={
                            `Nothing... much?`
                        }
                    />
                </Box>
                <Box>
                    <PageParagraph 
                        text={
                            `Any collaboration will essentially be volunteering work. However, we will do our best to make sure your efforts are recognised. 
                            Once the tool is developed and published, we will highlight your contributions in the `
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
                        `Your name will be imprinted on the tool permanently, and you can be proud of taking part in making something for the community!`
                    }
                />
            </SectionBox>
            <CollapseSectionBox title="Interested? Here's how it'll work..." usePageTitle>
                <PageSectionTitle title="Step 0: Brewing up an idea!"/>
                <Box>
                    <PageParagraph text={
                        `Of course, start by having some idea. Think of all the times you thought to yourself: "I wish there was `
                        }
                    />
                    <PageParagraph text={`something`} bold/>
                    <PageParagraph text={
                        ` that would help me do this". Or, alternatively, if you notice that people are struggling with a particular problem
                        that you personally are quite confident with solving, you can collaborate with us to share your approach and solution.`
                    }/>
                </Box>
                <PageParagraph text={
                    `We are aware that nowadays there are already lots of online tools for lots of different problems. That doesn't mean we can't make a new one!
                    While it is not our intention to compete with them, if there is room for improvement (clearer working out, visualisation of solutions, 
                    advice and tips etc...), we will consider making our own variation of the tool.`
                }/>
                <PageSectionTitle title="Step 1: Sending us your proposal..."/>
                <Box>
                    <PageParagraph text={`Now that you've got your idea, we want you to explain it to us. Send us an email at `}/>
                    <ExternalLink href="mailto:toolbox.queries@gmail.com">
                        toolbox.queries@gmail.com
                    </ExternalLink>
                    <PageParagraph text=" with as much of the following information as possible!"/>
                </Box>
                <PageTextList 
                    listName={`We want to know:`}
                    list={[
                        `What categories does it fall under? Try to be as specific as possible! For example, a tool for trapezoidal rule would be
                        Maths -> Integration -> Estimation techniques.`,
                        'Is this a serious or casual idea?',
                        'What inspired you to want to make this?',
                        `A not too long but sufficient description of how you envision the tool to work.`,
                        `Are there anything about the topic that you wouldn't be 100% sure about? Don't worry, we don't expect you to know everything!`,
                        `Will you be able to stay responsive throughout the collaboration? Depending on the tool, we may need to occasionally discuss
                        implementation details with you.`,
                        'What app do you want to use to call for step 2?'
                    ]}
                />
                <PageSectionTitle title="Step 2: Getting on a call with us..."/>
                <Box>
                    <PageParagraph text={
                        `If we're interested in your idea, we will invite you to join a call with us so we can discuss further. This will preferably be a call over 
                        Discord, but Zoom works fine. We expect this call to be `
                    }/>
                    <PageParagraph text="roughly 1-2 hours," bold/>
                    <PageParagraph text=" but special arrangements can be made."/>
                </Box>
                <PageTextList 
                    listName={
                        `The main parts of this call is...`
                    }
                    list={[
                        "For you to demonstrate that you really know the ins and outs of your chosen topic, and if not, how can we compensate for what you don't know?",
                        "For you to elaborate on your idea, going into more specific implementation details. What do you want the tool to look like?",
                        "For us to provide feedback to your idea, and explain our plan and roadmap to tackle its development.",
                        "For us to gauge the expected workload for the tool, and provide a rough ETA for its development."
                    ]}
                />
                <PageParagraph text={
                        `Additionally, this call is also a great opportunity for us to know if you will be fun to work with! Throughout our ToolBox project, 
                        we hope to meet some interesting people along the way, and we want to make this collaboration enjoyable for both parties.`
                    }
                />
                <PageSectionTitle title="Step 3: Now we wait..."/>
                <PageParagraph text={
                    `If the call goes well, we should be ready to start developing the tool! Throughout the development, you may expect occasional updates from us
                    or questions on specific implementation details. We want to make sure you feel involved in every step of the way.`
                }/>
                <PageSectionTitle title="Step 4: Done!"/>
                <Box>
                    <PageParagraph text={
                        `Once the tool is developed, we will do a final check with you to make sure you're happy with the result. Then, once you provide us with what you
                        want to show in your `
                    }/>
                    <PageParagraph text="Collaborator Info" bold/>
                    <PageParagraph text={
                        ` section (or remain anonymous), the tool will be ready to be published!`
                    }/>
                </Box>
            </CollapseSectionBox>
            <SectionBox title="Still have questions?" usePageTitle>
                <Box>
                    <PageParagraph text="If anything about this feature is still unclear, please send us a question via the form in "/>
                    <ToolLink name="contact" linkText="Contact Us."/>
                </Box>
            </SectionBox>
            <SectionBox title="Future plans for the collab feature" usePageTitle>
                <Box>
                    <PageParagraph text={
                        `We plan on making a better way for people to send us ideas, likely in the form of a forum for comments and a like/dislike system. This way we can also
                        see what ideas interest the most people! For now, please send your ideas to our email at `
                    }/>
                    <ExternalLink href="mailto:toolbox.queries@gmail.com">
                        toolbox.queries@gmail.com.
                    </ExternalLink>
                </Box>
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