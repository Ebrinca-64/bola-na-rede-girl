-- Criar tabela de perfis de jogadoras
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  nickname TEXT,
  position TEXT,
  birth_date DATE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de times
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  founded_year INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de jogadoras em times
CREATE TABLE public.team_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  jersey_number INTEGER,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, player_id)
);

-- Criar tabela de estatísticas
CREATE TABLE public.player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  matches_played INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  yellow_cards INTEGER DEFAULT 0,
  red_cards INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id)
);

-- Criar tabela de notícias
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Perfis públicos visíveis para todos" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar seu próprio perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para teams
CREATE POLICY "Times visíveis para todos" ON public.teams
  FOR SELECT USING (true);

CREATE POLICY "Usuários autenticados podem criar times" ON public.teams
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Políticas para team_players
CREATE POLICY "Jogadoras de times visíveis para todos" ON public.team_players
  FOR SELECT USING (true);

CREATE POLICY "Jogadoras podem se adicionar a times" ON public.team_players
  FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Políticas para player_stats
CREATE POLICY "Estatísticas visíveis para todos" ON public.player_stats
  FOR SELECT USING (true);

CREATE POLICY "Sistema pode criar estatísticas" ON public.player_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar estatísticas" ON public.player_stats
  FOR UPDATE USING (true);

-- Políticas para news
CREATE POLICY "Notícias visíveis para todos" ON public.news
  FOR SELECT USING (true);

CREATE POLICY "Usuários autenticados podem criar notícias" ON public.news
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger para criar estatísticas quando perfil é criado
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.player_stats (player_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_profile();

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_stats_updated
  BEFORE UPDATE ON public.player_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();