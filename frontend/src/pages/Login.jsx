import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();  // For redirecting after login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        credentials: 'include',  // Send cookies with request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        toast.success('Login Successful!', { position: 'top-center', autoClose: 2000 });
  
        // ⏳ Small delay before navigating
        setTimeout(() => {
          navigate('/dashboard');  // ✅ Redirect after login
        }, 1000);
  
      } else {
        toast.error(data.error || 'Login failed. Please try again.', { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Server error. Please try again later.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
  
  

  return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl rounded-md p-6">
        
        {/* Toast Container */}
        <ToastContainer />

        <a href="javascript:void(0)">
          <img
            src="https://gau.ac.ke/wp-content/uploads/2023/08/logo-600x131.jpg"
            alt="logo"
            className="w-48 md:w-56 h-auto mb-4 mx-auto"
          />
        </a>

        <div className="grid md:grid-cols-2 items-center gap-6">
          <div className="max-md:order-1 max-md:mb-6">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-auto object-contain"
              alt="login-image"
            />
          </div>

          <form onSubmit={handleLogin} className="md:max-w-md w-full mx-auto">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-green-800">Sign in</h3>
            </div>

            <div>
              <div className="relative flex items-center mb-4">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
              <Link
  to="/forgot-password"
  className="text-green-600 font-semibold text-sm hover:underline"
>
  Forgot Password?
</Link>

              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wide rounded-md text-white ${
                  loading ? 'bg-gray-500' : 'bg-green-800 hover:bg-green-700'
                } focus:outline-none`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                Don't have an account?
                <a
                  href="/signup"
                  className="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
