
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - AIAdmaxify</title>
        <meta name="description" content="Get in touch with AIAdmaxify's team to discuss how our AI-powered marketing solutions can help your business grow." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              Ready to transform your marketing? Get in touch with our team today.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions or ready to start your journey with us? Our team is here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <Mail size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <a href="mailto:hello@aiadmaxify.com" className="text-gray-600 hover:text-agency-purple">hello@aiadmaxify.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <Phone size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Phone</h4>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-agency-purple">+1 (234) 567-890</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <MapPin size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Address</h4>
                    <p className="text-gray-600">
                      1234 Digital Avenue<br />
                      Marketing District<br />
                      CA 90210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-agency-softPurple p-3 rounded-full mr-4">
                    <Clock size={24} className="text-agency-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6">Book Your Free Strategy Call</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Schedule a no-obligation strategy call with our marketing experts to discuss your business goals and how AIAdmaxify can help you achieve them.
                </p>
                
                <ContactForm />
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
                <h3 className="text-xl font-bold mb-3">How soon can we expect to see results?</h3>
                <p className="text-gray-600">
                  While every business is different, most of our clients begin to see measurable improvements within the first 30 days. More significant results typically become apparent after 60-90 days as our AI systems gather more data to optimize your campaigns.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Do you require long-term contracts?</h3>
                <p className="text-gray-600">
                  No, we don't believe in locking clients into lengthy contracts. We offer month-to-month services because we're confident in the results we deliver. We do recommend a minimum 3-month commitment to allow enough time for our strategies to show their full potential.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How is AIAdmaxify different from other marketing agencies?</h3>
                <p className="text-gray-600">
                  Our key differentiator is our AI-first approach. While many agencies claim to use AI, it's at the core of everything we do. Our proprietary AI systems analyze data, predict trends, and optimize campaigns in ways that traditional agencies simply cannot match. Plus, we provide unparalleled transparency through our real-time reporting dashboards.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">What industries do you specialize in?</h3>
                <p className="text-gray-600">
                  We've successfully worked with clients across many industries, including e-commerce, SaaS, healthcare, finance, real estate, and professional services. Our AI-driven approach allows us to quickly understand the nuances of any market and develop effective strategies.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How much does it cost to work with AIAdmaxify?</h3>
                <p className="text-gray-600">
                  We offer customized packages based on your specific needs and goals. Our services typically start at $3,500 per month, with pricing varying based on the scope of services, competitive landscape, and resources required. We're happy to provide a detailed quote during your free strategy call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-agency-softPurple rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Not Ready to Talk Yet?</h2>
                <p className="text-xl text-gray-700">
                  Explore our resources to learn more about our approach to digital marketing.
                </p>
              </div>
              <a 
                href="/services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="agency-btn whitespace-nowrap inline-flex items-center"
              >
                Explore Our Services
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
