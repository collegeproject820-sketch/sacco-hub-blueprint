 import { useCallback } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 
 export type ActivityAction = 
   | 'create' 
   | 'update' 
   | 'delete' 
   | 'publish' 
   | 'unpublish' 
   | 'approve' 
   | 'reject'
   | 'role_change'
   | 'status_change';
 
 export type EntityType = 
   | 'news_post' 
   | 'event' 
   | 'advert' 
   | 'submission' 
   | 'user' 
   | 'settings';
 
 interface LogActivityParams {
   action: ActivityAction;
   entityType: EntityType;
   entityId?: string;
   details?: Record<string, any>;
 }
 
 export function useAdminActivityLog() {
   const { user } = useAuth();
 
   const logActivity = useCallback(async ({
     action,
     entityType,
     entityId,
     details
   }: LogActivityParams) => {
     if (!user) return;
 
     try {
       await supabase.from('admin_activity_logs').insert({
         user_id: user.id,
         action,
         entity_type: entityType,
         entity_id: entityId,
         details: details || null,
       });
     } catch (error) {
       console.error('Failed to log activity:', error);
     }
   }, [user]);
 
   return { logActivity };
 }