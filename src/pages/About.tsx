
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Users, Award, Lightbulb, TrendingUp, Rocket, Medal, Star, Cpu, Trophy } from 'lucide-react';

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About AIAdmaxify</h1>
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
                AIAdmaxify was founded in 2018 by a group of marketing professionals and AI engineers who shared a vision: to revolutionize digital marketing by harnessing the power of artificial intelligence.
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
                alt="AIAdmaxify team meeting" 
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
              At AIAdmaxify, our mission is to democratize access to cutting-edge marketing technology and strategies that drive remarkable business growth.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts combines decades of marketing experience with cutting-edge technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Leadership Team Members */}
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=400&auto=format&fit=crop"
                alt="Sarah Anderson"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Sarah Anderson</h3>
              <p className="text-agency-purple font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in digital marketing, Sarah founded AIAdmaxify with a vision to revolutionize marketing through AI.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop"
                alt="David Chen"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">David Chen</h3>
              <p className="text-agency-purple font-medium mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                David leads our technology team, bringing expertise in AI and machine learning to our marketing platforms.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop"
                alt="Elena Rodriguez"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Elena Rodriguez</h3>
              <p className="text-agency-purple font-medium mb-2">Chief Strategy Officer</p>
              <p className="text-gray-600 text-sm">
                Elena oversees all client strategies, ensuring they align with business goals and leverage our AI-driven approach.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop"
                alt="Michael Johnson"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Michael Johnson</h3>
              <p className="text-agency-purple font-medium mb-2">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Michael leads our creative team, combining artistic vision with data-driven insights.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop"
                alt="Olivia Kim"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Olivia Kim</h3>
              <p className="text-agency-purple font-medium mb-2">Head of Client Success</p>
              <p className="text-gray-600 text-sm">
                Olivia ensures that every client receives exceptional service and achieves their marketing goals.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                alt="James Wilson"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">James Wilson</h3>
              <p className="text-agency-purple font-medium mb-2">Data Science Lead</p>
              <p className="text-gray-600 text-sm">
                James leads our data science team, developing the AI models and analytics systems.
              </p>
            </div>

            {/* Additional Team Members */}
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
                alt="Maya Patel"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Maya Patel</h3>
              <p className="text-agency-purple font-medium mb-2">Head of SEO</p>
              <p className="text-gray-600 text-sm">
                Maya leads our SEO strategies with a focus on AI-powered optimization techniques.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
                alt="Daniel Smith"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Daniel Smith</h3>
              <p className="text-agency-purple font-medium mb-2">PPC Specialist</p>
              <p className="text-gray-600 text-sm">
                Daniel manages our pay-per-click campaigns, optimizing ad spend with predictive AI models.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop"
                alt="Sofia Wang"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Sofia Wang</h3>
              <p className="text-agency-purple font-medium mb-2">Content Strategy Lead</p>
              <p className="text-gray-600 text-sm">
                Sofia develops content strategies that blend creativity with data-driven insights.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop"
                alt="Alex Taylor"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Alex Taylor</h3>
              <p className="text-agency-purple font-medium mb-2">UX/UI Design Lead</p>
              <p className="text-gray-600 text-sm">
                Alex creates user-centered designs that improve conversion rates and user engagement.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop"
                alt="Thomas Green"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Thomas Green</h3>
              <p className="text-agency-purple font-medium mb-2">AI Development Manager</p>
              <p className="text-gray-600 text-sm">
                Thomas oversees the development of our proprietary AI marketing technologies.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
                alt="Amara Nelson"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Amara Nelson</h3>
              <p className="text-agency-purple font-medium mb-2">Social Media Director</p>
              <p className="text-gray-600 text-sm">
                Amara develops cutting-edge social strategies that leverage predictive analytics.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop"
                alt="Jackson Lee"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Jackson Lee</h3>
              <p className="text-agency-purple font-medium mb-2">Analytics Lead</p>
              <p className="text-gray-600 text-sm">
                Jackson turns complex data into actionable marketing intelligence for our clients.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1584999734482-0361aecad844?w=400&auto=format&fit=crop"
                alt="Emma Rivera"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Emma Rivera</h3>
              <p className="text-agency-purple font-medium mb-2">Client Relations Manager</p>
              <p className="text-gray-600 text-sm">
                Emma ensures our clients receive personalized attention and exceptional service.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop"
                alt="Raj Patel"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Raj Patel</h3>
              <p className="text-agency-purple font-medium mb-2">Marketing Automation Specialist</p>
              <p className="text-gray-600 text-sm">
                Raj implements sophisticated marketing automation systems driven by AI.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&auto=format&fit=crop"
                alt="Gabriel Santos"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Gabriel Santos</h3>
              <p className="text-agency-purple font-medium mb-2">Conversion Rate Optimizer</p>
              <p className="text-gray-600 text-sm">
                Gabriel specializes in turning website visitors into customers through data-driven optimizations.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&auto=format&fit=crop"
                alt="Lily Zhang"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Lily Zhang</h3>
              <p className="text-agency-purple font-medium mb-2">Marketing Strategist</p>
              <p className="text-gray-600 text-sm">
                Lily develops comprehensive marketing strategies tailored to each client's unique needs.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&auto=format&fit=crop"
                alt="Noah Williams"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Noah Williams</h3>
              <p className="text-agency-purple font-medium mb-2">Video Marketing Specialist</p>
              <p className="text-gray-600 text-sm">
                Noah creates compelling video content optimized for maximum engagement and conversion.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop"
                alt="Zoe Martinez"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Zoe Martinez</h3>
              <p className="text-agency-purple font-medium mb-2">Email Marketing Manager</p>
              <p className="text-gray-600 text-sm">
                Zoe designs personalized email campaigns that use predictive analytics to drive engagement.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&auto=format&fit=crop"
                alt="Leo King"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Leo King</h3>
              <p className="text-agency-purple font-medium mb-2">Copywriting Lead</p>
              <p className="text-gray-600 text-sm">
                Leo creates persuasive copy that converts, enhanced by AI-driven optimization.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&auto=format&fit=crop"
                alt="Isabel Clarke"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Isabel Clarke</h3>
              <p className="text-agency-purple font-medium mb-2">Market Research Analyst</p>
              <p className="text-gray-600 text-sm">
                Isabel identifies market trends and opportunities using advanced analytics.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&auto=format&fit=crop"
                alt="Ryan Mitchell"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Ryan Mitchell</h3>
              <p className="text-agency-purple font-medium mb-2">E-commerce Specialist</p>
              <p className="text-gray-600 text-sm">
                Ryan helps online retailers optimize their marketing funnel with AI-driven insights.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop"
                alt="Ava Thompson"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Ava Thompson</h3>
              <p className="text-agency-purple font-medium mb-2">PR & Communications Lead</p>
              <p className="text-gray-600 text-sm">
                Ava manages our clients' public relations strategies with a data-first approach.
              </p>
            </div>
            
            <div className="agency-card">
              <img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&auto=format&fit=crop"
                alt="Marcus Brown"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">Marcus Brown</h3>
              <p className="text-agency-purple font-medium mb-2">Business Development</p>
              <p className="text-gray-600 text-sm">
                Marcus identifies strategic growth opportunities for our clients and our agency.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600 mb-6">
              Beyond our leadership team, AIAdmaxify is powered by a diverse group of over 50 specialists in SEO, content marketing, social media, PPC, design, development, and data analysis.
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
              At AIAdmaxify, we've developed a unique methodology that combines human creativity with artificial intelligence to deliver exceptional results.
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best AI Marketing Agency</h3>
              <p className="text-gray-600">MarTech Awards 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Most Innovative Agency</h3>
              <p className="text-gray-600">Digital Excellence 2022</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Top 10 Fastest Growing</h3>
              <p className="text-gray-600">Agency Growth Index 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Client Results</h3>
              <p className="text-gray-600">Performance Marketing Awards 2022</p>
            </div>

            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Cpu className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">AI Excellence Award</h3>
              <p className="text-gray-600">Tech Innovators 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Medal className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Use of AI in Marketing</h3>
              <p className="text-gray-600">Global Marketing Excellence 2023</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Top Marketing Agency</h3>
              <p className="text-gray-600">Business Growth Awards 2022</p>
            </div>
            
            <div className="agency-card text-center p-6">
              <div className="bg-agency-softPurple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-agency-purple" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Workplace Culture</h3>
              <p className="text-gray-600">Employer Excellence 2023</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-agency-navy to-agency-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-8">Book a free strategy call with our team to discover how AIAdmaxify can help grow your business.</p>
            <a 
              href="/book-strategy-call" 
              target="_blank"
              rel="noopener noreferrer" 
              className="agency-btn text-lg px-8 py-4"
            >
              Book Free Strategy Call
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
