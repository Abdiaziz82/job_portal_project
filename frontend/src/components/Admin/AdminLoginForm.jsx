import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginForm = () => {
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post('http://127.0.0.1:5000/admin/login', {
        email_address,
        password
      }, { withCredentials: true });  // Include cookies

      if (response.status === 200) {
        toast.success('Login Successful! Redirecting...', {
          position: 'top-right',
          autoClose: 2000,
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
      }
    } catch (error) {
      toast.error('Invalid email or password. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email_address}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AdminLoginForm;
