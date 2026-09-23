import type { Metadata } from "next";
import "./globals.css";
import { PwaRegister } from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: {
    default: "MyTrainX — Your AI Personal Trainer",
    template: "%s | MyTrainX",
  },
  description:
    "AI-first training ecosystem: Personal Trainer AI, structured programs, performance, community and premium content.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
