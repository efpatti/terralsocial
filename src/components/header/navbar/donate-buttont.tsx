import { useState } from "react";
import { terralTheme } from "@/constants/theme";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export const DonateButton = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
  const [bgColor, setBgColor] = useState<string>(terralTheme.colors.primary);

  if (variant === "mobile") {
    return (
      <Link href="/doar">
        <Button
          size="sm"
          className="text-white text-xs font-semibold px-3 py-1.5 shadow-sm flex items-center gap-1.5"
          style={{ backgroundColor: terralTheme.colors.primary }}
        >
          <Heart size={14} fill="white" />
          <span>Doar</span>
        </Button>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/como-ajudar/doe-agora">
        <Button
          className="text-white font-semibold px-6 py-2 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
          style={{ backgroundColor: bgColor }}
          onMouseEnter={() => setBgColor("#3d8540")}
          onMouseLeave={() => setBgColor(terralTheme.colors.primary)}
        >
          <Heart size={16} fill="white" />
          <span>Doe Agora</span>
        </Button>
      </Link>
    </motion.div>
  );
};
