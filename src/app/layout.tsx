import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Index from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Terral Social",
 description: "Transformando vidas através da educação e da arte.",
 icons: {
  icon: "/terral.png",
  shortcut: "/terral.png",
  apple: "/terral.png",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-BR">
   <body className={inter.className}>
    <Index />
    <main>{children}</main>
    <Footer />
   </body>
  </html>
 );
}
