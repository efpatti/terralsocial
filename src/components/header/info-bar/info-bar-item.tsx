"use client";
import { motion } from "framer-motion";
import { InfoItem } from "@/types/info-item";

interface InfoBarItemProps {
  item: InfoItem;
  index: number;
}

export const InfoBarItem = ({ item, index }: InfoBarItemProps) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="flex items-center gap-2 text-xs md:text-sm font-medium"
    >
      <span className="opacity-90">
        <Icon size={16} />
      </span>
      <span>{item.text}</span>
    </motion.div>
  );
};
