
import { Json } from '@/integrations/supabase/types';

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface CallToActionLinks {
  bookStrategyCall: string;
  bookFreeCall: string;
}

export interface FooterLinks {
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
}

export interface SiteSettings {
  socialLinks: SocialLinks;
  callToActionLinks: CallToActionLinks;
  footerLinks: FooterLinks;
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export const defaultSiteSettings: SiteSettings = {
  socialLinks: {
    facebook: "https://facebook.com/aiadmaxify",
    twitter: "https://twitter.com/aiadmaxify",
    instagram: "https://instagram.com/aiadmaxify",
    linkedin: "https://linkedin.com/company/aiadmaxify",
    email: "contact@aiadmaxify.com",
    phone: "+1234567890"
  },
  callToActionLinks: {
    bookStrategyCall: "/book-strategy-call",
    bookFreeCall: "/book-strategy-call"
  },
  footerLinks: {
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    cookiePolicy: "/cookie-policy"
  }
};
