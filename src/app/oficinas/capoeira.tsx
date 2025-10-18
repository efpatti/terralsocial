import OficinaPage from "@/components/OficinaPage";
import { Music } from "lucide-react";

export default function CapoeiraPage() {
 return (
  <OficinaPage
   title="Capoeira"
   subtitle="Arte marcial brasileira que une luta, dança, música e cultura"
   color="#499D4B"
   icon={<Music className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Quartas e Sextas, 14h-16h"
   ageGroup="8 a 16 anos"
   description="A Capoeira no TERRAL Social é mais do que uma prática física - é uma jornada cultural profunda. Os alunos aprendem movimentos, ritmos, cantos e a rica história desta manifestação cultural afro-brasileira. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis est non commodo luctus, nisi erat porttitor ligula."
   objectives={[
    "Desenvolver consciência corporal, equilíbrio e flexibilidade através dos movimentos da capoeira",
    "Ensinar a história e importância cultural da capoeira na formação da identidade brasileira",
    "Promover disciplina, respeito e trabalho em grupo através da roda de capoeira",
    "Estimular o aprendizado musical com instrumentos tradicionais como berimbau e pandeiro",
    "Fortalecer valores de ancestralidade, resistência e comunidade",
   ]}
  />
 );
}
