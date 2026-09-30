"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RefTracker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;
    fetch("/api/ref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: ref, path: pathname }),
    }).catch(() => {});
  }, [searchParams, pathname]);

  return null;
}
