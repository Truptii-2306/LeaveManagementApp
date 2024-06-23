import React from "react";
import { Paper, Grid, Button, Typography, Container, Card, CardContent } from "@mui/material";

import backgroundImage from "../../assets/bg_loginpage.jpg";
import logoImage from "../../assets/ays_logo.jpg";

function LoginPage(props) {

  const handleLogin = () => {
    window.location.href = "http://localhost:4001/auth/google/login";
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
      <Container maxWidth="xs" sx={{ pt: "4vh" }}>
        <Card elevation={8}>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              mb={2}
              fontWeight={"bold"}
              color={"primary"}
            >
              Login
            </Typography>
            <Grid container gap={2} mt={2}>
              <Grid item xs={12} textAlign={"left"}>
                <Button
                  onClick={handleLogin}
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", borderRadius: "100px" }}
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Paper>
  );
}

export default LoginPage;