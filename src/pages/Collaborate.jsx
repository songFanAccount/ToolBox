import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { TempContent } from "../components/UI/DefaultLayout";

export default function Collaborate() {
    return (
        <Box>
            <Helmet>
                <title>Collaborate</title>
            </Helmet>
            <TempContent />
        </Box>
    )
}