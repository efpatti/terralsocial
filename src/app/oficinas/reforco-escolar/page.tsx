import Workshop from "@/components/workshop";
import { BookOpen } from "lucide-react";

export default function ReforcoEscolarPage() {
 return (
  <Workshop
   title="Reforço Escolar"
   subtitle="Estimulando a aprendizagem e promovendo acesso à educação"
   color="#499D4B"
   icon={<BookOpen className="w-16 h-16 md:w-20 md:h-20" />}
   schedule="Terças e Quintas, 9h-11h"
   ageGroup="7 a 14 anos"
   description="Estimulamos a aprendizagem, auxiliando os alunos com dificuldades. Dessa forma, promovemos maior acesso à educação, reduzindo a evasão escolar."
   objectives={[
    "Estimular a aprendizagem dos alunos",
    "Auxiliar estudantes com dificuldades escolares",
    "Promover maior acesso à educação de qualidade",
    "Reduzir a evasão escolar na comunidade",
    "Desenvolver autonomia e confiança nos estudos",
   ]}
  />
 );
}
