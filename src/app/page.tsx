"use client";

import NavBar from "@/components/nav-bar";

import { useEffect, useState } from "react";

import { getUserSession } from "./(auth)/actions";

export default function HomePage() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar isLoggedIn={isLoggedIn} />
      <h1 className="text-3xl font-bold">Welcome to Next.js!</h1>
    </main>
  );
}
