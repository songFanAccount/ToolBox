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
						`ToolBox is a collection of academic tools made with the purpose of executing algorithms, showing and visualising each step of the way, and explaining the rationale behind each step. As this website's solo developer doing my postgraduate in computer science, the tools I develop will primarily focus on university level computer science concepts and algorithms.`
					}
				/>
				<Box>
					<PageParagraph text={
						`However, our goal is also to collaborate with the community to share what we know, so that ToolBox can become a reliable place for students or anyone in need of help. Hence, we may develop tools for algorithms outside of computer science, expectedly in fields in mathematics or other sciences. You can learn about how to `
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
						`What is the purpose of ToolBox?`
				}/>
				<SectionBox title="Personal motivation">
					<PageParagraph text={
						`As a postgraduate student in computer science, it is in my best interest to develop a strong portfolio of programming projects before leaving uni and joining the job hunt. Having debated and tried some different ideas, ToolBox stood out as the project that suited me the most and is aligned with my passion in teaching, visualising concepts, and being of help to others.`
					}/>
					<PageParagraph text={
						'Additionally, in order to be qualified in explaining concepts and developing tools that I am currently learning in my uni courses, I am therefore required to understand these concepts quite thoroughly myself. As such, I will have to procrastinate less and put more effort into my current studies, which is obviously beneficial. '
					}/>
					<PageParagraph text={
						"On a different note, I am an avid believer in the visualisation of concepts and problem solving and I don't believe there is enough of it in the available resources online, or even in many university courses I have attended. Therefore, this is another motivation that will be central to the development of any tool."
					}/>
				</SectionBox>
				<SectionBox title="Values">
					<PageParagraph text="As a student that has been through high school and an entire undergraduate degree, I understand the struggles when it comes to finding the right tools I need online. As such, I am dedicated to make tools up to my highest standard, which is based on the following values:"/>
					<PageTextList
						list={[
							<Box>
								<PageParagraph text="Clear and concise working out: " bold/>
								<PageParagraph text={
									`I believe that a correct understanding of the process is far more important than a correct answer!
									If you can only blindly follow an algorithm, what makes you different from some lines of code? Understanding the steps to
									solving any problem equips you with new interesting ways of approaching new problems. Eventually, facing new challenges will no
									longer feel like an impenetrable wall, but instead a game to figure out which tools will break that wall down, layer by layer.`
								}/>
							</Box>,
							<Box>
								<PageParagraph text="Visualisation of solutions: " bold/>
								<PageParagraph text={
									`Everyone learns differently, and as for myself, I believe that visualisation of the solving process is often the best way to absorb
									content. As such, I aim to do my best to animate these tools with dynamic visualisations, making the diagrams change according
									to user inputs.`
								}/>
							</Box>,
							<Box>
								<PageParagraph text="Provision of proofs wherever applicable: " bold/>
								<PageParagraph text={
									`Proofs have largely been taken for granted. When given a formula, I found it is rare for many students to think about
									why it works, let alone putting in the effort to research it online. I wish to encourage students to have the mindset of
									wanting to know why formulae work. As such, I aim to either provide proofs in the tools ourselves, or if there already exist
									such resources online, find and provide the best ones for you.`
								}/>
							</Box>
						]}
					/>
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