import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import "./App.css"

class App extends React.Component {
    state = ({
      error: "",
      isLoaded: false,
      items: []
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
    }
    
    async deleteProduct(id: number) {
      try{
        const result = await fetch(`http://localhost:8080/product/${id}`, {
          method: "DELETE"
        }).then(res => res.json())
        console.log(result);
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


           return items.map((item: { id: number, name: string, description: string, price: number, image: string }) => (
            <Card className="polaroid">
              <CardActionArea>
                {
                  item.image != null && item.image != "" && 
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
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="secondary" onClick = {() => this.deleteProduct(item.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        }
    }
}

export default App;