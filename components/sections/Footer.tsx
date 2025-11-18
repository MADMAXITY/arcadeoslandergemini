import Link from "next/link";
import { TwitterLogo, InstagramLogo, DiscordLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-orbitron font-bold text-2xl mb-2">
              ARCADE<span className="text-accent-green">OS</span>
            </h3>
            <p className="text-text-muted text-sm">
              © 2024 ArcadeOS. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-text-secondary hover:text-accent-green transition-colors">
              <TwitterLogo size={24} weight="fill" />
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent-pink transition-colors">
              <InstagramLogo size={24} weight="fill" />
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
              <DiscordLogo size={24} weight="fill" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
