
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-9xl font-bold text-agency-purple mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</p>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="agency-btn inline-flex items-center">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
