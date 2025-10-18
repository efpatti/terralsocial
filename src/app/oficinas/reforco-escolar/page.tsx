import OficinaPage from "@/components/OficinaPage";
import { BookOpen } from "lucide-react";

export default function ReforcoEscolarPage() {
 return (
  <OficinaPage
   title="Reforço Escolar"
   subtitle="Apoio pedagógico para melhorar o desempenho e confiança nos estudos"
   color="#F39C12"
   icon={<BookOpen className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 9h-11h"
   ageGroup="7 a 14 anos"
   description="O Reforço Escolar do TERRAL Social oferece suporte individualizado para crianças e adolescentes que precisam de apoio extra em suas atividades escolares. Com metodologia lúdica e acolhedora, trabalhamos principalmente Português e Matemática, sempre respeitando o ritmo de cada estudante. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
   objectives={[
    "Auxiliar na compreensão de conteúdos escolares com dificuldades específicas",
    "Desenvolver autonomia e organização nos estudos através de técnicas de aprendizagem",
    "Fortalecer habilidades de leitura, interpretação e raciocínio lógico-matemático",
    "Elevar a autoestima e confiança dos estudantes em relação ao desempenho escolar",
    "Estabelecer parceria com escolas e famílias para acompanhamento integral do aluno",
   ]}
  />
 );
}
