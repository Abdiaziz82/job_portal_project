import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock } from "react-icons/fa";
function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!", {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // API call
    const response = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email,
        mobile_number: formData.mobile,
        password: formData.password
      })
    });

    const result = await response.json();
    if (response.status === 201) {
      toast.success('Sign Up Successful!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear form fields upon success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to login page after success
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } else {
      toast.error(result.error || 'Something went wrong!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-6 sm:px-8 pb-28">
  {/* Toast Container Positioned at the Top Center */}
  <ToastContainer 
    position="top-center" 
    autoClose={3000} 
    hideProgressBar={false} 
    newestOnTop={true} 
    closeOnClick 
    rtl={false} 
    pauseOnFocusLoss 
    draggable 
    pauseOnHover 
  />

  <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl p-6 mt-4 sm:mt-4 mb-8 sm:mb-12">
    <div className="text-center mb-6">
      <img
        src="https://gau.ac.ke/wp-content/uploads/2023/08/logo-600x131.jpg"
        alt="Logo"
        className="w-48 mx-auto mb-4"
      />
      <h2 className="text-3xl font-semibold text-gray-800">Create Your Account</h2>
      <p className="text-gray-500 mt-2">Join us and explore exciting opportunities!</p>
    </div>

    {/* Sign-Up Form */}
    <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            type="text"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            type="email"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            id="mobile"
            type="tel"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 px-6 mt-4 bg-green-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        >
          Sign Up
        </button>
      </div>

      {/* Already have an account? Login */}
      <div className="mt-4 text-center">
        <p className="text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </form>
  </div>
</div>

  );
}

export default SignUp;
