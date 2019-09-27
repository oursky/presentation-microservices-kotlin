import React from "react";
import { Container, Paper, Typography, CssBaseline } from "@material-ui/core";

export default function EmptyShoppingCart() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Paper className="MyPaper">
        <Typography variant="h5" component="h5">
          Your Shopping Cart is Empty !
        </Typography>
      </Paper>
    </Container>
  );
}
