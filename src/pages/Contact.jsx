import { Box } from "@mui/material"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { PageParagraph, SectionBox } from "../components/UI/DefaultLayout"
import { TBSelect, TBSubmitButton, TBTextField } from "../components/UI/Form"
import emailjs from '@emailjs/browser';
import isEmail from 'validator/lib/isEmail';

function Contact() {
    // TODO: Once we have our own website, get a recaptcha key and use it here https://www.youtube.com/watch?v=ht73aVlbNRI
    const [name, setName] = useState(null)
    const [email, setEmail] = useState('')
    const emailErrorMsg = "Invalid email!"
    const categories = ['-', 'Tool related', 'Collaborating', 'Website functionality', 'Ideas and suggestions', 'Others']
    const [category, setCategory] = useState('-')
    const [message, setMessage] = useState('')
    const categoryErrorMsg = "Please select a category!"
    function changeCategory(newCategory) {
        setCategory(newCategory)
        switch(newCategory) {
            case '-':
                break
            case 'Tool related':
                break
            case 'Collaborating':
                break
            case 'Website functionality':
                break
            case 'Ideas and suggestions':
                break
            case 'Others':
                break
            default:
                throw new Error("Contact: Invalid category!")
        }
    }
    function generateForm() {
        /* Validation */
        if(!isEmail(email) || category === '-') {
            return null
        }
        return {
            from_name: name ? name : 'Anonymous',
            from_email: email,
            category: category,
            message: message
        }
    }
    function sendEmail(e) {
        e.preventDefault() // Stops auto refresh, email actually doesn't send without this
        console.log('In sendEmail')
        const form = generateForm()
        console.log('Form generated')
        if(!form) {
            alert('sendEmail: Something wrong with the form!') // TODO
            return
        }
        emailjs.send('service_5bqfbot', 'template_rkcopqu', form, 'KeVm9KwyFgORXMAVD')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
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
                        rowGap: 4
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
                            label="Your name:"
                            placeholder="Anonymous"
                            onChange={setName}
                        />
                        <TBTextField
                            label="Your email:"
                            required
                            onChange={setEmail}
                            error={!isEmail(email)}
                            errorMsg={emailErrorMsg}
                        />
                        <TBSelect
                            label="Category:"
                            list={categories}
                            onChange={changeCategory}
                            value={category}
                            required
                            error={category === '-'}
                            errorMsg={categoryErrorMsg}
                        />
                    </Box>
                    <TBTextField
                        label="Your message (max 1000 characters):"
                        onChange={setMessage}
                        variant="outlined"
                        width={1}
                        rows={8}
                        maxLength={1000}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', rowGap: 4}}>
                        <TBSubmitButton/>
                    </Box>
                </Box>
                
            </SectionBox>
        </Box>  
    )
}
export default Contact