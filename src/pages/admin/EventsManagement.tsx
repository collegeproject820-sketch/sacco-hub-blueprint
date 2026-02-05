import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { EmptyState, ErrorState } from '@/components/ui/data-state';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';
import type { Tables } from '@/integrations/supabase/types';

type Event = Tables<'events'>;

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; event: Event | null }>({ open: false, event: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { logActivity } = useAdminActivityLog();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const fetchEvents = async () => {
    setError(null);
    try {
      const { data, error: fetchError } = await supabase.from('events').select('*').order('event_date', { ascending: false });
      if (fetchError) {
        console.error('Error fetching events:', fetchError);
        setError('Failed to load events. Please check your permissions.');
        return;
      }
      setEvents(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const resetForm = () => { setTitle(''); setDescription(''); setLocation(''); setEventDate(''); setIsPublished(false); setEditingEvent(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const eventData = { title, description, location, event_date: eventDate, is_published: isPublished };
    
    try {
      if (editingEvent) {
        const { error } = await supabase.from('events').update(eventData).eq('id', editingEvent.id);
        if (error) throw error;
        toast({ title: 'Event updated successfully' });
        logActivity({ action: 'update', entityType: 'event', entityId: editingEvent.id, details: { title } });
      } else {
        const { data, error } = await supabase.from('events').insert(eventData).select('id').single();
        if (error) throw error;
        toast({ title: 'Event created successfully' });
        logActivity({ action: 'create', entityType: 'event', entityId: data?.id, details: { title } });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const event = deleteConfirm.event;
    if (!event) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('events').delete().eq('id', event.id);
      if (error) throw error;
      toast({ title: 'Event deleted successfully' });
      logActivity({ action: 'delete', entityType: 'event', entityId: event.id, details: { title: event.title } });
      fetchEvents();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({ open: false, event: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Events Management</h1>
          <p className="text-muted-foreground mt-1">Manage events and announcements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="btn-primary"><Plus className="mr-2 h-4 w-4" />New Event</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingEvent ? 'Edit' : 'Create'} Event</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div><Label>Location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
              <div><Label>Event Date</Label><Input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required /></div>
              <div className="flex items-center gap-2"><Switch checked={isPublished} onCheckedChange={setIsPublished} /><Label>Published</Label></div>
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
          <ErrorState title="Failed to load events" description={error} onRetry={fetchEvents} />
        ) : events.length === 0 ? (
          <EmptyState title="No events yet" description="Create your first event to get started." action={{ label: 'Create Event', onClick: () => setIsDialogOpen(true) }} />
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Date</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {events.map((evt) => (
                <TableRow key={evt.id}>
                  <TableCell>{evt.title}</TableCell>
                  <TableCell>{new Date(evt.event_date).toLocaleDateString()}</TableCell>
                  <TableCell>{evt.location || '-'}</TableCell>
                  <TableCell><Badge variant={evt.is_published ? 'default' : 'secondary'}>{evt.is_published ? 'Published' : 'Draft'}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingEvent(evt); setTitle(evt.title); setDescription(evt.description||''); setLocation(evt.location||''); setEventDate(evt.event_date?.slice(0,16)||''); setIsPublished(evt.is_published || false); setIsDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm({ open: true, event: evt })} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
        title="Delete Event"
        description={`Are you sure you want to delete "${deleteConfirm.event?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
