"use client";

import Footer from "@/components/footer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Handshake, Glasses, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Sobre a CMOG</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossa missão é simplificar o acesso ao mercado de licitações,
            tornando-o mais transparente, eficiente e acessível para empresas de
            todos os tamanhos.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Sobre a CMOG"
              width={600}
              height={400}
              className="w-lg rounded-lg shadow-lg object-cover dark:shadow-gray-800 transition-transform transform hover:scale-105"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A CMOG nasceu da percepção de que o mercado de compras públicas,
              apesar de seu imenso potencial, ainda era complexo e de difícil
              acesso para muitas empresas. Fundada por especialistas em
              tecnologia e licitações, nossa plataforma foi criada para quebrar
              essas barreiras, usando inteligência de dados e automação para
              conectar empresas e governo de forma mais eficaz.
              <br />
              <br />
              Acreditamos que, ao fornecer as ferramentas certas, podemos
              capacitar mais empresas a competir e ter sucesso, fomentando a
              economia e garantindo melhores negócios para o setor público.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Nossos Valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Target className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Foco no Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    O sucesso dos nossos clientes é o nosso sucesso. Ouvimos e
                    co-criamos soluções para seus desafios.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Glasses className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Transparência</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Acreditamos em um mercado de licitações aberto, justo e
                    transparente para todos os participantes.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Inovação Constante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Estamos sempre buscando novas tecnologias e métodos para
                    melhorar nossa plataforma e agregar valor.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Handshake className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Integridade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Agimos com ética e integridade em todas as nossas relações
                    com clientes, parceiros e a sociedade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Conheça nossa Liderança
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="/images/ceo-avatar.png" alt="CEO" />
                <AvatarFallback>CEO</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Nome do CEO</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Co-Fundador & CEO
              </p>
            </div>
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="/images/cto-avatar.png" alt="CTO" />
                <AvatarFallback>CTO</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Nome do CTO</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Co-Fundador & CTO
              </p>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
