import OficinaPage from "@/components/OficinaPage";
import { Globe } from "lucide-react";

export default function InglesPage() {
 return (
  <OficinaPage
   title="Inglês"
   subtitle="Ensino de idioma global promovendo qualificação pessoal e profissional"
   color="#3ca0e7"
   icon={<Globe className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Segundas e Quartas, 10h-12h"
   ageGroup="10 anos ou mais"
   description="Atendemos a necessidade de ensinar um idioma global em uma cidade turística, promovendo qualificação pessoal e profissional."
   objectives={[
    "Ensinar inglês como idioma global essencial",
    "Promover qualificação pessoal e profissional",
    "Preparar para oportunidades em cidade turística",
    "Desenvolver habilidades de comunicação em inglês",
    "Ampliar oportunidades de trabalho e estudo",
   ]}
  />
 );
}
