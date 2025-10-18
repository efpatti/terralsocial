import OficinaPage from "@/components/OficinaPage";
import { Music } from "lucide-react";

export default function CapoeiraPage() {
 return (
  <OficinaPage
   title="Capoeira"
   subtitle="Preservação da cultura através do desenvolvimento físico e social"
   color="#F59E0B"
   icon={<Music className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Quartas e Sextas, 14h-16h"
   ageGroup="8 a 16 anos"
   description="Visamos a preservação da cultura, por meio do desenvolvimento físico dos alunos, salientando a prática da capoeira. Desta forma, refletimos não só no corpo como na mente, e no convívio dos alunos em sociedade."
   objectives={[
    "Desenvolver consciência corporal, equilíbrio e flexibilidade através dos movimentos da capoeira",
    "Preservar e valorizar a cultura afro-brasileira",
    "Promover desenvolvimento físico e mental dos alunos",
    "Melhorar o convívio social e trabalho em grupo",
    "Ensinar disciplina, respeito e valores culturais",
   ]}
  />
 );
}
