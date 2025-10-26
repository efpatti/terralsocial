import { items } from "@/data/items";
import { motion } from "framer-motion";
import { MenuItem } from "./menu-item";

export const MenuItemsContainer = () => (
  <div className="flex gap-6">
    {items.map((item, idx) => (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: idx * 0.06,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <MenuItem item={item} />
      </motion.div>
    ))}
  </div>
);
