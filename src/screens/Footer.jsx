import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:underline">Privacy Policy</a>
            <a href="/" className="text-white hover:underline">Terms of Service</a>
            <a href="/" className="text-white hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
