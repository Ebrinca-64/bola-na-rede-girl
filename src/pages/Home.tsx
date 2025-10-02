import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Trophy, Users, Calendar, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Campeonato
                </span>
                <br />
                <span className="text-foreground">Passa a Bola</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                O maior torneio de futebol feminino da região. Junte-se a nós e mostre seu talento!
              </p>
              <div className="flex gap-4">
                <Link to="/cadastro">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
                    Inscreva-se Agora
                  </Button>
                </Link>
                <Link to="/noticias">
                  <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                    Ver Notícias
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] animate-scale-in">
              <img
                src={banner1}
                alt="Campeonato Passa a Bola"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:scale-105 transition-transform bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Times</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-transform bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <div className="text-3xl font-bold text-foreground">800+</div>
              <div className="text-sm text-muted-foreground">Jogadoras</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-transform bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-transform bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-foreground">5ª</div>
              <div className="text-sm text-muted-foreground">Edição</div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] animate-fade-in">
              <img
                src={banner2}
                alt="Sobre o Campeonato"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Sobre o
                </span>
                <br />
                <span className="text-foreground">Campeonato</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                O Passa a Bola é mais do que um campeonato de futebol. É um movimento que promove o esporte feminino, 
                a inclusão e o desenvolvimento de atletas talentosas.
              </p>
              <p className="text-lg text-muted-foreground">
                Com partidas emocionantes, infraestrutura profissional e premiações incríveis, 
                estamos transformando o cenário do futebol feminino na nossa região.
              </p>
              <Link to="/cadastro">
                <Button size="lg" className="bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-transform">
                  Faça Parte Você Também
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Pronta para Entrar em Campo?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Não perca a chance de fazer parte da maior competição de futebol feminino da região!
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform text-lg px-8 py-6">
              Inscreva-se Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
