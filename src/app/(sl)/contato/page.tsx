"use client";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "./actions";
import { Label } from "@radix-ui/react-label";

export default function ContatoPage() {
  return (
    <>
      <main className="container mx-auto px-40 py-12 mt-16">
        <div className="flex flex-col items-center justify-center  mb-12">
          <section className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form
              action={async (formData) => {
                const result = await sendEmail(formData);
                if (result.success) {
                  alert(result.message);
                } else {
                  alert(result.message);
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name" className="font-medium">
                  Nome
                </Label>
                <Input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">
                  E-mail
                </Label>
                <Input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="font-medium">
                  Assunto
                </Label>
                <Input
                  required
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Sobre o que você gostaria de falar?"
                />
              </div>
              <div>
                <Label htmlFor="message" className="font-medium">
                  Mensagem
                </Label>
                <Textarea
                  required
                  id="message"
                  name="message"
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
