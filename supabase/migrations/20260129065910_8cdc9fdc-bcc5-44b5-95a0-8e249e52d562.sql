-- Create storage bucket for news and advert images
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for media bucket
CREATE POLICY "Anyone can view media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update their media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

CREATE POLICY "Admins can delete media"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));