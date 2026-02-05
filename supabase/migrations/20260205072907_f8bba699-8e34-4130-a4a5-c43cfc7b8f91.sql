-- Create admin activity logs table for audit trail
CREATE TABLE public.admin_activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Admins can view activity logs" 
ON public.admin_activity_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert logs (via application)
CREATE POLICY "Admins can create activity logs" 
ON public.admin_activity_logs 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Enable realtime for admin notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_submissions;

-- Add index for faster lookups
CREATE INDEX idx_admin_activity_logs_created_at ON public.admin_activity_logs (created_at DESC);
CREATE INDEX idx_admin_activity_logs_user_id ON public.admin_activity_logs (user_id);
CREATE INDEX idx_admin_activity_logs_entity ON public.admin_activity_logs (entity_type, entity_id);