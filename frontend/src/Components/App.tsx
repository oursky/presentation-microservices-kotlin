import React from "react";

import { 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography,
  Container,
  Paper,
  CssBaseline,
  CircularProgress
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import "./App.css"
import APIService from '../APIService'

export default class App extends React.Component {
	state = ({
		error: "",
		isLoaded: false,
		items: [],
		cart: [] as number[],
		updatingItemsAndCart: false
	})

	updateStateItemsAndCart(){
		this.setState({
			updatingItemsAndCart: true
		})
		APIService.Products.list()
		.then( result => {
			this.setState({
				isLoaded: true,
				items: result
			});
		})
		.catch( err => {
			this.setState({
				isLoaded: true,
				error: err
			});
		})

		const storageCart = localStorage.getItem("cart")
		if(storageCart !== null && storageCart !== ""){
			this.setState({
				cart: JSON.parse(storageCart)
			}, () => {
				this.setState({
					updatingItemsAndCart: false
				})
			});
		}else{
			this.setState({
				updatingItemsAndCart: false
			})
		}
	}

	componentDidMount() {
		this.updateStateItemsAndCart()
	}

	addProductToCart(id: number) {
		let arr = this.state.cart.length === 0 ? [] : [...this.state.cart]

		arr.push(id)

		this.setState({
			cart: arr
		}, () => {
			localStorage.setItem("cart", JSON.stringify(this.state.cart))
			alert("Product Added to Shopping Cart !")
		})
	}

	async deleteProduct(id: number) {

		if(!window.confirm("Are you sure you want to DELETE this product ?")){
			return
		}

		try{
			alert(await APIService.Products.delete(id) ? "Product Deleted." : "Failed to delete product.")
		}catch(e){
			console.error("Error in deleting product: ", e)
			alert(e)
		}
	}

	render() {
		const {
			error,
			isLoaded,
			items
		} = this.state;

		if (error) {
			return (
				<Container>
					<CssBaseline />
					<Paper className = "myPaper">
						<Typography>
							Something went wrong :(
							{
								error
							}
						</Typography>
					</Paper>
				</Container>

			);
		}

		if (!isLoaded) {
			return (
				<Container>
					<CssBaseline />
					<Paper className = "myPaper">
						<CircularProgress/>
					</Paper>
				</Container>
			);
		}
			
		return (
			<Container>
				<CssBaseline />
				<Paper>
					<br />
					{
						items.map((item: { id: number, name: string, description: string, price: number, image: string }) => (
						<Card className="myCard">
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
								<AddShoppingCartIcon />
							</Button>
							<Button size="small" color="secondary" onClick = {() => this.deleteProduct(item.id)}>
								<DeleteForeverIcon /> Delete Product
							</Button>
							</CardActions>
						</Card>
						))
					}
				</Paper>
			</Container>
		)
	}
}