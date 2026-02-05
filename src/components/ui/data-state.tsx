 import { AlertCircle, RefreshCw, Inbox, Loader2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface EmptyStateProps {
   icon?: React.ReactNode;
   title: string;
   description?: string;
   action?: {
     label: string;
     onClick: () => void;
   };
 }
 
 export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
   return (
     <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
       <div className="rounded-full bg-muted p-3 mb-4">
         {icon || <Inbox className="h-6 w-6 text-muted-foreground" />}
       </div>
       <h3 className="text-lg font-medium text-foreground">{title}</h3>
       {description && (
         <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
       )}
       {action && (
         <Button onClick={action.onClick} variant="outline" className="mt-4">
           {action.label}
         </Button>
       )}
     </div>
   );
 }
 
 interface ErrorStateProps {
   title?: string;
   description?: string;
   onRetry?: () => void;
 }
 
 export function ErrorState({ 
   title = 'Failed to load', 
   description = 'Something went wrong. Please try again.', 
   onRetry 
 }: ErrorStateProps) {
   return (
     <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
       <div className="rounded-full bg-destructive/10 p-3 mb-4">
         <AlertCircle className="h-6 w-6 text-destructive" />
       </div>
       <h3 className="text-lg font-medium text-foreground">{title}</h3>
       <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
       {onRetry && (
         <Button onClick={onRetry} variant="outline" className="mt-4">
           <RefreshCw className="mr-2 h-4 w-4" />
           Try again
         </Button>
       )}
     </div>
   );
 }
 
 interface LoadingStateProps {
   message?: string;
 }
 
 export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
   return (
     <div className="flex flex-col items-center justify-center py-12 px-4">
       <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
       <p className="text-sm text-muted-foreground">{message}</p>
     </div>
   );
 }