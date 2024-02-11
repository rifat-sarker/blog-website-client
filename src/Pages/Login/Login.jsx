import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

const Login = () => {
  const { signInUser, googleLogIn } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //google login
  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        // console.log(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    //clear success and error
    setSuccess("");
    setRegisterError("");

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);

        //get token
        const user = { email };
        axios
          .post("https://blog-website-server-blond.vercel.app/jwt", user)
          .then((res) => {
            console.log(res.data);
            if(res.data){
              navigate(location?.state ? location.state : "/");
            }
          });
        toast.success("login  successfully", {
          duration: 2000,
          position: "bottom-center",
        });
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Wrong email or password", {
          duration: 1000,
          position: "top-center",
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <p>
                  Don't have an account? <Link href="/signUp">Sign Up</Link>
                </p>
              </Grid>
            </Grid>
            <br />
            <p className="text-center">
              Login with{" "}
              <Button
                onClick={handleGoogleLogin}
                flexDirection
                variant="outlined"
              >
                Google
              </Button>
            </p>
            <ToastContainer></ToastContainer>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
