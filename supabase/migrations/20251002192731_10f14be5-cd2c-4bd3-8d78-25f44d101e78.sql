-- Corrigir search_path nas funções
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.player_stats (player_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;