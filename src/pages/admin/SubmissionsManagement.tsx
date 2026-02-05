import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Loader2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmptyState, ErrorState } from '@/components/ui/data-state';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type NewsSubmission = Tables<'news_submissions'>;

export default function SubmissionsManagement() {
  const [submissions, setSubmissions] = useState<NewsSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<NewsSubmission | null>(null);
  const [actionConfirm, setActionConfirm] = useState<{ open: boolean; submission: NewsSubmission | null; action: 'approved' | 'rejected' | null }>({ open: false, submission: null, action: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { logActivity } = useAdminActivityLog();
  const { user } = useAuth();

  const fetchSubmissions = async () => {
    setError(null);
    try {
      const { data, error } = await supabase
        .from('news_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions. Please check your permissions.');
        return;
      }
      setSubmissions(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleAction = async () => {
    const { submission, action } = actionConfirm;
    if (!submission || !action) return;
    
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('news_submissions')
        .update({ 
          status: action, 
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id 
        })
        .eq('id', submission.id);
      
      if (error) throw error;
      
      toast({ 
        title: `Submission ${action}`,
        description: action === 'approved' 
          ? 'The submission has been approved.'
          : 'The submission has been rejected.'
      });
      
      logActivity({
        action: action === 'approved' ? 'approve' : 'reject',
        entityType: 'submission',
        entityId: submission.id,
        details: { title: submission.title, author: submission.author_name }
      });
      
      fetchSubmissions();
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'Failed to update submission'
      });
    } finally {
      setIsProcessing(false);
      setActionConfirm({ open: false, submission: null, action: null });
    }
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
        {isLoading ? (
          <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>
        ) : error ? (
          <ErrorState title="Failed to load" description={error} onRetry={fetchSubmissions} />
        ) : submissions.length === 0 ? (
          <EmptyState title="No submissions yet" description="Reader submissions will appear here for review." />
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="max-w-xs truncate">{sub.title}</TableCell>
                  <TableCell>{sub.author_name}</TableCell>
                  <TableCell><Badge variant={getStatusColor(sub.status || 'pending')}>{sub.status || 'pending'}</Badge></TableCell>
                  <TableCell>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(sub)}><Eye className="h-4 w-4" /></Button>
                    {sub.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setActionConfirm({ open: true, submission: sub, action: 'approved' })} 
                          className="text-emerald-600"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setActionConfirm({ open: true, submission: sub, action: 'rejected' })} 
                          className="text-destructive"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </Button>
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

      <ConfirmDialog
        open={actionConfirm.open}
        onOpenChange={(open) => setActionConfirm({ ...actionConfirm, open })}
        title={actionConfirm.action === 'approved' ? 'Approve Submission' : 'Reject Submission'}
        description={
          actionConfirm.action === 'approved'
            ? `Are you sure you want to approve "${actionConfirm.submission?.title}"?`
            : `Are you sure you want to reject "${actionConfirm.submission?.title}"?`
        }
        confirmText={actionConfirm.action === 'approved' ? 'Approve' : 'Reject'}
        variant={actionConfirm.action === 'rejected' ? 'destructive' : 'default'}
        onConfirm={handleAction}
        isLoading={isProcessing}
      />
    </div>
  );
}
