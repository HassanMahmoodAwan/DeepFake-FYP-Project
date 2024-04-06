import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function LoginPage() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    

    if (validateForm()) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      fetch("http://localhost:3333/auth/sign-in", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            email: "",
            password: "",
          });
          toast.success("plz set a route for change", { autoClose: 2000 });
          // Redirect or handle successful login
          console.log("Login successful:", data);
        })
        .catch((error) => {
          toast.error("Invalid email or password", { autoClose: 2000 });
          console.error("There was a problem with the login request:", error);
        });
    } else {
      toast.error("Email and password are required", { autoClose: 2000 });
      console.log("Form is invalid");
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.email.trim()) {
      formIsValid = false;
      errors["email"] = "Email is required";
    }

    if (!formData.password.trim()) {
      formIsValid = false;
      errors["password"] = "Password is required";
    }
    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="w-full h-full grid place-content-center my-10">
      <Card color="transparent" shadow={false} placeholder="Placeholder">
        <Typography variant="h4" color="blue-gray" placeholder="Placeholder">
          Login
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <label htmlFor="email">Your Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 p-2"
              value={formData.email}
              onChange={handleChange}
              crossOrigin=''
            />
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 p-2"
              value={formData.password}
              onChange={handleChange}
              crossOrigin='
              '
            />
          </div>
          <Button
            className="mt-6 bg-indigo-600 w-full text-white p-3 rounded-md"
            fullWidth
            placeholder='placeholder'
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder='placeholder'
          >
            Don't have an account?{" "}
            <NavLink to={"/signup"} className="font-bold text-indigo-600">
              Sign Up
            </NavLink>
          </Typography>
        </form>
      </Card>
      <ToastContainer position="top-right" style={{ marginTop: "4rem" }} />
    </div>
  );
}

export default LoginPage;
