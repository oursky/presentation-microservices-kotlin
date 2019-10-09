import React, { useState, useEffect, useCallback } from "react";

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
  Grid,
} from "@material-ui/core";

import AlertDialog from "../../components/AlertDialog";
import Loading from "../../components/Loading";
import Product from "../../interfaces/Product";
import Cart from "../../interfaces/Cart";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCartOutlined";
import "./Home.scss";
import APIService from "../../APIService";
import { AlertDialogProps } from "../../interfaces/DialogsProps";

export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({});
  const [alertProps, setAlertProps] = useState<AlertDialogProps | undefined>();
  const updateStorageCart = useCallback(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart !== null && storageCart !== "") {
      setCart(JSON.parse(storageCart));
    }
  }, []);

  const closePopup = useCallback(() => {
    setAlertProps(undefined);
  }, []);

  const updateStateItems = useCallback(() => {
    APIService.Products.list()
      .then(result => {
        setIsLoaded(true);
        setItems(result);
      })
      .catch(_ => {
        setIsLoaded(true);
        setAlertProps({
          title: "Error",
          message:
            "Error occurred while getting products. Please make sure you have internet connection.",
          open: true,
          onCloseClick: closePopup,
          redirectTo: undefined,
        });
      });
  }, [closePopup]);

  useEffect(() => {
    updateStateItems();
    updateStorageCart();
  }, [updateStateItems, updateStorageCart]);

  const addProductToCart = useCallback(
    (product: Product) => () => {
      cart[product.id.toString()] = product;
      setCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAlertProps({
        title: "Successful",
        message: `Added ${cart[product.id.toString()].name} to shopping cart.`,
        open: true,
        onCloseClick: closePopup,
        redirectTo: undefined,
      });
    },
    [setAlertProps, setCart, cart, closePopup]
  );

  return !isLoaded ? (
    <Loading />
  ) : (
    <Container>
      <CssBaseline />

      <Paper>
        {alertProps && (
          <AlertDialog
            title={alertProps.title}
            message={alertProps.message}
            open={alertProps.open}
            onCloseClick={alertProps.onCloseClick}
            redirectTo={alertProps.redirectTo}
          />
        )}

        <br />
        <Grid
          container={true}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          {items.map((item: Product) => (
            <Grid item={true} key={item.id}>
              <Card className="myCard">
                <CardActionArea>
                  {item.image && (
                    <CardMedia
                      image={"http://localhost:9000/images/" + item.image}
                      style={{ height: 140 }}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom={true} variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      ${item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={addProductToCart(item)}
                  >
                    <AddShoppingCartIcon /> Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
