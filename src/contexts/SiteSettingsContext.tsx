
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings, defaultSiteSettings } from '@/types/siteSettings';
import { toast } from 'sonner';

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  saveSettings: (settings: SiteSettings) => Promise<boolean>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from database
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'general')
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Create default settings if none exist
            const { error: insertError } = await supabase
              .from('site_settings')
              .insert({
                id: 'general',
                value: defaultSiteSettings as any // Cast to any to avoid type issues
              });

            if (insertError) {
              console.error('Error creating default site settings:', insertError);
            } else {
              setSettings(defaultSiteSettings);
            }
          } else {
            console.error('Error loading site settings:', error);
          }
        } else if (data) {
          // Cast to SiteSettings and ensure it has all required properties
          const loadedSettings = data.value as any;
          
          // Ensure the loaded settings have all the required properties
          const mergedSettings: SiteSettings = {
            socialLinks: {
              ...defaultSiteSettings.socialLinks,
              ...(loadedSettings?.socialLinks || {})
            },
            callToActionLinks: {
              ...defaultSiteSettings.callToActionLinks,
              ...(loadedSettings?.callToActionLinks || {})
            },
            footerLinks: {
              ...defaultSiteSettings.footerLinks,
              ...(loadedSettings?.footerLinks || {})
            }
          };
          
          setSettings(mergedSettings);
        }
      } catch (error) {
        console.error('Error in loadSettings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to database
  const saveSettings = async (newSettings: SiteSettings): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('site_settings')
        .update({ 
          value: newSettings as any, // Cast to any to avoid type issues
          updated_at: new Date().toISOString() 
        })
        .eq('id', 'general');

      if (error) {
        toast.error('Failed to save settings');
        console.error('Error saving site settings:', error);
        return false;
      }

      setSettings(newSettings);
      toast.success('Settings saved successfully');
      return true;
    } catch (error) {
      console.error('Error in saveSettings:', error);
      toast.error('An error occurred while saving settings');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, saveSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
