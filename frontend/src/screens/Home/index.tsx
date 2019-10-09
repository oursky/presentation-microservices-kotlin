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
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Product from "../../interfaces/Product";
import Cart from "../../interfaces/Cart";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCartOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverOutlined";
import "./Home.scss";
import APIService from "../../APIService";
import {
  AlertDialogProps,
  ConfirmDialogProps,
} from "../../interfaces/DialogsProps";
import Cookies from "../../Cookies";

export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({});
  const [alertProps, setAlertProps] = useState<AlertDialogProps | undefined>();
  const [confirmProps, setConfirmProps] = useState<
    ConfirmDialogProps | undefined
  >({
    title: "",
    isOpen: false,
    onOk: () => {},
    onClose: undefined,
    message: "",
  });

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

  const closeConfirmDialog = useCallback(() => {
    setConfirmProps(undefined);
  }, []);

  const onConfirmDeleteProduct = useCallback(
    (id: number) => async () => {
      try {
        const token = Cookies.getCookie("accessToken");
        if (token === null) {
          closeConfirmDialog();
          setAlertProps({
            title: "Incorrect access token",
            message: "Please login first.",
            open: true,
            onCloseClick: closePopup,
            redirectTo: "/login",
          });
          return;
        }
        const result = await APIService.Products.delete(id, token);
        if (result.error) {
          closeConfirmDialog();
          setAlertProps({
            title: "Delete Product Result",
            message: result.error,
            open: true,
            onCloseClick: closePopup,
            redirectTo: undefined,
          });
          return;
        }
        updateStateItems();
        closeConfirmDialog();
        setAlertProps({
          title: "Delete Product Result",
          message: result ? "Product Deleted." : "Failed to delete product.",
          open: true,
          onCloseClick: closePopup,
          redirectTo: undefined,
        });
      } catch (e) {
        console.error("Error in deleting product: ", e);
        closeConfirmDialog();
        setAlertProps({
          title: "[Error] Delete Product",
          message: e,
          open: true,
          onCloseClick: closePopup,
          redirectTo: undefined,
        });
      }
    },
    [updateStateItems, setAlertProps, closePopup, closeConfirmDialog]
  );

  const deleteProduct = useCallback(
    (id: number) => () => {
      setConfirmProps({
        title: "Confirmation",
        message: "Are you sure you want to DELETE this product ?",
        onClose: closeConfirmDialog,
        isOpen: true,
        onOk: onConfirmDeleteProduct(id),
      });
    },
    [setConfirmProps, closeConfirmDialog, onConfirmDeleteProduct]
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

        {confirmProps && (
          <ConfirmDialog
            title={confirmProps.title}
            message={confirmProps.message}
            isOpen={confirmProps.isOpen}
            onOk={confirmProps.onOk}
            onClose={confirmProps.onClose}
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
                    <AddShoppingCartIcon />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={deleteProduct(item.id)}
                  >
                    <DeleteForeverIcon /> Delete Product
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
