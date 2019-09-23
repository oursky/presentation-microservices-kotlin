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
import Cookies from "../Cookies"

export default function Login() {

    const [loginResult, setLoginResult] = useState<string>("")
    const [redirect, setRedirect] = useState<boolean>(false)

    function handleFormSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;

        APIService.User.login(new FormData(form))
        .then(result => {
            if(result.error){
                setLoginResult(result.error)
                setRedirect(false)
            }else{
                setLoginResult("Login Successfully");
                const date = new Date();
                date.setTime(date.getTime() + (1000 * 60 * 10));
                Cookies.setCookie("accessToken", result.accessToken, date);
                localStorage.setItem("userId", result.userId)
                setRedirect(true)
            }
        })
        .catch(e => {
            console.error("Erorrrr: ", e)
            setLoginResult(`An Error occured: ${e}`)
            setRedirect(false)
        })
    }

    return redirect ? (
            <div>
                {
                    loginResult !== "" && <PopupBox redirectTo = "/" title = "Login Result" message = {loginResult} open = {!!loginResult} onCloseClick = {() => setLoginResult("")} />
                }
            </div>
        ):(
        <Container maxWidth = "xs" component = "main">

            <CssBaseline />

            {
                loginResult !== "" && <PopupBox redirectTo = {undefined} title = "Login Result" message = {loginResult} open = {!!loginResult} onCloseClick = {() => setLoginResult("")} />
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