"use client";

import { motion } from "framer-motion";
import { Monitor, Lightning, ShieldCheck, ChartLineUp } from "@phosphor-icons/react";

const features = [
  {
    icon: Monitor,
    title: "Centralized Control",
    description: "Manage every PC and console from a single, futuristic dashboard.",
    color: "text-accent-blue",
  },
  {
    icon: Lightning,
    title: "Instant Deployment",
    description: "Deploy games and updates across your entire fleet in seconds.",
    color: "text-accent-gold",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Security",
    description: "Enterprise-grade security to protect your hardware and user data.",
    color: "text-accent-green",
  },
  {
    icon: ChartLineUp,
    title: "Smart Analytics",
    description: "Real-time insights into usage, revenue, and popular games.",
    color: "text-accent-pink",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-bg-secondary overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,191,255,0.1),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            SYSTEM <span className="text-accent-blue">CAPABILITIES</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Engineered for performance, designed for dominance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-bg-tertiary rounded-xl border border-white/5 hover:border-accent-blue/30 transition-all duration-300"
            >
              <div className={`mb-6 ${feature.color} p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={32} weight="duotone" />
              </div>
              <h3 className="font-rajdhani font-bold text-2xl mb-3 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
