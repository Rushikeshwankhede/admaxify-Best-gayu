import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Users, Target, BrainCircuit, ArrowRight, ChevronLeft, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import StatsCounter from '../components/StatsCounter';
import ContactForm from '../components/ContactForm';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const featuredServices = services.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % featuredTestimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % featuredTestimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };
  return <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in">
                Elevate Your Brand with AI-Powered Marketing
              </h1>
              <p className="text-xl opacity-0 animate-fade-in-delay-1 mb-8">
                We combine creative excellence with artificial intelligence to deliver marketing strategies that drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-in-delay-2">
                <Link to="/contact" className="agency-btn">
                  Book Free Strategy Call
                </Link>
                <Link to="/services" className="agency-btn-outline bg-white bg-opacity-10">
                  Explore Our Services
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 opacity-0 animate-fade-in-delay-3">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" alt="AdMaxify team meeting" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <StatsCounter value={97} suffix="%" />
              <p className="text-gray-600 font-medium">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <StatsCounter value={1250} suffix="+" />
              <p className="text-gray-600 font-medium">Campaigns Launched</p>
            </div>
            <div className="space-y-2">
              <StatsCounter value={324} suffix="%" prefix="+" />
              <p className="text-gray-600 font-medium">Average ROI</p>
            </div>
            <div className="space-y-2">
              <StatsCounter value={50} suffix="+" />
              <p className="text-gray-600 font-medium">AI Models Utilized</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AdMaxify?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We combine human creativity with artificial intelligence to deliver marketing strategies that drive exceptional results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-agency-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Driven Insights</h3>
              <p className="text-gray-600">Our proprietary AI models analyze market trends and consumer behavior to create highly effective marketing strategies.</p>
            </div>
            
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Users size={32} className="text-agency-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-gray-600">Our team combines years of industry experience with cutting-edge technical expertise to deliver exceptional results.</p>
            </div>
            
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Target size={32} className="text-agency-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Results Guaranteed</h3>
              <p className="text-gray-600">We're so confident in our approach that we offer performance-based pricing options on many of our services.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Marketing Section */}
      <section className="section-padding text-white bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-Powered Marketing Solutions</h2>
              <p className="text-xl mb-6">At AdMaxify, we harness the power of artificial intelligence to create marketing strategies that deliver measurable results.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                    <BrainCircuit size={20} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Predictive Analytics</h4>
                    <p className="text-gray-300">Our AI models analyze historical data to predict future trends and consumer behavior.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                    <BrainCircuit size={20} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Content Generation</h4>
                    <p className="text-gray-300">AI-assisted content creation helps us produce high-quality, engaging content at scale.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                    <BrainCircuit size={20} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Campaign Optimization</h4>
                    <p className="text-gray-300">Real-time optimization ensures your campaigns are always performing at their best.</p>
                  </div>
                </div>
              </div>
              
              <Link to="/services" className="agency-btn mt-8 inline-block">
                Learn More About Our AI Approach
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <img alt="AI-powered marketing analytics" className="rounded-lg shadow-xl" src="/lovable-uploads/2c17e42b-791f-45d1-8d62-518e918e1070.jpg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive digital marketing solutions tailored to your business goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map(service => <ServiceCard key={service.id} title={service.title} description={service.shortDescription} icon={<BrainCircuit size={24} className="text-agency-purple" />} link={`/services#service-${service.id}`} />)}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="agency-btn-outline inline-flex items-center">
              See All Services
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Results Section (Graph) */}
      <section className="section-padding bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results, Real Growth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our clients see significant improvements in their key metrics after working with AdMaxify.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Average Client Growth</h3>
                <div className="flex space-x-2">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-agency-purple rounded-full inline-block mr-2"></span>
                    With AdMaxify
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full inline-block mr-2"></span>
                    Industry Average
                  </span>
                </div>
              </div>
              
              {/* Graph Visualization */}
              <div className="h-80 w-full relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex">
                  {/* Y-axis */}
                  <div className="w-12 h-full flex flex-col justify-between text-sm text-gray-500 pr-2">
                    <span>300%</span>
                    <span>250%</span>
                    <span>200%</span>
                    <span>150%</span>
                    <span>100%</span>
                    <span>50%</span>
                    <span>0%</span>
                  </div>
                  
                  {/* Graph Content */}
                  <div className="flex-1 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                      <div className="border-b border-gray-200 h-0"></div>
                    </div>
                    
                    {/* Graph Lines - Corrected to stay within bounds */}
                    <div className="absolute inset-0">
                      {/* Industry Average Line */}
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 480 280" preserveAspectRatio="none">
                        <path d="M0,252 L80,240 L160,228 L240,216 L320,210 L400,204 L480,198" fill="none" stroke="#D1D5DB" strokeWidth="3" />
                      </svg>
                      
                      {/* AdMaxify Performance Line */}
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 480 280" preserveAspectRatio="none">
                        <path d="M0,252 L80,210 L160,168 L240,126 L320,84 L400,63 L480,42" fill="none" stroke="#9b87f5" strokeWidth="3" />
                        {/* Animated dot */}
                        <circle cx="480" cy="42" r="6" fill="#9b87f5" className="animate-pulse" />
                      </svg>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 w-full flex justify-between text-sm text-gray-500 transform translate-y-6">
                      <span>Month 1</span>
                      <span>Month 2</span>
                      <span>Month 3</span>
                      <span>Month 4</span>
                      <span>Month 5</span>
                      <span>Month 6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See what our clients have to say about working with AdMaxify.</p>
          </div>
          
          <div className="relative">
            <div className="testimonial-carousel-inner" style={{
            transform: `translateX(-${currentTestimonial * 100}%)`
          }}>
              {featuredTestimonials.map((testimonial, index) => <div key={testimonial.id} className="testimonial-item">
                  <TestimonialCard id={testimonial.id} name={testimonial.name} company={testimonial.company} position={testimonial.position} image={testimonial.image} rating={testimonial.rating} testimonial={testimonial.testimonial} industry={testimonial.industry} resultSummary={testimonial.resultSummary} />
                </div>)}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              <button onClick={prevTestimonial} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>
              
              {featuredTestimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-agency-purple' : 'bg-gray-300'}`} aria-label={`Go to testimonial ${index + 1}`}></button>)}
              
              <button onClick={nextTestimonial} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/testimonials" className="agency-btn inline-flex items-center">
              See More Results
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-agency-navy to-agency-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Digital Marketing?</h2>
              <p className="text-xl">Book a free strategy call with our team to discover how AdMaxify can help grow your business.</p>
            </div>
            <Link to="/contact" className="agency-btn text-lg px-8 py-4 whitespace-nowrap">
              Book Free Strategy Call
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600 mb-8">Have a question or ready to start your journey with us? Reach out today and we'll be in touch shortly.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <Mail size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <a href="mailto:hello@admaxify.com" className="text-agency-purple hover:underline">hello@admaxify.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <Target size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <a href="tel:+1234567890" className="text-agency-purple hover:underline">+1 (234) 567-890</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4 mt-1">
                    <Users size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Follow Us</h4>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                      </a>
                      <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                      </a>
                      <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                      </a>
                      <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;