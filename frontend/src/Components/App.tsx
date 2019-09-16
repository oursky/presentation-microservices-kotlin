import React from "react";

import { 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography,
  Container
} from '@material-ui/core';

import "./App.css"

export default class App extends React.Component {
  state = ({
    error: "",
    isLoaded: false,
    items: [],
    cart: [] as number[]
  })

  componentDidMount() {
    fetch("http://localhost:8080/product/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.products
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    )
    var storageCart = localStorage.getItem("cart")
    if(storageCart !== null && storageCart !== ""){
      this.setState({
        cart: JSON.parse(storageCart)
      });
    }
  }

  addProductToCart(id: number) {
    var arr = this.state.cart.length === 0 ? [] : [...this.state.cart]

    arr.push(id)

    this.setState({
      cart: arr
    }, () => {
      localStorage.setItem("cart", JSON.stringify(this.state.cart))
      alert("Product Added to Shopping Cart !")
    })
  }
  
  async deleteProduct(id: number) {
    try{
      const result = await fetch(`http://localhost:8080/product/${id}`, {
        method: "DELETE"
      }).then(res => res.json())
      console.log(result);
      alert(result ? "Product Deleted." : "Failed to delete product.")
      window.location.reload();
    }catch(e){
      console.error("Error in deleting product: ", e)
    }
  }

  render() {
    const {
        error,
        isLoaded,
        items
    } = this.state;

    if (error !== "") {
      return <div> Something went wrong :( Try again later. </div>;
    } else 
    if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <Container>
            <br />
            {
              items.map((item: { id: number, name: string, description: string, price: number, image: string }) => (
                <Card className="polaroid">
                  <CardActionArea>
                    {
                      item.image !== null && item.image !== "" && 
                      <CardMedia
                        image={"http://localhost:9000/images/" + item.image}
                        style = {{height: 140}}
                      />
                    }
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick = {() => this.addProductToCart(item.id)}>
                      Add to Cart
                    </Button>
                    <Button size="small" color="secondary" onClick = {() => this.deleteProduct(item.id)}>
                      Delete Product
                    </Button>
                  </CardActions>
                </Card>
              ))
            }
        </Container>
      )
    }
  }
}