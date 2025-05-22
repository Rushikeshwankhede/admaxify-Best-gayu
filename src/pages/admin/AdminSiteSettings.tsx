
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteSettings } from '@/types/siteSettings';

const AdminSiteSettings = () => {
  const { settings, loading, saveSettings } = useSiteSettings();
  const [formData, setFormData] = useState<SiteSettings>({
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      email: '',
      phone: ''
    },
    callToActionLinks: {
      bookStrategyCall: '',
      bookFreeCall: ''
    },
    footerLinks: {
      privacyPolicy: '',
      termsOfService: '',
      cookiePolicy: ''
    }
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings && !loading) {
      setFormData(settings);
    }
  }, [settings, loading]);

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleCTALinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      callToActionLinks: {
        ...formData.callToActionLinks,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleFooterLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      footerLinks: {
        ...formData.footerLinks,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await saveSettings(formData);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>Site Settings | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="social">
            <TabsList className="mb-6">
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="cta">Call to Action</TabsTrigger>
              <TabsTrigger value="footer">Footer Links</TabsTrigger>
            </TabsList>

            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>
                    Configure your social media links that will be displayed across the website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Facebook className="text-blue-600 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="facebook" className="mb-1 block">Facebook URL</Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          value={formData.socialLinks.facebook}
                          onChange={handleSocialLinkChange}
                          placeholder="https://facebook.com/your-page"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Twitter className="text-blue-400 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="twitter" className="mb-1 block">Twitter URL</Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={formData.socialLinks.twitter}
                          onChange={handleSocialLinkChange}
                          placeholder="https://twitter.com/your-handle"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Instagram className="text-pink-500 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="instagram" className="mb-1 block">Instagram URL</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={formData.socialLinks.instagram}
                          onChange={handleSocialLinkChange}
                          placeholder="https://instagram.com/your-profile"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Linkedin className="text-blue-700 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="linkedin" className="mb-1 block">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={formData.socialLinks.linkedin}
                          onChange={handleSocialLinkChange}
                          placeholder="https://linkedin.com/company/your-company"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Mail className="text-gray-700 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="email" className="mb-1 block">Contact Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.socialLinks.email}
                          onChange={handleSocialLinkChange}
                          placeholder="contact@yourdomain.com"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Phone className="text-green-600 h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor="phone" className="mb-1 block">Contact Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.socialLinks.phone}
                          onChange={handleSocialLinkChange}
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cta">
              <Card>
                <CardHeader>
                  <CardTitle>Call to Action Links</CardTitle>
                  <CardDescription>
                    Configure the URLs for call-to-action buttons throughout the website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bookStrategyCall" className="mb-1 block">Book Strategy Call URL</Label>
                      <Input
                        id="bookStrategyCall"
                        name="bookStrategyCall"
                        value={formData.callToActionLinks.bookStrategyCall}
                        onChange={handleCTALinkChange}
                        placeholder="/book-strategy-call"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL for the "Book Strategy Call" button
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="bookFreeCall" className="mb-1 block">Book Free Call URL</Label>
                      <Input
                        id="bookFreeCall"
                        name="bookFreeCall"
                        value={formData.callToActionLinks.bookFreeCall}
                        onChange={handleCTALinkChange}
                        placeholder="/book-free-call"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL for the "Book Free Call" button
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="footer">
              <Card>
                <CardHeader>
                  <CardTitle>Footer Links</CardTitle>
                  <CardDescription>
                    Configure links to legal pages and other important resources.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="privacyPolicy" className="mb-1 block">Privacy Policy URL</Label>
                      <Input
                        id="privacyPolicy"
                        name="privacyPolicy"
                        value={formData.footerLinks.privacyPolicy}
                        onChange={handleFooterLinkChange}
                        placeholder="/privacy-policy"
                      />
                    </div>

                    <div>
                      <Label htmlFor="termsOfService" className="mb-1 block">Terms of Service URL</Label>
                      <Input
                        id="termsOfService"
                        name="termsOfService"
                        value={formData.footerLinks.termsOfService}
                        onChange={handleFooterLinkChange}
                        placeholder="/terms-of-service"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cookiePolicy" className="mb-1 block">Cookie Policy URL</Label>
                      <Input
                        id="cookiePolicy"
                        name="cookiePolicy"
                        value={formData.footerLinks.cookiePolicy}
                        onChange={handleFooterLinkChange}
                        placeholder="/cookie-policy"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button 
              type="submit" 
              className="bg-agency-purple hover:bg-agency-navy px-8"
              disabled={isSaving || loading}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AdminSiteSettings;
