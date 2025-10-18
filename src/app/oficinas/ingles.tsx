import OficinaPage from "@/components/OficinaPage";
import { Globe } from "lucide-react";

export default function InglesPage() {
 return (
  <OficinaPage
   title="Inglês"
   subtitle="Abra portas para o mundo através do aprendizado da língua inglesa"
   color="#3ca0e7"
   icon={<Globe className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Segundas e Quartas, 10h-12h"
   ageGroup="10 a 16 anos"
   description="As aulas de Inglês no TERRAL Social são dinâmicas e focadas na comunicação prática. Através de jogos, músicas, conversação e atividades interativas, os alunos desenvolvem as quatro habilidades linguísticas: escuta, fala, leitura e escrita. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod."
   objectives={[
    "Desenvolver competência comunicativa em inglês para situações do cotidiano",
    "Ampliar vocabulário e estruturas gramaticais de forma progressiva e contextualizada",
    "Proporcionar contato com a cultura de países anglófonos através de materiais autênticos",
    "Preparar os jovens para oportunidades acadêmicas e profissionais futuras",
    "Trabalhar a autoconfiança na expressão oral em um novo idioma",
   ]}
  />
 );
}
