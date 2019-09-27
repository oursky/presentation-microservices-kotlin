import React, { useState, useCallback } from "react";
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
import "./Register.scss";
import Cookies from "../../Cookies";
import { TIME, getTimeAfter } from "../../Utils";
import RegisterData from "../../interfaces/RegisterData";
import { RegisterResult } from "../../interfaces/APIResponses";

export default function Register() {
  const [submitResult, setSubmitResult] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<RegisterData>({
    user: "",
    pass: "",
    confpass: "",
  });

  const handleChange = (name: keyof RegisterData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData({ ...registerData, [name]: event.target.value });
  };

  const setSubmitResultEmpty = useCallback(() => setSubmitResult(""), []);

  function submitForm(): void {
    if (registerData.confpass !== registerData.pass) {
      setSubmitResult("Passwords are not the same !");
      return;
    }

    APIService.User.register(registerData)
      .then((result: RegisterResult) => {
        if (result.error) {
          setSubmitResult(result.error);
          setSuccess(false);
        } else {
          setSubmitResult("Successfully Registered.");
          Cookies.setCookie(
            "accessToken",
            result.accessToken || "",
            getTimeAfter(TIME.TEN_MINUTE)
          );
          localStorage.setItem("userId", (result.userId || "").toString());
          setSuccess(true);
        }
      })
      .catch(e => {
        setSubmitResult(`Error: ${e}`);
        setSuccess(false);
      });
  }

  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline />

      <AlertDialog
        redirectTo={success ? "/" : undefined}
        title="Registeration Result"
        message={submitResult}
        open={!!submitResult}
        onCloseClick={setSubmitResultEmpty}
      />

      <Paper className="MyPaper">
        <Typography variant="h4">Register</Typography>

        <br />

        <form>
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

          <TextField
            fullWidth={true}
            required={true}
            name="confpass"
            type="password"
            variant="outlined"
            label="Confirm Password"
            onChange={handleChange("confpass")}
          />

          <br />
          <br />

          <Button
            fullWidth={true}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={submitForm}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
