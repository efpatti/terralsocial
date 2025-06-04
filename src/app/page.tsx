import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
 const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
 };

 const projects = [
  {
   title: "Hortas Comunitárias",
   description: "Cultivando alimentos e cidadania em áreas urbanas",
   icon: "🌱",
  },
  {
   title: "Educação Ambiental",
   description: "Programas de conscientização para crianças e adultos",
   icon: "📚",
  },
  {
   title: "Reciclagem Solidária",
   description: "Transformando resíduos em renda para comunidades",
   icon: "♻️",
  },
 ];

 const stats = [
  { value: "500+", label: "Famílias beneficiadas" },
  { value: "20", label: "Comunidades atendidas" },
  { value: "100%", label: "Voluntários dedicados" },
 ];

 return (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
   {" "}
   {/* Adicionei pt-24 para espaço da navbar */}
   <Head>
    <title>
     Terral Social - Transformando vidas através da sustentabilidade
    </title>
    <meta
     name="description"
     content="ONG dedicada a projetos sociais e ambientais"
    />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   {/* Hero Section */}
   <section id="home" className="container mx-auto px-6 py-20">
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
     <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="md:w-1/2"
     >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
       Transformando <span className="text-green-600">vidas</span> e{" "}
       <span className="text-green-600">comunidades</span>
      </h1>
      <p className="mt-6 text-lg text-gray-600">
       A Terral Social atua criando soluções sustentáveis que unem
       desenvolvimento social e preservação ambiental.
      </p>
      <div className="mt-8 flex gap-4">
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-colors"
       >
        Quero Ajudar
       </motion.button>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
       >
        Conheça nossos projetos
       </motion.button>
      </div>
     </motion.div>
     <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="md:w-1/2"
     >
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
       <Image
        src="/hero-image.jpg" // Substitua por sua imagem
        alt="Comunidade beneficiada pela Terral Social"
        layout="fill"
        objectFit="cover"
        className="hover:scale-105 transition-transform duration-500"
       />
      </div>
     </motion.div>
    </div>
   </section>
   {/* Stats Section */}
   <section className="bg-green-600 text-white py-16">
    <div className="container mx-auto px-6">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
       visible: {
        opacity: 1,
        y: 0,
        transition: {
         staggerChildren: 0.2,
        },
       },
       hidden: { opacity: 0, y: 20 },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
     >
      {stats.map((stat, index) => (
       <motion.div key={index} variants={fadeIn} className="p-6">
        <div className="text-4xl font-bold mb-2">{stat.value}</div>
        <div className="text-xl">{stat.label}</div>
       </motion.div>
      ))}
     </motion.div>
    </div>
   </section>
   {/* Projects Section */}
   <section id="projects" className="container mx-auto px-6 py-20">
    <motion.div
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: "-100px" }}
     variants={fadeIn}
     className="text-center mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
      Nossos <span className="text-green-600">Projetos</span>
     </h2>
     <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Conheça nossas iniciativas que estão transformando realidades e promovendo
      desenvolvimento sustentável.
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     {projects.map((project, index) => (
      <motion.div
       key={index}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       variants={fadeIn}
       custom={index}
       whileHover={{ y: -10 }}
       className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
       <div className="text-4xl mb-4">{project.icon}</div>
       <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
       <p className="text-gray-600">{project.description}</p>
       <button className="mt-4 text-green-600 font-medium hover:text-green-700 transition-colors">
        Saiba mais →
       </button>
      </motion.div>
     ))}
    </div>
   </section>
   {/* About Section */}
   <section id="about" className="bg-gray-50 py-20">
    <div className="container mx-auto px-6">
     <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="md:w-1/2"
      >
       <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
        <Image
         src="/about-image.jpg" // Substitua por sua imagem
         alt="Sobre a Terral Social"
         layout="fill"
         objectFit="cover"
        />
       </div>
      </motion.div>
      <motion.div
       initial={{ opacity: 0, x: 50 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="md:w-1/2"
      >
       <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Sobre a <span className="text-green-600">Terral Social</span>
       </h2>
       <p className="text-gray-600 mb-4">
        Fundada em 2010, a Terral Social nasceu da vontade de criar um mundo
        mais justo e sustentável, onde o desenvolvimento social ande de mãos
        dadas com a preservação ambiental.
       </p>
       <p className="text-gray-600 mb-6">
        Nossa missão é implementar projetos que transformem realidades,
        capacitando pessoas e comunidades para se tornarem agentes de mudança em
        seus próprios territórios.
       </p>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-colors"
       >
        Conheça nossa história
       </motion.button>
      </motion.div>
     </div>
    </div>
   </section>
   {/* Donation CTA */}
   <section id="donate" className="bg-green-700 text-white py-20">
    <div className="container mx-auto px-6 text-center">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
     >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
       Sua doação transforma vidas
      </h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto">
       Com seu apoio, podemos ampliar nossos projetos e alcançar mais
       comunidades.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
       >
        Doar Agora
       </motion.button>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 border border-white text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
       >
        Seja um voluntário
       </motion.button>
      </div>
     </motion.div>
    </div>
   </section>
   {/* Contact Section */}
   <section id="contact" className="container mx-auto px-6 py-20">
    <div className="max-w-4xl mx-auto">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="text-center mb-12"
     >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
       Fale <span className="text-green-600">Conosco</span>
      </h2>
      <p className="mt-4 text-gray-600">
       Tem dúvidas, sugestões ou quer colaborar com nosso trabalho? Entre em
       contato!
      </p>
     </motion.div>

     <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-md"
     >
      <div className="md:col-span-2">
       <label htmlFor="name" className="block text-gray-700 mb-2">
        Nome
       </label>
       <input
        type="text"
        id="name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Seu nome completo"
       />
      </div>
      <div>
       <label htmlFor="email" className="block text-gray-700 mb-2">
        E-mail
       </label>
       <input
        type="email"
        id="email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="seu@email.com"
       />
      </div>
      <div>
       <label htmlFor="phone" className="block text-gray-700 mb-2">
        Telefone
       </label>
       <input
        type="tel"
        id="phone"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="(00) 00000-0000"
       />
      </div>
      <div className="md:col-span-2">
       <label htmlFor="message" className="block text-gray-700 mb-2">
        Mensagem
       </label>
       <textarea
        id="message"
        rows={5}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Como podemos te ajudar?"
       ></textarea>
      </div>
      <motion.button
       whileHover={{ scale: 1.02 }}
       whileTap={{ scale: 0.98 }}
       type="submit"
       className="md:col-span-2 px-6 py-4 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700 transition-colors"
      >
       Enviar Mensagem
      </motion.button>
     </motion.form>
    </div>
   </section>
   {/* Footer */}
   <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-6">
     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
       <h3 className="text-xl font-bold mb-4">Terral Social</h3>
       <p className="text-gray-400">
        Transformando vidas e comunidades através de projetos sociais e
        ambientais sustentáveis.
       </p>
      </div>
      <div>
       <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
       <ul className="space-y-2 text-gray-400">
        <li>
         <a href="#home" className="hover:text-white transition-colors">
          Início
         </a>
        </li>
        <li>
         <a href="#about" className="hover:text-white transition-colors">
          Sobre
         </a>
        </li>
        <li>
         <a href="#projects" className="hover:text-white transition-colors">
          Projetos
         </a>
        </li>
        <li>
         <a href="#donate" className="hover:text-white transition-colors">
          Doações
         </a>
        </li>
        <li>
         <a href="#contact" className="hover:text-white transition-colors">
          Contato
         </a>
        </li>
       </ul>
      </div>
      <div>
       <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
       <div className="flex space-x-4">
        <a
         href="#"
         className="text-gray-400 hover:text-white transition-colors"
        >
         <span className="sr-only">Facebook</span>
         <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
         >
          <path
           fillRule="evenodd"
           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
           clipRule="evenodd"
          />
         </svg>
        </a>
        <a
         href="#"
         className="text-gray-400 hover:text-white transition-colors"
        >
         <span className="sr-only">Instagram</span>
         <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
         >
          <path
           fillRule="evenodd"
           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
           clipRule="evenodd"
          />
         </svg>
        </a>
        <a
         href="#"
         className="text-gray-400 hover:text-white transition-colors"
        >
         <span className="sr-only">YouTube</span>
         <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
         >
          <path
           fillRule="evenodd"
           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
           clipRule="evenodd"
          />
         </svg>
        </a>
       </div>
      </div>
     </div>
     <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
      <p>
       &copy; {new Date().getFullYear()} Terral Social. Todos os direitos
       reservados.
      </p>
     </div>
    </div>
   </footer>
  </div>
 );
}
