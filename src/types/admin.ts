
export type AppRole = 'administrator' | 'editor' | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  role: AppRole;
  createdAt: string;
  lastLogin?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  benefits: string[];
  features: string[];
  caseStudyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  image: string;
  rating: number;
  testimonial: string;
  industry: string;
  resultSummary?: string;
  results: {
    before: string;
    after: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
  image?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  callToActionLinks: {
    bookStrategyCall: string;
    bookFreeCall: string;
  };
  footerLinks: {
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
  };
}

export interface FormSubmission {
  id: string;
  formType: string;
  submissionData: Record<string, any>;
  createdAt: string;
  viewed: boolean;
}

export interface StrategyCallBooking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  businessType: string;
  currentMarketing: string;
  goals: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: string;
  createdAt: string;
  viewed: boolean;
}
