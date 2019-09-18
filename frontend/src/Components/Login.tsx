import React from "react";
import APIService from "../APIService"
import { TextField, Button, Typography, Grid } from '@material-ui/core';

export default class Login extends React.Component{
    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;

        APIService.User.login(new FormData(form))
        .then(result => {
            console.log(result);
            alert("Done")
        })
        .catch(e => {
            alert(`Error: ${e}`)
        })
    }

    render(){
        return (

            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={4}>
                        <Typography variant="h4" component="h4">
                            Login
                        </Typography>

                        <br />

                        <form onSubmit = {this.handleFormSubmit} >

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
}