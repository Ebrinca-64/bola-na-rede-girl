import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type News = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
};

const News = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (data) setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Notícias
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro de tudo que acontece no Campeonato Passa a Bola
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-card border-border"
              >
                {item.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(item.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{item.content}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhuma notícia disponível no momento. Fique ligado!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
