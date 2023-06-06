import { Box } from "@mui/material"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { ExternalLink, PageParagraph, SectionBox } from "../components/UI/DefaultLayout"
import { TBCheckbox, TBSelect, TBSubmitButton, TBTextField, toastStyle } from "../components/UI/Form"
import emailjs from '@emailjs/browser';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';

function Contact() {
    // TODO: Once we have our own website, get a recaptcha key and use it here https://www.youtube.com/watch?v=ht73aVlbNRI
    const [name, setName] = useState(null)
    const [email, setEmail] = useState('')
    const emailErrorMsg = "Invalid email!"
    const categories = ['-', 'Tool related', 'Collaborating', 'Website functionality', 'Ideas and suggestions', 'Others']
    const [category, setCategory] = useState('-')
    const [message, setMessage] = useState('')
    const messageErrorMsg = " Please enter at least 50 characters!"
    const categoryErrorMsg = "Please select a category!"
    const [noReply, setNoReply] = useState(false)
    function generateForm() {
        /* Validation */
        if(!isEmail(email) || category === '-' || message.length < 50) {
            return null
        }
        return {
            from_name: name && name !== '' ? name : 'Anonymous',
            from_email: email,
            category: category,
            message: message,
            noReply: noReply ? '- NOREPLY' : ''
        }
    }
    function sendEmail(e) {
        e.preventDefault() // Stops auto refresh, email actually doesn't send without this
        const form = generateForm()
        if(!form) {
            toast.error('Error(s) found in form!', toastStyle);
            return
        }
        toast.promise(emailjs.send('service_5bqfbot', 'template_rkcopqu', form, 'KeVm9KwyFgORXMAVD')
        .then(() => {
            setTimeout(() => {window.scrollTo(0,0); window.location.reload(false)}, 1000)
        }), 
        {
            pending: 'Sending the email...',
            success: "Email sent successfully!",
            error: "Unexpected error!",
        }, toastStyle)
        
    }
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
                <Box>
                    <PageParagraph text={
                        `NOTE: We currently cannot support file or image uploads via this form. If you wish to do so, please send them directly to `
                    }/>
                    <ExternalLink href="mailto:toolbox.queries@gmail.com">toolbox.queries@gmail.com</ExternalLink>
                    <PageParagraph text="."/>
                </Box>
            </SectionBox>
            <SectionBox title="Contact form" usePageTitle>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => sendEmail(e)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 4,
                        ml: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            columnGap: 5,
                            rowGap: 4
                        }}
                    >
                        <TBTextField
                            value={name}
                            label="Your name:"
                            placeholder="Anonymous"
                            onChange={setName}
                        />
                        <TBTextField
                            value={email}
                            label="Your email:"
                            required
                            onChange={setEmail}
                            error={!isEmail(email)}
                            errorMsg={emailErrorMsg}
                        />
                        <TBSelect
                            label="Category:"
                            list={categories}
                            onChange={setCategory}
                            value={category}
                            required
                            error={category === '-'}
                            errorMsg={categoryErrorMsg}
                        />
                    </Box>
                    <TBTextField
                        value={message}
                        label="Your message (max 1000 characters):"
                        onChange={setMessage}
                        variant="outlined"
                        required
                        error={message.length < 50}
                        errorMsg={messageErrorMsg}
                        width={1}
                        rows={8}
                        maxLength={1000}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', rowGap: 4}}>
                        <TBCheckbox label="I'm not expecting a reply" checked={noReply} onChange={setNoReply}/>
                        <TBSubmitButton/>
                    </Box>
                </Box>
            </SectionBox>
        </Box>  
    )
}
export default Contact