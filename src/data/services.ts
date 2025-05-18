
export interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  caseStudyId?: number; // references a testimonial ID if there's a relevant case study
}

export const services: Service[] = [
  {
    id: 1,
    title: "AI-Powered Social Media Marketing",
    shortDescription: "Leverage artificial intelligence to optimize your social media campaigns for maximum engagement and conversion.",
    fullDescription: "Our AI-powered social media marketing service uses advanced algorithms to analyze audience behavior, optimize content delivery, and maximize engagement. We combine data-driven insights with creative excellence to create campaigns that resonate with your target audience and drive meaningful business results.",
    icon: "BrainCircuit",
    features: [
      "AI-optimized posting schedules",
      "Predictive content performance analysis",
      "Automated engagement tracking",
      "Real-time campaign optimization",
      "Competitor analysis and benchmarking",
      "Advanced audience segmentation"
    ],
    benefits: [
      "Increase engagement rates by up to 78%",
      "Improve content relevance and resonance",
      "Target the right audience at the optimal time",
      "Maximize ROI on social media spend",
      "Stay ahead of platform algorithm changes",
      "Build stronger customer relationships"
    ],
    caseStudyId: 1
  },
  {
    id: 2,
    title: "SEO & Content Strategy",
    shortDescription: "Dominate search results with our comprehensive SEO and content strategy services powered by the latest AI technology.",
    fullDescription: "Our SEO and content strategy services combine technical expertise with creative storytelling to help your brand climb the search rankings. Using advanced AI tools, we identify high-potential keywords, optimize your website architecture, and create compelling content that attracts and converts your target audience.",
    icon: "Search",
    features: [
      "AI-driven keyword research and analysis",
      "Technical SEO audits and optimization",
      "Content gap analysis and planning",
      "Natural language content creation",
      "Voice search optimization",
      "Structured data implementation"
    ],
    benefits: [
      "Achieve higher organic search rankings",
      "Increase quality website traffic",
      "Reduce paid search dependency",
      "Build topical authority in your industry",
      "Improve user experience and engagement metrics",
      "Generate long-term, sustainable results"
    ],
    caseStudyId: 3
  },
  {
    id: 3,
    title: "Data-Driven PPC Advertising",
    shortDescription: "Maximize ROI with our precision-targeted, AI-optimized paid advertising campaigns across all major platforms.",
    fullDescription: "Our data-driven PPC advertising services leverage the power of artificial intelligence to create, monitor, and optimize paid campaigns that deliver impressive results. From Google Ads to social media platforms, we ensure your advertising budget is spent efficiently to reach and convert your ideal customers.",
    icon: "BarChart",
    features: [
      "AI bid management and optimization",
      "Multi-platform campaign coordination",
      "Dynamic ad creation and testing",
      "Advanced audience targeting",
      "Customer journey mapping",
      "Comprehensive attribution modeling"
    ],
    benefits: [
      "Reduce cost-per-acquisition by up to 40%",
      "Scale campaigns efficiently",
      "Eliminate wasted ad spend",
      "Reach high-value customer segments",
      "Gain actionable competitive intelligence",
      "Achieve greater campaign transparency"
    ],
    caseStudyId: 2
  },
  {
    id: 4,
    title: "Email Marketing Automation",
    shortDescription: "Create personalized, high-converting email campaigns that nurture leads and maximize customer lifetime value.",
    fullDescription: "Our email marketing automation service combines behavioral data, AI personalization, and compelling copywriting to create email campaigns that drive results. From welcome sequences to re-engagement campaigns, we help you leverage your email list to build stronger customer relationships and increase revenue.",
    icon: "Mail",
    features: [
      "Behavioral trigger automation",
      "Dynamic content personalization",
      "A/B testing and optimization",
      "Customer segmentation",
      "Predictive send-time optimization",
      "Detailed analytics and reporting"
    ],
    benefits: [
      "Increase open and click-through rates",
      "Boost customer retention and loyalty",
      "Convert more leads into customers",
      "Reactivate dormant customers",
      "Deliver relevant content at the right time",
      "Create additional revenue streams"
    ],
    caseStudyId: 5
  },
  {
    id: 5,
    title: "Conversion Rate Optimization",
    shortDescription: "Transform your website into a conversion machine with data-backed design and UX improvements.",
    fullDescription: "Our conversion rate optimization service uses a scientific approach to identify and remove barriers to conversion on your website. Through meticulous testing, user experience analysis, and AI-driven insights, we help you get more value from your existing traffic and maximize your marketing ROI.",
    icon: "Gauge",
    features: [
      "Heatmap and user behavior analysis",
      "A/B and multivariate testing",
      "Funnel optimization",
      "User experience enhancement",
      "Persuasive copywriting",
      "Form and checkout optimization"
    ],
    benefits: [
      "Increase conversion rates by 50-150%",
      "Reduce bounce rates",
      "Improve user experience",
      "Get more value from existing traffic",
      "Make data-driven design decisions",
      "Accelerate business growth"
    ],
    caseStudyId: 4
  },
  {
    id: 6,
    title: "Brand Strategy & Development",
    shortDescription: "Create a compelling, consistent brand identity that resonates with your target audience and stands out from competitors.",
    fullDescription: "Our brand strategy and development service helps you define, refine, and amplify your brand's unique voice in the marketplace. From visual identity to messaging architecture, we ensure every aspect of your brand works harmoniously to create a powerful connection with your audience.",
    icon: "Palette",
    features: [
      "Market and competitor analysis",
      "Brand positioning and messaging",
      "Visual identity development",
      "Brand guidelines creation",
      "Brand voice and tone definition",
      "Brand experience mapping"
    ],
    benefits: [
      "Build stronger emotional connections with customers",
      "Establish clear differentiation from competitors",
      "Increase brand recognition and recall",
      "Create consistency across all touchpoints",
      "Command premium pricing",
      "Build a foundation for long-term growth"
    ]
  },
  {
    id: 7,
    title: "Marketing Analytics & Reporting",
    shortDescription: "Gain crystal-clear insights into your marketing performance with comprehensive analytics and beautiful, actionable reports.",
    fullDescription: "Our marketing analytics and reporting service transforms complex data into clear, actionable insights. We implement robust tracking systems, create custom dashboards, and provide regular reports that help you understand what's working, what isn't, and where your best opportunities lie.",
    icon: "LineChart",
    features: [
      "Custom dashboard creation",
      "Multi-platform data integration",
      "KPI monitoring and alerting",
      "Attribution modeling",
      "Predictive analytics",
      "Regular performance reviews"
    ],
    benefits: [
      "Make better marketing decisions faster",
      "Allocate budget more effectively",
      "Identify high-ROI opportunities",
      "Demonstrate marketing's business impact",
      "Respond quickly to performance changes",
      "Continuously improve results"
    ]
  },
  {
    id: 8,
    title: "AI Content Creation",
    shortDescription: "Produce engaging, SEO-optimized content at scale with our AI-powered content creation service.",
    fullDescription: "Our AI content creation service combines the efficiency of artificial intelligence with human creativity to produce high-quality content that engages readers and performs well in search. From blog posts to product descriptions, we help you create compelling content that supports your marketing goals.",
    icon: "FileText",
    features: [
      "AI-assisted content generation",
      "SEO optimization",
      "Content personalization",
      "Multilingual capabilities",
      "Content performance tracking",
      "Topic and keyword research"
    ],
    benefits: [
      "Produce more content efficiently",
      "Maintain consistent quality and tone",
      "Scale content production cost-effectively",
      "Improve search engine visibility",
      "Create more personalized content experiences",
      "Respond quickly to content needs"
    ],
    caseStudyId: 3
  }
];

// Generate more services for a comprehensive list
export const generateMoreServices = (): Service[] => {
  const additionalServices: Service[] = [
    {
      id: 9,
      title: "Video Marketing",
      shortDescription: "Create engaging video content that tells your brand's story and drives audience action.",
      fullDescription: "Our video marketing service covers everything from concept development to production and distribution. We create compelling video content that captures attention, communicates your message effectively, and inspires audience action across multiple platforms.",
      icon: "Video",
      features: [
        "Strategy and concept development",
        "Professional video production",
        "Animation and motion graphics",
        "Video SEO optimization",
        "Multi-platform distribution",
        "Performance analytics"
      ],
      benefits: [
        "Increase engagement and time on site",
        "Improve conversion rates with persuasive content",
        "Build stronger emotional connections",
        "Explain complex concepts simply",
        "Stand out in crowded social feeds",
        "Repurpose content across multiple channels"
      ]
    },
    {
      id: 10,
      title: "Influencer Marketing",
      shortDescription: "Partner with the perfect influencers to amplify your brand message and reach new audiences.",
      fullDescription: "Our influencer marketing service helps you identify, engage, and collaborate with influencers who align with your brand values and have genuine connections with your target audience. We manage the entire process from identification to measuring results.",
      icon: "Users",
      features: [
        "Data-driven influencer identification",
        "Campaign strategy development",
        "Relationship management",
        "Content collaboration",
        "Performance tracking",
        "FTC compliance guidance"
      ],
      benefits: [
        "Access new, highly-engaged audiences",
        "Build trust through third-party endorsement",
        "Generate authentic content",
        "Increase social proof",
        "Improve SEO with quality backlinks",
        "Create lasting brand partnerships"
      ]
    },
    {
      id: 11,
      title: "Local SEO & Marketing",
      shortDescription: "Dominate your local market with targeted strategies that put your business on the map.",
      fullDescription: "Our local SEO and marketing service helps businesses attract more local customers through optimized Google Business profiles, local search strategies, and targeted campaigns for your service area. We help you become the obvious choice in your local market.",
      icon: "MapPin",
      features: [
        "Google Business Profile optimization",
        "Local keyword targeting",
        "Review generation and management",
        "Local citation building",
        "Geotargeted advertising",
        "Competitive local analysis"
      ],
      benefits: [
        "Appear in the local pack and map results",
        "Drive more foot traffic to physical locations",
        "Build trust with local customers",
        "Outrank local competitors",
        "Increase phone calls and direction requests",
        "Target customers ready to buy"
      ],
      caseStudyId: 4
    },
    {
      id: 12,
      title: "Marketing Automation",
      shortDescription: "Save time and improve results with intelligent marketing automation across all channels.",
      fullDescription: "Our marketing automation service helps you streamline repetitive tasks, nurture prospects through the sales funnel, and deliver personalized experiences at scale. We implement and optimize automation systems that make your marketing more efficient and effective.",
      icon: "Cog",
      features: [
        "Workflow automation",
        "Lead scoring and nurturing",
        "Behavioral trigger setup",
        "CRM integration",
        "Customer journey mapping",
        "Marketing and sales alignment"
      ],
      benefits: [
        "Increase team efficiency and productivity",
        "Deliver more personalized customer experiences",
        "Improve lead quality and conversion rates",
        "Create consistency in marketing execution",
        "Scale marketing efforts without adding headcount",
        "Generate more revenue with less effort"
      ]
    }
  ];
  
  return additionalServices;
};

export const allServices: Service[] = [...services, ...generateMoreServices()];
