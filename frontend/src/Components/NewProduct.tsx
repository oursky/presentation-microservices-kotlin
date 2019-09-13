import React from "react";
// import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default class NewProduct extends React.Component {
    state = ({
        success: false,
        url: ""
    })

    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        var form = document.querySelector("form");
        if( !form ) return false;
        var formData = new FormData(form);
        var formDataObj = Object.fromEntries(formData);
        
        fetch("http://127.0.0.1:8080/product/", {
            method: "POST",
            body: JSON.stringify(formDataObj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async v => {
            const { productId } = await v.json();
            const image = formData.get("files") as File;
            console.log(image.type, image.size); //image/jpeg 11734
            formData.delete("name");
            formData.delete("description");
            formData.delete("price");
            if(image.size) {
                console.log("Product Image Found, uploading...")
                try{
                    const result = await fetch(`http://127.0.0.1:8080/product/${productId}/image`, {
                        method: "POST",
                        body: formData
                    });
                    console.log("Image Upload Result: ", await result.json())
                }catch(e){
                    console.log("Error in Image Upload: ", e);
                }
            }
            console.log("Done, Product ID: ", productId);
        }).catch(e => {
            console.log("Error: ", e)
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
                    {/* onSubmit = {this.handleFormSubmit} */}
                    {/* action = "http://localhost:8080/product/" method = "post" */}
                    <form id = "addProductForm" onSubmit = {this.handleFormSubmit}>
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
                                // style = {{display: "none"}}
                            />
                            {/* <label htmlFor="raised-button-file"> 
                                <Button fullWidth component = "span" variant = "outlined" color = "secondary"> 
                                    Upload Product Image
                                </Button> 
                            </label>  */}
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