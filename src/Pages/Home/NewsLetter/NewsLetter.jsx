import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

const NewsLetter = () => {
    const handleSubscribe=e=> {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validatedEmail = validEmail.test(email)
        if(validatedEmail){
            Swal.fire({
                title: 'Success!',
                text: 'Thank you for subscribing to our newsletter',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
        }
        else{
            Swal.fire({
                title: "Invalid Email Adress",
                text: "Please input the valid email",
                icon: "error"
              });
        }
        
    }


  return (
    <div className=" rounded-lg bg-sky-900 w-6xl py-32 h-auto my-24">
      <div className="rounded-lg w-1/2 mx-auto p-12 bg-slate-100">
        <div className="text-center my-4 font-semibold ">
          <h2 className="text-3xl text-sky-900">
            Newsletter
          </h2>
          <p>Keep up our latest news and events. Subscribe our newsletter</p>
        </div>
      <Box component="form" onSubmit={handleSubscribe}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Subscribe
        </Button>
      </Box>
      </div>
    </div>
  );
};

export default NewsLetter;
