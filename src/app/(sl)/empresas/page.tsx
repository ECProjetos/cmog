"use client";

import { getUserSession } from "@/app/(auth)/actions";
import NavBar from "@/components/nav-bar";
import { useEffect, useState } from "react";

export default function EmpresasPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getUserSession();
      console.log("Session:", session); // Log the session object to see its contents
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Busca Rápida</h1>
        <p className="text-lg text-gray-600">
          Em breve, uma nova maneira de buscar!
        </p>
      </div>
    </>
  );
}
