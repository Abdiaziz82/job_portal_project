import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Reset code sent to your email!', {
          position: 'top-center',
          autoClose: 5000,
        });
        setFormSent(true);
      } else {
        toast.error(data.error || 'Failed to send reset code.', {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Server error. Please try again later.', {
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pb-28">
    {!formSent ? (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-10 border rounded-lg shadow-md"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Forgot Password
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address below and we’ll send you a reset link.
        </p>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="block w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 text-white font-semibold rounded-md ${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } transition duration-300`}
        >
          {loading ? 'Sending...' : 'Send Reset Code'}
        </button>
      </form>
    ) : (
      <div className="w-full max-w-2xl p-10 border rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Success!</h3>
        <p className="text-sm text-gray-700 mb-6">
          A reset link has been sent to your email. Please check your inbox.
        </p>
        <a
          href="/login"
          className="inline-block bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition duration-300"
        >
          Go to Login
        </a>
      </div>
    )}
    <ToastContainer />
  </div>
  

  );
}
