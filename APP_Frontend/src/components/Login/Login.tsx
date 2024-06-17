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
  const [errors, setErrors] = useState<string>("");
  const [emailError, setemailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setemailError(false)
    setPasswordError(false)

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
    
    let formIsValid = true;

    if (!formData.email.trim()) {
      formIsValid = false;
      setErrors("Email  is required!")
      setemailError(true)
      return formIsValid
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      setErrors("Invalid Email Format!")
      setemailError(true)
      return formIsValid
    }

    if (!formData.password.trim()) {
      formIsValid = false
      setErrors("Password  is required!")
      setPasswordError(true)
      return formIsValid
    }else if (formData.password.length < 8 || formData.password.length > 16){
      formIsValid = false
      setErrors("Password must be 08 to 16 chars!")
      setPasswordError(true)
      return formIsValid
    }

    
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


        {/* ==== LogIn Form ==== */}
        <form
          className="mt-8 mb-2 w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-7">
            

           <div className="gap-2">
              <label htmlFor="email">Your Email <span className="text-red-500"> *</span></label>
              <Input
                type="text"
                name="email"
                id="email"
                size="md"
                placeholder="name@mail.com"
                className={` focus:!border-t-gray-900 shadow-md shadow-gray-200 
                  ${emailError? "!border-t-red-400 focus:!border-t-red-500":"!border-t-gray-400"}`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.email}
                onChange={handleChange}
                crossOrigin=""
                error={emailError}

              />
              {emailError? <div className="text-sm text-red-400 absolute">
                    {errors}
                </div>:<div></div>}
           </div>
            

            <div className="gap-2">
              <label htmlFor="password">Password <span className="text-red-500"> *</span></label>
              <Input
                type="password"
                name="password"
                id="password"
                size="md"
                placeholder="********"
                className={` focus:!border-t-gray-900 shadow-md shadow-gray-200 
                  ${passwordError? "!border-t-red-400 focus:!border-t-red-500":"!border-t-gray-400"}`}
                labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                value={formData.password}
                onChange={handleChange}
                crossOrigin=""
                error={passwordError}
              />
              {passwordError? <div className="text-sm text-red-400 absolute">
                    {errors}
                </div>:<div></div>}
            </div>
            
          </div>
          
          <button type="submit" className="mt-9 bg-ttsPurple w-full text-white p-3 rounded-md">
            Login
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

    </>
  );
}

export default LoginPage;
