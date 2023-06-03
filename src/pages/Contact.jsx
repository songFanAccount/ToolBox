import { Box } from "@mui/material"
import { Helmet } from "react-helmet"
import { PageParagraph, SectionBox } from "../components/UI/DefaultLayout"

function Contact() {
    return (
        <Box>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <SectionBox title="Contact form" usePageTitle>
                <PageParagraph text={
                    `If you have something to ask or tell us, please fill out and submit the form below!`
                }/>
            </SectionBox>
        </Box>  
    )
}
export default Contact