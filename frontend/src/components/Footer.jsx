import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4 fixed bottom-0 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Garissa University recruitment Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
