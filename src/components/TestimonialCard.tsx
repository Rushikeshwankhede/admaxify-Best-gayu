
import React, { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface TestimonialCardProps {
  id: number;
  name: string;
  company: string;
  position: string;
  image: string;
  rating: number;
  testimonial: string;
  industry?: string;
  resultSummary?: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  id,
  name,
  company,
  position,
  image,
  rating,
  testimonial,
  industry,
  resultSummary
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortTestimonial = testimonial.substring(0, 150) + (testimonial.length > 150 ? '...' : '');
  return <div className="agency-card h-full flex flex-col rounded-3xl">
      <div className="flex items-start mb-4">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-600">{position}, {company}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
          </div>
        </div>
      </div>
      
      {industry && resultSummary && <div className="mb-4 bg-agency-softPurple bg-opacity-40 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Industry: {industry}</span>
            <span className="text-sm font-medium text-agency-purple">{resultSummary}</span>
          </div>
        </div>}
      
      <p className="text-gray-700 mb-4 flex-1">
        {isExpanded ? testimonial : shortTestimonial}
      </p>
      
      <div className="flex justify-between items-center mt-auto">
        {testimonial.length > 150 && !isExpanded && <button onClick={() => setIsExpanded(true)} className="text-agency-purple font-medium flex items-center hover:underline">
            Read More
            <ChevronRight size={16} className="ml-1" />
          </button>}
        
        <Link to={`/testimonials/${id}`} className="text-agency-purple font-medium flex items-center ml-auto hover:underline">
          View Full Case Study
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>;
};
export default TestimonialCard;
