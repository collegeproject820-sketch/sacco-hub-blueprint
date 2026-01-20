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

export default function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false });
    setEvents(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const resetForm = () => { setTitle(''); setDescription(''); setLocation(''); setEventDate(''); setIsPublished(false); setEditingEvent(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const data = { title, description, location, event_date: eventDate, is_published: isPublished };
    
    if (editingEvent) {
      await supabase.from('events').update(data).eq('id', editingEvent.id);
    } else {
      await supabase.from('events').insert(data);
    }
    toast({ title: editingEvent ? 'Event updated' : 'Event created' });
    setIsDialogOpen(false); resetForm(); fetchEvents(); setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    toast({ title: 'Event deleted' }); fetchEvents();
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
        {isLoading ? <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
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
                    <Button variant="ghost" size="icon" onClick={() => { setEditingEvent(evt); setTitle(evt.title); setDescription(evt.description||''); setLocation(evt.location||''); setEventDate(evt.event_date?.slice(0,16)||''); setIsPublished(evt.is_published); setIsDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(evt.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
