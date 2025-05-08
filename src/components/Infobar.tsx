"use client";

import { MapPin, Clock, Calendar } from "lucide-react";

const Infobar = () => {
 const address =
  "Rua Senador Ruy Carneiro 601, Terreirão - Recreio dos Bandeirantes, Rio de Janeiro, Rio de Janeiro 22795650";

 return (
  <div className="bg-[#499D4B] text-white text-sm font-medium py-2 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
   <div className="flex items-center">
    <MapPin size={14} className="mr-1.5" />
    <span>{address}</span>
   </div>
   <div className="flex items-center">
    <Clock size={14} className="mr-1.5" />
    <span>3ª e 5ª de 09h às 16h</span>
   </div>
   <div className="flex items-center">
    <Calendar size={14} className="mr-1.5" />
    <span>Sábados (conferir nas Redes Sociais)</span>
   </div>
  </div>
 );
};

export default Infobar;
