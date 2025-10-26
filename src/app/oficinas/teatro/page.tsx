import Workshop from "@/components/workshop";
import { Drama } from "lucide-react";

export default function TeatroPage() {
 return (
  <Workshop
   title="Teatro"
   subtitle="Explorando novas perspectivas em consciência corporal, expressão e comunicação"
   color="#10B981"
   icon={<Drama className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Quartas e Sextas, 10h-12h"
   ageGroup="9 a 15 anos"
   description="Explorando novas perspectivas em consciência corporal, expressão e comunicação, fomentamos o senso crítico através do conhecimento sociocultural e histórico do contexto em que estamos inseridos."
   objectives={[
    "Desenvolver consciência corporal e expressão através do teatro",
    "Aprimorar técnicas de comunicação e expressão cênica",
    "Fomentar o senso crítico dos participantes",
    "Promover conhecimento sociocultural e histórico",
    "Estimular a criatividade e trabalho em equipe",
   ]}
  />
 );
}
