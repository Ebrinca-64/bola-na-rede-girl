import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy, Target, Award, AlertTriangle, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import statsExample from "@/assets/stats-example.png";
import { Session, User } from "@supabase/supabase-js";

type Profile = {
  full_name: string;
  nickname: string | null;
  position: string | null;
};

type PlayerStats = {
  matches_played: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfileAndStats();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchProfileAndStats = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, nickname, position")
      .eq("id", user.id)
      .single();

    const { data: statsData } = await supabase
      .from("player_stats")
      .select("matches_played, goals, assists, yellow_cards, red_cards")
      .eq("player_id", user.id)
      .single();

    if (profileData) setProfile(profileData);
    if (statsData) setStats(statsData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  if (!user || !profile || !stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-12 animate-fade-in">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Olá, {profile.nickname || profile.full_name}!
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">{profile.position}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <Trophy className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-bold text-foreground">{stats.matches_played}</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
              <Target className="w-8 h-8 text-secondary mb-2" />
              <div className="text-3xl font-bold text-foreground">{stats.goals}</div>
              <div className="text-sm text-muted-foreground">Gols</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
              <Award className="w-8 h-8 text-accent mb-2" />
              <div className="text-3xl font-bold text-foreground">{stats.assists}</div>
              <div className="text-sm text-muted-foreground">Assistências</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-yellow-500/20">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
              <div className="text-3xl font-bold text-foreground">
                {stats.yellow_cards}/{stats.red_cards}
              </div>
              <div className="text-sm text-muted-foreground">Cartões A/V</div>
            </Card>
          </div>

          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Desempenho Detalhado
            </h2>
            <div className="rounded-lg overflow-hidden">
              <img
                src={statsExample}
                alt="Estatísticas detalhadas"
                className="w-full h-auto"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
