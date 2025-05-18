
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-agency-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ad<span className="text-agency-purple">Maxify</span></h3>
            <p className="mb-4 text-gray-300">We transform your digital presence with AI-powered marketing strategies that deliver measurable results.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-agency-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-agency-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-agency-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-agency-purple transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-agency-purple transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">Services</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-agency-purple transition-colors">Client Results</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-agency-purple transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-agency-purple transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">Social Media Marketing</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">SEO Optimization</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">Content Creation</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">PPC Advertising</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-agency-purple transition-colors">Email Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:hello@admaxify.com" className="text-gray-300 hover:text-agency-purple transition-colors">hello@admaxify.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-agency-purple transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <p className="text-gray-300">1234 Digital Avenue, Marketing District, CA 90210</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} AdMaxify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
