import React from 'react';
import { Box } from "@mui/material";
import { CollapseSectionBox, ExternalLink, PageParagraph, PageTextList, SectionBox, ToolLink } from "../../../../../components/UI/DefaultLayout";
import Latex from 'react-latex-next';
import RASimulator from './RASimulator';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function ResourceAllocation() {
    return (
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
                            <PageParagraph text="Allocations are complete, that is, all items are allocated to some agent, or mathematically, "/>
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
                            text="Toggle 'Edit mode' on the control board and fill out the preference profile with every agent's utility value (non-negative 2-digit integer) for each item. 
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
                        </Box>,
                        <PageParagraph text="For envy-freeness and proportionality, if an allocation does not satisfy either one, it will find and display the first instance where the property is violated, but does not show all violations."/>
                    ]}
                />
                <RASimulator/>
            </SectionBox>
            <SectionBox title="Efficiency concepts">
                <PageParagraph 
                    text="In the process of discovering and developing allocation algorithms, there are certain desirable properties we want to consider in terms of efficiency .
                            Certain algorithms may wish to satisfy certain properties and may not satisfy some others, this ultimately depends
                            on the goals and priorities of the algorithm."
                />
                <CollapseSectionBox title="Pareto-optimality" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" is Pareto optimal if there exists no allocation "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text=" such that "/>
                        <Latex>$Y_i\succeq_i X_i$</Latex>
                        <PageParagraph text=" for all "/>
                        <Latex>$i\in N,$</Latex>
                        <PageParagraph text=" and "/>
                        <Latex>$Y_i\succ_i X_i$</Latex>
                        <PageParagraph text=" for some "/>
                        <Latex>$i\in N.$</Latex>
                        <PageParagraph text=" If there does exists some such allocation "/>
                        <Latex>$Y,$</Latex>
                        <PageParagraph text=" then we say that "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text=" Pareto dominates "/>
                        <Latex>$X.$</Latex>
                    </Box>
                    <Box>
                        <PageParagraph text="In Layman's terms, an allocation is Pareto optimal if there is no way of improving the total utility of any agent(s) without strictly worsening the total utility of some other agent(s). "/>
                    </Box>
                    <PageTextList
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="May be more than 1 Pareto optimal allocation: "/>
                                <PageParagraph 
                                    text="In many cases, there may be multiple distinct Pareto optimal allocations. For example, suppose there is a Pareto optimal allocation where you have item "
                                />
                                <Latex>$a$</Latex>
                                <PageParagraph text=" and your friend has item "/>
                                <Latex>$b,$</Latex>
                                <PageParagraph text=" and both you and your friend consider these two items to be " />
                                <Latex>$x$</Latex>
                                <PageParagraph 
                                    text=" utility points each. Then, if you swap items with your friend and thus changing the allocation, clearly, 
                                            your individual utilities remain the same, and so this new allocation would also be Pareto optimal."/>
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Proving an allocation is or isn't Pareto optimal: "/>
                                <PageParagraph 
                                    text="To prove that an allocation is not Pareto optimal, you would need to find simply 1 allocation that Pareto dominates it. 
                                            However, to prove that an allocation is Pareto optimal, you would need to show that all other allocations do not Pareto dominate it. "
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="If an allocation maximises utilitarian or Nash product welfare or is a lexmin allocation, then it is Pareto optimal: "/>
                                <PageParagraph text="Proofs are provided in their individual sections below."/>
                            </Box>
                        ]}
                    />
                    <PageParagraph text="Example:"/>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='X'
                        utilities={[
                            [6, 2, 3, 1],
                            [4, 1, 2, 3]
                        ]} 
                        allocations={[
                            new Set([0, 2, 3]),
                            new Set([1])
                        ]}
                    />
                    <Box>
                        <PageParagraph text="The allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" is "/>
                        <PageParagraph bold text="not "/>
                        <PageParagraph text=" Pareto optimal because there exists at least one other allocation, like "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph 
                            text=" below, such that at least some (in this case both) agents can receive a strictly better allocation while ensuring that no other agents are strictly worse off.
                                    We can identify that both agents are strictly better in "
                        />
                        <Latex>$Y,$</Latex>
                        <PageParagraph text=" since agent 1 has a utility of "/>
                        <Latex>$11 \gt 10,$</Latex>
                        <PageParagraph text=" and agent 2 has a utility of "/>
                        <Latex>$3 \gt 1.$</Latex>
                    </Box>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='Y'
                        utilities={[
                            [6, 2, 3, 1],
                            [4, 1, 2, 3]
                        ]} 
                        allocations={[
                            new Set([0, 1, 2]),
                            new Set([3])
                        ]}
                    />
                    <Box>
                        <PageParagraph text="On the other hand, "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text=" is Pareto optimal because all other allocations do not Pareto dominate it (since it is a small sample space, you can manually compare all other allocations). "/>
                    </Box>
                </CollapseSectionBox>
                <CollapseSectionBox title="Utilitarian social welfare" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s utilitarian social welfare is calculated by "/>
                        <Latex>{`$$\\sum\\limits_{i\\in N}u_i(X_i)$$`}</Latex>
                    </Box>
                    <PageParagraph 
                        text="In other words, it is the sum of all utilities gained by the agents from their allocated bundle of item(s)."
                    />
                    <PageTextList 
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Maximising utilitarian welfare guarantees Pareto optimality: "/>
                                <PageParagraph
                                    text="Consider any allocation that maximises utilitarian welfare. Suppose that it is not Pareto optimal, then this means
                                            there exists some allocation where no agents' utilities are worse off, and some agents' utilities are strictly improved,
                                            then this means that the utilitarian welfare, which is the sum of all agents' utilities gained, must be strictly
                                            larger than that of the initial allocation. This would however contradict the fact that our initial allocation maximises
                                            utilitarian welfare, hence it must be the case that the allocation is Pareto optimal."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Fairness concerns: "/>
                                <PageParagraph 
                                    text= 
                                    {
                                        `
                                        Allocation algorithms may find it appealing to try and maximise this property as in general, we want to improve net utility gained.
                                        However, this can encounter fairness problems due to its utilitarian nature. Since we are focused on the net utility, it may be the case 
                                        that the maximisation of the sum relies on some agent(s) being mistreated and receiving very little in comparison.
                                        `
                                    }
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Finding an allocation that maximises utilitarian social welfare: "/>
                                <PageParagraph 
                                    text= 
                                    {
                                        `
                                        In our allocation setting, items cannot be shared, and the utility gained per item is not affected by whether it is in a bundle with any other item.
                                        Then, the utilitarian social welfare is equal to the sum of all utilities gained by the items. This means that this value can be maximised
                                        by allocating each item to the agent that gains the most utility from them.
                                        `
                                    }
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Not strategyproof: "/>
                                <PageParagraph 
                                    text= 
                                    {
                                        `
                                        An allocation that maximises utilitarian social welfare is not strategyproof since, as a consequence of the last point, 
                                        if any agent misreports their preferences with the higher utility values per item, this allocation algorithm would be more likely 
                                        to allocate the items to that agent, as that would maximise the sum of utilities gained.
                                        `
                                    }
                                />
                            </Box>,
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Egalitarian social welfare" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s egalitarian social welfare is "/>
                        <Latex>{`$$\\min\\limits_{i\\in N}{u_i(X_i)}$$`}</Latex>
                    </Box>
                    <PageParagraph 
                        text="In other words, it is the minimum utility gained of all the agents."
                    />
                    <PageTextList 
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Fairness appeal: "/>
                                <PageParagraph 
                                    text="As the name egalitarian suggests, an allocation algorithm that aims to maximise egalitarian social welfare is one that advocates for 
                                            the equality of all agents in question. This is because, by maximising "
                                />
                                <Latex>{`$\\min\\limits_{i\\in N}{u_i(X_i)}$`}</Latex>
                                <PageParagraph
                                    text=", we are maximising the smallest amount of utility gained of all agents, in hopes for no agent feeling like they are mistreated and receiving too little."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Not strategy proof: "/>
                                <PageParagraph 
                                    text= 
                                    {
                                        `
                                        An allocation that prioritises maximising egalitarian social welfare can be understood as trying to boost the agent with the lowest utility up as
                                        much as possible. As such, there is an exploit for agents to misreport their utility values as lower than they actually are, and result in more allocated items.
                                        `
                                    }
                                />
                            </Box>,
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Lexmin welfare" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s lexmin welfare is the vector of agents' utilities listed in non-decreasing order. Let "/>
                        <Latex>$f(X)$</Latex>
                        <PageParagraph text=" be the function that outputs the given allocation's lexmin welfare. Then an allocation maximises lexmin welfare if it "/>
                        <ExternalLink href="https://en.wikipedia.org/wiki/Lexicographic_order#Definition">lexicographically</ExternalLink>
                        <PageParagraph text=" maximises "/>
                        <Latex>$f(X).$</Latex>
                    </Box>
                    <PageParagraph text="Example:"/>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='X'
                        utilities={[
                            [6, 2, 3, 1],
                            [4, 1, 2, 3]
                        ]} 
                        allocations={[
                            new Set([0]),
                            new Set([1, 2, 3])
                        ]}
                    />
                    <Box>
                        <PageParagraph text="Here, allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" has a lexmin welfare of "/>
                        <Latex>$(6,6).$</Latex>
                    </Box>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='Y'
                        utilities={[
                            [6, 2, 3, 1],
                            [4, 1, 2, 3]
                        ]} 
                        allocations={[
                            new Set([0, 1]),
                            new Set([2, 3])
                        ]}
                    />
                    <Box>
                        <PageParagraph text="Another possible allocation "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text=" has a lexmin welfare of "/>
                        <Latex>$(5,8).$</Latex>
                        <PageParagraph text=" Since the first element of "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s vector is 6, which is greater than "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text="'s first element of 5, we see that "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s lexmin welfare is "/>
                        <ExternalLink href="https://en.wikipedia.org/wiki/Lexicographic_order#Definition">lexicographically</ExternalLink>
                        <PageParagraph text=" greater than "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text="'s lexmin welfare, that is: "/>
                        <Latex>{`$$(6,6) \\gt_{lex} (5,8)$$`}</Latex>
                        <PageParagraph text=" and so "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" is a better allocation than "/>
                        <Latex>$Y$</Latex>
                        <PageParagraph text=" based on this standard."/>
                    </Box>
                    <PageTextList 
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Maximising lexmin welfare guarantees Pareto optimality: "/>
                                <PageParagraph
                                    text="Consider any allocation that maximises lexmin welfare. Suppose that it is not Pareto optimal, then this means
                                            there exists some allocation where no agents' utilities are worse off, and some agents' utilities are strictly improved,
                                            then this means that the lexmin welfare, which is a vector of the agents' utilities in non-descending order, 
                                            must be lexicographically greater than that of the initial allocation. This would however contradict the fact that our 
                                            initial allocation maximises lexmin welfare, hence it must be the case that the allocation is Pareto optimal."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Maximising lexmin welfare also maximises egalitarian welfare but not the other way around: "/>
                                <PageParagraph 
                                    text="Any allocation that maximises lexmin welfare must be lexicographically greater than all other possible allocations, meaning that its lexmin welfare's
                                            first element must be greater than or equal to all other possible lexmin welfares. Since the first element of the vector represents the lowest utility
                                            gained of all agents, this means we have also maximised egalitarian welfare by definition. "
                                />
                                <PageParagraph block mt={2}
                                    text="On the other hand, maximising egalitarian welfare does not necessarily maximise lexmin welfare. This is because egalitarian welfare only considers the
                                            lowest utility gained, whereas the lexicographic nature of lexmin welfare implies that it prioritises the lowest utility but also compares 
                                            all other utilities, as demonstrated by the use of utility vectors."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Not strategyproof: "/>
                                <PageParagraph 
                                    text="As with egalitarian welfare allocations, an allocation algorithm that maximises lexmin welfare is also not strategyproof.
                                            Similarly, since it still considers the lowest utility agent as its highest priority, an agent may misreport their utility values as lower
                                            than they actually are in order to be prioritised."
                                />
                            </Box>
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Nash product social welfare" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text="'s Nash product welfare is "/>
                        <Latex>{`$$\\prod\\limits_{i\\in N}u_i(X_i)$$`}</Latex>
                        <PageParagraph
                            text="In other words, it is the product of all agents' utilities gained. This value is similar in nature to utilitarian
                                    social welfare, since both properties consider the utilities of all agents."
                        />
                    </Box>
                    <PageTextList
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Maximising Nash product welfare guarantees Pareto optimality: "/>
                                <PageParagraph
                                    text="Consider any allocation that maximises Nash product welfare. Suppose that it is not Pareto optimal, then this means
                                            there exists some allocation where no agents' utilities are worse off, and some agents' utilities are strictly improved,
                                            (from positive values to larger positive values), then this means that the Nash product welfare, which is the product of 
                                            all agents' utilities gained, must be strictly larger than that of the initial allocation. This would however contradict 
                                            the fact that our initial allocation maximises Nash product welfare, hence it must be the case that the allocation is Pareto optimal."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Incentive to allocate at least 1 item to each agent: "/>
                                <PageParagraph 
                                    text="Since Nash product welfare measures the product of all agents' utility, the presence of a single 0 will
                                            cause the overall result to equal 0 too, unlike utilitarian welfare which is unaffected when adding 0s.
                                            Hence, if any agent is not allocated any items, they would have gained 0 utility and thereby causing the Nash
                                            product to be 0."
                                />
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Not strategyproof: "/>
                                <PageParagraph 
                                    text="An allocation algorithm that maximises Nash product welfare is not strategyproof. Similar to utilitarian welfare,
                                            if an agent misreports their utilities as much higher, then it would be beneficial for the algorithm to allocate the 
                                            items to them, as that would improve the product of all agents' utilities, as long as every agent is still allocated
                                            something (non 0 utility)."
                                />
                            </Box>
                        ]}
                    />
                </CollapseSectionBox>
            </SectionBox>
            <SectionBox title="Fairness concepts">
                <PageParagraph text='Where efficiency focus on the utility output of allocations, fairness concepts aim to make sure no agents feel like they are receiving too little, and thereby treated "unfairly".'/>
                <CollapseSectionBox title="Envy-freeness" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" satisfies envy-freeness if for all "/>
                        <Latex>$i, j\in N,$</Latex>
                        <Latex>{`$$X_i\\succeq_i X_j, \\text{ or in terms of utilities, } u_i(X_i) \\geq u_i(X_j)$$`}</Latex>
                        <PageParagraph 
                            text="that is, no agents are envious of any other agent's allocated bundle of items, or, no agents would gain more
                                    utility by having any other agent's allocated bundle of items."/>
                    </Box>
                    <Box>
                        <PageParagraph text="It is important to understand that in this context, envy only depends on each individual agent's "/>
                        <PageParagraph bold text="own preferences, "/>
                        <PageParagraph text="meaning that for agents "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" and "/>
                        <Latex>$j$</Latex>
                        <PageParagraph text=", agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" will only be envious of agent "/>
                        <Latex>$j$</Latex>
                        <PageParagraph text=" if agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" would personally benefit more from having agent "/>
                        <Latex>$j$</Latex>
                        <PageParagraph text="'s bundle according to "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text="'s own preferences and utility values, and it does not matter how much "/>
                        <Latex>$j$</Latex>
                        <PageParagraph text=" values their own bundle."/>
                    </Box>
                    <PageParagraph text="Example:"/>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='X'
                        utilities={[[10, 30], [20, 5]]} 
                        allocations={[
                            new Set([0]),
                            new Set([1])
                        ]}
                    />
                    <Box>
                        <PageParagraph 
                            text="Here, we can see that the two agents are envious of each other. Agent 1 is envious of agent 2 since item 2 is worth 30
                                utility points, and so "
                        />
                        <Latex>$u_1(X_1) \lt u_1(X_2),$</Latex>
                        <PageParagraph text=" and similarly, agent 2 is envious of agent 1 since "/>
                        <Latex>$u_2(X_2) \lt u_2(X_1).$</Latex>
                    </Box>
                    <PageParagraph text='Since there is at least 1 agent that is envious of some other agent, we say this allocation is not "envy-free".'/>
                    <PageTextList 
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Envy-freeness implies proportionality: "/>
                                <PageParagraph text="If an allocation is complete and additive (which we are assuming), then envy-freeness implies proportionality."/>
                            </Box>,
                            <PageParagraph bold text="Envy-free (and proportional) allocations are not guaranteed to exist. "/>,
                            <Box>
                                <PageParagraph bold text="Theorem - Demko and Hill [1988]: "/>
                                <PageParagraph text="For additive utilities, checking whether there exists an envy-free or proportional allocation is "/>
                                <ExternalLink href="https://en.wikipedia.org/wiki/NP-completeness">NP-complete.</ExternalLink>
                            </Box>,
                            <PageParagraph bold text="Pareto improvement over an envy-free allocation is may not be envy-free."/>
                            // TODO: Proof
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Proportionality" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" satisfies proportionality if for all "/>
                        <Latex>$i\in N,$</Latex>
                        <BlockMath math={`u_i(X_i) \\geq \\frac{u_i(O)}{n}`}/>
                        <PageParagraph text="where "/>
                        <Latex>$O$</Latex>
                        <PageParagraph text=" is the set of all items in question. One way to understand this is to think of "/>
                        <InlineMath math={`\\frac{u_i(O)}{n}`}/>
                        <PageParagraph text=" as what agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" considers to be the amount each agent should get if all items are theoretically evenly distributed. Since this amount is what agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=' believes to be the "fair" amount, they consider the allocation to be proportional if they are getting at least as much utility as that amount. If this is the case for all agents, the allocation is considered proportional.'/>
                    </Box>
                    <PageTextList 
                        listName="Important notes:"
                        list={[
                            <PageParagraph bold text="Proportional (and envy-free) allocations are not guaranteed to exist. "/>,
                            <Box>
                                <PageParagraph bold text="Theorem - Demko and Hill [1988]: "/>
                                <PageParagraph text="For additive utilities, checking whether there exists an envy-free or proportional allocation is "/>
                                <ExternalLink href="https://en.wikipedia.org/wiki/NP-completeness">NP-complete.</ExternalLink>
                            </Box>,
                            <PageParagraph bold text="Pareto improvement over a proportional allocation is proportional."/>
                            // TODO: Proof
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Maxmin Fair Share (MmS) Fairness" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="Given an instance "/>
                        <Latex>$I = (N, O, u) \Rightarrow$</Latex>
                        <PageParagraph text=" (agents, items, utility functions). Let "/>
                        <Latex>$\Pi_n$</Latex>
                        <PageParagraph text=" denote the space of all partitions of "/>
                        <Latex>$O$</Latex>
                        <PageParagraph text=" into "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" sets (space of all possible allocations). The maximin share guarantee of an agent "/>
                        <Latex>$i\in N$</Latex>
                        <PageParagraph text=" is "/>
                        <Latex>{`$$\\text{MmS}_i(I) = \\max\\limits_{(P_1,...,P_n)\\in \\Pi_n} \\min\\limits_{j\\in {1,...,n}} u_i(P_j).$$`}</Latex>
                        <PageParagraph text="An allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" is a maximin share (MmS) fair allocation if "/>
                        <Latex>{`$u_i(X_i) \\geq \\text{MmS}_i(I)$`}</Latex>
                        <PageParagraph text=" for every agent "/>
                        <Latex>$i\in N.$</Latex>
                    </Box>
                    <Box>
                        <PageParagraph text="The formula can be broken down as follows: Every partition of "/>
                        <Latex>$O$</Latex>
                        <PageParagraph text=" from "/>
                        <Latex>$\Pi_n$</Latex>
                        <PageParagraph text=" can be mathmatically represented as the vector "/>
                        <Latex>$(P_1,...,P_n),$</Latex>
                        <PageParagraph text=" which is essentially "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" bundle of items. With this partition "/>
                        <Latex>$P,$</Latex>
                        <Latex>{`$\\min\\limits_{j\\in {1,...,n}} u_i(P_j)$`}</Latex>
                        <PageParagraph text=" finds the minimum amount of utility that agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" can gain out of all of the bundles of items. Then, repeating this process for all possible partitions of "/>
                        <Latex>$P,$</Latex>
                        <PageParagraph text=" "/>
                        <Latex>{`$\\text{MmS}_i(I)$`}</Latex>
                        <PageParagraph text=" finds the maximum of these minimum values."/>
                    </Box>
                    <Box>
                        <PageParagraph text="But what does this value mean? Here is a more animated way to understand the concept. Suppose you are given the items "/>
                        <Latex>$O$</Latex>
                        <PageParagraph text=" and you are responsible for placing them in  "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" bundles for the "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" agents. However, you are not responsible for allocating which bundle goes to who, and the agents get to distribute the bundles among themselves, one bundle per agent. Now suppose that all the agents dislike agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" and therefore gives them the worst possible bundle (according to agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text="). For fairness purposes you want to help agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=", and although you cannot do this by forcefully choosing and giving them a better bundle, you are still able to alter the contents of the  "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" bundles so that the worst possible bundle for agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" is not as bad. Under this context, we can understand "/>
                        <Latex>{`$\\text{MmS}_i(I)$`}</Latex>
                        <PageParagraph text=" as: In what way can you make the bundles so that even though agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" is guaranteed to get the worst bundle, it would be better than all other ways."/>
                    </Box>
                    <PageTextList
                        listName="Important notes:"
                        list={[
                            <Box>
                                <PageParagraph bold text="Computing MmS value for an agent i: "/>
                                <PageParagraph text="Pretend all other agents have the same utility function as agent "/>
                                <Latex>$i$</Latex>
                                <PageParagraph text=" and compute the maximum egalitarian welfare."/>
                            </Box>,
                            <Box>
                                <PageParagraph bold text="Proportionality (and also envy-freeness) implies MmS fairness: "/>
                                <PageParagraph text="Since envy-freeness implies proportionality, it also implies MmS fairness. "/>
                            </Box>,
                            <PageParagraph bold text="Pareto improvement over a MmS fair allocation is MmS fair."/>
                            // TODO: Proof
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="EF1-Fairness" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="Given an instance "/>
                        <Latex>$I = (N, O, u)$</Latex>
                        <PageParagraph text=", an allocation "/>
                        <Latex>$X$</Latex>
                        <PageParagraph text=" satisfies EF1 (envy-freeness up to 1 item) if for each "/>
                        <Latex>$i,j\in N$</Latex>
                        <PageParagraph text=", either "/>
                        <Latex>$X_i \succeq_i X_j$</Latex>
                        <PageParagraph text=" or there exists some item "/>
                        <Latex>$o\in X_j$</Latex>
                        <PageParagraph text=" such that"/>
                        <Latex>{`$$X_i\\succeq_i X_j\\setminus \\{o\\}.$$`}</Latex>
                    </Box>
                    <PageParagraph text="that is, no agents are envious of any other agents' bundles, or if they are, this envy can be nullified by ignoring 1 item in the other agents' bundle. "/>
                    <PageParagraph text="Example:"/>
                    <RASimulator 
                        modifiable={false} showControlBoard={false} showPropertyValues={false}
                        allocationName='X'
                        utilities={[[10, 20, 15], [10, 5, 20]]} 
                        allocations={[
                            new Set([0,1]),
                            new Set([2])
                        ]}
                    />
                    <PageParagraph text=""/>
                    <PageTextList
                        listName="Tools:"
                        list={[
                            <ToolLink name="ef1 allocation algorithm" linkText="EF1 allocation generator"/>
                        ]}
                    />
                    <PageTextList
                        listName="Important notes:"
                        list={[
                            <PageParagraph text="Envy-freeness implies EF1 fairness."/>,
                            <PageParagraph text="An EF1 allocation always exists and can be computed in polynomial time."/>
                        ]}
                    />
                </CollapseSectionBox>
                <CollapseSectionBox title="Strategyproofness" titleFs={18} startClosed>
                    <Box>
                        <PageParagraph text="An allocation rule, "/>
                        <Latex>$f,$</Latex>
                        <PageParagraph text=" is strategyproof if agents are unable to manipulate the resulting allocations in favour of their own preferences. "/>
                    </Box>
                    <Box>
                        <PageParagraph text="More formally, consider a setting with "/>
                        <Latex>$n$</Latex>
                        <PageParagraph text=" agents, where "/>
                        <Latex>$\succeq_1, ..., \succeq_n$</Latex>
                        <PageParagraph text=" represent the agents' preferences/utility functions over the "/>
                        <Latex>$m$</Latex>
                        <PageParagraph text=" items. Note that these represent the agents' REAL preferences, meaning that the agents can misreport their preferences if they wish to. In this setting, the allocation outcome is given by "/>
                        <Latex>$f(\succeq_1, ..., \succeq_i, ..., \succeq_n)$</Latex>
                        <PageParagraph text=". Now suppose some agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" misreports their preferences as "/>
                        <Latex>{`$\\succeq_i^{'}$`}</Latex>
                        <PageParagraph text=", which is some other utility function over the items, instead of their real preferences "/>
                        <Latex>$\succeq_i$</Latex>
                        <PageParagraph text=", and consequentially changes the allocation outcome such that agent "/>
                        <Latex>$i$</Latex>
                        <PageParagraph text=" is strictly better off, that is, "/>
                        <Latex>{`$f(\\succeq_1, ..., \\succeq_i^{'}, ..., \\succeq_n) \\succ_i f(\\succeq_1, ..., \\succeq_i, ..., \\succeq_n)$`}</Latex>
                        <PageParagraph text=". As a result, the allocation rule is therefore vulnerable to exploitation and manipulation, and we consider "/>
                        <Latex>$f$</Latex>
                        <PageParagraph text=" to be not strategyproof."/>
                    </Box>
                    <PageParagraph text="Example:"/>
                    <Box>
                        <PageParagraph text="Consider an allocation rule that maximises utilitarian social welfare. To recap, this means that each item is allocated to the agent that gains the most utility from that item. Then, it is easy to see that an agent is more likely to receive any item simply by reporting that it is worth more to them than it actually does. Agents can set all utilities to be infinitely high, and theoretically be allocated all items, which is clearly unfair."/>
                    </Box>
                </CollapseSectionBox>
            </SectionBox>
        </SectionBox>
    )
}