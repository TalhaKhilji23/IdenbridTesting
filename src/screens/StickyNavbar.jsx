import React, { useState } from 'react';

const StickyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
    <nav className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">TodoApp</div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      <ul className="hidden md:flex md:space-x-4">
        <li>
          <a
            href="#home"
            className="block md:inline-block hover:text-white hover:font-bold"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="block md:inline-block hover:text-white hover:font-bold"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="block md:inline-block hover:text-white hover:font-bold"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
  );
};

export default StickyNavbar;
