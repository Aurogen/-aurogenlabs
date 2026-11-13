"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SRC = "/audio/ambient.mp3";
const KEY = "aurogen_music"; // "off" once the visitor mutes it
const VOLUME = 0.12;

/**
 * Soft ambient music across the site. Browsers only allow sound after the visitor interacts,
 * so it starts on the first click or key press (e.g. accepting the age check) and fades in.
 * A small button in the corner turns it off; that choice is remembered.
 */
export default function BackgroundMusic() {
  const { t } = useLanguage();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function fadeTo(target: number, done?: () => void) {
    const a = audio.current;
    if (!a) return;
    const step = (target - a.volume) / 20;
    let n = 0;
    const id = setInterval(() => {
      n++;
      a.volume = Math.min(1, Math.max(0, a.volume + step));
      if (n >= 20) {
        clearInterval(id);
        a.volume = target;
        done?.();
      }
    }, 60);
  }

  function start() {
    const a = audio.current;
    if (!a || !a.paused) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(VOLUME);
      })
      .catch(() => {});
  }

  const startRef = useRef(start);
  useEffect(() => {
    startRef.current = start;
  });

  useEffect(() => {
    let muted = false;
    try { muted = localStorage.getItem(KEY) === "off"; } catch {}
    if (muted) return;
    const first = () => {
      startRef.current();
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
    };
    window.addEventListener("pointerdown", first);
    window.addEventListener("keydown", first);
    return () => {
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
    };
  }, []);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (playing) {
      fadeTo(0, () => audio.current?.pause());
      setPlaying(false);
      try { localStorage.setItem(KEY, "off"); } catch {}
    } else {
      try { localStorage.removeItem(KEY); } catch {}
      start();
    }
  }

  const label = playing ? t("Mute music", "Silenciar música") : t("Play music", "Activar música");

  return (
    <>
      <audio ref={audio} src={SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={label}
        title={label}
        className="fixed bottom-5 left-5 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(22,38,74,0.18)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
          color: "#16264A",
          opacity: playing ? 1 : 0.75,
        }}
      >
        {playing ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
      </button>
    </>
  );
}
