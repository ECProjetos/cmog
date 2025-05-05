"use client";

import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";

export default function ContatoPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Contato</h1>
        <p className="text-lg">Entre em contato conosco!</p>
      </div>
      <Footer />
    </>
  );
}
