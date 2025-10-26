"use client";
import { useState, useEffect } from "react";

export function useScrollVisibility(threshold: number = 300): boolean {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > threshold);
        toggleVisibility();
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [threshold]);

    return isVisible;
}
