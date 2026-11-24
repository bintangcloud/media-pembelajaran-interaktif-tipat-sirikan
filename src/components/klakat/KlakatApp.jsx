import React, { useState } from 'react';
import KlakatNavbar from './KlakatNavbar';
import KlakatHero from './KlakatHero';
import KlakatPhilosophy from './KlakatPhilosophy';
import KlakatViewer3D from './KlakatViewer3D';
import KlakatTutorial from './KlakatTutorial';
import KlakatGames from './KlakatGames';
import KlakatCertificate from './KlakatCertificate';
import KlakatLKPD from './KlakatLKPD';
import KlakatFooter from './KlakatFooter';

export default function KlakatApp({ onSwitchToTipat }) {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [quizScore, setQuizScore] = useState(100);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-yellow-50/60">
      {/* Sticky Navigation Bar */}
      <KlakatNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        onSwitchToTipat={onSwitchToTipat}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'beranda' && (
          <div className="space-y-10">
            <KlakatHero setActiveTab={setActiveTab} />
            <KlakatViewer3D />
            <KlakatPhilosophy setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'filosofi' && (
          <KlakatPhilosophy setActiveTab={setActiveTab} />
        )}

        {activeTab === '3d' && (
          <div className="space-y-6">
            <KlakatViewer3D />
          </div>
        )}

        {activeTab === 'tutorial' && (
          <KlakatTutorial setActiveTab={setActiveTab} />
        )}

        {activeTab === 'games' && (
          <KlakatGames setActiveTab={setActiveTab} setQuizPassedScore={setQuizScore} />
        )}

        {activeTab === 'sertifikat' && (
          <KlakatCertificate quizScore={quizScore} />
        )}

        {activeTab === 'lkpd' && (
          <KlakatLKPD />
        )}
      </main>

      {/* Aesthetic Footer Badge */}
      <KlakatFooter />
    </div>
  );
}
