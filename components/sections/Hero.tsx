"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CaretDown } from "@phosphor-icons/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/media/GTAV.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary/80 to-bg-primary" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-2 rounded-full border border-accent-green/30 bg-accent-green/10 text-accent-green font-rajdhani font-bold tracking-widest text-sm uppercase backdrop-blur-sm">
            Next Gen Gaming Management
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 relative"
        >
          ARCADE
          <span className="text-accent-green relative inline-block">
            OS
            <motion.span
              className="absolute inset-0 text-accent-green mix-blend-screen"
              animate={{ 
                x: [-2, 2, -2],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              OS
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-inter text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transform your gaming center into a futuristic hub. 
          Automate, manage, and scale with the operating system built for the next era of gaming.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="px-8 py-4 bg-accent-green text-bg-primary font-orbitron font-bold text-lg rounded hover:bg-accent-green/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
          >
            INITIALIZE SYSTEM
          </a>
          <a
            href="#features"
            className="px-8 py-4 border border-white/20 text-white font-orbitron font-bold text-lg rounded hover:bg-white/10 transition-all hover:border-white/50"
          >
            EXPLORE FEATURES
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent-green animate-bounce"
      >
        <CaretDown size={32} />
      </motion.div>
    </section>
  );
}
