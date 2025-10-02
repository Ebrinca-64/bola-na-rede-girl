import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const PlayerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    nickname: "",
    position: "",
    phone: "",
  });
  const [birthDate, setBirthDate] = useState<Date>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          full_name: formData.fullName,
          nickname: formData.nickname,
          position: formData.position,
          birth_date: birthDate?.toISOString().split('T')[0],
          phone: formData.phone,
        });

        if (profileError) throw profileError;

        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha *</Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Nome Completo *</Label>
        <Input
          id="fullName"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">Apelido</Label>
        <Input
          id="nickname"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Posição *</Label>
        <Select
          required
          value={formData.position}
          onValueChange={(value) => setFormData({ ...formData, position: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua posição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Goleira">Goleira</SelectItem>
            <SelectItem value="Zagueira">Zagueira</SelectItem>
            <SelectItem value="Lateral">Lateral</SelectItem>
            <SelectItem value="Volante">Volante</SelectItem>
            <SelectItem value="Meia">Meia</SelectItem>
            <SelectItem value="Atacante">Atacante</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Data de Nascimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !birthDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, "dd/MM/yyyy") : "Selecione a data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={birthDate}
              onSelect={setBirthDate}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-accent"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cadastrando...
          </>
        ) : (
          "Cadastrar Jogadora"
        )}
      </Button>
    </form>
  );
};

export default PlayerRegister;
