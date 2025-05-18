
export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  image: string;
  rating: number;
  testimonial: string;
  industry: string;
  resultSummary: string;
  results: {
    before: string;
    after: string;
    timeframe: string;
  };
  fullCaseStudy: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Bloom Beauty",
    position: "CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    testimonial: "AdMaxify completely transformed our digital marketing approach. Their AI-driven strategies helped us reach our target audience with unprecedented accuracy. Our online sales increased by 187% within just three months of working with them. They're not just service providers; they're true partners in our growth journey.",
    industry: "Beauty & Cosmetics",
    resultSummary: "+187% Sales Growth",
    results: {
      before: "$12,000 monthly revenue",
      after: "$34,500 monthly revenue",
      timeframe: "3 months"
    },
    fullCaseStudy: "When we approached AdMaxify, our online presence was minimal and we were struggling to connect with our target audience. Their team conducted a thorough analysis of our market and competitors, then developed a comprehensive strategy leveraging AI-powered customer insights. They overhauled our social media presence, implemented targeted PPC campaigns, and created engaging content that resonated with our audience. The results were immediate and substantial - not just in terms of sales, but also brand recognition and customer loyalty."
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "TechNova Solutions",
    position: "Marketing Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 5,
    testimonial: "As a tech company, we know good technology when we see it. AdMaxify's AI-powered marketing tools are genuinely impressive. They helped us optimize our ad spend and increased our lead generation by 145%. Their data-driven approach and transparent reporting made it easy to see the ROI. Highly recommended!",
    industry: "SaaS",
    resultSummary: "145% More Leads",
    results: {
      before: "87 qualified leads monthly",
      after: "213 qualified leads monthly",
      timeframe: "4 months"
    },
    fullCaseStudy: "At TechNova, we were generating a steady stream of leads but knew we could be doing better. AdMaxify's approach was methodical and data-driven from day one. They implemented advanced tracking and attribution models that gave us insights we never had before. By leveraging AI to optimize our campaigns in real-time, they were able to significantly reduce our cost per acquisition while simultaneously increasing conversion rates. Their team also improved our content strategy, creating thought leadership pieces that established us as industry experts."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Healthy Harvest",
    position: "Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    rating: 5,
    testimonial: "AdMaxify understood our mission to promote healthy, sustainable food options. Their targeted campaigns reached exactly the audience we wanted to connect with. Our website traffic increased by 210% and our subscription service grew by 75% in just two months. They also helped us refine our brand messaging to better resonate with our eco-conscious consumers.",
    industry: "Food & Beverage",
    resultSummary: "+75% Subscriptions",
    results: {
      before: "320 active subscribers",
      after: "560 active subscribers",
      timeframe: "2 months"
    },
    fullCaseStudy: "Healthy Harvest was facing stiff competition in the increasingly crowded healthy food delivery space. AdMaxify helped us identify our unique selling propositions and communicated them effectively through various digital channels. They developed a content strategy centered around sustainability and wellness that perfectly aligned with our brand values. Their social media campaigns were particularly effective, building a community around our brand rather than just promoting products. They also implemented sophisticated email marketing funnels that significantly improved our customer retention rates."
  },
  {
    id: 4,
    name: "David Wilson",
    company: "Peak Performance Fitness",
    position: "Owner",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    rating: 4,
    testimonial: "After struggling with generic marketing approaches, AdMaxify's personalized strategy was exactly what our fitness studio needed. Their team helped us implement targeted local SEO and social media campaigns that brought in a steady stream of new clients. Our class bookings increased by 92% within the first month!",
    industry: "Fitness",
    resultSummary: "+92% Class Bookings",
    results: {
      before: "48 weekly class bookings",
      after: "92 weekly class bookings",
      timeframe: "1 month"
    },
    fullCaseStudy: "As a local fitness studio, we were facing the dual challenge of competing with big gym chains and the growing online fitness market. AdMaxify created hyperlocal campaigns that positioned us as the premium option in our area. They redesigned our website with a focus on conversion optimization, making the class booking process seamless. Their local SEO work put us at the top of search results for our target keywords, and their social proof strategy encouraged happy customers to leave positive reviews. The geotargeted advertising campaigns they created reached exactly the demographic we wanted within our service area."
  },
  {
    id: 5,
    name: "Olivia Taylor",
    company: "LuxeHome Decor",
    position: "E-commerce Manager",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    rating: 5,
    testimonial: "AdMaxify transformed our e-commerce strategy completely. Their AI-powered product recommendation engine and personalized email campaigns increased our average order value by 67%. The ROI we've seen from their marketing efforts has been exceptional, and we've expanded our product lines based on the insights they provided.",
    industry: "E-commerce",
    resultSummary: "+67% Order Value",
    results: {
      before: "$79 average order value",
      after: "$132 average order value",
      timeframe: "3 months"
    },
    fullCaseStudy: "LuxeHome Decor had a beautiful product line but was struggling with cart abandonment and low average order values. AdMaxify implemented a comprehensive e-commerce optimization strategy that touched every part of our sales funnel. They created sophisticated retargeting campaigns that brought customers back to complete purchases. Their team also developed an AI-powered product recommendation system that significantly increased cross-selling opportunities. The email marketing sequences they designed were highly personalized, sending different messaging based on customer behavior and purchase history. Additionally, they improved our site speed and user experience, resulting in higher conversion rates across all product categories."
  }
];

// Generate more testimonials for demonstration
const generateMoreTestimonials = (): Testimonial[] => {
  const industries = ["Healthcare", "Finance", "Real Estate", "Education", "Hospitality", "Manufacturing", "Retail", "Automotive", "Media", "Consulting"];
  const companies = ["HealthPlus", "FinanceNow", "PropertyPeak", "LearnSmart", "DreamStay", "BuildRight", "RetailRise", "DriveFast", "MediaMagic", "ConsultPro"];
  const positions = ["CEO", "CMO", "Marketing Director", "Founder", "Digital Strategy Lead", "VP of Growth", "Brand Manager"];
  const names = [
    "James Wilson", "Linda Garcia", "Robert Kim", "Patricia Moore", "Thomas Singh",
    "Jennifer Lee", "Richard Brown", "Elizabeth Davis", "Joseph Martinez", "Barbara Anderson",
    "Charles Wright", "Susan Lopez", "Daniel Miller", "Margaret Wilson", "Paul Harris",
    "Karen Clark", "Mark Robinson", "Nancy Lewis", "George Walker", "Lisa Hall"
  ];
  
  const extraTestimonials: Testimonial[] = [];
  
  for (let i = 6; i <= 50; i++) {
    const industryIndex = (i - 6) % industries.length;
    const nameIndex = (i - 6) % names.length;
    const positionIndex = (i - 6) % positions.length;
    
    const growth = Math.floor(Math.random() * 150) + 50; // Random growth between 50% and 200%
    
    extraTestimonials.push({
      id: i,
      name: names[nameIndex],
      company: companies[industryIndex],
      position: positions[positionIndex],
      image: `https://i.pravatar.cc/150?img=${i + 10}`,
      rating: Math.random() > 0.7 ? 4 : 5, // Mostly 5 stars, some 4 stars
      testimonial: `Working with AdMaxify was a game-changer for ${companies[industryIndex]}. Their AI-powered approach delivered results beyond our expectations. Our ${Math.random() > 0.5 ? 'leads' : 'sales'} increased by ${growth}% within ${Math.floor(Math.random() * 5) + 1} months. Their team was responsive, professional, and truly understood our ${industries[industryIndex]} industry's unique challenges.`,
      industry: industries[industryIndex],
      resultSummary: `+${growth}% ${Math.random() > 0.5 ? 'Growth' : 'ROI'}`,
      results: {
        before: `$${Math.floor(Math.random() * 15) + 5},000 monthly revenue`,
        after: `$${Math.floor(Math.random() * 50) + 20},000 monthly revenue`,
        timeframe: `${Math.floor(Math.random() * 5) + 1} months`
      },
      fullCaseStudy: `${companies[industryIndex]} came to AdMaxify with the challenge of scaling their digital presence in the competitive ${industries[industryIndex]} market. After a thorough analysis, our team developed a comprehensive strategy leveraging AI-powered insights to target high-value customer segments. We implemented sophisticated conversion funnels, optimized their content strategy, and created data-driven campaigns across multiple channels. The results exceeded all expectations, with significant improvements in key metrics and strong ROI. Beyond the numbers, we helped them establish a sustainable digital marketing framework that continues to drive results month after month.`
    });
  }
  
  return extraTestimonials;
};

export const allTestimonials: Testimonial[] = [...testimonials, ...generateMoreTestimonials()];
