import { Box } from "@mui/material";
import { PageTitle } from "../DefaultLayout";

export default function TopicPageLayout({topic}) {
    const pageTitle = topic;
    return (
        <Box>
            <PageTitle title={pageTitle}/>
        </Box>
    )
}