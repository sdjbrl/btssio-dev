import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BTSSIO.DEV — Plateforme de révision BTS SIO",
  description:
    "Révisez votre BTS SIO (SISR & SLAM) avec des fiches, QCM et TP basés sur le référentiel officiel de l'Éducation Nationale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#0F172A] text-[#F8FAFC] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
