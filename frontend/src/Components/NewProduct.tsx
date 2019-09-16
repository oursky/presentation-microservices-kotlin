import React from "react";
import { TextField, InputAdornment, Button, Typography, Grid } from '@material-ui/core';

export default class NewProduct extends React.Component {

    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        var form = document.querySelector("form");
        if( !form ) return false;
        var formData = new FormData(form);

        fetch("http://127.0.0.1:8080/product/", {
            method: "POST",
            body: formData
        }).then(async v => {
            const {productId} = await v.json();
            alert(`New Prodcut Added !\nProduct ID: ${productId}`);
        }).catch(e => {
            alert(`Error: ${e}`)
        })
    }

    render(){
        return (

            <div className = "productSubmitDiv">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >

                <Grid item xs={4}>
                    <Typography variant="h4" component="h4">
                        Add New Product
                    </Typography>
                    <form id = "addProductForm" onSubmit = {this.handleFormSubmit} >
                        <fieldset>
                            <TextField
                                required
                                fullWidth
                                id = "productName"
                                name = "name"
                                variant = "outlined"
                                label = "Product Name" />
                            <br />
                            <br />
                            <TextField
                                
                                fullWidth
                                id = "productDescription"
                                name = "description"
                                variant = "outlined"
                                label = "Product Description" />
                            <br />
                            <br />
                            <TextField
                                required
                                fullWidth
                                id = "productPrice"
                                name = "price"
                                label = "Product Price" 
                                variant = "outlined"
                                type = "number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}/>
                            <br />
                            <br />
                            <input
                                type = "file"
                                name = "files"
                                id = "raised-button-file"
                                accept = "image/*"
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