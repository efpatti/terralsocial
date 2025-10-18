import OficinaPage from "@/components/OficinaPage";
import { Palette } from "lucide-react";

export default function ArtesPage() {
 return (
  <OficinaPage
   title="Artes Visuais"
   subtitle="Desperte a criatividade através da pintura, desenho e expressão artística"
   color="#499D4B"
   icon={<Palette className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 10h-12h"
   ageGroup="7 a 14 anos"
   description="A oficina de Artes Visuais do TERRAL Social é um espaço dedicado ao desenvolvimento da criatividade e expressão artística. Através de diferentes técnicas de pintura, desenho, colagem e escultura, os participantes exploram materiais diversos e descobrem novas formas de se expressar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
   objectives={[
    "Desenvolver habilidades motoras finas e coordenação através da prática artística constante",
    "Estimular a criatividade e imaginação por meio de exercícios lúdicos e desafiadores",
    "Proporcionar conhecimento sobre história da arte e diferentes movimentos artísticos brasileiros",
    "Fortalecer a autoestima e autoexpressão através da valorização das produções individuais",
    "Criar um portfólio de obras que reflita o desenvolvimento artístico de cada participante",
   ]}
  />
 );
}
