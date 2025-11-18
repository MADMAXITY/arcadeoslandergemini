"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const games = [
  { name: "Valorant", image: "/media/Valorant.png" },
  { name: "League of Legends", image: "/media/LeagueOfLegends.png" },
  { name: "Fortnite", image: "/media/Fortnite.jpg" },
  { name: "Call of Duty: Warzone", image: "/media/CallOfDutyWarzone.png" },
  { name: "GTA V", image: "/media/GTAV.jpg" },
  { name: "Counter Strike 2", image: "/media/CounterStrike2.png" },
  { name: "Street Fighter 6", image: "/media/StreetFighter6.jpg" },
  { name: "FC 26", image: "/media/FC26.jpg" },
];

export default function GameShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="games" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-orbitron font-bold text-4xl md:text-5xl"
        >
          SUPPORTED <span className="text-accent-pink">TITLES</span>
        </motion.h2>
      </div>

      {/* Marquee Effect */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...games, ...games].map((game, index) => (
            <div
              key={`${game.name}-${index}`}
              className="relative w-[300px] h-[400px] rounded-xl overflow-hidden group border border-white/5 hover:border-accent-pink/50 transition-all duration-300"
            >
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-rajdhani font-bold text-2xl text-white group-hover:text-accent-pink transition-colors">
                  {game.name}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
