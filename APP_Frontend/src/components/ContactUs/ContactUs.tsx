import React, { useState } from 'react';
import { Input, Textarea, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ContactUs() {
  const[errors,setErrors] = useState({})
  const [data,setData] = useState({
    name: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const token:string = sessionStorage.getItem('token');
        const recieved = (JSON.parse(token).token);
        const response = await axios.post("http://localhost:3333/query/send", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${recieved}`
          }
        });
        
        // Reset form fields
        setData({
          name: "",
          query: ""
        });

        // Show success message
        toast.success("Your query has been successfully submitted", { autoClose: 2000 });
        console.log("Query:", response.data);
      } catch (error) {
        // Show error message
        toast.error("Failed to submit query. Please try again later.", { autoClose: 2000 });
        console.error("Error:", error);
      }
    } else {
      toast.error("All fields are required", { autoClose: 2000 });
      console.log("Form is invalid");
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!data.name.trim()) {
      formIsValid = false;
      errors["name"] = "name of query is required";
    }

    if (!data.query.trim()) {
      formIsValid = false;
      errors["query"] = "query  is required";
    }
    setErrors(errors);
    return formIsValid;
  };
  return (
    <div className="w-full h-full my-20 box-border px-4 md:px-10 lg:px-28 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="w-full max-w-md space-y-8">
        <div className="">
          <Input id="name" name="name" label="QueryName" type="text" value={data.name}
              onChange={handleChange} crossOrigin='' />
        </div>
        <div className="">
          <Textarea id="query" name="query" rows={10}  value={data.query}
              onChange={handleChange}
              label="Drop your message here, we will work on it.." />
        </div>
        <div className="w-full flex justify-center">
          <Button onClick={handleSubmit} variant="filled" placeholder='placeholder' className="w-full md:w-80 bg-purple-700">Submit</Button>
        </div>
      </div>
      <ToastContainer position="top-right" style={{ marginTop: "3rem" }} autoClose={3000} />
    </div>
  );
}

export default ContactUs;
