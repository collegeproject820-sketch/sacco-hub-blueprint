import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

export default function SettingsManagement() {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from('site_settings').select('*').single().then(({ data }) => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await supabase.from('site_settings').update(settings).eq('id', settings.id);
    toast({ title: 'Settings saved successfully' });
    setIsSaving(false);
  };

  if (isLoading) return <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Site Settings</h1>
          <p className="text-muted-foreground mt-1">Manage site configuration</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="btn-primary">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Site Name</Label><Input value={settings?.site_name || ''} onChange={(e) => setSettings({...settings, site_name: e.target.value})} /></div>
            <div><Label>Tagline</Label><Input value={settings?.tagline || ''} onChange={(e) => setSettings({...settings, tagline: e.target.value})} /></div>
            <div><Label>Footer Credits</Label><Textarea value={settings?.footer_credits || ''} onChange={(e) => setSettings({...settings, footer_credits: e.target.value})} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Email</Label><Input value={settings?.contact_email || ''} onChange={(e) => setSettings({...settings, contact_email: e.target.value})} /></div>
            <div><Label>Phone</Label><Input value={settings?.contact_phone || ''} onChange={(e) => setSettings({...settings, contact_phone: e.target.value})} /></div>
            <div><Label>Address</Label><Textarea value={settings?.contact_address || ''} onChange={(e) => setSettings({...settings, contact_address: e.target.value})} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Branding</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Logo URL</Label><Input value={settings?.logo_url || ''} onChange={(e) => setSettings({...settings, logo_url: e.target.value})} /></div>
            <div><Label>Favicon URL</Label><Input value={settings?.favicon_url || ''} onChange={(e) => setSettings({...settings, favicon_url: e.target.value})} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Social Media</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Facebook</Label><Input value={settings?.social_facebook || ''} onChange={(e) => setSettings({...settings, social_facebook: e.target.value})} /></div>
            <div><Label>Twitter</Label><Input value={settings?.social_twitter || ''} onChange={(e) => setSettings({...settings, social_twitter: e.target.value})} /></div>
            <div><Label>LinkedIn</Label><Input value={settings?.social_linkedin || ''} onChange={(e) => setSettings({...settings, social_linkedin: e.target.value})} /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
