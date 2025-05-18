
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Users, Award, Lightbulb, TrendingUp, Rocket } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agency-navy to-agency-charcoal text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About AdMaxify</h1>
            <p className="text-xl mb-8">
              We're a team of marketing experts and AI specialists dedicated to helping businesses grow through innovative digital strategies.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6">
                AdMaxify was founded in 2018 by a group of marketing professionals and AI engineers who shared a vision: to revolutionize digital marketing by harnessing the power of artificial intelligence.
              </p>
              <p className="text-lg mb-6">
                We noticed that traditional digital marketing agencies were still relying on outdated methods and gut instinct rather than data and intelligent insights. We set out to change that by building a marketing agency with AI at its core.
              </p>
              <p className="text-lg">
                Since our founding, we've helped hundreds of businesses across various industries achieve remarkable growth through our innovative approach to digital marketing. Our team has expanded to include specialists in every major marketing discipline, all united by our commitment to data-driven excellence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"
                alt="AdMaxify team meeting" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission and Values Section */}
      <section className="py-16 bg-agency-lightGray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At AdMaxify, our mission is to democratize access to cutting-edge marketing technology and strategies that drive remarkable business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Target className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible in digital marketing through AI innovation.
              </p>
            </div>
            
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency with our clients about our strategies, results, and pricing.
              </p>
            </div>
            
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Rocket className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Results-Focused</h3>
              <p className="text-gray-600">
                We measure our success by the tangible results and ROI we deliver for our clients.
              </p>
            </div>
            
            <div className="agency-card text-center">
              <div className="mx-auto bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Lightbulb className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
              <p className="text-gray-600">
                We're committed to staying at the forefront of marketing technology through continuous education.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts combines decades of marketing experience with cutting-edge technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=400&auto=format&fit=crop"
                alt="Sarah Anderson"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">Sarah Anderson</h3>
              <p className="text-agency-purple font-medium mb-4">CEO & Founder</p>
              <p className="text-gray-600 mb-4">
                With over 15 years of experience in digital marketing, Sarah founded AdMaxify with a vision to revolutionize how businesses approach marketing through AI.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop"
                alt="David Chen"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">David Chen</h3>
              <p className="text-agency-purple font-medium mb-4">CTO</p>
              <p className="text-gray-600 mb-4">
                David leads our technology team, bringing expertise in AI, machine learning, and data analytics to create our proprietary marketing intelligence platforms.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop"
                alt="Elena Rodriguez"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">Elena Rodriguez</h3>
              <p className="text-agency-purple font-medium mb-4">Chief Strategy Officer</p>
              <p className="text-gray-600 mb-4">
                Elena oversees all client strategies, ensuring they align with business goals and leverage the full potential of our AI-driven approach.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop"
                alt="Michael Johnson"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">Michael Johnson</h3>
              <p className="text-agency-purple font-medium mb-4">Creative Director</p>
              <p className="text-gray-600 mb-4">
                Michael leads our creative team, combining artistic vision with data-driven insights to create compelling campaigns that resonate with target audiences.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop"
                alt="Olivia Kim"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">Olivia Kim</h3>
              <p className="text-agency-purple font-medium mb-4">Head of Client Success</p>
              <p className="text-gray-600 mb-4">
                Olivia ensures that every client receives exceptional service and achieves their marketing goals through our partnership.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                alt="James Wilson"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-1">James Wilson</h3>
              <p className="text-agency-purple font-medium mb-4">Data Science Lead</p>
              <p className="text-gray-600 mb-4">
                James leads our data science team, developing the AI models and analytics systems that power our marketing strategies.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="text-agency-navy hover:text-agency-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600 mb-6">
              Beyond our leadership team, AdMaxify is powered by a diverse group of over 50 specialists in SEO, content marketing, social media, PPC, design, development, and data analysis.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="py-16 bg-agency-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our AI-Driven Approach</h2>
            <p className="text-xl">
              At AdMaxify, we've developed a unique methodology that combines human creativity with artificial intelligence to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="bg-agency-purple bg-opacity-20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <TrendingUp className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Collection & Analysis</h3>
              <p className="text-gray-300">
                Our AI systems collect and analyze vast amounts of data from your existing marketing channels, competitors, and industry trends to identify opportunities.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="bg-agency-purple bg-opacity-20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategy Development</h3>
              <p className="text-gray-300">
                Based on AI insights, our human strategists create customized marketing plans that align with your business goals and target audience.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="bg-agency-purple bg-opacity-20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Rocket className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Execution & Optimization</h3>
              <p className="text-gray-300">
                We implement campaigns and continuously optimize them using AI-powered tools that make real-time adjustments for maximum performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative approach and exceptional results have earned us recognition from industry leaders.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best AI Marketing Agency</h3>
              <p className="text-gray-600">MarTech Awards 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Most Innovative Agency</h3>
              <p className="text-gray-600">Digital Excellence 2022</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Top 10 Fastest Growing</h3>
              <p className="text-gray-600">Agency Growth Index 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Client Results</h3>
              <p className="text-gray-600">Performance Marketing Awards 2022</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-agency-navy to-agency-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-8">Book a free strategy call with our team to discover how AdMaxify can help grow your business.</p>
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

export default About;
