
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings, defaultSiteSettings } from '@/types/siteSettings';
import { toast } from 'sonner';

type SiteSettingsContextType = {
  settings: SiteSettings;
  loading: boolean;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global')
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // If settings don't exist yet, create with default
            await createDefaultSettings();
          } else {
            console.error('Error fetching site settings:', error);
            toast.error('Failed to load site settings');
          }
          return;
        }

        if (data && data.value) {
          // Convert from Json to SiteSettings
          setSettings({ ...defaultSiteSettings, ...data.value as unknown as SiteSettings });
        }
      } catch (error) {
        console.error('Error in fetchSettings:', error);
        toast.error('Failed to load site settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const createDefaultSettings = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .insert({
          id: 'global',
          value: defaultSiteSettings as any // Cast to any to satisfy Json type
        });

      if (error) {
        console.error('Error creating default site settings:', error);
        toast.error('Failed to create site settings');
        return;
      }

      setSettings(defaultSiteSettings);
    } catch (error) {
      console.error('Error in createDefaultSettings:', error);
      toast.error('Failed to create site settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('site_settings')
        .update({ value: newSettings as any }) // Cast to any to satisfy Json type
        .eq('id', 'global');

      if (error) {
        console.error('Error updating site settings:', error);
        toast.error('Failed to update site settings');
        return;
      }

      setSettings(newSettings);
      toast.success('Site settings updated successfully');
    } catch (error) {
      console.error('Error in updateSettings:', error);
      toast.error('Failed to update site settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, updateSettings }}>
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
