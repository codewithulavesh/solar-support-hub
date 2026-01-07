-- Fix function search path issues for all trigger functions

-- Fix update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix generate_ticket_number
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(ticket_number FROM 'TKT-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM public.tickets
  WHERE ticket_number LIKE 'TKT-' || year_part || '-%';
  
  NEW.ticket_number := 'TKT-' || year_part || '-' || LPAD(sequence_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

-- Fix set_sla_deadlines
CREATE OR REPLACE FUNCTION public.set_sla_deadlines()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  sla_record RECORD;
BEGIN
  SELECT * INTO sla_record
  FROM public.sla_configurations
  WHERE (issue_category IS NULL OR issue_category = NEW.issue_category)
    AND priority = NEW.priority
    AND is_active = TRUE
  ORDER BY issue_category NULLS LAST
  LIMIT 1;
  
  IF sla_record IS NOT NULL THEN
    NEW.sla_response_deadline := NOW() + (sla_record.response_time_hours || ' hours')::INTERVAL;
    NEW.sla_resolution_deadline := NOW() + (sla_record.resolution_time_hours || ' hours')::INTERVAL;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix log_ticket_status_change (needs SECURITY DEFINER for auth.uid())
CREATE OR REPLACE FUNCTION public.log_ticket_status_change()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.ticket_status_history (ticket_id, old_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

-- Fix generate_system_id
CREATE OR REPLACE FUNCTION public.generate_system_id()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  cluster_code TEXT;
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  cluster_code := COALESCE(UPPER(LEFT(NEW.cluster, 3)), 'GEN');
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(system_id FROM 'SELCO-' || cluster_code || '-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM public.solar_systems
  WHERE system_id LIKE 'SELCO-' || cluster_code || '-' || year_part || '-%';
  
  NEW.system_id := 'SELCO-' || cluster_code || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 3, '0');
  RETURN NEW;
END;
$$;

-- Drop and recreate the overly permissive notification insert policy
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Create a more secure notification insert policy
CREATE POLICY "Authenticated users can insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);