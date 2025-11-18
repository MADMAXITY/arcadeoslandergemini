"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Gaming Centers", value: 500, suffix: "+" },
  { label: "Daily Players", value: 50000, suffix: "+" },
  { label: "Hours Managed", value: 1000000, suffix: "+" },
];

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section id="stats" className="py-20 bg-bg-secondary border-y border-white/5">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          <div className="absolute -top-12 left-0 right-0 text-center">
            <span className="px-4 py-1 rounded-full border border-accent-green/30 bg-accent-green/10 text-accent-green font-rajdhani font-bold text-sm uppercase tracking-widest">
              Projected Impact
            </span>
          </div>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, type: "spring" }}
            >
              <div className="font-orbitron font-black text-5xl md:text-6xl text-accent-green mb-2">
                {inView ? <CountUp end={stat.value} duration={2.5} separator="," /> : "0"}
                {stat.suffix}
              </div>
              <div className="font-rajdhani font-semibold text-xl text-text-secondary uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
