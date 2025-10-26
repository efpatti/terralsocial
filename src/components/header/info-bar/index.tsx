"use client";
import { motion } from "framer-motion";
import { terralTheme } from "@/constants/theme";
import { InfoItems } from "@/constants/info-items";
import { InfoBarItem } from "@/components/header/info-bar/info-bar-item";

const InfoBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-3 px-4 hidden md:block"
      style={{ backgroundColor: terralTheme.colors.bg.dark }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-white">
          {InfoItems.map((item, index) => (
            <InfoBarItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InfoBar;
