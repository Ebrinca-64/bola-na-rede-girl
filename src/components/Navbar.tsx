import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/noticias", label: "Notícias" },
    { to: "/cadastro", label: "Inscreva-se" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              PASSA A BOLA
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-accent">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-primary to-accent">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
