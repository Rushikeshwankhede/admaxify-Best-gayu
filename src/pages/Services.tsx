
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Search, BrainCircuit, Mail, BarChart, Gauge, Palette, LineChart, FileText, Video, Users, MapPin, Cog } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';

import { allServices } from '../data/services';
import { testimonials } from '../data/testimonials';

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit size={24} className="text-agency-purple" />,
  Search: <Search size={24} className="text-agency-purple" />,
  Mail: <Mail size={24} className="text-agency-purple" />,
  BarChart: <BarChart size={24} className="text-agency-purple" />,
  Gauge: <Gauge size={24} className="text-agency-purple" />,
  Palette: <Palette size={24} className="text-agency-purple" />,
  LineChart: <LineChart size={24} className="text-agency-purple" />,
  FileText: <FileText size={24} className="text-agency-purple" />,
  Video: <Video size={24} className="text-agency-purple" />,
  Users: <Users size={24} className="text-agency-purple" />,
  MapPin: <MapPin size={24} className="text-agency-purple" />,
  Cog: <Cog size={24} className="text-agency-purple" />
};

const Services = () => {
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const filteredServices = allServices.filter(service => 
    service.title.toLowerCase().includes(filter.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(filter.toLowerCase())
  );
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the # symbol
      const element = serviceRefs.current[id];
      
      if (element) {
        // Delay scrolling to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8">
              We offer a comprehensive suite of digital marketing services powered by artificial intelligence to help your business grow.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={filter}
                onChange={handleSearchChange}
                className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                ref={el => serviceRefs.current[`service-${service.id}`] = el}
                id={`service-${service.id}`}
              >
                <ServiceCard
                  title={service.title}
                  description={service.shortDescription}
                  icon={iconMap[service.icon] || <BrainCircuit size={24} className="text-agency-purple" />}
                  link={`#service-detail-${service.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Service Sections */}
      {filteredServices.map((service) => (
        <section 
          key={service.id} 
          id={`service-detail-${service.id}`}
          className={`py-16 ${service.id % 2 === 0 ? 'bg-agency-lightGray' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <div className="bg-agency-softPurple p-4 inline-block rounded-lg mb-6">
                  {iconMap[service.icon] || <BrainCircuit size={24} className="text-agency-purple" />}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h2>
                <p className="text-xl mb-8">{service.fullDescription}</p>
                
                <h3 className="font-bold text-xl mb-4">Key Features</h3>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight size={18} className="text-agency-purple mr-2 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-bold text-xl mb-4">Benefits</h3>
                <ul className="space-y-3 mb-8">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight size={18} className="text-agency-purple mr-2 mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/contact" className="agency-btn inline-block">
                  Get Started
                </Link>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {service.caseStudyId ? (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Success Story</h3>
                      {testimonials.map(testimonial => testimonial.id === service.caseStudyId && (
                        <div key={testimonial.id}>
                          <div className="flex items-start mb-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-16 h-16 rounded-full object-cover mr-4" 
                            />
                            <div>
                              <h4 className="font-bold text-lg">{testimonial.name}</h4>
                              <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4 bg-agency-softPurple bg-opacity-40 p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Results:</span>
                              <span className="font-bold text-agency-purple">{testimonial.resultSummary}</span>
                            </div>
                          </div>
                          
                          <blockquote className="italic text-gray-700 mb-6 border-l-4 border-agency-purple pl-4">
                            "{testimonial.testimonial}"
                          </blockquote>
                          
                          <Link 
                            to={`/testimonials/${testimonial.id}`}
                            className="text-agency-purple font-medium hover:underline"
                          >
                            Read the full case study &rarr;
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                      <p className="mb-6">Our experts are ready to help you implement this service for your business. Contact us today for a free consultation.</p>
                      <Link to="/contact" className="agency-btn inline-block">
                        Book a Consultation
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-agency-navy to-agency-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Marketing?</h2>
            <p className="text-xl mb-8">Get in touch with our team to discuss how we can help you achieve your business goals with our AI-powered marketing solutions.</p>
            <Link to="/contact" className="agency-btn text-lg px-8 py-4">
              Book Free Strategy Call
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
