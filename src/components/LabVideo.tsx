"use client";

import { useEffect, useRef, useState } from "react";

/** The lab clips that play behind the home page products and every page header. */
export const BG_VIDEOS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_8fe5fae4-2747-4529-94ab-d2f81453f2c5.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_163541_332a7688-cf41-400e-ab3c-56c2f6433499.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164706_bd49faa1-adfa-490c-8b49-7007e9ea0303.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_35c4e890-6344-450c-be9e-ff0388c2037b.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_181937_4b40fd95-b588-404a-8148-2b55717d36ff.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_181937_4071d56a-fbd2-40e4-9b62-5dab69a84576.mp4",
];

/**
 * Cycles the lab clips with a crossfade. Only the visible clip decodes, and nothing plays
 * while the block is off screen.
 */
export default function LabVideo() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Stop decoding video while the section is scrolled out of view; it frees the main thread for the rest of the page.
  useEffect(() => {
    const host = videoRefs.current[0]?.parentElement;
    if (!host) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((prev) => (prev + 1) % BG_VIDEOS.length), 10000);
    return () => clearInterval(id);
  }, [visible]);

  // Only the visible clip plays; the next one buffers ahead so the crossfade is seamless.
  useEffect(() => {
    const next = (active + 1) % BG_VIDEOS.length;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && visible) {
        v.play().catch(() => {});
      } else {
        v.pause();
        if (i === next) v.preload = "auto";
      }
    });
  }, [active, visible]);

  return (
    <>
      {BG_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; if (el) el.muted = true; }}
          src={src}
          muted
          loop
          playsInline
          autoPlay={i === 0}
          preload={i === 0 ? "auto" : "none"}
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

