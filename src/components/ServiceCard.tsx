
import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link = "/services"
}) => {
  return (
    <div className="agency-card h-full flex flex-col transition-transform hover:-translate-y-1 duration-300">
      <div className="bg-agency-softPurple p-4 inline-block rounded-lg mb-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      
      <p className="text-gray-600 mb-6 flex-1">{description}</p>
      
      <Link 
        to={link} 
        className="text-agency-purple font-medium hover:underline mt-auto inline-block"
      >
        Learn more &rarr;
      </Link>
    </div>
  );
};

export default ServiceCard;
