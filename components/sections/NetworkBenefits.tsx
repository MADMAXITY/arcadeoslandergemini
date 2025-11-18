"use client";

import { motion } from "framer-motion";
import { Trophy, Globe, UsersThree, Coins } from "@phosphor-icons/react";

const benefits = [
  {
    icon: Trophy,
    title: "Global Cafe Rankings",
    description: "Compete with other centers worldwide. Climb the leaderboard based on revenue, occupancy, and player satisfaction.",
    color: "text-accent-gold",
    border: "border-accent-gold/20",
    bg: "bg-accent-gold/5",
  },
  {
    icon: UsersThree,
    title: "Player Leaderboards",
    description: "Track player skill ratings across the entire network. Create a competitive environment that keeps gamers coming back.",
    color: "text-accent-blue",
    border: "border-accent-blue/20",
    bg: "bg-accent-blue/5",
  },
  {
    icon: Globe,
    title: "Network Tournaments",
    description: "Host seamless multi-location tournaments. Automated matchmaking and scoring across all ArcadeOS centers.",
    color: "text-accent-green",
    border: "border-accent-green/20",
    bg: "bg-accent-green/5",
  },
  {
    icon: Coins,
    title: "Shared Reward Pool",
    description: "Players earn universal XP and rewards redeemable at any ArcadeOS location, driving cross-traffic and loyalty.",
    color: "text-accent-pink",
    border: "border-accent-pink/20",
    bg: "bg-accent-pink/5",
  },
];

export default function NetworkBenefits() {
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

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1,
      } as any,
    },
  };

  return (
    <section className="py-24 relative bg-bg-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/media/grid.svg')] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            THE <span className="text-accent-blue">NETWORK</span> ADVANTAGE
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Join a connected ecosystem that amplifies competition and community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative p-8 rounded-2xl border ${benefit.border} ${benefit.bg} backdrop-blur-sm group hover:border-opacity-50 transition-all duration-300`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl bg-bg-primary border border-white/5 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon size={32} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-rajdhani font-bold text-2xl text-white mb-2 group-hover:text-glow transition-all">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
