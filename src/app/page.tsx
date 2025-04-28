"use client";

import NavBar from "@/components/nav-bar";

import { useEffect, useState } from "react";

import { getUserSession } from "./(auth)/actions";
import Hero from "@/components/lp/hero";
import HowWorks from "@/components/lp/how-works";
import { WhyUseIt } from "@/components/lp/Why-use-it";
import Demo from "@/components/lp/demo";
import PricingSection from "@/components/lp/pricing";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getUserSession();

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
        <Skeleton className="h-10 w-1/2" />
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
      <PricingSection />
      <Footer />
    </>
  );
}
