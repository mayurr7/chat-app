import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Slide,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";

import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import VisuallyHiddenInput from "../../components/Style/StyledComponents";
import { Navigate } from "react-router-dom";

const isAdmin = false;

function AdminLogin() {

  const [checked, setChecked] = useState(true); // For Slide animation
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup
  const [avatar, setAvatar] = useState({
    preview: "",
    error: "",
  });

  // Handlers for login and signup
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login handler executed");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signup handler executed");
  };

  if(isAdmin) return <Navigate to={"/admin/dashboard"} />;

  // Handler for avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar({ preview: reader.result, error: "" });
      reader.onerror = () => setAvatar({ preview: "", error: "Error uploading file" });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(152, 130, 234), rgb(224, 159, 174))",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              width: "100%",
              maxWidth: 400,
              backgroundColor: "#ffffff",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
              {isLogin ? "Admin Login!" : "Create an Account"}
            </Typography>
            <Box
              component="form"
              style={{ width: "100%" }}
              onSubmit={isLogin ? handleLogin : handleSignUp}
            >
              {/* Avatar Selection */}
              {!isLogin && (
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  {avatar.error && (
                    <Typography m={"1rem"} color="error" variant="caption">
                      {avatar.error}
                    </Typography>
                  )}

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" onChange={handleAvatarChange} />
                  </IconButton>
                </Stack>
              )}

              {/* Login/Signup Form Fields */}
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={() => setIsLogin(!isLogin)}
                sx={{ mt: 1 }}
              >
                {isLogin ? "Create an Account" : "Already have an account? Login"}
              </Button>
            </Box>
          </Paper>
        </Slide>
      </Container>
    </div>
  );
}

export default AdminLogin;
