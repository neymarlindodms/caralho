import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { label: "Cozinha", href: "/produtos?categoria=cozinha" },
  { label: "Organização", href: "/produtos?categoria=organizacao" },
  { label: "Utilidades", href: "/produtos?categoria=utilidades" },
  { label: "Decoração", href: "/produtos?categoria=decoracao" },
];

const Header = () => {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/produtos?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 text-center font-body tracking-wide">
        <span className="hidden md:inline">Frete Gratis em todo o site · Desconto de 5% no PIX · Parcele em ate 8x sem juros</span>
        <span className="md:hidden">Frete Gratis em todo o site · 5% OFF no PIX</span>
      </div>

      <header className="sticky top-0 z-50 bg-background border-b border-border">
        {/* Main header row */}
        <div className="container mx-auto px-4 flex items-center justify-between h-14 md:h-[72px] gap-4">
          {/* Mobile: hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground shrink-0">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight shrink-0">
            verde<span className="text-foreground">casa</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-4 pr-10 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/favoritos" className="hidden md:flex text-foreground hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/conta" className="hidden md:flex text-foreground hover:text-primary transition-colors">
              <User size={20} />
            </Link>
            <button onClick={() => setIsOpen(true)} className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground rounded-full">
                  {totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar — always visible */}
        <form onSubmit={handleSearch} className="md:hidden border-t border-border px-4 py-2.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-4 pr-10 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block px-6 py-4 text-sm font-medium text-foreground hover:bg-secondary border-b border-border uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
