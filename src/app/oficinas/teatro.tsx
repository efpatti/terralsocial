import OficinaPage from "@/components/OficinaPage";
import { Drama } from "lucide-react";

export default function TeatroPage() {
 return (
  <OficinaPage
   title="Teatro"
   subtitle="Descubra o poder da expressão cênica e desenvolva suas habilidades artísticas"
   color="#E74C3C"
   icon={<Drama className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Quartas e Sextas, 10h-12h"
   ageGroup="9 a 15 anos"
   description="A oficina de Teatro é um espaço de descobertas, onde os participantes exploram técnicas de interpretação, improvisação, expressão corporal e vocal. Através de jogos teatrais e montagens de espetáculos, os jovens desenvolvem habilidades sociais, criativas e emocionais essenciais. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus porta ac consectetur ac vestibulum."
   objectives={[
    "Desenvolver técnicas de expressão corporal, vocal e interpretação teatral",
    "Estimular a desinibição e autoconfiança através de exercícios de improvisação",
    "Trabalhar habilidades de colaboração e escuta ativa no trabalho em grupo",
    "Promover o contato com textos teatrais e diferentes gêneros dramáticos",
    "Realizar apresentações públicas que fortaleçam a segurança e presença de palco",
   ]}
  />
 );
}
