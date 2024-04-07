import React from 'react';
import { Input, Textarea, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
  const handleSubmit = () => {
    setTimeout(() => {
      toast.success("Your message has been recorded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1000);
  };

  return (
    <div className="w-full h-full my-20 box-border px-4 md:px-10 lg:px-28 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="w-full max-w-md space-y-8">
        <div className="">
          <Input label="QueryName" type="text" crossOrigin={''} />
        </div>
        <div className="">
          <Textarea rows={10} label="Drop your message here, we will work on it.." />
        </div>

        <div className="w-full flex justify-center">
          <Button variant="filled" placeholder={''} className="w-full md:w-80 bg-purple-700" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <ToastContainer position="top-right"  style={{ marginTop: "3rem" }} autoClose={3000} />
    </div>
  );
}

export default ContactUs;
