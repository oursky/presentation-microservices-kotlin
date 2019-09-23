import React from "react";
import {useState} from "react";
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
import "../Styles/Register.css"
import Cookies from "../Cookies"

export default function Register(){

    const [submitResult, setSubmitResult] = useState("")
    const [success, setSuccess] = useState<boolean>(false)

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;
        const formData = new FormData(form);

        if(formData.get("confpass") !== formData.get("pass")){
            setSubmitResult("Passwords are not the same !")
            return;
        }

        APIService.User.register(formData)
        .then(result => {
            if(result.error){
                setSubmitResult(result.error)
                setSuccess(false)
            }else{
                setSubmitResult("Successfully Registered.")
                const date = new Date();
                date.setTime(date.getTime() + (1000 * 60 * 10));
                Cookies.setCookie("accessToken", result.accessToken, date);
                localStorage.setItem("userId", result.userId)
                setSuccess(true)
            }
        })
        .catch(e => {
            setSubmitResult(`Error: ${e}`)
            setSuccess(false)
        })
    }

    return (
        <Container maxWidth = "xs" component = "main">
            
            <CssBaseline />

            {
                submitResult && <PopupBox redirectTo = {success ? "/" : undefined} title = "Registeration Result" message = {submitResult} open = {!!submitResult} onCloseClick = {() => setSubmitResult("")}/>
            }

            <Paper className = "MyPaper">

                <Typography variant = "h4">
                    Register
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

                    <TextField
                        fullWidth
                        required
                        name = "confpass"
                        type = "password"
                        variant = "outlined"
                        label = "Confirm Password" 
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