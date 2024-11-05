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
import VisuallyHiddenInput from "../components/Style/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { userNameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Control login/signup mode
  const [checked, setChecked] = useState(true); // Control Slide animation
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const password = useInputValidation("");

  // for adding image
  const avatar =  useFileHandler("single");


  //form handler function
  const handleLogin = (e) => {
    e.preventDefault();
  }

   const handleSignUp = (e) => {
    e.preventDefault();
  }

  return (

    <div  
      style={{
        backgroundImage:"linear-gradient(rgb(152, 130, 234), rgb(224, 159, 174))",
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
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </Typography>
          <Box component="form" style={{ width: "100%" }}
           onSubmit={isLogin ? handleLogin : handleSignUp}
          >

            {/* for selecting avtar */}
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
                  <>
                    <CameraAltIcon />
                    {/* add avtar file from ur pc */}
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
                  </>
                </IconButton>
              </Stack>
            )}

            {/* Name - only for Sign Up */}
            {!isLogin && (
              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
                sx={{
                  backgroundColor: "#f9f9f9",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}

            {/* Username */}
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
              value={userName.value}
              onChange={userName.changeHandler}
              sx={{
                backgroundColor: "#f9f9f9",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            {/* if user name is not valid */}

            {userName.error && (
              <Typography color="error" variant="caption">
                {userName.error}
              </Typography>
            )}

            {/* Bio - only for Sign Up */}
            {!isLogin && (
              <TextField
                fullWidth
                label="Introduce Your Awesome Self"
                margin="normal"
                variant="outlined"
                multiline
                rows={2}
                value={bio.value}
                onChange={bio.changeHandler}
                sx={{
                  backgroundColor: "#f9f9f9",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}

            {/* Password */}
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password.value}
              onChange={password.changeHandler}
              sx={{
                backgroundColor: "#f9f9f9",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <Button
              sx={{
                marginTop: 3,
                paddingY: 1,
                borderRadius: 1,
                backgroundColor: "#0078D4",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#005a9e",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.2s ease-in-out",
              }}
              variant="contained"
              type="submit"
              fullWidth

            >
              {isLogin ? "Login to Chat" : "Join the Chat"}
            </Button>

            <Typography textAlign="center" mt={2} mb={1} color="textSecondary">
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </Typography>

            <Button
              variant="text"
              fullWidth
              onClick={toggleLogin}
              sx={{
                fontSize: "0.9rem",
                color: "#0078D4",
              }}
            >
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </Box>
        </Paper>
      </Slide>
    </Container>
    </div>
  );
};

export default Login;
