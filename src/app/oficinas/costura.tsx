import OficinaPage from "@/components/OficinaPage";
import { Scissors } from "lucide-react";

export default function CosturaPage() {
 return (
  <OficinaPage
   title="Costura e Moda"
   subtitle="Aprenda técnicas de costura e desenvolva sua criatividade na moda"
   color="#E74C3C"
   icon={<Scissors className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 14h-16h"
   ageGroup="12 a 17 anos"
   description="A oficina de Costura e Moda oferece conhecimentos práticos e teóricos sobre confecção de roupas e acessórios. Os participantes aprendem desde o básico da costura até técnicas mais avançadas, desenvolvendo habilidades que podem se tornar uma profissão. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna."
   objectives={[
    "Ensinar técnicas fundamentais de costura à mão e à máquina com segurança",
    "Desenvolver noções de modelagem e criação de peças básicas do vestuário",
    "Estimular a consciência sobre moda sustentável e reaproveitamento de materiais",
    "Proporcionar conhecimento profissionalizante que pode gerar renda futura",
    "Criar peças funcionais que os alunos possam usar e presentear",
   ]}
  />
 );
}
