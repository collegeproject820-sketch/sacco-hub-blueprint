 import { useEffect, useState } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Loader2, RefreshCw, History } from 'lucide-react';
 import { EmptyState, ErrorState } from '@/components/ui/data-state';
 import { format } from 'date-fns';
 
 interface ActivityLog {
   id: string;
   user_id: string;
   action: string;
   entity_type: string;
   entity_id: string | null;
  details: unknown;
   created_at: string;
  user_email?: string;
 }
 
 export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchLogs = async () => {
     setError(null);
     setIsLoading(true);
     try {
      // Fetch logs
      const { data: logsData, error: logsError } = await supabase
        .from('admin_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) {
        console.error('Error fetching logs:', logsError);
        setError('Failed to load activity logs.');
         return;
       }

      // Fetch profiles for user names
      const userIds = [...new Set((logsData || []).map(l => l.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, email')
        .in('user_id', userIds);

      const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));

      const logsWithProfiles = (logsData || []).map(log => ({
        ...log,
        user_email: profileMap.get(log.user_id)?.full_name || profileMap.get(log.user_id)?.email || log.user_id.slice(0, 8),
      }));

      setLogs(logsWithProfiles);
     } catch (err) {
       console.error('Error:', err);
       setError('An unexpected error occurred.');
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchLogs();
   }, []);
 
   const getActionBadgeVariant = (action: string) => {
     switch (action) {
       case 'create':
         return 'default';
       case 'update':
         return 'secondary';
       case 'delete':
         return 'destructive';
       case 'publish':
         return 'default';
       case 'unpublish':
         return 'secondary';
       case 'approve':
         return 'default';
       case 'reject':
         return 'destructive';
       case 'role_change':
         return 'outline';
       case 'status_change':
         return 'outline';
       default:
         return 'secondary';
     }
   };
 
  const formatDetails = (details: unknown) => {
     if (!details) return '-';
    if (typeof details !== 'object') return String(details);
     const entries = Object.entries(details);
     if (entries.length === 0) return '-';
     return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold font-heading">Activity Logs</h1>
           <p className="text-muted-foreground mt-1">Admin action audit trail</p>
         </div>
         <Button variant="outline" onClick={fetchLogs} disabled={isLoading}>
           <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
           Refresh
         </Button>
       </div>
 
       <Card className="border-border/50">
         <CardContent className="p-0">
           {isLoading ? (
             <div className="py-12 text-center">
               <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
             </div>
           ) : error ? (
             <ErrorState title="Failed to load logs" description={error} onRetry={fetchLogs} />
           ) : logs.length === 0 ? (
             <EmptyState
               icon={<History className="h-6 w-6 text-muted-foreground" />}
               title="No activity yet"
               description="Admin actions will be logged here for auditing."
             />
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Time</TableHead>
                   <TableHead>User</TableHead>
                   <TableHead>Action</TableHead>
                   <TableHead>Entity</TableHead>
                   <TableHead>Details</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {logs.map((log) => (
                   <TableRow key={log.id}>
                     <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                       {format(new Date(log.created_at), 'MMM d, h:mm a')}
                     </TableCell>
                     <TableCell className="text-sm">
                      {log.user_email}
                     </TableCell>
                     <TableCell>
                       <Badge variant={getActionBadgeVariant(log.action)}>
                         {log.action}
                       </Badge>
                     </TableCell>
                     <TableCell className="text-sm text-muted-foreground">
                       {log.entity_type}
                     </TableCell>
                     <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                       {formatDetails(log.details)}
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           )}
         </CardContent>
       </Card>
     </div>
   );
 }