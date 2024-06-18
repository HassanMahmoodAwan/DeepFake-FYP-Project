import React, { useState } from 'react';
import { Input, Textarea, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ContactUs() {
  
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
        if (!token){
          toast.error("You need to login First", {autoClose:2000})
          return
        }
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
        toast.error("Failed to submit query. Please try again later.", { autoClose: 2000 });
        console.error("Error:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const validateForm = () => {
    let formIsValid = true;

    if (!data.name.trim()) {
      formIsValid = false;
      toast.error("Provide Query Title", {autoClose: 2000})
      return
    }

    if (!data.query.trim()) {
      formIsValid = false;
      toast.error("Provide your Message!", {autoClose:2000})
      return
    }
    return formIsValid;
  };

  return (
    <div className="w-full h-full my-8 box-border px-4 md:px-10 lg:px-28 flex flex-col items-center">
      <div className='mb-10'>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <div className='py-[2.3px] bg-ttsPurple rounded'></div>
      </div>

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
          <Button onClick={handleSubmit} variant="filled" placeholder='placeholder' className="w-full md:w-80 bg-ttsPurple">Submit</Button>
        </div>
      </div>
      <ToastContainer position="top-right" style={{ marginTop: "3rem" }} autoClose={3000} />
    </div>
  );
}

export default ContactUs;
