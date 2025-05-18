
import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here we would typically send the form data to a real API or Google Sheets
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitError('');
      }, 5000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
      
      {submitSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          Thank you! Your message has been sent successfully. We'll be in touch soon.
        </div>
      )}
      
      {submitError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
            required
          />
        </div>
        
        <div className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
            required
          />
        </div>
        
        <div className="relative">
          <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="agency-btn w-full flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
