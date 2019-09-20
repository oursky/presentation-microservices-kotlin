import React from "react";


import { 
    Typography,
    Container,
    Paper,
    CssBaseline
} from '@material-ui/core';

import "../Styles/Error.css";

export default function Error(props: {
    errorMessage: string
}){
    return (
        <Container>
            <CssBaseline />
            <Paper className = "myPaper">

                <Typography variant = "h6">
                    Something went wrong :(
                </Typography>

                <Typography variant = "caption">
                    {
                        props.errorMessage ? props.errorMessage : "" 
                    }
                </Typography>

            </Paper>
        </Container>

    )
}