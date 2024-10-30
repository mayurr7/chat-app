import React, { useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(false);
  
  return (
    <Container component={"main"} maxWidth="sx">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form>
              {/* user name */}
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />

              {/* for passwword */}
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                LOGIN
              </Button>
              <Typography>Or</Typography>

              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="text"
                fullWidth
                onClick={toggleLogin}
              >
                SIGN UP Insted
              </Button>
            </form>
          </>
        ) : (
          <span>Register</span>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
