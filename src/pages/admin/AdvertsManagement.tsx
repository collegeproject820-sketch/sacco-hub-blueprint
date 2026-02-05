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
import { ImageUpload } from '@/components/admin/ImageUpload';
import { EmptyState, ErrorState } from '@/components/ui/data-state';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';
import type { Tables } from '@/integrations/supabase/types';

type Advert = Tables<'adverts'>;

export default function AdvertsManagement() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState<Advert | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; advert: Advert | null }>({ open: false, advert: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { logActivity } = useAdminActivityLog();

  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [position, setPosition] = useState('sidebar');
  const [isActive, setIsActive] = useState(true);
  const [expiresAt, setExpiresAt] = useState('');

  const fetchAdverts = async () => {
    setError(null);
    try {
      const { data, error: fetchError } = await supabase.from('adverts').select('*').order('created_at', { ascending: false });
      if (fetchError) {
        console.error('Error fetching adverts:', fetchError);
        setError('Failed to load adverts. Please check your permissions.');
        return;
      }
      setAdverts(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAdverts(); }, []);

  const resetForm = () => {
    setTitle(''); setBannerUrl(''); setLinkUrl(''); setPosition('sidebar'); setIsActive(true); setExpiresAt('');
    setEditingAdvert(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const advertData = { title, banner_url: bannerUrl, link_url: linkUrl, position, is_active: isActive, expires_at: expiresAt || null };
    
    try {
      if (editingAdvert) {
        const { error } = await supabase.from('adverts').update(advertData).eq('id', editingAdvert.id);
        if (error) throw error;
        toast({ title: 'Advert updated successfully' });
        logActivity({ action: 'update', entityType: 'advert', entityId: editingAdvert.id, details: { title } });
      } else {
        const { data, error } = await supabase.from('adverts').insert(advertData).select('id').single();
        if (error) throw error;
        toast({ title: 'Advert created successfully' });
        logActivity({ action: 'create', entityType: 'advert', entityId: data?.id, details: { title } });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchAdverts();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const advert = deleteConfirm.advert;
    if (!advert) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('adverts').delete().eq('id', advert.id);
      if (error) throw error;
      toast({ title: 'Advert deleted successfully' });
      logActivity({ action: 'delete', entityType: 'advert', entityId: advert.id, details: { title: advert.title } });
      fetchAdverts();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({ open: false, advert: null });
    }
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
              <ImageUpload value={bannerUrl} onChange={setBannerUrl} folder="adverts" label="Banner Image" />
              <div><Label>Link URL (optional)</Label><Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." /></div>
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
        {isLoading ? (
          <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>
        ) : error ? (
          <ErrorState title="Failed to load adverts" description={error} onRetry={fetchAdverts} />
        ) : adverts.length === 0 ? (
          <EmptyState title="No adverts yet" description="Create your first advertisement to get started." action={{ label: 'Create Advert', onClick: () => setIsDialogOpen(true) }} />
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Expires</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {adverts.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell><Badge variant={ad.is_active ? 'default' : 'secondary'}>{ad.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                  <TableCell>{ad.expires_at ? new Date(ad.expires_at).toLocaleDateString() : 'Never'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingAdvert(ad); setTitle(ad.title); setBannerUrl(ad.banner_url||''); setLinkUrl(ad.link_url||''); setIsActive(ad.is_active || false); setExpiresAt(ad.expires_at?.split('T')[0]||''); setIsDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm({ open: true, advert: ad })} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Advert"
        description={`Are you sure you want to delete "${deleteConfirm.advert?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
