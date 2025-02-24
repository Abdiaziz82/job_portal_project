import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa'; // Import success icon

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/forgot-password', {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-20">
      {!formSent ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-10 bg-white rounded-xl shadow-2xl border border-gray-100"
        >
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Forgot Password
          </h3>
          <p className="text-sm text-gray-600 text-center mb-8">
            Enter your email address below, and we’ll send you a reset link.
          </p>
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-3"
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
              className="block w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 text-white font-semibold rounded-lg ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            } transition duration-300 flex items-center justify-center`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </div>
            ) : (
              'Send Reset Code'
            )}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-2xl p-10 bg-white rounded-xl shadow-2xl border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-green-600 mb-6">Success!</h3>
          <p className="text-sm text-gray-700 mb-8">
            A reset link has been sent to your email. Please check your inbox.
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}