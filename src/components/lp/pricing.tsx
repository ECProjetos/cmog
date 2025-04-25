import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    title: "Básico",
    price: "R$19,99/mês",
    features: ["1 usuário", "Suporte por e-mail"],
    highlight: false,
  },
  {
    title: "Profissional",
    price: "R$99/mês",
    features: [
      "Usuários ilimitados",
      "Monitoramento em tempo real",
      "Suporte prioritário",
    ],
    highlight: true,
  },
  {
    title: "Empresarial",
    price: "Sob consulta",
    features: [
      "Soluções personalizadas",
      "Integrações avançadas",
      "Gerente de conta dedicado",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Planos e Preços</h2>
        <p className="text-muted-foreground text-lg">
          Escolha o plano ideal para o seu negócio e comece a otimizar seu
          processo de licitação agora mesmo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricingPlans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              className={`${
                plan.highlight
                  ? "border-primary border-2 scale-[1.02] shadow-xl"
                  : ""
              } transition-all`}
            >
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold">{plan.price}</p>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className="w-full mt-4"
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
