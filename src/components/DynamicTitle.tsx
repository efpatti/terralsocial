"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { generatePageTitle } from "@/lib/metadata";

export default function DynamicTitle() {
 const pathname = usePathname();

 useEffect(() => {
  const title = generatePageTitle(pathname);
  document.title = title;
 }, [pathname]);

 return null;
}
