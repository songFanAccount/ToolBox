import { Box } from "@mui/material"
import { Helmet } from "react-helmet"
import { PageParagraph, SectionBox } from "../components/UI/DefaultLayout"
import { TBSelect, TBTextField } from "../components/UI/Form"

function Contact() {
    return (
        <Box>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <SectionBox title="What's this for?" usePageTitle>
                <PageParagraph text={
                    `If you have any questions, complaints or comments for any part of our website, here's where you can send them! In the form below, choose the appropriate
                    category for your message and fill it out accordingly. After you submit the form, we will get back to you within 1-3 days.`
                }/>
            </SectionBox>
            <SectionBox title="Contact form" usePageTitle>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <TBTextField
                        label="Name:"
                        placeholder="Anonymous"
                    />
                    <TBSelect
                        label="Category:"
                        children={[
                            ['None', 'None'],
                            ['A', 'B'],
                            ['C', 'D'],
                            ['E', 'F'],
                            ['G', 'H'],
                        ]}
                    />
                </Box>
            </SectionBox>
        </Box>  
    )
}
export default Contact