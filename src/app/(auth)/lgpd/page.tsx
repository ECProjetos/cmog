"use client";

import {
  ClipboardCheckIcon,
  ClockIcon,
  LockIcon,
  MailIcon,
  RefreshCcwIcon,
  Share2Icon,
  ShieldCheckIcon,
  TargetIcon,
} from "lucide-react";

export default function LGPDPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">
        Política de Privacidade e LGPD
      </h1>

      <p className="mb-4">
        Última atualização: <strong>17/04/2025</strong>
      </p>

      <p className="mb-4">
        Nós, da <strong>CMOG</strong>, levamos sua privacidade a sério. Esta
        Política tem como objetivo esclarecer como os seus dados são coletados,
        usados, armazenados e protegidos, conforme a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018).
      </p>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <ClipboardCheckIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Dados coletados</h2>
        </div>
        <ul className="list-disc list-inside space-y-1">
          <li>Nome completo</li>
          <li>E-mail</li>
          <li>Senha (criptografada)</li>
          <li>Telefone (opcional)</li>
          <li>CPF (Para pessoa física)</li>
          <li>CNPJ (Para pessoa júridica)</li>
          <li>Razão social (Para pessoa júridica)</li>
          <li>Imagem de perfil &quot;Avatar&quot; (opicional)</li>
          <li>Preferência de tema</li>
          <li>Confirmação do aceite LGPD</li>
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <TargetIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Finalidade</h2>
        </div>
        <p>
          Os dados são utilizados para criar sua conta, permitir acesso à
          plataforma, facilitar a participação em licitações e garantir
          segurança no uso da aplicação.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <Share2Icon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Compartilhamento</h2>
        </div>
        <p>
          Não compartilhamos seus dados com terceiros, exceto quando exigido por
          lei ou necessário para o funcionamento da aplicação.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <ClockIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Armazenamento</h2>
        </div>
        <p>
          Seus dados ficam armazenados enquanto sua conta estiver ativa ou
          conforme exigido por lei. Você pode solicitar a exclusão a qualquer
          momento.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <ShieldCheckIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Seus direitos</h2>
        </div>
        <p>Você pode a qualquer momento:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Acessar e corrigir seus dados</li>
          <li>Solicitar anonimização ou exclusão</li>
          <li>Revogar consentimento</li>
          <li>Consultar como seus dados são tratados</li>
        </ul>
        <p className="mt-2">
          Para isso, entre em contato via:{" "}
          <a
            href="mailto:contato@seudominio.com.br"
            className="text-blue-600 hover:underline"
          >
            contato@seudominio.com.br
          </a>
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <LockIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Segurança</h2>
        </div>
        <p>
          Seus dados são protegidos com boas práticas de segurança e
          criptografia. Nunca armazenamos sua senha em texto puro.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-4">
          <RefreshCcwIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Alterações</h2>
        </div>
        <p>
          Podemos atualizar esta política periodicamente. Recomendamos que você
          consulte esta página regularmente.
        </p>
      </section>

      <section>
        <div className="flex items-center mb-4">
          <MailIcon className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">Contato</h2>
        </div>
        <p>
          DPO:{" "}
          <a
            href="mailto:contato@ecprojetos.com.br"
            className="text-blue-600 hover:underline"
          >
            contato@ecprojetos.com.br
          </a>
        </p>
      </section>
    </main>
  );
}
