import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import PlayerRegister from "@/components/register/PlayerRegister";
import TeamRegister from "@/components/register/TeamRegister";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Inscrição
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Cadastre sua jogadora ou seu time no campeonato
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            <Tabs defaultValue="player" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="player">Jogadora</TabsTrigger>
                <TabsTrigger value="team">Time</TabsTrigger>
              </TabsList>
              
              <TabsContent value="player">
                <PlayerRegister />
              </TabsContent>
              
              <TabsContent value="team">
                <TeamRegister />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
