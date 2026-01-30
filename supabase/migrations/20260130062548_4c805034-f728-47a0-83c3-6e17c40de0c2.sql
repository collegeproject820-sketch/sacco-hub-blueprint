-- Create visitors table for unique 24h tracking
CREATE TABLE public.visitors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for 24h rolling window queries
CREATE INDEX idx_visitors_created_at ON public.visitors (created_at DESC);
-- Index for device uniqueness within window
CREATE INDEX idx_visitors_device_id ON public.visitors (device_id);

-- Create page_views table
CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);

-- Enable RLS
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Policies: anyone can insert, only admins can read
CREATE POLICY "Anyone can track visit" ON public.visitors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view visitors" ON public.visitors FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can track page view" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;