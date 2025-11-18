"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CaretDown } from "@phosphor-icons/react";
import ScrambleText from "@/components/ui/ScrambleText";

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
        className="relative z-10 text-center px-4 max-w-5xl mx-auto perspective-1000"
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

        <motion.div
          className="relative transform-style-3d"
          initial={{ rotateX: 0, rotateY: 0 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 relative"
            style={{ textShadow: "0 0 30px rgba(57, 255, 20, 0.3)" }}
          >
            <ScrambleText text="THE OS FOR" duration={1500} delay={200} />
            <br />
            <span className="text-accent-green relative inline-block mt-2">
              <ScrambleText text="NEXT-GEN" duration={1500} delay={1000} className="relative z-10" />
              <motion.span
                className="absolute inset-0 text-accent-green mix-blend-screen blur-sm"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                NEXT-GEN
              </motion.span>
            </span>
            <br />
            <ScrambleText text="GAMING CENTERS" duration={1500} delay={1800} />
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-inter text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          <span className="text-white font-semibold">Admin</span>. <span className="text-white font-semibold">PC</span>. <span className="text-white font-semibold">Mobile</span>.
          <br className="hidden md:block" />
          The complete ecosystem. Automate operations. Maximize revenue. Elevate experience.
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
