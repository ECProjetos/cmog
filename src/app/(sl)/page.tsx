"use client";

import NavBar from "@/components/nav-bar";

import Hero from "@/components/lp/hero";
import HowWorks from "@/components/lp/how-works";
import { WhyUseIt } from "@/components/lp/Why-use-it";
import Demo from "@/components/lp/demo";
import PricingSection from "@/components/lp/pricing";
import Footer from "@/components/footer";

export default function HomePage() {

  return (
    <>
      <NavBar/>
      <Hero />
      <Demo />
      <HowWorks />
      <WhyUseIt />
      <PricingSection />
      <Footer />
    </>
  );
}
