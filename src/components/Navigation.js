import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    document.documentElement.classList.toggle('dark', newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold gradient-text">WhitegloveAI</span>
                <span className="text-sm font-light text-gray-700 dark:text-gray-300">Policy Generator</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/framework"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Framework
              </Link>
              <Link
                to="/launchpad"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Launchpad
              </Link>
              <Link
                to="/pricing"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <Link
              to="/pricing"
              className="ml-3 px-4 py-2 text-sm font-medium rounded-md text-white gradient-bg hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:hover:bg-gray-700 dark:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/framework"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:hover:bg-gray-700 dark:text-gray-300"
            >
              Framework
            </Link>
            <Link
              to="/launchpad"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:hover:bg-gray-700 dark:text-gray-300"
            >
              Launchpad
            </Link>
            <Link
              to="/pricing"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:hover:bg-gray-700 dark:text-gray-300"
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
