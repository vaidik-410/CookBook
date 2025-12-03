import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData,setFormData]=useState({
    email:"",
    subject:"",
    message:""
  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const res=await axios.post("http://localhost:3000/feedback",formData);
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
      });
      setFormData({email:"",subject:"",message:""});
    }catch(err){
      console.log(err);
      toast.error("Failed to submit feedback!", {
      position: "top-right",
    });
    }
  }

  return (
    <div>
      <section className="bg-white">
        <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md text-black">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-800">Contact Us</h2>
          <p className="mb-12 font-light text-center text-gray-700 sm:text-xl">Got a Question or a Recipe to share? We'd Love to hear from YOU.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} className="shadow-sm bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@mail.com" autoComplete='off' required/>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black">Subject</label>
              <input type="text" id="subject" value={formData.subject} onChange={handleChange} className="block p-3 w-full text-sm text-black bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Let us know how we can help you" autoComplete='off' required/>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Your message</label>
              <textarea id="message" value={formData.message} onChange={handleChange} rows={6} className="block p-2.5 w-full text-sm text-black bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500" autoComplete='off' placeholder="Leave a comment..."/>
            </div>

            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">Send message</button>
          </form>
        </div>
      </section>
      <ToastContainer/>
    </div>
  )
}

export default Contact
