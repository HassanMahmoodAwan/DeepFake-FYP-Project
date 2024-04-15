import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { NavLink, useHistory } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function SignUp() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const lowerCaseValue = name === "email" ? value.toLowerCase() : value;
    setFormData({
      ...formData,
      [name]: lowerCaseValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      fetch("http://localhost:3333/auth/sign-up", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          toast.success("User registered successfully!", { autoClose: 1000 });

          // console.log("POST request successful:", data);
          setTimeout(() => {
            window.location.href = '/login';
          }, 2100); 
        })
        .catch((error) => {
          toast.error("Email already exists", { autoClose: 2000 });
          console.error("There was a problem with the POST request:", error);
        });
    } else {
      toast.error("All fields are necassary", { autoClose: 2000 });
      console.log("Form is invalid");
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.name.trim()) {
      formIsValid = false;
      errors["name"] = "Full Name is required";
    }

    if (!formData.email.trim()) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Invalid email address";
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
          Sign Up
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <label htmlFor="name">Your Name</label>
            <Input
              type="text"
              name="name"
              id="name"
              size="lg"
              placeholder="Enter your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.name}
              onChange={handleChange}
              crossOrigin=""
            />
            <label htmlFor="email">Your Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.email}
              onChange={handleChange}
              crossOrigin=""
            />
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.password}
              onChange={handleChange}
              crossOrigin=""
            />
          </div>
          <Checkbox
            label={
              <label>
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </label>
            }
            crossOrigin=""
          />
          <button type="submit" className="mt-6 bg-indigo-600 w-full text-white p-3 rounded-md">
            Sign Up
          </button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder="Placeholder"
          >
            Already have an account?{" "}
            <NavLink to={"/login"} className="font-bold text-indigo-600">
              Login
            </NavLink>
          </Typography>
        </form>
      </Card>
      <ToastContainer
        position="top-right"
        style={{ marginTop: "4rem" }} 
      />
    </div>
  );
}

export default SignUp;
