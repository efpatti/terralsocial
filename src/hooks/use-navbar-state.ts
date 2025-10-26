"use client";
import { useState, useEffect } from "react";

export function useNavbarState() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleExpand = (label: string) => {
        setExpandedItems((prev) => {
            const isOpenAlready = Boolean(prev[label]);
            if (isOpenAlready) return {};
            return { [label]: true };
        });
    };

    const closeMenu = () => {
        setIsOpen(false);
        setExpandedItems({});
    };

    return {
        isOpen,
        setIsOpen,
        isScrolled,
        expandedItems,
        toggleExpand,
        closeMenu,
    };
}