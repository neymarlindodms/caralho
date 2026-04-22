import { Link } from "react-router-dom";

const categories = [
  { name: "Potes", slug: "cozinha" },
  { name: "Organizacao", slug: "organizacao" },
  { name: "Cozinha", slug: "cozinha" },
  { name: "Banheiro", slug: "utilidades" },
  { name: "Decoracao", slug: "decoracao" },
  { name: "Lixeiras", slug: "utilidades" },
  { name: "Ofertas", slug: "ofertas" },
];

const CategoriesSection = () => (
  <section className="py-4 md:py-6">
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/produtos?categoria=${cat.slug}`}
            className="shrink-0 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 whitespace-nowrap"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
