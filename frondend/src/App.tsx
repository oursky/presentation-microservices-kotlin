import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
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
        fetch("http://localhost:8080/product/all")
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


           return items.map((item: { name: string, description: string, price: number }) => (
            <Card className="polaroid">
              <CardActionArea>
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
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))
        }
    }
}

export default App;