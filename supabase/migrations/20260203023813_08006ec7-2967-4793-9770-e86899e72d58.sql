-- Remove public execute permission and restrict to service_role only
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_old_rate_limits() TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_old_rate_limits() TO postgres;