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
        const threshold = 100; // slightly higher threshold to reduce toggles on small layout shifts
        const lowerBound = 40; // hysteresis lower bound
        const upDeltaToClose = 30; // if user scrolls up quickly by this px, close header

        const delta = currentScrollY - lastScrollY.current;

        // Abrupt downward scroll beyond threshold => set scrolled
        if (currentScrollY > threshold && !isScrolled) {
          setIsScrolled(true);
        }

        // If user scrolls up quickly (negative delta) or we are near top (below lowerBound) => unset scrolled
        if (
          (delta < -upDeltaToClose && isScrolled) ||
          (currentScrollY < lowerBound && isScrolled)
        ) {
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
