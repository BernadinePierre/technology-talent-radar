
-- Remove the trigger and function since we'll call the edge function from the frontend
DROP TRIGGER IF EXISTS on_feedback_created ON public.feedback;
DROP FUNCTION IF EXISTS public.notify_feedback_webhook();

-- Clean up app_config entry
DELETE FROM public.app_config WHERE key = 'supabase_url';
