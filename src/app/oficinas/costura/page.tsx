import OficinaPage from "@/components/OficinaPage";
import { Scissors } from "lucide-react";

export default function CosturaPage() {
 return (
  <OficinaPage
   title="Costura"
   subtitle="Desenvolvimento profissional através da socialização e troca de conhecimentos"
   color="#8B5CF6"
   icon={<Scissors className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 14h-16h"
   ageGroup="12 anos ou mais"
   description="Oferece troca de informações e desenvolvimento profissional, através da socialização de quem faz parte dessa oficina. Além disso, é mais uma possibilidade de fonte de renda para as costureiras."
   objectives={[
    "Promover troca de informações e conhecimentos entre participantes",
    "Desenvolver habilidades profissionais em costura",
    "Estimular a socialização através do trabalho coletivo",
    "Criar oportunidades de geração de renda",
    "Ensinar técnicas de costura e confecção",
   ]}
  />
 );
}
