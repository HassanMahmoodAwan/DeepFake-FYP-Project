import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner} from "@material-tailwind/react"
// import { NavLink, useHistory } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function SignUp() {

  const [emailError, setemailError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passwordError, setpasswordError] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const [formData, setFormData] = useState({
    firstName:"",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setNameError(false)
    setemailError(false)
    setpasswordError(false)

    const { name, value } = e.target;
    const lowerCaseValue = name === "email" ? value.toLowerCase() : value;
    setFormData({
      ...formData,
      [name]: lowerCaseValue,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
  

    if (formData.firstName === "") {
      setErrors("FirstName  is required!")
      formIsValid = false;
      setNameError(true)
      return formIsValid
    }
    

    if (!formData.email.trim()) {
      formIsValid = false;
      setErrors("Email is required!");
      setemailError(true)
      return formIsValid
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      setErrors("Invalid Email Format!")
      setemailError(true)
      return formIsValid
    }

    if (!formData.password.trim()) {
      formIsValid = false;
      setpasswordError(true)
      setErrors("Password is required!");
      return formIsValid
    }else if (formData.password.length < 8 || formData.password.length > 16){
      formIsValid = false
      setErrors("Password must be 08 to 16 chars!")
      setpasswordError(true)
      return formIsValid
    }

    return formIsValid;
  };


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true)
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          toast.success("User registered successfully!", { autoClose: 1000 });


          // console.log("POST request successful:", data);
          setTimeout(() => {
            window.location.href = '/';
            setLoading(false)
          }, 2500); 
        })
        .catch((error) => {
          setLoading(false)
          toast.error("Email already exists", { autoClose: 2000 });
          console.error("There was a problem with the POST request:", error);
        });
        
    } else {
      // toast.error(errors || "All fields are required", { autoClose: 2000 });
      console.log("Form is invalid");
      console.log(errors)
    }
  };

  

  return (

    <div className={loading?"pointer-events-none":""}>
    {loading?
      <div className="pointer-events-none cursor-none fixed inset-0 z-50 opacity-70 grid place-content-center backdrop-blur-sm  bg-gray-300 space-y-4">
      <Spinner color="blue" className="h-20 w-20" />
      <h4 className="text-gray-600 text-md">Loading ...</h4>
      </div>
      :
      <div></div>}

    <section className="w-full h-full grid place-content-center">
      <div className="md:w-auto h-auto bg-white my-10 rounded-xl sm:p-6 px-2 py-6
                      flex flex-col items-center justify-center shadow">

        {/* Heading */}
        <div id="Heading" className="space-y-0.3 w-[100px] text-center mb-4">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <div className="bg-ttsPurple h-1 rounded"></div>
        </div>
        {/* ======= */}


        {/* ==== Sign-UP Form ==== */}
        <form
          className="mt-8 mb-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-5">
            <div className="flex space-x-4 items-center">
              <div className="gap-2">
                <label htmlFor="name">First Name <span className="text-red-500"> *</span></label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  size="md"
                  placeholder="Enter First Name"
                  className={` focus:!border-t-gray-900 shadow-md shadow-gray-300 
                    ${nameError? "!border-t-red-400 focus:!border-t-red-500":"!border-t-gray-400"}`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={formData.firstName}
                  onChange={handleChange}
                  crossOrigin=""
                  error={nameError}
                />
                {nameError? <div className="text-sm text-red-400 absolute">
                    {errors}
                </div>:<div></div>}
              </div>

              <div className="gap-2">
                <label htmlFor="name">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  size="md"
                  placeholder="Enter Last Name"
                  className="  shadow-md shadow-gray-300 focus:!border-gray-900 "
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={formData.lastName}
                  onChange={handleChange}
                  crossOrigin=""
                  
                />
              </div>
            </div>
            
           

           <div className="gap-2">
              <label htmlFor="email">Your Email <span className="text-red-500"> *</span></label>
              <Input
                type="text"
                name="email"
                id="email"
                size="md"
                placeholder="name@mail.com"
                className={` focus:!border-t-gray-900 shadow-md shadow-gray-300 
                  ${emailError? "!border-t-red-400 focus:!border-t-red-500":"!border-t-gray-400"}`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                
                value={formData.email}
                onChange={handleChange}
                crossOrigin=""
                error = {emailError}
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
                className={` focus:!border-t-gray-900 shadow-md shadow-gray-300 
                  ${passwordError? "!border-t-red-400 focus:!border-t-red-500":"!border-t-gray-400"}`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.password}
                onChange={handleChange}
                crossOrigin=""
                error = {passwordError}
              />
              {passwordError? <div className="text-sm text-red-400 absolute">
                    {errors}
                </div>:<div></div>}
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
            Already have an account?{" "}
            <NavLink to={"/login"} className="font-bold text-ttsPurple">
              Login
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

    </div>
  );
}

export default SignUp;
