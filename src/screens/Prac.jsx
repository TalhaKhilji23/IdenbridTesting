import React, { useState, useEffect } from "react";

const Prac = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if screen size is medium or larger
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">My Website</div>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 w-64 h-full bg-white text-black p-4 z-50">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="space-y-4 mt-8">
              <li>
                <a
                  href="#home"
                  className="block hover:text-white hover:font-bold"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block hover:text-white hover:font-bold"
                  onClick={toggleMenu}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block hover:text-white hover:font-bold"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex-grow">
          <img
            src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div
            className="w-full h-full  bg-red-500"
          >
            <p>Value</p>
          </div>
        </div>
        {/* <div className="flex-grow">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
            alt="Image 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
            alt="Image 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
            alt="Image 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
            alt="Image 6"
            className="w-full h-full object-cover"
          />
        </div> */}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          &copy; 2024 My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Prac;
