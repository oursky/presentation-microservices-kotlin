import React from "react";

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
    IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

export default class ShoppingCart extends React.Component {

    state = ({
        cart: [] as number[],
        isLoaded: false,
        error: "",
        items: [] 
    })

    deleteProductFromCart(id: number) {
        var index = this.state.cart.indexOf(id)
        if( index === -1 ) return
        var copyOfArr = [...this.state.cart]
        copyOfArr.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(copyOfArr))
        this.setState({
            cart: copyOfArr
        })
    }

    deleteAllProductFromCart(){
        localStorage.setItem("cart", "")
        this.setState({
            cart: [] as number[]
        }, () => window.location.reload())
    }

    componentDidMount(){
        fetch("http://localhost:8080/product/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    items: result.products
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );

        var storageCart = localStorage.getItem("cart")
        if(storageCart !== null && storageCart !== ""){
            this.setState({
                cart: JSON.parse(storageCart)
            }, () => {
                this.setState({
                    isLoaded: true
                })
            });
        }
        
    }

    render(){
        let product: {
            id: number, name: string, description: string, price: number, image: string
        }
        if(this.state.cart.length === 0){
            return (
                <Container maxWidth="sm">
                    <Typography variant="h5" component="h5">
                        Your Shopping Cart is Empty !
                    </Typography>
                </Container>
            )
        }

        if(!this.state.isLoaded){
            return "Loading..."
        }

        let subTotal = 0
        return (
            
            <Container maxWidth="sm">
                <Typography variant="h3" component="h3">
                    Shopping Cart
                </Typography>
                <List>
                    {
                        
                        this.state.cart.map(val => {
                    
                            var tmp = this.state.items.find((item: { id: number, name: string, description: string, price: number, image: string }) => item.id === val);
                           
                            if(typeof tmp !== 'undefined'){
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
                                                <IconButton edge="end" aria-label="delete" onClick = {() => this.deleteProductFromCart(product.id)}>
                                                <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>       
                                )
                            }else{
                                return ""
                            }
                        })
                    }
                </List>
                <Typography variant="overline" >
                    Sub Total: $HKD {subTotal}
                </Typography>
                <br />
                <Button variant="contained" color="secondary" onClick ={this.deleteAllProductFromCart.bind(this)} style = {{textAlign: "center"}}>
                    Clear Shopping Cart
                    <DeleteIcon />
                </Button>
                <br />
                <br />
                <Button variant="contained" color="primary" style={{justifyContent: 'center'}} >
                    Checkout
                </Button>
            </Container>
        )
    }
}