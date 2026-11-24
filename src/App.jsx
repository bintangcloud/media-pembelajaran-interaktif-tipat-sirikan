import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TipatViewer3D from './components/TipatViewer3D';
import Tutorial from './components/Tutorial';
import Games from './components/Games';
import Certificate from './components/Certificate';
import LKPD from './components/LKPD';
import Footer from './components/Footer';
import KlakatApp from './components/klakat/KlakatApp';

export default function App() {
  const [activeModule, setActiveModule] = useState('tipat'); // 'tipat' | 'klakat'
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [quizScore, setQuizScore] = useState(100);

  // If active module is Klakat, render KlakatApp directly
  if (activeModule === 'klakat') {
    return <KlakatApp onSwitchToTipat={() => setActiveModule('tipat')} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sticky Navigation Bar with Topic Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        onSwitchToKlakat={() => setActiveModule('klakat')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'beranda' && (
          <div className="space-y-10">
            <Hero setActiveTab={setActiveTab} />
            <TipatViewer3D />
            <Philosophy setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'filosofi' && (
          <Philosophy setActiveTab={setActiveTab} />
        )}

        {activeTab === '3d' && (
          <div className="space-y-6">
            <TipatViewer3D />
          </div>
        )}

        {activeTab === 'tutorial' && (
          <Tutorial setActiveTab={setActiveTab} />
        )}

        {activeTab === 'games' && (
          <Games setActiveTab={setActiveTab} setQuizPassedScore={setQuizScore} />
        )}

        {activeTab === 'sertifikat' && (
          <Certificate quizScore={quizScore} />
        )}

        {activeTab === 'lkpd' && (
          <LKPD />
        )}
      </main>

      {/* Aesthetic Footer Badge */}
      <Footer />
    </div>
  );
}
