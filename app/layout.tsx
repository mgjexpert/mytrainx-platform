import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PwaRegister } from "@/components/PwaRegister";

const inter = localFont({
  src: "../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter", weight: "100 900", display: "swap",
});
const barlow = localFont({
  src: [
    { path: "../public/fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" },
    { path: "../public/fonts/barlow-condensed-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-barlow", display: "swap",
});
const mono = localFont({
  src: "../public/fonts/space-mono-latin-400-normal.woff2",
  variable: "--font-space-mono", weight: "400", display: "swap", preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "MyTrainX — Find your X. Treino inteligente. Evolução real.",
    template: "%s | MyTrainX",
  },
  description:
    "Conheça o ecossistema MyTrainX: Coach X, programas de treino e evolução. Explore o WKT Militar e os próximos recursos da plataforma.",
  icons: {
    icon: [{ url: "/brand/x-icon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/x-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = { themeColor: "#090B0E", colorScheme: "dark" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlow.variable} ${mono.variable}`}>
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
