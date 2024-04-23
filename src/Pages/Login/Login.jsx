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
import GoogleIcon from "@mui/icons-material/Google";
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
        axios.post("https://blog-website-server-blond.vercel.app/jwt", user).then((res) => {
          console.log(res.data);
          if (res.data) {
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
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#d1d1d1",
                color: "black",
                fontWeight: "bold",
                ":hover": { bgcolor: "#8dcc78" },
              }}
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
            <Box
              sx={{
                display: "flex",
                my: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography width={"50%"}>
                {" "}
                <hr />
              </Typography>
              <Typography sx={{ textAlign: "center", px: 2 }}>Or</Typography>
              <Typography width={"50%"}>
                {" "}
                <hr />
              </Typography>
            </Box>

            <p className="text-center">
              <Button
                onClick={handleGoogleLogin}
                flexDirection
                fullWidth
                variant="outlined"
                sx={{ py: "10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                  id="google"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <Typography ml={"2px"} color={"black"}  textTransform={"lowercase"}>
                  oogle
                </Typography>
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
