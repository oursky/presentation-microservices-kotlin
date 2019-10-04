import React, { useState, FormEvent, useCallback } from "react";
import APIService from "../../APIService";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import AlertDialog from "../../components/AlertDialog";
import Cookies from "../../Cookies";
import LoginData from "../../interfaces/LoginData";
import { LoginResult } from "../../interfaces/APIResponses";
import { TIME, getTimeAfter } from "../../Utils";

import "./Login.scss";

export default function Login() {
  const [loginResult, setLoginResult] = useState<string | undefined>();
  const [loginData, setLoginData] = useState<LoginData>({
    user: "",
    pass: "",
  });
  const [isMerchant, setIsMerchant] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  const setLoginResultNull = useCallback(() => setLoginResult(undefined), []);
  const updateIsMerchant = useCallback(() => setIsMerchant(!isMerchant), [
    isMerchant,
  ]);

  const handleChange = (name: keyof LoginData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({ ...loginData, [name]: event.target.value });
  };

  function submitForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    APIService.Auth.login(loginData)
      .then((result: LoginResult) => {
        if (result.error) {
          setLoginResult(result.error);
          setRedirect(false);
        } else {
          setLoginResult("Login Successfully");
          Cookies.setCookie(
            "accessToken",
            result.accessToken || "",
            getTimeAfter(TIME.TEN_MINUTE)
          );
          localStorage.setItem("userId", (result.userId || "").toString());
          setRedirect(true);
        }
      })
      .catch(e => {
        console.error("Erorrrr: ", e);
        setLoginResult(`An Error occured: ${e}`);
        setRedirect(false);
      });
  }

  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline />

      <AlertDialog
        redirectTo={redirect ? "/" : undefined}
        title="Login Result"
        message={loginResult}
        open={!!loginResult}
        onCloseClick={setLoginResultNull}
      />

      <Paper className="mypaper">
        <Typography variant="h4">
          {isMerchant ? "Merchant" : "Customer"} Login
        </Typography>

        <br />

        <form onSubmit={submitForm}>
          <TextField
            required={true}
            fullWidth={true}
            name="user"
            variant="outlined"
            label="Username"
            onChange={handleChange("user")}
          />

          <br />
          <br />

          <TextField
            fullWidth={true}
            required={true}
            name="pass"
            type="password"
            variant="outlined"
            label="Password"
            onChange={handleChange("pass")}
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
          <br />
          <Button color="primary">
            <Link to="/forgot" className="mylink">
              <Typography variant="caption">Forgot Password</Typography>
            </Link>
          </Button>
          <Button color="primary" onClick={updateIsMerchant}>
            <Typography variant="caption">
              Login as {isMerchant ? "Customer" : "Merchant"} ?
            </Typography>
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
