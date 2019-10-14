import React, { useState } from "react";
import { UpdateProductDialogProps } from "../../interfaces/DialogsProps";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  CardMedia,
  TextField,
} from "@material-ui/core/";

import NewProductData from "../../interfaces/NewProductData";

export default function MyDialog({
  product,
  isOpen,
  onClose,
  onSubmit,
}: UpdateProductDialogProps) {
  const [updateProductData, setUpdateProductData] = useState<NewProductData>({
    files: "",
    name: product.name,
    description: product.description,
    price: product.price,
  });
  const [isIncorrectPrice, setIsIncorrectPrice] = useState<boolean>(false);

  const handleChange = (name: keyof NewProductData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === "price") {
      const priceInFloat = parseFloat(event.target.value);
      setIsIncorrectPrice(isNaN(priceInFloat));
    }

    setUpdateProductData({
      ...updateProductData,
      [name]: event.target.value,
    });
  };

  return (
    <Dialog
      open={!!isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"> Update Product Form </DialogTitle>
      <DialogContent>
        {product.image && (
          <CardMedia
            image={"http://localhost:9000/images/" + product.image}
            style={{ height: 140 }}
          />
        )}
        <DialogContentText id="alert-dialog-description">
          <TextField
            fullWidth={true}
            name="name"
            variant="outlined"
            label="name"
            value={updateProductData.name}
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
            value={updateProductData.description}
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
            error={isIncorrectPrice}
            onChange={handleChange("price")}
            value={updateProductData.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onSubmit && (
          <Button
            fullWidth={true}
            color="primary"
            onClick={onSubmit(product.id, updateProductData)}
          >
            Submit
          </Button>
        )}
        {onClose && (
          <Button fullWidth={true} color="primary" onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
