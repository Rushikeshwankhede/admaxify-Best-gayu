
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-playfair text-agency-navy text-2xl font-bold">Ad<span className="text-agency-purple">Maxify</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-agency-navy font-medium hover:text-agency-purple transition-colors">Home</Link>
            <Link to="/services" className="text-agency-navy font-medium hover:text-agency-purple transition-colors">Services</Link>
            <Link to="/testimonials" className="text-agency-navy font-medium hover:text-agency-purple transition-colors">Results</Link>
            <Link to="/about" className="text-agency-navy font-medium hover:text-agency-purple transition-colors">About Us</Link>
            <Link to="/contact" className="agency-btn">Book Free Call</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-slide-in fixed left-0 top-[72px] w-full h-screen">
          <div className="flex flex-col p-4 space-y-6 pt-8">
            <Link to="/" className="text-xl font-medium text-agency-navy hover:text-agency-purple" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/services" className="text-xl font-medium text-agency-navy hover:text-agency-purple" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/testimonials" className="text-xl font-medium text-agency-navy hover:text-agency-purple" onClick={() => setIsMenuOpen(false)}>Results</Link>
            <Link to="/about" className="text-xl font-medium text-agency-navy hover:text-agency-purple" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="agency-btn text-center" onClick={() => setIsMenuOpen(false)}>Book Free Call</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
