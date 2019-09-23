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
import Cookies from "../Cookies"

export default function NewProduct(){

    const [submitResult, setSubmitResult] = useState("")
    const [redirectTo, setRedirectTo] = useState<string | undefined>()


    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = document.querySelector("form");
        if( !form ) return false;
        const formData = new FormData(form);

        const formPrice = formData.get("price");

        if(typeof formPrice !== "string"){
            setSubmitResult(`Incorrect product price!`)
            setRedirectTo(undefined)
            return
        }

        const price = parseFloat(formPrice)
        if(isNaN(price)){
            setSubmitResult(`Product Price is not a number !`)
            setRedirectTo(undefined)
            return
        }

        const token = Cookies.getCookie("accessToken");
        if(token === null){
            setSubmitResult("Please login first.")
            setRedirectTo("/login")
            return;
        }

        APIService.Products.add(new FormData(form), token)
        .then( result => {

            if (result.error){
                setSubmitResult(result.error)
                setRedirectTo(undefined)
                return
            }
            
            setSubmitResult(`New Prodcut Added !\nProduct ID: ${result.productId}`)
            setRedirectTo("/")
        })
        .catch(err => {
            setSubmitResult(`Error: ${err}`)
            setRedirectTo(undefined)
        })
    }

    return (
        <Container maxWidth = "xs" component = "main">

            <CssBaseline />

            {
                submitResult && <PopupBox redirectTo = {redirectTo} title = "Submit Result" message = {submitResult} open = {!!submitResult} onCloseClick = {() => setSubmitResult("")}/>
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