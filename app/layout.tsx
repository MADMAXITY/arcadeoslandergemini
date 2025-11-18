import type { Metadata } from "next";
import { Inter, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "ArcadeOS - The Future of Gaming Centers",
  description: "Transform your gaming cafe with the most advanced management operating system.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${rajdhani.variable} ${orbitron.variable} font-sans bg-bg-primary text-text-primary antialiased selection:bg-accent-green selection:text-bg-primary`}>
        {children}
      </body>
    </html>
  );
}
