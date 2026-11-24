import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function KlakatFooter() {
  return (
    <footer className="py-12 flex justify-center no-print">
      <div className="relative group">
        {/* Glowing backdrop halo */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-60 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-glow" />

        {/* Aesthetic glassmorphic pill badge */}
        <div className="relative px-6 py-2.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-amber-950/5 flex items-center gap-2.5 text-xs font-semibold tracking-wider text-slate-700">
          <span className="text-slate-400 font-medium">made with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce-slow" />
          <span className="font-extrabold bg-gradient-to-r from-amber-700 via-amber-800 to-yellow-600 bg-clip-text text-transparent">
            starlightdev
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>
    </footer>
  );
}
