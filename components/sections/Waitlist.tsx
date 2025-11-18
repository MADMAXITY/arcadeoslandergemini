"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PaperPlaneRight, CircleNotch, Check } from "@phosphor-icons/react";
import confetti from "canvas-confetti";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus("success");
      setMessage("Welcome to the future. You're on the list.");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#39FF14", "#00BFFF", "#FF00FF"],
      });
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <section id="waitlist" className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
            JOIN THE <span className="text-accent-green">REVOLUTION</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Be among the first to experience the next generation of gaming center management.
            Early access spots are limited.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-green via-accent-blue to-accent-pink rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex bg-bg-secondary rounded-lg p-2 border border-white/10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none font-inter"
                  required
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-6 py-3 bg-accent-green text-bg-primary font-bold rounded hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === "loading" ? (
                    <CircleNotch size={20} className="animate-spin" />
                  ) : status === "success" ? (
                    <Check size={20} />
                  ) : (
                    <>
                      JOIN <PaperPlaneRight size={20} weight="bold" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 font-rajdhani font-semibold text-lg ${
                  status === "error" ? "text-red-500" : "text-accent-green"
                }`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
