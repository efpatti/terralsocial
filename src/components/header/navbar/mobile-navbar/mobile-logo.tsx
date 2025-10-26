"use client";
import Image from "next/image";

export function MobileLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
                <Image
                    src="/terral.png"
                    alt="Logo TERRAL Social"
                    fill
                    className="w-full h-full object-contain drop-shadow-md"
                    priority
                />
            </div>
            <div className="flex flex-col leading-none uppercase text-center">
                <span className="text-base font-semibold tracking-tight">Terral</span>
                <span className="text-xs font-medium text-gray-600 tracking-wide">Social</span>
            </div>
        </div>
    );
}