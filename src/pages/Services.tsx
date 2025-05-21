
import React, { useEffect, useState } from 'react';
import { BrainCircuit, Search, BarChart, Mail, Gauge, Palette, LineChart, FileText, Video, Users, MapPin, Cog } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { mapDbServiceToService, mapDbTestimonialToTestimonial } from '@/lib/dataTransformers';
import { Testimonial } from '@/types/admin';

const Services = () => {
  const [testimonialMap, setTestimonialMap] = useState<Record<string, Testimonial>>({});

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching services:', error);
        return [];
      }
      
      return data.map(service => mapDbServiceToService(service));
    }
  });

  // Fetch testimonials for case studies
  useEffect(() => {
    const caseStudyIds = services
      .filter(service => service.caseStudyId)
      .map(service => service.caseStudyId);
      
    if (caseStudyIds.length > 0) {
      const fetchTestimonials = async () => {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .in('id', caseStudyIds);
          
        if (error) {
          console.error('Error fetching testimonials:', error);
          return;
        }
        
        const testimonialData = data.reduce((acc, testimonial) => {
          // Use the transformer to convert DB type to our frontend type
          acc[testimonial.id] = mapDbTestimonialToTestimonial(testimonial);
          return acc;
        }, {} as Record<string, Testimonial>);
        
        setTestimonialMap(testimonialData);
      };
      
      fetchTestimonials();
    }
  }, [services]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scrolling to service details when "Learn More" is clicked
  const handleScrollToService = (id: string) => {
    const element = document.getElementById(`service-detail-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get the right icon for the service
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit size={48} className="text-agency-purple" />;
      case 'Search':
        return <Search size={48} className="text-agency-purple" />;
      case 'BarChart':
        return <BarChart size={48} className="text-agency-purple" />;
      case 'Mail':
        return <Mail size={48} className="text-agency-purple" />;
      case 'Gauge':
        return <Gauge size={48} className="text-agency-purple" />;
      case 'Palette':
        return <Palette size={48} className="text-agency-purple" />;
      case 'LineChart':
        return <LineChart size={48} className="text-agency-purple" />;
      case 'FileText':
        return <FileText size={48} className="text-agency-purple" />;
      case 'Video':
        return <Video size={48} className="text-agency-purple" />;
      case 'Users':
        return <Users size={48} className="text-agency-purple" />;
      case 'MapPin':
        return <MapPin size={48} className="text-agency-purple" />;
      case 'Cog':
        return <Cog size={48} className="text-agency-purple" />;
      default:
        return <BrainCircuit size={48} className="text-agency-purple" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>AIAdmaxify - Our Services</title>
        <meta name="description" content="Explore AIAdmaxify's comprehensive suite of AI-powered digital marketing services designed to elevate your brand and drive measurable results." />
        <meta property="og:title" content="AIAdmaxify - Our Services" />
        <meta property="og:description" content="Explore AIAdmaxify's comprehensive suite of AI-powered digital marketing services designed to elevate your brand and drive measurable results." />
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
      
      {/* Services Overview Section - Now with Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} id={`service-${service.id}`} className="agency-card h-full flex flex-col transition-transform hover:-translate-y-2 duration-300">
                  <div className="bg-agency-softPurple p-6 rounded-lg inline-block mb-6">
                    {getServiceIcon(service.icon)}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-gray-700 mb-4 flex-grow">{service.shortDescription}</p>
                  
                  {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                    <>
                      <h3 className="font-bold mb-2 text-agency-navy">Key Features:</h3>
                      <ul className="list-disc list-inside text-gray-600 mb-4 pl-2">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="mb-1">{feature}</li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-agency-purple">+ {service.features.length - 3} more features</li>
                        )}
                      </ul>
                    </>
                  )}
                  
                  <button 
                    onClick={() => handleScrollToService(service.id)} 
                    className="mt-auto text-white bg-agency-purple hover:bg-agency-navy transition-colors duration-300 px-5 py-2 rounded-md inline-flex items-center"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Service Details Section with Client Testimonials */}
      <section className="py-16 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Details & Client Success Stories</h2>
          
          {services.map(service => {
            // Find a related testimonial for this service if available
            const relatedTestimonial = service.caseStudyId 
              ? testimonialMap[service.caseStudyId]
              : null;
              
            return (
              <div 
                key={service.id} 
                id={`service-detail-${service.id}`} 
                className="bg-white rounded-lg shadow-lg p-8 mb-12 last:mb-0"
              >
                <h3 className="text-2xl font-bold mb-4 text-agency-navy">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.fullDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {Array.isArray(service.benefits) && service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-agency-softPurple p-1 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">What We Deliver:</h4>
                    <ul className="space-y-2">
                      {Array.isArray(service.features) && service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-agency-softPurple p-1 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {relatedTestimonial && (
                  <div className="border-t border-gray-200 pt-8 mt-8">
                    <h4 className="text-xl font-semibold mb-6">Client Success Story:</h4>
                    <div className="bg-agency-softPurple bg-opacity-30 rounded-lg p-6">
                      <div className="flex items-start mb-4">
                        <img 
                          src={relatedTestimonial.image} 
                          alt={relatedTestimonial.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h5 className="font-bold">{relatedTestimonial.name}</h5>
                          <p className="text-sm text-gray-600">{relatedTestimonial.position}, {relatedTestimonial.company}</p>
                        </div>
                      </div>
                      
                      <blockquote className="italic text-gray-700 mb-4 border-l-4 border-agency-purple pl-4">
                        "{relatedTestimonial.testimonial}"
                      </blockquote>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white bg-opacity-70 p-4 rounded-md">
                          <span className="block text-sm font-medium text-gray-600">Before:</span>
                          <span className="block font-semibold">{relatedTestimonial.results.before}</span>
                        </div>
                        
                        <div className="bg-white bg-opacity-70 p-4 rounded-md">
                          <span className="block text-sm font-medium text-gray-600">After:</span>
                          <span className="block font-semibold text-agency-purple">{relatedTestimonial.results.after}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-agency-navy to-agency-charcoal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Digital Marketing?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Partner with AIAdmaxify and leverage AI-powered marketing solutions to achieve outstanding results for your business.
          </p>
          <a 
            href="/book-strategy-call" 
            target="_blank"
            rel="noopener noreferrer"
            className="agency-btn inline-block"
          >
            Book Free Strategy Call
          </a>
        </div>
      </section>
      
      <section className="py-12 bg-agency-lightGray">
        <div className="container mx-auto px-4 text-center">
          <button onClick={scrollToTop} className="agency-btn">Back to Top</button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Services;
