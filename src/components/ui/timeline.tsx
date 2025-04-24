"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white dark:bg-neutral-950 py-20 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
          Como Funciona?
        </h2>
        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-prose mx-auto">
          Veja como é simples transformar oportunidades em contratos: da conta
          criada à proposta vencedora, tudo flui com poucos cliques.
        </p>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-12 py-12 relative"
          >
            {/* Left - Dot and title (sticky) */}
            <div className="sticky top-36 md:w-1/3 flex items-start">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-purple-500 shadow-md border-4 border-white dark:border-neutral-950 z-10" />
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Right - Content */}
            <div className="md:w-2/3">
              <div className="max-w-prose text-sm md:text-base text-neutral-800 dark:text-neutral-200 space-y-6">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Vertical progress bar */}
        <div
          style={{ height }}
          className="absolute left-[21px] md:left-[23px] top-0 w-[2px] bg-neutral-200 dark:bg-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="w-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
