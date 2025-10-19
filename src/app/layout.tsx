import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Terral Social",
 description: "Transformando vidas através da educação e da arte.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-BR">
   <body className={inter.className}>
    <Header />
    <main>{children}</main>
    <Footer />
   </body>
  </html>
 );
}
