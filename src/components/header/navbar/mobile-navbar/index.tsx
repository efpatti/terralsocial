"use client";
import { MobileHeader } from "./mobile-header";
import { MobileMenu } from "./mobile-menu";

interface MobileNavbarProps {
    isOpen: boolean;
    expandedItems: Record<string, boolean>;
    onToggle: () => void;
    onToggleItem: (label: string) => void;
    onClose: () => void;
}

export function MobileNavbar({
                                 isOpen,
                                 expandedItems,
                                 onToggle,
                                 onToggleItem,
                                 onClose,
                             }: MobileNavbarProps) {
    return (
        <>
            <MobileHeader isOpen={isOpen} onToggle={onToggle} />
            <MobileMenu
                isOpen={isOpen}
                expandedItems={expandedItems}
                onToggleItem={onToggleItem}
                onClose={onClose}
            />
        </>
    );
}