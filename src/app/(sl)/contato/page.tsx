"use client";

import Footer from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContatoPage() {
  return (
    <>
      <main className="container mx-auto px-40 py-12 mt-16">
        <div className="flex flex-col items-center justify-center  mb-12">
          <section className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="font-medium">
                  Nome
                </label>
                <Input id="name" type="text" placeholder="Seu nome completo" />
              </div>
              <div>
                <label htmlFor="email" className="font-medium">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="font-medium">
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Sobre o que você gostaria de falar?"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem aqui..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Enviar Mensagem
              </Button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
