import Workshop from "@/components/workshop";
import { Palette } from "lucide-react";

export default function ArtesPage() {
 return (
  <Workshop
   title="Artes"
   subtitle="Descobrindo e fomentando talentos através da expressão artística"
   color="#E74C3C"
   icon={<Palette className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 10h-12h"
   ageGroup="7 anos ou mais"
   description="Por meio da forma de expressão, descobrimos e fomentamos novos talentos, auxiliando no desenvolvimento profissional. Através do projeto 'Divertidamente' oferecemos um mecanismo de desenvolvimento psicomotor para pessoas com deficiência."
   objectives={[
    "Descobrir e fomentar novos talentos artísticos",
    "Auxiliar no desenvolvimento profissional através das artes",
    "Desenvolver habilidades psicomotoras (Projeto Divertidamente)",
    "Promover inclusão de pessoas com deficiência",
    "Estimular a expressão criativa e individualidade",
   ]}
  />
 );
}
