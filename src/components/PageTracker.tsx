"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "../lib/analytics";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      gtag.pageview(pathname); // Envia um evento de visualização de página para o Google Analytics.
    }
  }, [pathname]);

  return null; // Este componente não renderiza nada visível.
}
