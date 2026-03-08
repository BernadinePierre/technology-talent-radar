
-- Create trigger function using pg_net to call edge function
CREATE OR REPLACE FUNCTION public.notify_feedback_webhook()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  supabase_url text;
  svc_key text;
BEGIN
  SELECT value INTO supabase_url FROM public.app_config WHERE key = 'supabase_url';
  SELECT value INTO svc_key FROM public.app_config WHERE key = 'service_role_key';

  PERFORM net.http_post(
    url := supabase_url || '/functions/v1/notify-feedback',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || svc_key
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );

  RETURN NEW;
END;
$$;

-- Create trigger on feedback table
CREATE TRIGGER on_feedback_created
AFTER INSERT ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION public.notify_feedback_webhook();
