import React from "react";
import {useState} from "react";
import APIService from "../APIService";
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import PopupBox from "./PopupBox";

export default function Register(){

    const [submitResult, setSubmitResult] = useState("")

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
            console.log(result);
            setSubmitResult("Successfully Registered.")
        })
        .catch(e => {
            setSubmitResult(`Error: ${e}`)
        })
    }

    return (
        <div>

            {
                submitResult === "" ? "" : <PopupBox title = "Registeration Result" message = {submitResult} />
            }

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={4}>
                    <Typography variant="h4" component="h4">
                        Register
                    </Typography>

                    <br />

                    <form onSubmit = {handleFormSubmit} >

                        <fieldset>

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

                        </fieldset>

                        <br />
                        <br />

                        <Button fullWidth variant = "outlined" color = "primary" type = "submit">
                            Submit
                        </Button>
                        
                    </form>
                </Grid>   
                
            </Grid> 
        </div>
    )
}