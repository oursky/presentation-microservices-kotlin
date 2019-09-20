import { useState } from "react";
import React from "react";
import APIService from "../APIService";
import { 
    TextField, 
    Button, 
    Typography, 
    Container,
    Paper,
    CssBaseline
} from '@material-ui/core';
import PopupBox from "./PopupBox";
import "../Styles/Login.css"

export default function Login() {

    const [loginResult, setLoginResult] = useState("")


    function handleFormSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;

        APIService.User.login(new FormData(form))
        .then(result => {
            console.log(result);
            setLoginResult("Login Successfully")
        })
        .catch(e => {
            console.error("Erorrrr: ", e)
            setLoginResult("Error while logging in...")
        })
    }

    return (
        <Container maxWidth = "xs" component = "main">

            <CssBaseline />

            {
                loginResult !== "" && <PopupBox title = "Login Result" message = {loginResult} open = {!!loginResult} onCloseClick = {() => setLoginResult("")} />
            }

            <Paper className = "MyPaper">

                <Typography variant="h4">
                    Login
                </Typography>

                <br />

                <form onSubmit = {handleFormSubmit} >
                    <TextField
                        required
                        fullWidth
                        name = "user"
                        variant = "outlined"
                        label = "Username" 
                    />

                    <br />
                    <br />

                    <TextField
                        fullWidth
                        required
                        name = "pass"
                        type = "password"
                        variant = "outlined"
                        label = "Password" 
                    />

                    <br />
                    <br />

                    <Button fullWidth variant = "outlined" color = "primary" type = "submit">
                        Submit
                    </Button>
                </form>

            </Paper>
        </Container>
    )
}