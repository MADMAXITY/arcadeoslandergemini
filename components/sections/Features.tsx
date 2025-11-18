"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Lightning, ShieldCheck, ChartLineUp } from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUp,
    title: "Admin Command",
    description: "AI-powered occupancy forecasting, profitability analytics, and centralized fleet management.",
    color: "text-accent-blue",
  },
  {
    icon: Monitor,
    title: "PC Client",
    description: "QR code login, real-time game metrics tracking, and in-seat food ordering.",
    color: "text-accent-green",
  },
  {
    icon: ShieldCheck,
    title: "Mobile App",
    description: "Remote booking, digital wallet, and industry-first parental controls.",
    color: "text-accent-pink",
  },
  {
    icon: Lightning,
    title: "Tournament Ready",
    description: "Built-in esports event management and live stream integration.",
    color: "text-accent-gold",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="features" className="py-24 relative bg-bg-secondary overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,191,255,0.1),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            SYSTEM <span className="text-accent-blue">CAPABILITIES</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            A unified platform connecting owners, gamers, and hardware.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1,
      } as any,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className="group relative p-8 bg-bg-tertiary rounded-xl border border-white/5 overflow-hidden transition-all duration-300 h-full"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(57, 255, 20, 0.1), transparent 40%)`,
        }}
      />
      
      <div className={`mb-6 ${feature.color} p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 relative z-10`}>
        <feature.icon size={32} weight="duotone" />
      </div>
      <h3 className="font-rajdhani font-bold text-2xl mb-3 group-hover:text-white transition-colors relative z-10">
        {feature.title}
      </h3>
      <p className="text-text-secondary leading-relaxed text-sm relative z-10">
        {feature.description}
      </p>
    </motion.div>
  );
}
