import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">CMOG</h3>
          <p className="text-muted-foreground text-sm">
            Plataforma inteligente para gestão e monitoramento de licitações
            públicas.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Links Úteis</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/precos" className="hover:underline">
                Preços
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:underline">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Fale Conosco</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contato@cmog.com.br
            </li>
            <li className="flex gap-4 mt-4">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-4 h-4 hover:text-primary" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-4 h-4 hover:text-primary" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 hover:text-primary" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground py-4 border-t">
        &copy; {new Date().getFullYear()} CMOG. Todos os direitos reservados.
      </div>
    </footer>
  );
}
