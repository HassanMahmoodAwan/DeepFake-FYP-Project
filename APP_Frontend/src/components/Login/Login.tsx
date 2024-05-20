import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
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


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
  
    if (validateForm()) {
      try {
        const response:any = await axios.post("http://localhost:3333/auth/sign-in", formData);
        const data = response.data;
  
        console.log(data);
  
        const token = JSON.stringify(data);
        console.log(token);
        
        sessionStorage.setItem('token', token);
  
        setFormData({
          email: "",
          password: "",
        });
  
        // toast.success("Please set a route for redirection", { autoClose: 2000 });
        // console.log("Login successful:", data);
        window.location.reload();
        window.location.href = "/";
        
      } catch (error) {
        toast.error("Invalid email or password", { autoClose: 2000 });
        console.error("There was a problem with the login request:", error);
      }
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


    <>

<section className="w-full h-full grid place-content-center">
      <div className="md:w-auto h-auto bg-white my-10 rounded-xl sm:p-6 px-2 py-6
                      flex flex-col items-center justify-center shadow">

        {/* Heading */}
        <div id="Heading" className="space-y-0.3 w-[85px] text-center mb-3">
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="bg-ttsPurple h-1 rounded"></div>
        </div>
        {/* ======= */}


        {/* ==== Sign-UP Form ==== */}
        <form
          className="mt-8 mb-2 w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-7">
            

           <div className="gap-2">
              <label htmlFor="email">Your Email <span className="text-red-500"> *</span></label>
              <Input
                type="email"
                name="email"
                id="email"
                size="md"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.email}
                onChange={handleChange}
                crossOrigin=""
              />
           </div>
            

            <div className="gap-2">
              <label htmlFor="password">Password <span className="text-red-500"> *</span></label>
              <Input
                type="password"
                name="password"
                id="password"
                size="md"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.password}
                onChange={handleChange}
                crossOrigin=""
              />
            </div>
            
          </div>
          
          <button type="submit" className="mt-9 bg-ttsPurple w-full text-white p-3 rounded-md">
            Sign Up
          </button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder="Placeholder"
          >
             Don't have an account?{" "}
            <NavLink to={"/signup"} className="font-bold text-ttsPurple">
              Signup
            </NavLink>
          </Typography>
        </form>
        {/* ====================== */}
        <ToastContainer
        position="top-right"
        style={{ marginTop: "4rem" }} 
        />
      </div>
    </section>



    {/* <div className="w-full h-full grid place-content-center my-10">
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
    </div> */}
    </>
  );
}

export default LoginPage;
