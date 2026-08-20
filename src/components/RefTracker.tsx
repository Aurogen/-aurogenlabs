"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RefTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;
    // Store for 30 days
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `aurogen_ref=${encodeURIComponent(ref)};expires=${expires};path=/;SameSite=Lax`;
  }, [searchParams]);

  return null;
}
