import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandHeart } from "lucide-react";

export const VolunteerButton = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <Link href="/voluntario">
      <Button
        variant="ghost"
        className="text-gray-700 font-semibold hover:text-[#499D4B] hover:bg-green-50 transition-all duration-200 flex items-center gap-2 px-4 py-2"
      >
        <HandHeart size={18} />
        <span>Seja Voluntário</span>
      </Button>
    </Link>
  </motion.div>
);
