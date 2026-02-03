-- Create table to track contact form submissions for rate limiting
CREATE TABLE public.contact_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_contact_rate_limits_ip_created 
  ON public.contact_rate_limits (ip_address, created_at DESC);

-- Enable RLS
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- No direct access from client - only edge functions can insert/read
-- Edge functions use service role key which bypasses RLS

-- Create function to clean up old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.contact_rate_limits
  WHERE created_at < now() - INTERVAL '1 hour';
$$;