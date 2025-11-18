import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import GameShowcase from "@/components/sections/GameShowcase";
import Stats from "@/components/sections/Stats";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-green selection:text-bg-primary">
      <Navbar />
      <Hero />
      <Features />
      <GameShowcase />
      <Stats />
      <Waitlist />
      <Footer />
    </main>
  );
}
