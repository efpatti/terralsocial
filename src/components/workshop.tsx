"use client";

import { contact } from "@/constants/contact";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OficinaPageProps {
  title: string;
  subtitle: string;
  color: string;
  icon: ReactNode;
  description: string;
  objectives: string[];
  schedule?: string;
  ageGroup?: string;
}

export default function Workshop({
  title,
  subtitle,
  color,
  icon,
  description,
  objectives,
  schedule,
  ageGroup,
}: OficinaPageProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header com cor temática */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl mb-12"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-48 -translate-x-48" />
        </div>

        <div className="relative px-8 py-16 md:px-16 md:py-20 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              {icon}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-center mb-4"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-center text-white/90 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Info Cards */}
      {(schedule || ageGroup) && (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {schedule && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4"
              style={{ borderColor: color }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Horários</h3>
              <p className="text-gray-600">{schedule}</p>
            </motion.div>
          )}

          {ageGroup && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4"
              style={{ borderColor: color }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">👥 Faixa Etária</h3>
              <p className="text-gray-600">{ageGroup}</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Descrição */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sobre a Oficina</h2>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </motion.div>

      {/* Objetivos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Objetivos</h2>
        <div className="grid gap-4">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed pt-2">{objective}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <a
          href={contact.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: color }}
        >
          Saiba Mais no Instagram
        </a>
      </motion.div>
    </div>
  );
}
