import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [resetSuccessful, setResetSuccessful] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const response = await fetch(`/reset-password/${token}`, {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            toast.success('Password reset successful!');
            setResetSuccessful(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            toast.error('Error resetting password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 pb-28">
            {!resetSuccessful ? (
                <div className="w-full max-w-2xl bg-white p-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Reset Your Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                                >
                                    {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                                >
                                    {confirmPasswordVisible ? (
                                        <FaEyeSlash size={20} />
                                    ) : (
                                        <FaEye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-white p-12 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
                    <p className="text-gray-700 mb-6">
                        Your password has been reset successfully. Redirecting to the login page...
                    </p>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-600"></div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default ResetPassword;
