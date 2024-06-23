import { Paper, Grid } from "@mui/material";
import backgroundImage from "../../assets/bg_loginpage.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/ays_logo.jpg";

import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useGetOtpMutation } from "../../Store/slice/apiForgetPassword";

function ForgetPasswordPage(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const [getOtp] = useGetOtpMutation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
    setResponseMessage(""); // Clear previous responses
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setResponseMessage(""); // Clear previous responses
    if (!email) {
      setEmailError("Please enter email");
      return;
    }

    try {
      const response = await getOtp({ email }).unwrap();
      setResponseMessage(response.message);
      if (response.message === "OTP sent to your email address") {
        navigate("/ResetPassword");
        props.onSignIn(email);
        props.onResetClick(true);
        props.onSignInClick(true);
      }
    } catch (error) {
      if (error.status === 404) {
        setEmailError("Email not found");
      } else {
        setEmailError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Paper
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Grid container pl={2}>
        <Grid item xs={3.1} sm={1.5} md={1.1} lg={0.9} mt={2}>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              maxWidth: "80px",
              borderRadius: "50%",
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>
        <Grid item xs={7} sm={3.5} md={2} lg={2} mt={2} textAlign={"left"}>
          <Typography fontSize={30} fontWeight={"bold"} color={"darkblue"}>
            AYS
          </Typography>
          <Typography fontSize={20} fontWeight={"bold"}>
            Software Solution
          </Typography>
        </Grid>
      </Grid>
      <Container maxWidth="xs" sx={{ pt: "8vh" }}>
        <Card elevation={8}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h6"
                align="center"
                mb={2}
                fontWeight={"bold"}
                color={"primary"}
              >
                Forget Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    onChange={handleEmailChange}
                    error={Boolean(emailError)}
                    helperText={emailError || responseMessage}
                  />
                </Grid>
                <Grid container gap={2} mt={2}>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        borderRadius: "100px",
                        ml: 1,
                      }}
                    >
                      Get OTP
                    </Button>
                  </Grid>
                </Grid>
                
              </Grid>
              
            </form>
          </CardContent>
        </Card>
      </Container>
    </Paper>
  );
}

export default ForgetPasswordPage;