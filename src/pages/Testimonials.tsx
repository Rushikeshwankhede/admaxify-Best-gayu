
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCard from '../components/TestimonialCard';

import { allTestimonials } from '../data/testimonials';

const Testimonials = () => {
  const [filter, setFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [visibleCount, setVisibleCount] = useState(9);
  
  // Extract unique industries
  const industries = ['All', ...Array.from(new Set(allTestimonials.map(t => t.industry)))];
  
  // Filter testimonials
  const filteredTestimonials = allTestimonials.filter(testimonial => {
    const searchMatch = 
      testimonial.name.toLowerCase().includes(filter.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(filter.toLowerCase()) ||
      testimonial.testimonial.toLowerCase().includes(filter.toLowerCase()) ||
      testimonial.industry.toLowerCase().includes(filter.toLowerCase());
      
    const industryMatch = industryFilter === 'All' || testimonial.industry === industryFilter;
    
    return searchMatch && industryMatch;
  });
  
  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return b.id - a.id; // Assuming newer testimonials have higher IDs
    }
  });
  
  const visibleTestimonials = sortedTestimonials.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustryFilter(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'newest' | 'highest');
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Client Success Stories - AIAdmaxify</title>
        <meta name="description" content="Discover how AIAdmaxify has helped businesses achieve remarkable results with AI-powered marketing strategies." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Client Success Stories</h1>
            <p className="text-xl mb-8">
              Discover how AIAdmaxify has helped businesses like yours achieve remarkable results with AI-powered marketing strategies.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="md:w-1/2 lg:w-1/3">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={filter}
                  onChange={handleSearchChange}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  id="industry"
                  value={industryFilter}
                  onChange={handleIndustryChange}
                  className="w-full py-3 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full py-3 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agency-purple"
                >
                  <option value="newest">Newest</option>
                  <option value="highest">Highest Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {visibleTestimonials.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="h-full">
                    <TestimonialCard
                      id={testimonial.id}
                      name={testimonial.name}
                      company={testimonial.company}
                      position={testimonial.position}
                      image={testimonial.image}
                      rating={testimonial.rating}
                      testimonial={testimonial.testimonial}
                      industry={testimonial.industry}
                      resultSummary={testimonial.resultSummary}
                    />
                  </div>
                ))}
              </div>
              
              {visibleCount < filteredTestimonials.length && (
                <div className="text-center mt-16">
                  <button
                    onClick={loadMore}
                    className="agency-btn"
                  >
                    Load More Testimonials
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No testimonials found</h3>
              <p className="text-lg text-gray-600 mb-8">
                We couldn't find any testimonials matching your search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setFilter('');
                  setIndustryFilter('All');
                }}
                className="agency-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section className="py-16 bg-agency-navy text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Success Story</h2>
              <div className="flex items-start mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="Sarah Johnson" 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-bold text-lg">Sarah Johnson</h4>
                  <p className="text-gray-300">CEO, Bloom Beauty</p>
                </div>
              </div>
              
              <div className="mb-6 bg-white bg-opacity-10 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-300">Results:</span>
                  <span className="font-bold text-agency-purple">+187% Sales Growth</span>
                </div>
              </div>
              
              <blockquote className="italic text-gray-200 mb-6 border-l-4 border-agency-purple pl-4">
                "AIAdmaxify completely transformed our digital marketing approach. Their AI-driven strategies helped us reach our target audience with unprecedented accuracy. Our online sales increased by 187% within just three months of working with them. They're not just service providers; they're true partners in our growth journey."
              </blockquote>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span>Before AIAdmaxify:</span>
                  <span>$12,000 monthly revenue</span>
                </div>
                <div className="flex justify-between">
                  <span>After AIAdmaxify:</span>
                  <span>$34,500 monthly revenue</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeframe:</span>
                  <span>3 months</span>
                </div>
              </div>
              
              <Link to="/testimonials/1" className="agency-btn inline-flex items-center">
                Read Full Case Study
                <ArrowUpRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-agency-purple to-agency-navy rounded-lg overflow-hidden shadow-xl">
                <div className="p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1583266583518-354c0c141eb3?w=800&auto=format&fit=crop" 
                    alt="Beauty product sales growth chart" 
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
              
              <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4">Key Strategies Used</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>AI-powered audience segmentation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Dynamic content personalization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Targeted social media advertising</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-agency-purple bg-opacity-20 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-agency-purple"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span>Conversion rate optimization</span>
                  </li>
                </ul>
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
                <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
                <p className="text-xl text-gray-700">
                  Join our satisfied clients and transform your marketing with AI-powered solutions.
                </p>
              </div>
              <a 
                href="/book-strategy-call" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="agency-btn whitespace-nowrap"
              >
                Book Free Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
