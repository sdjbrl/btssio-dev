import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Modules de révision BTS SIO — BTSSIO.DEV",
  description: "Révisez le BTS SIO SISR & SLAM avec fiches de synthèse, QCM, TP guidés — basé sur le référentiel officiel BO n°5.",
};

export default function HomePage() {
  return <HomeClient />;
}
