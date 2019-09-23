import React from "react";
import {useState, useEffect} from "react";

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
  Grid
} from '@material-ui/core';

import Error from "./Error";
import Loading from "./Loading";
import Product from "../Interfaces/Product";
import PopupBox from "./PopupBox";

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import "../Styles/App.css"
import APIService from '../APIService'
import PopupBoxProps from "../Interfaces/PopupBoxProps";
import Cookies from "../Cookies"

export default function App(){

	const [error, setError] = useState<string>("");
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [items, setItems] = useState<Product[]>([]);
	const [cart, setCart] = useState<number[]>([]);
	const [popupProps, setPopupProps] = useState<PopupBoxProps | undefined>();

	function updateStorageCart(){
		const storageCart = localStorage.getItem("cart")
		if(storageCart !== null && storageCart !== ""){
			setCart(JSON.parse(storageCart))
		}
	}

	function updateStateItems(){
		APIService.Products.list().then(
			result => {
				setIsLoaded(true)
				setItems(result)
			}
		).catch(
			e => {
				setIsLoaded(true)
				setError(e)
			}
		)
	}

	function closePopup() {
		setPopupProps(undefined)
	}

	useEffect(() => {
		updateStateItems()
		updateStorageCart()
	},[])

	function addProductToCart(id: number) {
		let arr = cart.length === 0 ? [] : [...cart]
		arr.push(id)
		setCart(arr)
		localStorage.setItem("cart", JSON.stringify(arr))
		const target = items.filter(v => v.id === id)
		setPopupProps({
			title: "Successful",
			message: `Added ${target[0].name} to shopping cart.`,
			open: true,
			onCloseClick: closePopup,
			redirectTo: undefined
		})
	}

	async function deleteProduct(id: number) {
		if(!window.confirm("Are you sure you want to DELETE this product ?")){
			return
		}
		try{
			const token = Cookies.getCookie("accessToken");
			if(token === null){
				setPopupProps({
					title: "Incorrect access token",
					message: "Please login first.",
					open: true,
					onCloseClick: closePopup,
					redirectTo: "/login"
				})
				return;
			}
			const result = await APIService.Products.delete(id, token);
			if(result.error !== null){
				setPopupProps({
					title: "Delete Product Result",
					message: result.error,
					open: true,
					onCloseClick: closePopup,
					redirectTo: undefined
				})
				return
			}
			updateStateItems()
			setPopupProps({
				title: "Delete Product Result",
				message: result ? "Product Deleted." : "Failed to delete product.",
				open: true,
				onCloseClick: closePopup,
				redirectTo: undefined
			})

		}catch(e){
			console.error("Error in deleting product: ", e)
			setPopupProps({
				title: "[Error] Delete Product",
				message: e,
				open: true,
				onCloseClick: closePopup,
				redirectTo: undefined
			})
		}
	}

	return error ? <Error errorMessage = { error } /> : !isLoaded ? <Loading /> : (
		<Container>

			<CssBaseline />

			<Paper>

				{
					popupProps && <PopupBox 
						title = {popupProps.title} 
						message = {popupProps.message} 
						open = {popupProps.open} 
						onCloseClick = {popupProps.onCloseClick}
						redirectTo = {popupProps.redirectTo}
					/>
				}

				<br />
				<Grid
					container
					direction="row"
					justify="space-evenly"
					alignItems="center"
				>
					{
						items.map((item: Product) => (
							<Grid item key = {item.id}>
								<Card className="myCard" >
									<CardActionArea>
									{
										item.image && 
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
									<Button size="small" color="primary" onClick = {() => addProductToCart(item.id)}>
										<AddShoppingCartIcon />
									</Button>
									<Button size="small" color="secondary" onClick = {() => deleteProduct(item.id)}>
										<DeleteForeverIcon /> Delete Product
									</Button>
									</CardActions>
								</Card>
							</Grid>
						))
					}
				</Grid>
			</Paper>
		</Container>
	)
}