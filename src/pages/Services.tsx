import React from 'react';
import { BrainCircuit } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { services } from '../data/services';
import { Helmet } from 'react-helmet';

const Services = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fix the document.querySelector() issue in handleScrollToService function
  const handleScrollToService = (id: string) => {
    const element = document.querySelector(`#service-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    
      <Helmet>
        <title>AdMaxify - Our Services</title>
        <meta name="description" content="Explore AdMaxify's comprehensive suite of AI-powered digital marketing services designed to elevate your brand and drive measurable results." />
        <meta property="og:title" content="AdMaxify - Our Services" />
        <meta property="og:description" content="Explore AdMaxify's comprehensive suite of AI-powered digital marketing services designed to elevate your brand and drive measurable results." />
        <meta property="og:image" content="URL_TO_YOUR_SERVICES_PAGE_IMAGE" />
        <meta property="og:url" content="URL_TO_YOUR_SERVICES_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl md:text-2xl">AI-Powered Digital Marketing Solutions</p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {services.map(service => (
            
              <div id={`service-${service.id}`} className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-12 last:mb-0">
                
                  <div className="bg-agency-softPurple p-4 rounded-lg md:w-32 md:h-32 flex items-center justify-center">
                    <BrainCircuit size={48} className="text-agency-purple" />
                  </div>
                
                
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    
                      {service.features && service.features.length > 0 && (
                        
                          <h3 className="font-bold mb-2">Key Features:</h3>
                          <ul className="list-disc list-inside text-gray-600">
                            {service.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        
                      )}
                    
                  </div>
                
              </div>
            
          ))}
        </div>
      </section>
      
      <section className="py-12 bg-agency-lightGray">
        <div className="container mx-auto px-4 text-center">
          <button onClick={scrollToTop} className="agency-btn">Back to Top</button>
        </div>
      </section>
      
      <Footer />
    
  );
};

export default Services;
