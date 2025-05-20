
import React, { useState } from 'react';
import { Mail, User, Phone, Calendar, MessageSquare, Clock, Send } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookStrategyCall = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Using FormSubmit service to send emails - it's a simple service that forwards form submissions via email
      const response = await fetch('https://formsubmit.co/rushiwankhede0503@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          date: formData.date,
          time: formData.time,
          message: formData.message,
          _subject: 'New Strategy Call Booking - AIAdmaxify',
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          date: '',
          time: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error('Something went wrong with the form submission');
      }
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or email us directly.');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitError('');
      }, 5000);
    }
    
    setIsSubmitting(false);
  };

  // Generate available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      // Skip weekends
      if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
        const formattedDate = nextDate.toISOString().split('T')[0];
        dates.push(formattedDate);
      }
    }
    
    return dates;
  };
  
  // Generate time slots
  const getTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        if (hour === endHour && minutes > 0) continue;
        
        const formattedHour = hour % 12 || 12;
        const amPm = hour < 12 ? 'AM' : 'PM';
        const formattedMinutes = minutes === 0 ? '00' : minutes;
        
        slots.push(`${formattedHour}:${formattedMinutes} ${amPm}`);
      }
    }
    
    return slots;
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Book Your Free Strategy Call - AIAdmaxify</title>
        <meta name="description" content="Schedule your free strategy call with AIAdmaxify's marketing experts to discuss how we can help grow your business with AI-powered solutions." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Book Your Free Strategy Call</h1>
            <p className="text-xl mb-8">
              Schedule a no-obligation consultation with our marketing experts to discover how AIAdmaxify can transform your business.
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold mb-6">What to Expect</h2>
              <p className="text-lg text-gray-600 mb-8">
                During your free 30-minute strategy call, our experts will:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Analyze Your Current Strategy</h4>
                    <p className="text-gray-600">
                      We'll review your current marketing efforts and identify areas for improvement.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Identify Growth Opportunities</h4>
                    <p className="text-gray-600">
                      Discover untapped opportunities where AI-powered marketing can drive results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Customized Action Plan</h4>
                    <p className="text-gray-600">
                      Get tailored recommendations and a clear roadmap for implementing effective strategies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">No Obligation Consultation</h4>
                    <p className="text-gray-600">
                      Zero pressure, zero commitment—just valuable insights you can implement right away.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6">Schedule Your Call</h2>
                
                {submitSuccess && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                    Thank you! Your strategy call has been scheduled. One of our experts will confirm your appointment shortly.
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
                    <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple appearance-none"
                        required
                      >
                        <option value="">Select Date</option>
                        {getAvailableDates().map(date => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="relative">
                      <Clock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple appearance-none"
                        required
                      >
                        <option value="">Select Time</option>
                        {getTimeSlots().map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What specific challenges would you like to discuss?"
                      rows={4}
                      className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
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
                        Book My Free Strategy Call
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How long is the strategy call?</h3>
                <p className="text-gray-600">
                  Our free strategy calls typically last 30 minutes. This gives us enough time to understand your business needs and provide valuable insights without taking up too much of your day.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Is this just a sales call?</h3>
                <p className="text-gray-600">
                  Not at all. Our strategy calls are focused on providing you with actionable insights and value. While we'll explain how we could help if you're interested, there's absolutely no obligation or pressure to work with us.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Who will I be speaking with?</h3>
                <p className="text-gray-600">
                  You'll speak directly with one of our senior marketing strategists who has extensive experience in AI-powered digital marketing. They'll be able to provide expert insights specific to your industry and business goals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">What should I prepare before the call?</h3>
                <p className="text-gray-600">
                  To get the most out of your strategy call, it's helpful to have a basic understanding of your current marketing metrics, key business goals, and specific challenges you're facing. However, if you don't have this information readily available, that's perfectly fine too.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Can I reschedule if something comes up?</h3>
                <p className="text-gray-600">
                  Absolutely! We understand that schedules change. If you need to reschedule, simply email us or give us a call, and we'll be happy to find a new time that works for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BookStrategyCall;
