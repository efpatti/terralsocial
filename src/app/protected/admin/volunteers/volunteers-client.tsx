"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import {
 User,
 Mail,
 Phone,
 MapPin,
 Clock,
 Edit,
 Trash2,
 Plus,
 X,
 Save,
 Download,
} from "lucide-react";

type Volunteer = {
 id: number;
 name: string;
 email: string;
 phone: string;
 area: string;
 availability: string;
 experience?: string | null;
 message?: string | null;
 createdAt: string;
};

type Props = {
 initialVolunteers: Volunteer[];
 totalCount: number;
};

const containerVariants: Variants = {
 hidden: { opacity: 0, y: 8 },
 visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 6 },
 visible: {
  opacity: 1,
  y: 0,
  transition: { type: "spring" as const, stiffness: 120 },
 },
};

export default function VolunteersClientPage({ initialVolunteers }: Props) {
 const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
 const [searchTerm, setSearchTerm] = useState("");
 const [filterArea, setFilterArea] = useState("");
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
  null
 );
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  area: "",
  availability: "",
  experience: "",
  message: "",
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 12;

 // Áreas disponíveis (pode vir do backend no futuro)
 const areas = [
  "Educação",
  "Artes e Cultura",
  "Esportes",
  "Saúde",
  "Meio Ambiente",
  "Tecnologia",
  "Administrativo",
 ];

 const availabilities = ["4-8h", "8-12h", "12-20h", "20h+"];

 // Filtros
 const filteredVolunteers = volunteers.filter((v) => {
  const matchesSearch =
   v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   v.email.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesArea = !filterArea || v.area === filterArea;
  return matchesSearch && matchesArea;
 });

 // Paginação
 const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
 const paginatedVolunteers = filteredVolunteers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
 );

 const openModal = (volunteer?: Volunteer) => {
  if (volunteer) {
   setEditingVolunteer(volunteer);
   setFormData({
    name: volunteer.name,
    email: volunteer.email,
    phone: volunteer.phone,
    area: volunteer.area,
    availability: volunteer.availability,
    experience: volunteer.experience || "",
    message: volunteer.message || "",
   });
  } else {
   setEditingVolunteer(null);
   setFormData({
    name: "",
    email: "",
    phone: "",
    area: "",
    availability: "",
    experience: "",
    message: "",
   });
  }
  setIsModalOpen(true);
  setError(null);
 };

 const closeModal = () => {
  setIsModalOpen(false);
  setEditingVolunteer(null);
  setError(null);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
   const url = editingVolunteer
    ? `/api/volunteers/${editingVolunteer.id}`
    : "/api/volunteers";
   const method = editingVolunteer ? "PUT" : "POST";

   const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });

   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao salvar voluntário");
   }

   const data = await response.json();

   if (editingVolunteer) {
    setVolunteers((prev) =>
     prev.map((v) => (v.id === editingVolunteer.id ? data.volunteer : v))
    );
   } else {
    setVolunteers((prev) => [data.data, ...prev]);
   }

   closeModal();
  } catch (err) {
   const e = err as Error;
   setError(e.message || "Erro inesperado");
  } finally {
   setLoading(false);
  }
 };

 const handleDelete = async (id: number) => {
  if (!confirm("Tem certeza que deseja excluir este voluntário?")) return;

  try {
   const response = await fetch(`/api/volunteers/${id}`, {
    method: "DELETE",
   });

   if (!response.ok) {
    throw new Error("Erro ao excluir voluntário");
   }

   setVolunteers((prev) => prev.filter((v) => v.id !== id));
  } catch (err) {
   const e = err as Error;
   alert(e.message || "Erro ao excluir");
  }
 };

 const exportToCSV = () => {
  const headers = [
   "ID",
   "Nome",
   "Email",
   "Telefone",
   "Área",
   "Disponibilidade",
   "Data",
  ];
  const rows = filteredVolunteers.map((v) => [
   v.id,
   v.name,
   v.email,
   v.phone,
   v.area,
   v.availability,
   new Date(v.createdAt).toLocaleDateString("pt-BR"),
  ]);

  const csvContent = [
   headers.join(","),
   ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `voluntarios_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-12 px-4">
   <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-7xl mx-auto"
   >
    {/* Header */}
    <motion.div variants={itemVariants} className="mb-8 text-center">
     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-2xl mb-4 shadow-lg">
      <User className="w-8 h-8 text-white" />
     </div>
     <h1 className="text-3xl font-bold text-[#2C3E50]">
      Gerenciar Voluntários
     </h1>
     <p className="text-[#6B7280]">
      Total de {filteredVolunteers.length} voluntário
      {filteredVolunteers.length !== 1 && "s"}
     </p>
    </motion.div>

    {/* Actions Bar */}
    <motion.div
     variants={itemVariants}
     className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6"
    >
     <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
       <input
        type="text"
        placeholder="Buscar por nome ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
       />
       <select
        value={filterArea}
        onChange={(e) => setFilterArea(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
       >
        <option value="">Todas as áreas</option>
        {areas.map((area) => (
         <option key={area} value={area}>
          {area}
         </option>
        ))}
       </select>
      </div>

      <div className="flex gap-3">
       <button
        onClick={exportToCSV}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#499D4B] text-[#499D4B] hover:bg-[#499D4B] hover:text-white transition"
       >
        <Download className="w-4 h-4" />
        Exportar CSV
       </button>
       <button
        onClick={() => openModal()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#499D4B] to-[#3ca0e7] text-white hover:from-[#3d8a3f] hover:to-[#3090d7] transition shadow-lg"
       >
        <Plus className="w-4 h-4" />
        Novo Voluntário
       </button>
      </div>
     </div>
    </motion.div>

    {/* Volunteers Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
     {paginatedVolunteers.map((v) => (
      <motion.div
       variants={itemVariants}
       key={v.id}
       className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition"
      >
       <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] flex items-center justify-center text-white font-bold text-lg">
          {v.name.charAt(0).toUpperCase()}
         </div>
         <div>
          <h3 className="font-semibold text-[#2C3E50]">{v.name}</h3>
          <p className="text-xs text-[#6B7280]">
           {new Date(v.createdAt).toLocaleDateString("pt-BR")}
          </p>
         </div>
        </div>
        <div className="flex gap-1">
         <button
          onClick={() => openModal(v)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"
          title="Editar"
         >
          <Edit className="w-4 h-4" />
         </button>
         <button
          onClick={() => handleDelete(v.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition"
          title="Excluir"
         >
          <Trash2 className="w-4 h-4" />
         </button>
        </div>
       </div>

       <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-[#6B7280]">
         <Mail className="w-4 h-4" />
         <span className="truncate">{v.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[#6B7280]">
         <Phone className="w-4 h-4" />
         <span>{v.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-[#2C3E50]">
         <MapPin className="w-4 h-4 text-[#499D4B]" />
         <span className="font-medium">{v.area}</span>
        </div>
        <div className="flex items-center gap-2 text-[#6B7280]">
         <Clock className="w-4 h-4" />
         <span>{v.availability}</span>
        </div>
       </div>
      </motion.div>
     ))}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
     <div className="flex justify-center gap-2">
      <button
       onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
       disabled={currentPage === 1}
       className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
       Anterior
      </button>
      <span className="px-4 py-2 text-[#6B7280]">
       Página {currentPage} de {totalPages}
      </span>
      <button
       onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
       disabled={currentPage === totalPages}
       className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
       Próxima
      </button>
     </div>
    )}

    {/* Modal */}
    {isModalOpen && (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
       initial={{ opacity: 0, scale: 0.95 }}
       animate={{ opacity: 1, scale: 1 }}
       className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
       <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2C3E50]">
         {editingVolunteer ? "Editar Voluntário" : "Novo Voluntário"}
        </h2>
        <button
         onClick={closeModal}
         className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
         <X className="w-5 h-5" />
        </button>
       </div>

       <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
         <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
         </div>
        )}

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Nome Completo *
         </label>
         <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
          placeholder="Nome do voluntário"
         />
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Email *
         </label>
         <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
          placeholder="email@exemplo.com"
         />
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Telefone *
         </label>
         <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
          placeholder="(00) 00000-0000"
         />
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Área de Interesse *
         </label>
         <select
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
         >
          <option value="">Selecione uma área</option>
          {areas.map((area) => (
           <option key={area} value={area}>
            {area}
           </option>
          ))}
         </select>
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Disponibilidade *
         </label>
         <select
          value={formData.availability}
          onChange={(e) =>
           setFormData({ ...formData, availability: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
         >
          <option value="">Selecione a disponibilidade</option>
          {availabilities.map((avail) => (
           <option key={avail} value={avail}>
            {avail}
           </option>
          ))}
         </select>
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Experiência
         </label>
         <textarea
          value={formData.experience}
          onChange={(e) =>
           setFormData({ ...formData, experience: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
          placeholder="Experiência prévia (opcional)"
         />
        </div>

        <div>
         <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
          Mensagem
         </label>
         <textarea
          value={formData.message}
          onChange={(e) =>
           setFormData({ ...formData, message: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499D4B]"
          placeholder="Motivação/mensagem (opcional)"
         />
        </div>

        <div className="flex gap-3 pt-4">
         <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-semibold"
         >
          Cancelar
         </button>
         <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#499D4B] to-[#3ca0e7] text-white hover:from-[#3d8a3f] hover:to-[#3090d7] transition font-semibold disabled:opacity-50 shadow-lg"
         >
          {loading ? (
           "Salvando..."
          ) : (
           <>
            <Save className="w-4 h-4" />
            {editingVolunteer ? "Salvar Alterações" : "Criar Voluntário"}
           </>
          )}
         </button>
        </div>
       </form>
      </motion.div>
     </div>
    )}
   </motion.div>
  </div>
 );
}
