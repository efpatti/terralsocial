"use client";
import { MenuItemsContainer } from "./menu-items-container";
import { VolunteerButton } from "./volunteer-button";
import { DonateButton } from "./donate-button";

export function DesktopNavbar() {
    return (
        <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <VolunteerButton />
            <MenuItemsContainer />
            <DonateButton />
        </div>
    );
}