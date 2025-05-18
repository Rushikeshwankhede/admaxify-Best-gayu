
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, TrendingUp, Award, Star } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { allTestimonials, Testimonial } from '../data/testimonials';

const TestimonialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [relatedTestimonials, setRelatedTestimonials] = useState<Testimonial[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const testimonialId = parseInt(id);
      const foundTestimonial = allTestimonials.find(t => t.id === testimonialId);
      
      if (foundTestimonial) {
        setTestimonial(foundTestimonial);
        
        // Find related testimonials from the same industry
        const related = allTestimonials
          .filter(t => t.industry === foundTestimonial.industry && t.id !== testimonialId)
          .slice(0, 3);
          
        setRelatedTestimonials(related);
      }
    }
  }, [id]);
  
  if (!testimonial) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-6">Testimonial not found</h1>
          <Link to="/testimonials" className="agency-btn">
            Back to Testimonials
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/testimonials" className="inline-flex items-center text-white hover:text-agency-purple mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to All Testimonials
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How AdMaxify Helped {testimonial.company} Achieve {testimonial.resultSummary}
            </h1>
            
            <div className="flex items-center mb-6">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-16 h-16 rounded-full object-cover mr-4" 
              />
              <div>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-300">{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 lg:pr-12 mb-12 lg:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Client Overview</h2>
                <p className="mb-6">
                  {testimonial.company} is a leading company in the {testimonial.industry} industry, facing common challenges like intense competition, rising acquisition costs, and the need to stand out in a crowded marketplace.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-agency-lightGray p-4 rounded-md">
                    <h3 className="font-bold mb-2">Industry</h3>
                    <p>{testimonial.industry}</p>
                  </div>
                  <div className="bg-agency-softPurple p-4 rounded-md">
                    <h3 className="font-bold mb-2">Key Result</h3>
                    <p className="text-agency-purple font-bold">{testimonial.resultSummary}</p>
                  </div>
                </div>
                
                <blockquote className="italic text-gray-700 mb-6 border-l-4 border-agency-purple pl-4">
                  "{testimonial.testimonial}"
                </blockquote>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="mb-4">
                  When {testimonial.company} approached AdMaxify, they were facing several critical challenges:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="bg-agency-softPurple p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Difficulty reaching their target audience effectively</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-softPurple p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>High customer acquisition costs eating into profitability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-softPurple p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Inconsistent marketing results despite significant investment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-softPurple p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Lack of clear insights into marketing performance and ROI</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <p className="mb-4">
                  After conducting a comprehensive analysis of {testimonial.company}'s business, target audience, and competitive landscape, our team developed a customized AI-powered marketing strategy:
                </p>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="font-bold text-xl mb-2">1. Data-Driven Audience Insights</h3>
                    <p>
                      We deployed our AI analytics platform to identify high-value customer segments and understand their behavior patterns, preferences, and pain points.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-2">2. Multi-Channel Strategy</h3>
                    <p>
                      We created a coordinated marketing approach across social media, search, email, and content platforms, with each channel optimized based on AI-generated insights.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-2">3. Personalized Content Creation</h3>
                    <p>
                      Our team developed highly targeted content that resonated with specific audience segments, improving engagement and conversion rates.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-2">4. Continuous Optimization</h3>
                    <p>
                      Our AI systems continuously monitored campaign performance and made real-time adjustments to improve results and reduce costs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">The Results</h2>
                <p className="mb-6">
                  Within {testimonial.results.timeframe}, {testimonial.company} experienced significant improvements across all key metrics:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-agency-lightGray p-6 rounded-md">
                    <h3 className="font-bold mb-2 text-lg">Before AdMaxify</h3>
                    <p className="text-xl">{testimonial.results.before}</p>
                  </div>
                  <div className="bg-agency-softPurple p-6 rounded-md">
                    <h3 className="font-bold mb-2 text-lg">After AdMaxify</h3>
                    <p className="text-xl font-bold">{testimonial.results.after}</p>
                  </div>
                </div>
                
                <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden mb-8">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-agency-purple to-agency-navy rounded-full flex items-center justify-center text-white font-bold"
                    style={{ width: '75%' }}
                  >
                    75% Improvement
                  </div>
                </div>
                
                <p className="mb-4">
                  Beyond these impressive numbers, {testimonial.company} also benefited from:
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <TrendingUp size={18} className="text-agency-purple mr-3 mt-1" />
                    <span>Improved brand recognition and authority in their industry</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp size={18} className="text-agency-purple mr-3 mt-1" />
                    <span>Higher customer retention rates and lifetime value</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp size={18} className="text-agency-purple mr-3 mt-1" />
                    <span>Valuable customer insights that informed product development</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp size={18} className="text-agency-purple mr-3 mt-1" />
                    <span>A scalable marketing framework that continues to deliver results</span>
                  </li>
                </ul>
                
                <blockquote className="italic text-gray-700 border-l-4 border-agency-purple pl-4">
                  "{testimonial.fullCaseStudy}"
                </blockquote>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Ready to achieve similar results?</h3>
                  <p className="text-gray-600 mb-6">
                    Our team is ready to help your business grow with our proven AI-powered marketing strategies.
                  </p>
                  <Link to="/contact" className="agency-btn w-full text-center">
                    Book Your Free Strategy Call
                  </Link>
                </div>
                
                {relatedTestimonials.length > 0 && (
                  <div className="bg-agency-softPurple bg-opacity-30 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Related Success Stories</h3>
                    
                    <div className="space-y-4">
                      {relatedTestimonials.map(relatedTestimonial => (
                        <Link 
                          key={relatedTestimonial.id}
                          to={`/testimonials/${relatedTestimonial.id}`}
                          className="block bg-white rounded-md p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mb-2">
                            <img 
                              src={relatedTestimonial.image} 
                              alt={relatedTestimonial.name} 
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <h4 className="font-bold">{relatedTestimonial.name}</h4>
                              <p className="text-sm text-gray-600">{relatedTestimonial.company}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{relatedTestimonial.industry}</span>
                            <span className="text-sm font-medium text-agency-purple">{relatedTestimonial.resultSummary}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-agency-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8">
              Join {testimonial.company} and hundreds of other businesses that have transformed their marketing with AdMaxify.
            </p>
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

export default TestimonialDetail;
