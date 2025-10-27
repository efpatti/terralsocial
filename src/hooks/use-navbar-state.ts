"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export function useNavbarState() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Refs para otimização
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll handler otimizado com requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const SHOW_THRESHOLD = 80; // Mostra abaixo de 80px
        const HIDE_THRESHOLD = 120; // Esconde acima de 120px

        // Histerese: diferentes thresholds pra abrir/fechar
        if (currentScrollY > HIDE_THRESHOLD && !isScrolled) {
          setIsScrolled(true);
        } else if (currentScrollY < SHOW_THRESHOLD && isScrolled) {
          setIsScrolled(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isScrolled]);

  // Effect para scroll
  useEffect(() => {
    // Check inicial
    handleScroll();

    // Passive listener para melhor performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Effect para body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleExpand = useCallback((label: string) => {
    setExpandedItems((prev) => {
      const isOpenAlready = Boolean(prev[label]);
      if (isOpenAlready) return {};
      return { [label]: true };
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedItems({});
  }, []);

  return {
    isOpen,
    setIsOpen,
    isScrolled,
    expandedItems,
    toggleExpand,
    closeMenu,
  };
}
