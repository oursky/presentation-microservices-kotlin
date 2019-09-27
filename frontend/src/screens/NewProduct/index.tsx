import React, { useState, FormEvent } from "react";
import APIService from "../../APIService";
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  CssBaseline,
  Container,
  Paper,
} from "@material-ui/core";
import AlertDialog from "../../components/AlertDialog";
import { AddProductResult } from "../../interfaces/APIResponses";
import NewProductData from "../../interfaces/NewProductData";
import Cookies from "../../Cookies";

import "./NewProduct.scss";

export default function NewProduct() {
  const [submitResult, setSubmitResult] = useState("");
  const [redirectTo, setRedirectTo] = useState<string | undefined>();
  const [newProductData, setNewProductData] = useState<NewProductData>({
    name: "",
    description: "",
    price: 0,
    files: "",
  });

  const handleChange = (name: keyof NewProductData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductData({ ...newProductData, [name]: event.target.value });
  };

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formPrice = newProductData.price;

    if (typeof formPrice !== "string") {
      setSubmitResult(`Incorrect product price!`);
      setRedirectTo(undefined);
      return;
    }

    const price = parseFloat(formPrice);
    if (isNaN(price)) {
      setSubmitResult(`Product Price is not a number !`);
      setRedirectTo(undefined);
      return;
    }

    const token = Cookies.getCookie("accessToken");
    if (token === null) {
      setSubmitResult("Please login first.");
      setRedirectTo("/login");
      return;
    }
    const target = document.querySelector("form");
    if (!target) return;

    APIService.Products.add(new FormData(target), token)
      .then((result: AddProductResult) => {
        if (result.error) {
          setSubmitResult(result.error);
          setRedirectTo(undefined);
          return;
        }

        setSubmitResult(`New Prodcut Added !\nProduct ID: ${result.productId}`);
        setRedirectTo("/");
      })
      .catch(err => {
        setSubmitResult(`Error: ${err}`);
        setRedirectTo(undefined);
      });
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />

      {submitResult && (
        <AlertDialog
          redirectTo={redirectTo}
          title="Submit Result"
          message={submitResult}
          open={!!submitResult}
          onCloseClick={() => setSubmitResult("")}
        />
      )}

      <Paper className="MyPaper">
        <Typography variant="h4">Add New Product</Typography>

        <br />

        <form onSubmit={submitForm}>
          <TextField
            required={true}
            fullWidth={true}
            id="productName"
            name="name"
            variant="outlined"
            label="Product Name"
            onChange={handleChange("name")}
          />

          <br />
          <br />

          <TextField
            fullWidth={true}
            id="productDescription"
            name="description"
            variant="outlined"
            label="Product Description"
            onChange={handleChange("description")}
          />

          <br />
          <br />

          <TextField
            required={true}
            fullWidth={true}
            id="productPrice"
            name="price"
            label="Product Price"
            variant="outlined"
            onChange={handleChange("price")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <br />
          <br />

          <input
            type="file"
            name="files"
            id="raised-button-file"
            accept="image/*"
            onChange={handleChange("files")}
          />

          <br />
          <br />

          <Button
            fullWidth={true}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
