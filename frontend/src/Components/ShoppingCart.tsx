import React from "react";
import APIService from "../APIService"
import {useState, useEffect} from "react";
import { 
    List, 
    Divider, 
    ListItem, 
    Button,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
    Container,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    CssBaseline
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import "../Styles/ShoppingCart.css"
import Product from "../Interfaces/Product";
import Error from "./Error";
import Loading from "./Loading";

export default function ShoppingCart(){

    const [cart, setCart] = useState<number[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [items, setItems] = useState<Product[]>([])
    const [updated, setUpdated] = useState<number>(0)

    useEffect(() => {
        APIService.Products.list()
        .then(result => setItems(result))
        .catch(err => {
            setError(err)
            setIsLoaded(true)
        })

        const storageCart = localStorage.getItem("cart")
        if(storageCart !== null && storageCart !== ""){
            setCart(JSON.parse(storageCart))
            setIsLoaded(true)
        }
    }, [updated])

    function deleteProductFromCart(id: number) {
        if(cart.length === 0) return;
        const index = cart.indexOf(id)
        if( index === -1 ) return
        let copyOfArr = [...cart]
        copyOfArr.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(copyOfArr))
        setCart(copyOfArr)
        setUpdated(updated + 1)
    }

    function deleteAllProductFromCart(){
        localStorage.setItem("cart", "")
        setCart([])
    }

    let product: Product;
    let subTotal = 0;

    return !isLoaded ? (
        <Loading />
    ) : error ? (
        <Error errorMessage = {error} />
    ) : cart.length === 0 ? (
        <Container maxWidth="sm">
            <Paper className = "MyPaper">
                <Typography variant="h5" component="h5">
                    Your Shopping Cart is Empty !
                </Typography>
            </Paper>
        </Container>
    ) : (
            
        <Container maxWidth="sm" component = "main">

            <Paper className = "MyPaper">

            <CssBaseline />

            <Typography variant="h4">
                Shopping Cart
            </Typography>

            <br />
            <Paper style={{maxHeight: '400px', overflow: 'auto'}}>
                <List >
                    {
                        cart.map(val => {
                    
                            const tmp = items.find((item: Product) => item.id === val);
                        
                            if(typeof tmp === 'undefined'){
                                return ""
                            }

                            product = tmp;
                            subTotal += product.price;

                            return (
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            {
                                                product.image && 
                                                <Avatar alt={product.name} src={`http://localhost:9000/images/${product.image}`} />
                                            }
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary= {product.name}
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {product.description}
                                                </Typography>
                                                <br />
                                                $HKD {product.price}
                                                </React.Fragment>
                                            }
                                            />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick = {() => deleteProductFromCart(product.id)}>
                                            <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>       
                            )
                        })
                    }
                </List>
            </Paper>
            <Typography variant="overline" >
                Sub Total: $HKD {subTotal}
            </Typography>
            <br />
            <Button variant="contained" color="secondary" onClick ={deleteAllProductFromCart} style = {{textAlign: "center"}}>
                Clear Shopping Cart
                <DeleteIcon />
            </Button>
            <br />
            <br />
            <Button variant="contained" color="primary" style={{justifyContent: 'center'}} >
                Checkout
            </Button>
            </Paper>
        </Container>
    )
}