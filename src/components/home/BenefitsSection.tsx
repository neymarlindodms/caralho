import { Truck, Shield, CreditCard, Award } from "lucide-react";

const benefits = [
  { icon: Award, label: "Design Premiado" },
  { icon: Truck, label: "Frete Gratis", sub: "em todo o site" },
  { icon: CreditCard, label: "Ate 10x", sub: "sem juros" },
  { icon: Shield, label: "Compra Segura" },
];

const BenefitsSection = () => (
  <section className="border-y border-border bg-background py-5 md:py-6">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
        {benefits.map((b) => (
          <div key={b.label} className="flex items-center gap-2.5 shrink-0">
            <b.icon size={22} className="text-primary shrink-0" />
            <div className="flex items-center gap-1">
              <span className="font-heading text-xs md:text-sm font-bold text-foreground uppercase tracking-wide whitespace-nowrap">
                {b.label}
              </span>
              {b.sub && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">{b.sub}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
