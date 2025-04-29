"use client";


import NavBar from "@/components/nav-bar";


export default function BuscaRapida() {

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Busca Rápida</h1>
        <p className="text-lg text-gray-600">
          Em breve, uma nova maneira de buscar!
        </p>
      </div>
    </>
  );
}
