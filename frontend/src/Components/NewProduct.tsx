import React from "react";
import {useState} from "react";
import APIService from "../APIService"
import { 
    TextField, 
    InputAdornment, 
    Button, 
    Typography, 
    CssBaseline,
    Container,
    Paper
} from '@material-ui/core';
import PopupBox from "./PopupBox";
import "../Styles/NewProduct.css"

export default function NewProduct(){

    const [submitResult, setSubmitResult] = useState("")

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;

        APIService.Products.add(new FormData(form))
        .then( productId => {
            setSubmitResult(`New Prodcut Added !\nProduct ID: ${productId}`)
        })
        .catch(err => {
            setSubmitResult(`Error: ${err}`)
        })
    }

    return (
        <Container maxWidth = "xs" component = "main">

            <CssBaseline />

            {
                submitResult === "" ? "" : <PopupBox title = "Submit Result" message = {submitResult}/>
            }

                <Paper className = "MyPaper">

                    <Typography variant="h4">
                        Add New Product
                    </Typography>

                    <br />

                    <form id = "addProductForm" onSubmit = {handleFormSubmit} >
                        
                        <TextField
                            required
                            fullWidth
                            id = "productName"
                            name = "name"
                            variant = "outlined"
                            label = "Product Name" 
                        />

                        <br />
                        <br />

                        <TextField
                            fullWidth
                            id = "productDescription"
                            name = "description"
                            variant = "outlined"
                            label = "Product Description" 
                        />

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
                            }}
                        />

                        <br />
                        <br />
                        
                        <input
                            type = "file"
                            name = "files"
                            id = "raised-button-file"
                            accept = "image/*"
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