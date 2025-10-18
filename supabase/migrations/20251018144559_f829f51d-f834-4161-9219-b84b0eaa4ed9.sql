-- Fix security warning by ensuring search_path is immutable
DROP FUNCTION IF EXISTS public.has_role(uuid, user_type);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_type)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;