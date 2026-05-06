"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Hexagon } from "lucide-react";
import UserMenu from "./UserMenu";

const navLinks = [
  {
    label: "Tronc Commun",
    href: "/tronc-commun",
  },
  {
    label: "SISR",
    href: "/sisr",
    color: "text-[#22C55E]",
  },
  {
    label: "SLAM",
    href: "/slam",
    color: "text-[#8B5CF6]",
  },
  { label: "Examens", href: "/examens" },
  { label: "Progression", href: "/progression" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 bg-[#1B2336]/90 backdrop-blur border-b border-[#475569]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg text-[#F8FAFC]">
          <Hexagon className="w-7 h-7 text-[#22C55E]" />
          <span>BTSSIO<span className="text-[#22C55E]">.DEV</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-sans font-medium transition-colors ${isActive ? "text-[#22C55E] font-bold" : "text-[#94A3B8] hover:text-[#F8FAFC]"} ${link.color ?? ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
            Se connecter
          </Link>
          <Link
            href="/inscription"
            className="text-sm bg-[#22C55E] text-[#0F172A] font-semibold px-4 py-1.5 rounded-md hover:bg-[#22C55E]/90 transition-colors"
          >
            S&apos;inscrire
          </Link>
          <UserMenu />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#94A3B8] p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-menu" className="md:hidden bg-[#1B2336] border-t border-[#475569] px-4 py-4 flex flex-col gap-3" aria-label="Menu mobile">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-sans font-medium py-1 transition-colors ${isActive ? "text-[#22C55E] font-bold" : "text-[#94A3B8] hover:text-[#F8FAFC]"} ${link.color ?? ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <hr className="border-[#475569] my-1" />
          <Link href="/inscription" className="text-sm bg-[#22C55E] text-[#0F172A] font-semibold px-4 py-2 rounded-md text-center">
            S&apos;inscrire gratuitement
          </Link>
        </nav>
      )}
    </nav>
  );
}
