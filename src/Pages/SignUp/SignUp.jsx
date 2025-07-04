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
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();
const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, email, password };
    console.log(user);

    //clear
    setRegisterError("");

    // signup conditions
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/.test(password)) {
      setRegisterError(
        "Enter min one special,capital,numeric and min 6 digits"
      );
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        //user added to the database
        const createdAt = result.user.metadata.creationTime;
        const user = { email, createdAt };
        axios.post(`${import.meta.env.VITE_MAIN_URL}/user`, user).then((data) => {
          if (data.data.insertedId) {
            console.log("data added to the database");
          }
        });

        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Success!",
          text: "Account created successfully",
          icon: "success",
          confirmButtonText: "ok",
        });
        form.reset();
      })
      .catch((error) => {
        console.log(error);
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignUp}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="Name"
              autoComplete="Name"
              autoFocus
            />
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
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#d1d1d1",
                color: "black",
                fontWeight: "bold",
                ":hover": { bgcolor: "#8dcc78" },
              }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <p>
                  Already have an account? <Link href="/login">Login</Link>
                </p>
              </Grid>
            </Grid>
            <br />
          </Box>
          {registerError && <p className="text-red-500">{registerError}</p>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
