import React from "react";
// import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default class NewProduct extends React.Component {
    state = ({
        success: false,
        url: ""
    })

    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        // event.preventDefault();
        // const productName = document.getElementById("productName");
        // if(!productName) { return false }
        // const productDescription = document.getElementById("productDescription");
        // if(!productDescription) { return false }
        // const productPrice = document.getElementById("productPrice");
        // if(!productPrice) { return false }



        // fetch("http://localhost:8080/product/", {
        //     method: "POST",
        //     body: data
        // })
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
                    <form id = "addProductForm">
                        <TextField
                            required
                            fullWidth
                            id = "productName"
                            name = "name"
                            label = "Product Name" />
                        <br />
                        <TextField
                            fullWidth
                            id = "productDescription"
                            name = "description"
                            label = "Product Description" />
                        <br />
                        <TextField
                            required
                            fullWidth
                            id = "productPrice"
                            name = "price"
                            label = "Product Price" 
                            type = "number"/>
                        <br />
                        <br />
                        <Typography variant = "caption">
                            Product Image: 
                        </Typography>
                        <Input
                            fullWidth
                            type = "file"
                            name = "image"
                            id = "productImage"
                        />
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