import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "BTSSIO.DEV — Plateforme de révision BTS SIO",
  description:
    "Révisez votre BTS SIO (SISR & SLAM) avec des fiches, QCM et TP basés sur le référentiel officiel de l'Éducation Nationale.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#0F172A] text-[#F8FAFC] antialiased">
        <SessionProvider session={session}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#22C55E] focus:text-black focus:px-4 focus:py-2 focus:rounded">
            Accéder au contenu principal
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
