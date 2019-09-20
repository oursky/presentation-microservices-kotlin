import React from "react";

import { 
    Container,
    Paper,
    CssBaseline,
    CircularProgress
} from '@material-ui/core';

import "../Styles/Loading.css"

export default function Loading(){
    return (
        <Container>
            <CssBaseline />
            <Paper className = "myPaper">
                <CircularProgress/>
            </Paper>
        </Container>
    )
}