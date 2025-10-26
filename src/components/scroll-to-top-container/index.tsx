"use client";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { ScrollToTopButton } from "./scroll-to-top-button";

export default function ScrollToTop() {
  const isVisible = useScrollVisibility();

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return <ScrollToTopButton isVisible={isVisible} onClick={scrollToTop} />;
}
