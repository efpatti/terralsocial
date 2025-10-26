import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
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
    <Header />
    <main>{children}</main>
    <Footer />
   </body>
  </html>
 );
}
