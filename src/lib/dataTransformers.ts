
import { Database } from '@/integrations/supabase/types';
import { Service, Testimonial } from '@/types/admin';

// Type for Supabase service row
export type DbService = Database['public']['Tables']['services']['Row'];

// Type for Supabase testimonial row
export type DbTestimonial = Database['public']['Tables']['testimonials']['Row'];

/**
 * Converts a database service to a frontend service
 */
export function mapDbServiceToService(dbService: DbService): Service {
  return {
    id: dbService.id,
    title: dbService.title,
    shortDescription: dbService.short_description,
    fullDescription: dbService.full_description,
    icon: dbService.icon,
    benefits: Array.isArray(dbService.benefits) 
      ? dbService.benefits 
      : (typeof dbService.benefits === 'string' 
          ? JSON.parse(dbService.benefits as string) 
          : []),
    features: Array.isArray(dbService.features) 
      ? dbService.features 
      : (typeof dbService.features === 'string' 
          ? JSON.parse(dbService.features as string) 
          : []),
    caseStudyId: dbService.case_study_id || undefined,
    createdAt: dbService.created_at,
    updatedAt: dbService.updated_at,
  };
}

/**
 * Converts a database testimonial to a frontend testimonial
 */
export function mapDbTestimonialToTestimonial(dbTestimonial: DbTestimonial): Testimonial {
  const rawResults = dbTestimonial.results;
  
  // Handle results properly based on its type
  let processedResults: { before: string; after: string } = { before: '', after: '' };
  
  if (typeof rawResults === 'object' && rawResults !== null) {
    // If it's already an object
    processedResults = {
      before: (rawResults as any).before || '',
      after: (rawResults as any).after || '',
    };
  } else if (typeof rawResults === 'string') {
    // If it's a JSON string
    try {
      const parsedResults = JSON.parse(rawResults);
      processedResults = {
        before: parsedResults.before || '',
        after: parsedResults.after || '',
      };
    } catch (error) {
      console.error('Failed to parse results JSON:', error);
    }
  }
  
  return {
    id: dbTestimonial.id,
    name: dbTestimonial.name,
    company: dbTestimonial.company,
    position: dbTestimonial.position,
    image: dbTestimonial.image,
    rating: dbTestimonial.rating,
    testimonial: dbTestimonial.testimonial,
    industry: dbTestimonial.industry,
    resultSummary: dbTestimonial.result_summary || '',
    results: {
      before: processedResults.before,
      after: processedResults.after,
    },
    createdAt: dbTestimonial.created_at,
    updatedAt: dbTestimonial.updated_at,
  };
}
