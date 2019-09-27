import React, { useState, FormEvent } from "react";
import APIService from "../../APIService";
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
  const [loginResult, setLoginResult] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginData>({
    user: "",
    pass: "",
  });
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleChange = (name: keyof LoginData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({ ...loginData, [name]: event.target.value });
  };

  function submitForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    APIService.User.login(loginData)
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

  return redirect ? (
    <>
      {loginResult !== "" && (
        <AlertDialog
          redirectTo="/"
          title="Login Result"
          message={loginResult}
          open={!!loginResult}
          onCloseClick={() => setLoginResult("")}
        />
      )}
    </>
  ) : (
    <Container maxWidth="xs" component="main">
      <CssBaseline />

      {loginResult !== "" && (
        <AlertDialog
          redirectTo={undefined}
          title="Login Result"
          message={loginResult}
          open={!!loginResult}
          onCloseClick={() => setLoginResult("")}
        />
      )}

      <Paper className="MyPaper">
        <Typography variant="h4">Login</Typography>

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
        </form>
      </Paper>
    </Container>
  );
}
