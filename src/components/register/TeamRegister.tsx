import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    foundedYear: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Você precisa estar logado para cadastrar um time");
        navigate("/login");
        return;
      }

      const { error } = await supabase.from("teams").insert({
        name: formData.name,
        founded_year: formData.foundedYear ? parseInt(formData.foundedYear) : null,
        description: formData.description,
      });

      if (error) throw error;

      toast.success("Time cadastrado com sucesso!");
      setFormData({ name: "", foundedYear: "", description: "" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar time");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="teamName">Nome do Time *</Label>
        <Input
          id="teamName"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foundedYear">Ano de Fundação</Label>
        <Input
          id="foundedYear"
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          value={formData.foundedYear}
          onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Conte um pouco sobre o seu time..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-secondary to-primary"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cadastrando...
          </>
        ) : (
          "Cadastrar Time"
        )}
      </Button>
    </form>
  );
};

export default TeamRegister;
