"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Heart,
  Users,
  Calendar,
  Star,
  Award,
  Target,
  Quote,
  Play,
  Theater,
  Music,
  GraduationCap,
  Microscope,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";

// Hook para contadores animados
function useCounter(target: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useState(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(startValue + (target - startValue) * easeProgress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });

  return { count, ref: nodeRef };
}

// Componente de Citação Inspiradora
const InspirationalQuote = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center my-16 shadow-2xl"
    >
      <Quote className="w-12 h-12 mx-auto mb-4 opacity-50" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-light italic leading-relaxed mb-4"
      >
        "A maior riqueza do homem é a sua incompletude. Nesse ponto, sou abastado."
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg opacity-90"
      >
        Palavras que me aceitam como eu sou, eu não aceito.
      </motion.p>
    </motion.div>
  );
};

// Componente de Manifesto
const ManifestoSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 bg-yellow-50 border-y-2 border-yellow-200"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Theater className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-800 mb-6 leading-relaxed"
        >
          "Não aguento ser apenas um sujeito que abre portas, que puxa válvulas, 
          que olha o relógio, que compra pão às seis da tarde..."
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-yellow-700 font-bold mb-4"
        >
          Perdoai, mas eu preciso ser outros.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl text-yellow-600 font-black"
        >
          Eu penso renovar o homem usando borboletas.
        </motion.p>
      </div>
    </motion.section>
  );
};

// Componente de Depoimento em Destaque
const FeaturedTestimonial = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-green-200">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Henrique - Participante desde o início
              </h3>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>"Fazer teatro para mim é uma coisa que eu amo na minha vida.</strong> 
                  Envolve não só a arte do teatro, da cultura, mas para a vida, para o trabalho, 
                  para o dia a dia. Fazer teatro para mim, Henrique, é tudo."
                </p>
                <p>
                  "O que foi fazer teatro quando eu entrei no Fazenda Acontecendo, que era uma 
                  grande brincadeira, era uma forma de matar o tempo. Ou era eu ficar em casa, 
                  fazendo nada, ou eu ia me divertir com meus amigos."
                </p>
                <p className="text-green-600 font-semibold">
                  "Ele alimenta a minha alma, alimenta tudo dentro de mim. Ele tem sido uma válvula 
                  de escape, ele tem sido meu psicólogo, ele tem sido tudo na minha vida."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Componente de Linha do Tempo Detalhada
const DetailedTimeline = () => {
  const timelineEvents = [
    {
      year: "1992",
      title: "O Início da Jornada",
      description: "Início das atividades com práticas artístico-pedagógicas na Comunidade do Terreirão/RJ",
      details: "Um sonho de arte e transformação começa a tomar forma no coração do Terreirão",
      icon: Sparkles
    },
    {
      year: "1995",
      title: "Nasce o Fazendo Acontecendo",
      description: "Grupo de teatro começa como brincadeira entre amigos",
      details: "Ensaiávamos no Quintal da Janete ou na Casa de Rio de Alguém. Era uma grande diversão, uma forma de matar o tempo e se divertir com amigos.",
      icon: Theater
    },
    {
      year: "1998",
      title: "Primeiras Produções",
      description: "Primeira Paixão de Cristo e espetáculos comunitários",
      details: "Lembro de uma Paixão de Cristo que a gente fez aqui e a gente conseguiu só um tablado. A gente saiu nas obras, no recreio todo, catando madeiras para fazer a base para sustentar o palco. E nós fizemos!",
      icon: Award
    },
    {
      year: "2000",
      title: "Crescimento e Reconhecimento",
      description: "Parceria com Nena Ribeiro e espaço na Cresce Amor",
      details: "Conseguimos um espaço enorme na Cresce Amor, tivemos uma parceira muito boa com a Nena Ribeiro que sempre ajudava, dava figurino também para a gente.",
      icon: Users
    },
    {
      year: "2005",
      title: "Expansão do Impacto",
      description: "Projetos sociais além do teatro",
      details: "A companhia acabou fazendo também um trabalho social. Cada um foi procurando o que faz melhor - alguns na produção, outros na direção, outros no trabalho social.",
      icon: Heart
    },
    {
      year: "2024",
      title: "32 Anos de Transformação",
      description: "Consolidação como referência em ação comunitária",
      details: "Hoje trilham um caminho do bem, de ação social. Fazem alguma coisa para poder ajudar o próximo. O Terreirão entrou no mapa da cultura do Rio de Janeiro!",
      icon: Star
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center text-gray-800 mb-16"
        >
          Nossa <span className="text-green-600">Jornada</span> em Detalhes
        </motion.h2>

        <div className="relative">
          {/* Linha do tempo */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-2 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Marcador */}
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-green-500 to-blue-500 mt-2" />
                      )}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-black text-green-600">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-700 mb-3 font-semibold">{event.description}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.details}</p>
                    </div>
                  </div>

                  {/* Espaço vazio para layout alternado */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de Impacto na Comunidade
const CommunityImpact = () => {
  const impacts = [
    {
      icon: GraduationCap,
      title: "Escola de Atores e Vida",
      description: "O Fazenda Acontecendo foi uma escola de atores e uma família. Muitos participantes se destacaram em bons empregos por causa do desempenho de comunicação."
    },
    {
      icon: Heart,
      title: "Transformação Pessoal",
      description: "Para muitos, o teatro foi válvula de escape, psicólogo, tudo na vida. Salvou pessoas que passaram por coisas ruins."
    },
    {
      icon: Target,
      title: "Voz para a Comunidade",
      description: "O teatro dá voz a quem não tem voz. Mostra que o morador da comunidade é muito mais do que um pobre coitado."
    },
    {
      icon: Users,
      title: "Trabalho em Coletivo",
      description: "Estar trabalhando no coletivo representa muito. Não queremos só para nós, queremos para todos."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-4"
        >
          Impacto na <span className="text-yellow-300">Comunidade</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl text-center mb-12 max-w-3xl mx-auto opacity-90"
        >
          "O sol que brilha para um, vá brilhar para todos"
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-yellow-300 mb-4" />
                <h3 className="text-xl font-bold mb-3">{impact.title}</h3>
                <p className="opacity-90 leading-relaxed">{impact.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Componente de Desafios e Superações
const ChallengesSection = () => {
  const challenges = [
    {
      title: "Recursos Limitados",
      description: "Tínhamos dificuldades financeiras para fazer a coisa acontecer. Conseguimos só um tablado para a primeira Paixão de Cristo.",
      solution: "Saímos catando madeiras nas obras para fazer a base do palco"
    },
    {
      title: "Falta de Liderança",
      description: "Éramos jovens talentosos mas ficamos sem pai. Cada um foi buscando seu rumo, teve brigas.",
      solution: "Cada um encontrou seu caminho no que mais sobressaía"
    },
    {
      title: "Escolhas Difíceis",
      description: "Entre botar a comida no prato ou continuar a brincadeira com os amigos.",
      solution: "O grupo se desfez mas cada um levou consigo os aprendizados"
    }
  ];

  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center text-gray-800 mb-16"
        >
          Desafios e <span className="text-orange-600">Superações</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-orange-600 text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{challenge.title}</h3>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <p className="text-orange-700 font-semibold text-sm">
                  <strong>Solução:</strong> {challenge.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function NossaHistoria() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#FFFBF5] to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-purple-700">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/30" />
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              Uma História de <span className="text-yellow-300">Arte</span> e 
              <span className="text-yellow-300"> Transformação</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
            >
              32 anos renovando o homem usando borboletas no coração do Terreirão
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
              >
                <Play size={20} fill="currentColor" />
                Conheça Nossa Trajetória
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Citação Inspiradora */}
      <InspirationalQuote />

      {/* Manifesto */}
      <ManifestoSection />

      {/* Depoimento em Destaque */}
      <FeaturedTestimonial />

      {/* Linha do Tempo Detalhada */}
      <DetailedTimeline />

      {/* Impacto na Comunidade */}
      <CommunityImpact />

      {/* Desafios e Superações */}
      <ChallengesSection />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            E <span className="text-green-400">Vamos Chegar</span>!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            "Com certeza a gente vai chegar. Isso aí, sem dúvida. Sem dúvida."
            <br />
            Mostrando sempre felicidade de estar na rua. Vocês são pobres, mas são felizes!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition-all flex items-center gap-3"
            >
              <Heart size={20} />
              Faça Parte Dessa História
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3"
            >
              <Users size={20} />
              Conheça Nossos Projetos
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-green-300 text-lg font-semibold"
          >
            Nós gatos já nascemos pobres, porém já nascemos livres! 🎭✨
          </motion.p>
        </div>
      </section>
    </div>
  );
}