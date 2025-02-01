import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check Authentication Status and Fetch User Initials
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/authcheck", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUserInitials(data.initials);
          setUserEmail(data.email);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  });

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Logo */}
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center hover:opacity-80">
        <img
          src="https://gau.ac.ke/wp-content/uploads/2023/08/logo-600x131.jpg"
          alt="University Logo"
          className="h-10 w-auto object-contain"
        />
      </Link>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex space-x-8 text-lg font-medium ml-auto">
      <a
        href="#open-jobs"
        className="hover:text-green-300 transition duration-300"
      >
        Open Jobs
      </a>
      <a
        href="#portal-guide"
        className="hover:text-green-300 transition duration-300"
      >
        Portal Guide
      </a>
      {!isAuthenticated && (
        <>
          <Link
  to="/login"
  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-green-800 transition duration-300"
>
  Login
</Link>
<Link
  to="/signup"
  className="px-4 py-2 bg-white text-green-800 border border-green-800 rounded hover:bg-green-800 hover:text-white transition duration-300"
>
  Sign Up
</Link>

        </>
      )}
    </nav>

    {/* Right Section: Avatar + Dropdown */}
    <div className="flex items-center space-x-6 ml-4">
      {isAuthenticated ? (
        <>
          {/* User Avatar and Dropdown */}
          <div className="relative flex items-center space-x-3">
            {/* User Avatar */}
            <div className="w-10 h-10 flex items-center justify-center bg-white text-green-700 font-bold rounded-full cursor-pointer shadow-md">
              {userInitials}
            </div>

            {/* User Email */}
            <div className="hidden md:flex items-center">
              <span className="text-white font-medium">{userEmail}</span>
            </div>

            {/* Dropdown Arrow Icon */}
            <svg
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-5 h-5 ml-3 text-white cursor-pointer transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 15l-7-7-7 7"
              />
            </svg>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 w-72 md:w-80 bg-white shadow-xl rounded-lg py-3 z-50 border border-gray-200">
                {/* Dashboard Option */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-all duration-300 rounded-t-md"
                >
                  <svg
                    className="w-6 h-6 mr-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7m-9 2v10m4-10l2 2m-2-2v10"
                    />
                  </svg>
                  <span className="text-lg font-medium">Dashboard</span>
                </button>

                <div className="border-t border-gray-200 my-1"></div>

                {/* Logout Option */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-100 transition-all duration-300 rounded-b-md"
                >
                  <svg
                    className="w-6 h-6 mr-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V7"
                    />
                  </svg>
                  <span className="text-lg font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button onClick={toggleMenu} className="focus:outline-none">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden bg-green-700 text-white">
      <nav className="flex flex-col items-center space-y-4 py-4">
        <a
          href="#open-jobs"
          className="hover:text-green-300 transition duration-300"
          onClick={toggleMenu}
        >
          Open Jobs
        </a>
        <a
          href="#portal-guide"
          className="hover:text-green-300 transition duration-300"
          onClick={toggleMenu}
        >
          Portal Guide
        </a>
        {isAuthenticated ? (
          <>
            {/* User Email on Mobile */}
            <div className="px-6 py-3 text-white text-center">{userEmail}</div>
          </>
        ) : (
          <>
            {/* Only appear in mobile menu */}
            <Link
  to="/login"
  onClick={toggleMenu}
  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-green-800 transition duration-300"
>
  Login
</Link>
<Link
  to="/signup"
  onClick={toggleMenu}
  className="px-4 py-2 bg-white text-green-800 border border-green-800 rounded hover:bg-green-800 hover:text-white transition duration-300"
>
  Sign Up
</Link>

          </>
        )}
      </nav>
    </div>
  )}
</header>

  
  );
};

export default Header;
