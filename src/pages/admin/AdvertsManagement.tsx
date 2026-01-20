import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

export default function AdvertsManagement() {
  const [adverts, setAdverts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [position, setPosition] = useState('sidebar');
  const [isActive, setIsActive] = useState(true);
  const [expiresAt, setExpiresAt] = useState('');

  const fetchAdverts = async () => {
    const { data } = await supabase.from('adverts').select('*').order('created_at', { ascending: false });
    setAdverts(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchAdverts(); }, []);

  const resetForm = () => {
    setTitle(''); setBannerUrl(''); setLinkUrl(''); setPosition('sidebar'); setIsActive(true); setExpiresAt('');
    setEditingAdvert(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const data = { title, banner_url: bannerUrl, link_url: linkUrl, position, is_active: isActive, expires_at: expiresAt || null };
    
    if (editingAdvert) {
      await supabase.from('adverts').update(data).eq('id', editingAdvert.id);
    } else {
      await supabase.from('adverts').insert(data);
    }
    toast({ title: editingAdvert ? 'Advert updated' : 'Advert created' });
    setIsDialogOpen(false); resetForm(); fetchAdverts(); setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this advert?')) return;
    await supabase.from('adverts').delete().eq('id', id);
    toast({ title: 'Advert deleted' }); fetchAdverts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Adverts Management</h1>
          <p className="text-muted-foreground mt-1">Manage banner advertisements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="btn-primary"><Plus className="mr-2 h-4 w-4" />New Advert</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingAdvert ? 'Edit' : 'Create'} Advert</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
              <div><Label>Banner URL</Label><Input value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} /></div>
              <div><Label>Link URL</Label><Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} /></div>
              <div><Label>Expires</Label><Input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} /></div>
              <div className="flex items-center gap-2"><Switch checked={isActive} onCheckedChange={setIsActive} /><Label>Active</Label></div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0">
        {isLoading ? <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Expires</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {adverts.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell><Badge variant={ad.is_active ? 'default' : 'secondary'}>{ad.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                  <TableCell>{ad.expires_at ? new Date(ad.expires_at).toLocaleDateString() : 'Never'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingAdvert(ad); setTitle(ad.title); setBannerUrl(ad.banner_url||''); setLinkUrl(ad.link_url||''); setIsActive(ad.is_active); setExpiresAt(ad.expires_at?.split('T')[0]||''); setIsDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(ad.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>
    </div>
  );
}
