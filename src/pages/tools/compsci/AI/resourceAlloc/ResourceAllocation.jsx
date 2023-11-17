import React from 'react';
import { Box } from "@mui/material";
import { CollapseSectionBox, PageParagraph, PageTextList, SectionBox } from "../../../../../components/UI/DefaultLayout";
import Latex from 'react-latex-next';
import RASimulator from './RASimulator';

export default function ResourceAllocation() {
    return (
        <Box>
            <SectionBox title="Resource Allocation" usePageTitle>
                <SectionBox noBorder={true}>
                    <PageParagraph 
                        text="Resource allocation is the concept of assigning item(s) to agents according to
                            their preferences, and, depending on the goal of this allocation, what strategy
                            will be adopted to produce an utility output that is optimal for the goal. Unless 
                            specified otherwise, our tools for resource allocation will be based on the following 
                            allocation setting."
                    />
                    <Box>
                        <PageTextList
                            mt={1}
                            py={0.5}
                            listName="Allocation setting:"
                            list={[
                                <Box>
                                    <PageParagraph text="Set of agents "/>
                                    <Latex>$N = \lbrace 1, ..., n \rbrace$</Latex>
                                </Box>,
                                <Box>
                                    <PageParagraph text="Set of items "/>
                                    <Latex>$O = \lbrace o_1, ..., o_m \rbrace$</Latex>
                                </Box>,
                                <Box>
                                    <PageParagraph text="Preferences of agents "/>
                                    <Latex>$\succeq = \lbrace \succeq_1, ..., \succeq_n \rbrace$</Latex>
                                    <PageParagraph text="; preferences can be encoded by utility function "/>
                                    <Latex>$u = (u_1, ..., u_n)$</Latex>
                                    <PageParagraph text=" over bundles of items."/>
                                </Box>
                            ]}
                        />
                    </Box>
                    <Box>
                        <PageParagraph text="An allocation under this setting can be described by "/>
                        <Latex>$X = (X_1, ..., X_n)$</Latex>
                        <PageParagraph text=" where "/>
                        <Latex>$X_i$</Latex>
                        <PageParagraph text=" is the subset of items from "/>
                        <Latex>$O$</Latex>
                        <PageParagraph text=" that is allocated to agent "/>
                        <Latex>$i.$</Latex>
                    </Box>
                    <PageTextList
                        mt={1}
                        py={0.5}
                        listName="Furthermore, unless specified otherwise, we will operate under the following constraints:"
                        list={[
                            <Box>
                                <PageParagraph text="No items are to be shared between multiple agents. That is, for any two agents "/>
                                <Latex>$i$</Latex>
                                <PageParagraph text=" and "/>
                                <Latex>$j$,</Latex>
                                <PageParagraph text=" their allocated set of item(s) are disjoint, "/>
                                <Latex>$X_i \cap X_j = \varnothing.$</Latex>
                            </Box>,
                            <Box>
                                <PageParagraph text="All items are allocated to some agent, that is, "/>
                                <Latex>{`$\\bigcup\\limits_{i=1}^n X_i = O.$`}</Latex>
                            </Box>,
                            <Box>
                                <PageParagraph text="We will assume simple additive properties for utilities, that is, for any agent, "/>
                                <Latex>$i$</Latex>
                                <PageParagraph text=" and any two distinct and disjoint bundles of items "/>
                                <Latex>$A, B \subseteq O$</Latex>
                                <PageParagraph text=", we have that "/>
                                <Latex>$u_i(A) + u_i(B) = u_i(A\cup B).$</Latex>
                            </Box>
                        ]}
                    />
                </SectionBox>
                <SectionBox mb={1} title="Preferences and utility functions">
                    <Box>
                        <PageParagraph text="The agents' preferences "/>
                        <Latex>$\succeq = \lbrace \succeq_1, ..., \succeq_n \rbrace$</Latex>
                        <PageParagraph text=" are a way of measuring what each agent thinks of each bundle of item(s). Similar to how normal equality signs operate, the operator "/>
                        <Latex>$\succeq_i$</Latex>
                        <PageParagraph text=" can be used like "/>
                        <Latex>$A \succeq_i B$</Latex>
                        <PageParagraph text=" to denote that agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" prefers bundle "/>
                        <Latex>$A$</Latex>
                        <PageParagraph text=" at least as much as bundle "/>
                        <Latex>$B,$</Latex>
                        <PageParagraph text=" whereas the operator "/>
                        <Latex>$\succ_i$</Latex>
                        <PageParagraph text=" would denote a strict preference of "/>
                        <Latex>$A$</Latex>
                        <PageParagraph text=" over "/>
                        <Latex>$B,$</Latex>
                        <PageParagraph text=" and the operator "/>
                        <Latex>$\sim_i$</Latex>
                        <PageParagraph text=" in "/>
                        <Latex>$A \sim_i B$</Latex>
                        <PageParagraph text=" would indicate that agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" is indifferent between "/>
                        <Latex>$A$</Latex>
                        <PageParagraph text=" and "/>
                        <Latex>$B.$</Latex>
                    </Box>
                    <Box>
                        <PageParagraph text="The agents' utility functions "/>
                        <Latex>$u = (u_1, ..., u_n)$</Latex>
                        <PageParagraph text=" are another way of demonstrating preferences, but in a quantitative manner. The preference of "/>
                        <Latex>$A \succeq_i B$</Latex>
                        <PageParagraph text=" is equivalent to writing "/>
                        <Latex>$u_i(A) \geq u_i(B),$</Latex>
                        <PageParagraph text=" which means that agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" will gain more utility by obtaining bundle "/>
                        <Latex>$A$</Latex>
                        <PageParagraph text=" than it will gain by obtaining bundle "/>
                        <Latex>$B.$</Latex>
                        <PageParagraph text=" Similarly, "/>
                        <Latex>$A \succ_i B$</Latex>
                        <PageParagraph text=" is equivalent to "/>
                        <Latex>$u_i(A) \gt u_i(B),$</Latex>
                        <PageParagraph text=" and "/>
                        <Latex>$A \sim_i B$</Latex>
                        <PageParagraph text=" is equivalent to "/>
                        <Latex>$u_i(A) = u_i(B).$</Latex>
                    </Box>
                </SectionBox>
                <SectionBox title="Simulator">
                    <PageParagraph 
                        text="Here is a simple Resource Allocation simulator that follows the allocation settings specified above."
                    />
                    <PageTextList 
                        listName="How it works:"
                        listStyleType='decimal'
                        list={[
                            <PageParagraph text="Use the control board to add and delete agents and items (both up to 10). "/>,
                            <PageParagraph 
                                text="Toggle 'Edit mode' on the control board and fill out the preference profile with every agent's utility value (positive 2-digit integer) for each item. 
                                      Make sure to apply the changes once you are done editing."
                            />,
                            <PageParagraph 
                                text="Toggle 'Allocate mode' on the control board and click on the preference profile to allocate items. E.g. Clicking on the square [agent1, item2] implies you
                                      are allocating item2 to agent1. Each item can be allocated to at most 1 agent, i.e. there is at most one circle per column."
                            />,
                            <Box>
                                <PageParagraph 
                                    text="The details of your allocation will be displayed on the right of the preference profile, showing each agent's allocated set of items and their net utility gained.
                                        If any of the utilities are left empty or invalid, their net utilities cannot be properly calculated, and will display "
                                    />
                                <PageParagraph text="?" color="red"/>
                                <PageParagraph text="."/>
                            </Box>
                        ]}
                    />
                    <RASimulator/>
                </SectionBox>
                <SectionBox title="Allocation properties">
                    <PageParagraph 
                        text="In the process of discovering and developing allocation algorithms, there are certain desirable properties we want to consider.
                              Certain algorithms may wish to satisfy certain properties and may not satisfy some others, this ultimately depends
                              on the goals and priorities of the algorithm."
                    />
                    <CollapseSectionBox
                        title="Pareto-optimality"
                        titleFs={16}
                    >

                    </CollapseSectionBox>
                </SectionBox>
            </SectionBox>
        </Box>
    )
}