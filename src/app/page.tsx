"use client";

import NavBar from "@/components/nav-bar";

import { useEffect, useState } from "react";

import { getUserSession } from "./(auth)/actions";
import Hero from "@/components/lp/hero";
import HowWorks from "@/components/lp/how-works";
import { WhyUseIt } from "@/components/lp/Why-use-it";
import Demo from "@/components/lp/demo";

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
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Hero />
      <Demo />
      <HowWorks />
      <WhyUseIt />
    </>
  );
}
