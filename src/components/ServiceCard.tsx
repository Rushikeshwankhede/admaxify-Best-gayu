
import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  serviceId?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link = "/services",
  serviceId
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // If this is a hash link or a service detail link, handle the smooth scrolling
    if (link.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (serviceId) {
      // If we have a serviceId, we're going to the services page detail
      e.preventDefault();
      // Navigate to the services page with the service detail anchor
      window.open(`/services#service-detail-${serviceId}`, '_blank');
    }
  };

  return (
    <div className="agency-card h-full flex flex-col transition-transform hover:-translate-y-1 duration-300">
      <div className="bg-agency-softPurple p-4 inline-block rounded-lg mb-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      
      <p className="text-gray-600 mb-6 flex-1">{description}</p>
      
      {link.includes('book-strategy-call') ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-agency-purple font-medium hover:underline mt-auto inline-block"
        >
          Learn more &rarr;
        </a>
      ) : (
        <Link 
          to={link} 
          onClick={handleClick}
          className="text-agency-purple font-medium hover:underline mt-auto inline-block"
          target={link.startsWith('/') && !serviceId ? "_blank" : undefined}
          rel={link.startsWith('/') && !serviceId ? "noopener noreferrer" : undefined}
        >
          Learn more &rarr;
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
