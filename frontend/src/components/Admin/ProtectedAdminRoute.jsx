import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAdminAuth = async () => {
      try {
        // Send GET request to check if admin is authenticated
        const response = await axios.get('/admin/authcheck', {
          withCredentials: true  // Send cookies with request
        });

        if (response.status === 200) {
          setIsAuthenticated(true); // Admin is authenticated
        } else {
          setIsAuthenticated(false); // Unauthorized
        }
      } catch (error) {
        setIsAuthenticated(false); // Unauthorized if there's an error
      }
    };

    verifyAdminAuth();
  }, []);

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // You can show a loading spinner
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;  // Return the protected content if authenticated
};

export default ProtectedAdminRoute;
