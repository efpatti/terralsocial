import type { Metadata } from "next";
import AuthProvider from "@/services/auth_provider";
import "./globals.css";
import Index from "@/components/header";
import Footer from "@/components/footer";

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
   <body className="antialiased">
    <AuthProvider>
     <Index />
     <main className="z-0">{children}</main>
     <Footer />
    </AuthProvider>
   </body>
  </html>
 );
}
