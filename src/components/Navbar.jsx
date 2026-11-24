import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Box, 
  Scissors, 
  Gamepad2, 
  Award, 
  FileSpreadsheet, 
  Volume2, 
  VolumeX,
  Palmtree,
  Printer,
  Trees
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ activeTab, setActiveTab, isSoundOn, setIsSoundOn, onSwitchToKlakat }) {
  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: Sparkles, color: 'text-amber-500' },
    { id: 'filosofi', label: 'Filosofi', icon: HeartHandshake, color: 'text-rose-500' },
    { id: '3d', label: '3D Interaktif', icon: Box, color: 'text-emerald-500' },
    { id: 'tutorial', label: 'Cara Membuat', icon: Scissors, color: 'text-indigo-500' },
    { id: 'games', label: 'Main & Kuis', icon: Gamepad2, color: 'text-violet-500' },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award, color: 'text-yellow-500' },
    { id: 'lkpd', label: 'Lembar Kerja', icon: FileSpreadsheet, color: 'text-teal-500' },
  ];

  const handleTabClick = (tabId) => {
    sound.playPop();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playSuccess();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-lime-400 p-0.5 shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Palmtree className="w-6 h-6 text-emerald-600 animate-bounce-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 group-hover:text-emerald-600 transition-colors">
                  Tipat Sirikan
                </h1>
                <span className="px-2.5 py-0.5 text-[11px] font-black rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Cilik
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">
                GenBI Mengajar • Edukasi Budaya Bali (Kelas 1 - 6 SD)
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    isActive
                      ? 'bg-white text-slate-800 shadow-sm shadow-emerald-900/5 ring-1 ring-slate-900/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Sound & Action Button */}
          <div className="flex items-center gap-2">
            {onSwitchToKlakat && (
              <button
                onClick={onSwitchToKlakat}
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Beralih ke Modul Klakat Sudamala"
              >
                <Trees className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Modul Klakat</span>
              </button>
            )}

            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSoundOn
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              }`}
              title={isSoundOn ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            >
              {isSoundOn ? <Volume2 className="w-5 h-5 text-emerald-600" /> : <VolumeX className="w-5 h-5" />}
              <span className="hidden sm:inline">{isSoundOn ? 'Suara' : 'Mute'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
