import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginpage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/users", formData);

      toast.success("Login successful!", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Invalid username or password!", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-[480px] w-full">
        <div className="p-6 sm:p-8 bg-white border rounded-2xl shadow-sm">
          <h1 className="text-center text-3xl font-semibold">Sign in</h1>

          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <input type="text" name="username" autoComplete="off" required value={formData.username} onChange={handleChange} className="w-full border px-4 py-3 rounded-md" placeholder="Enter username"/>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input type="password" name="password" autoComplete="off" required value={formData.password} onChange={handleChange} className="w-full border px-4 py-3 rounded-md" placeholder="Enter password" />
            </div>
            <button type="submit" className="w-full py-3 rounded-md text-white bg-black hover:bg-gray-800">Sign in</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Loginpage;
