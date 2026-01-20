import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Loader2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function SubmissionsManagement() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    const { data } = await supabase.from('news_submissions').select('*').order('created_at', { ascending: false });
    setSubmissions(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('news_submissions').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id);
    toast({ title: `Submission ${status}` });
    fetchSubmissions();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Submissions</h1>
        <p className="text-muted-foreground mt-1">Review and manage news submissions</p>
      </div>
      <Card><CardContent className="p-0">
        {isLoading ? <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : submissions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No submissions yet.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="max-w-xs truncate">{sub.title}</TableCell>
                  <TableCell>{sub.author_name}</TableCell>
                  <TableCell><Badge variant={getStatusColor(sub.status)}>{sub.status}</Badge></TableCell>
                  <TableCell>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(sub)}><Eye className="h-4 w-4" /></Button>
                    {sub.status === 'pending' && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(sub.id, 'approved')} className="text-emerald-600"><Check className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(sub.id, 'rejected')} className="text-destructive"><X className="h-4 w-4" /></Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{selectedSubmission?.title}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><strong>Author:</strong> {selectedSubmission?.author_name} ({selectedSubmission?.author_email})</div>
            <div><strong>Organization:</strong> {selectedSubmission?.organization || 'N/A'}</div>
            <div className="whitespace-pre-wrap border rounded p-4 max-h-64 overflow-y-auto">{selectedSubmission?.content}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
