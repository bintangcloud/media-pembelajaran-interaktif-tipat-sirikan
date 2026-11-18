import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Award,
  ListOrdered
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Games({ setActiveTab, setQuizPassedScore }) {
  // Game 1: Timeline Puzzle State (Updated for 4x4)
  const initialPuzzleItems = [
    { id: 3, text: 'Anyam mendatar selang-seling (Atas - Bawah - Atas - Bawah)' },
    { id: 1, text: 'Belah daun janur & hilangkan lidinya' },
    { id: 4, text: 'Isi beras di Pojok Kiri Atas & kunci rapat' },
    { id: 2, text: 'Buat 4 kolom lilitan tegak di tangan kiri' }
  ];

  const [puzzleItems, setPuzzleItems] = useState(initialPuzzleItems);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);
  const [puzzleChecked, setPuzzleChecked] = useState(false);

  // Move item up/down
  const moveItem = (index, direction) => {
    sound.playPop();
    const newItems = [...puzzleItems];
    const targetIdx = index + direction;
    if (targetIdx >= 0 && targetIdx < newItems.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIdx];
      newItems[targetIdx] = temp;
      setPuzzleItems(newItems);
      setPuzzleChecked(false);
    }
  };

  const checkPuzzle = () => {
    const isCorrect = puzzleItems.every((item, idx) => item.id === idx + 1);
    setPuzzleChecked(true);
    if (isCorrect) {
      sound.playSuccess();
      setPuzzleSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playWrong();
      setPuzzleSuccess(false);
    }
  };

  const resetPuzzle = () => {
    sound.playPop();
    setPuzzleItems(initialPuzzleItems);
    setPuzzleChecked(false);
    setPuzzleSuccess(false);
  };

  // Game 2: Multiple Choice Quiz State (Updated for 4x4)
  const questions = [
    {
      question: 'Berapa helai janur yang digunakan untuk menganyam Tipat Sirikan?',
      options: [
        'Hanya 1 helai janur utuh yang lentur',
        '4 helai janur dipotong pendek',
        '8 helai janur berbeda pohon'
      ],
      correct: 0,
      explanation: 'Benar! Tipat Sirikan unik karena hanya dibuat dari 1 helai janur utuh yang melambangkan kerukunan dan persatuan.'
    },
    {
      question: 'Di pojok sebelah mana celah untuk memasukkan beras pada Tipat Sirikan?',
      options: [
        'Tepat di tengah-tengah badan tipat',
        'Pojok Kiri Atas (di dekat sisa janur panjang)',
        'Pojok Kanan Atas'
      ],
      correct: 1,
      explanation: 'Tepat sekali! Celah pengisian beras berada di Pojok Kiri Atas di tempat janur dilonggarkan sedikit.'
    },
    {
      question: 'Berapa banyak kotak anyaman bujur sangkar yang terbentuk pada Tipat Sirikan?',
      options: [
        '16 kotak (pola Sasak 4x4 bujur sangkar)',
        '6 kotak (pola 2x3)',
        '25 kotak (pola 5x5)'
      ],
      correct: 0,
      explanation: 'Hebat! Pola anyaman Sasak pada Tipat Sirikan menghasilkan bujur sangkar 4x4 dengan total 16 kotak anyaman yang rapi.'
    },
    {
      question: 'Dalam adat istiadat Bali, Tipat Sirikan menjadi sajian khas penting pada upacara apa?',
      options: [
        'Upacara Mejauman / Mepamit (Pernikahan adat)',
        'Upacara potong gigi saja',
        'Upacara menyambut tahun baru kalender Masehi'
      ],
      correct: 0,
      explanation: 'Luar biasa! Tipat Sirikan dibawa oleh keluarga mempelai pada Upacara Mejauman sebagai lambang tali persaudaraan yang erat.'
    },
    {
      question: 'Pelajaran budi pekerti apa yang bisa kita teladani dari Tipat Sirikan di sekolah?',
      options: [
        'Belajar sendiri dan tidak mau berteman',
        'Gotong royong, hidup rukun, dan saling menyayangi antar teman',
        'Membeli jajan berlebihan tanpa berbagi'
      ],
      correct: 1,
      explanation: 'Sempurna! 1 helai janur yang saling mengikat mengajarkan persatuan dan gotong royong Profil Pelajar Pancasila.'
    }
  ];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (optIdx) => {
    sound.playPop();
    const updated = { ...selectedAnswers, [currentQIndex]: optIdx };
    setSelectedAnswers(updated);
  };

  const handleNextQuiz = () => {
    if (currentQIndex < questions.length - 1) {
      sound.playPop();
      setCurrentQIndex(currentQIndex + 1);
    } else {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correct) correctCount++;
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      setQuizFinished(true);

      if (setQuizPassedScore) {
        setQuizPassedScore(finalScore);
      }

      if (finalScore >= 80) {
        sound.playSuccess();
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        });
      } else {
        sound.playChime();
      }
    }
  };

  const resetQuiz = () => {
    sound.playPop();
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setScore(0);
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: TIMELINE PUZZLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-violet-100 text-violet-700 rounded-2xl">
              <ListOrdered className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                Tantangan 1: Urutkan Langkah Pembuatan (Anyaman 4x4)
              </h3>
              <p className="text-xs text-slate-500">
                Susun 4 kartu di bawah ini dari langkah pertama hingga langkah terakhir!
              </p>
            </div>
          </div>

          <button
            onClick={resetPuzzle}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Acak Ulang
          </button>
        </div>

        {/* Puzzle Drag/Move Cards */}
        <div className="space-y-3">
          {puzzleItems.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                puzzleChecked
                  ? item.id === idx + 1
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-rose-50 border-rose-300'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-violet-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-700 text-sm">{item.text}</span>
              </div>

              {/* Move Buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => moveItem(idx, -1)}
                  disabled={idx === 0}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold disabled:opacity-30 hover:bg-slate-100 transition-all"
                  title="Pindah ke Atas"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveItem(idx, 1)}
                  disabled={idx === puzzleItems.length - 1}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold disabled:opacity-30 hover:bg-slate-100 transition-all"
                  title="Pindah ke Bawah"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Puzzle Feedback & Check Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {puzzleChecked && (
              <div className="flex items-center gap-2">
                {puzzleSuccess ? (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Hebat! Urutan langkahmu 100% benar!
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Urutan masih ada yang tertukar. Coba periksa lagi!
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={checkPuzzle}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs shadow-md shadow-violet-200 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Periksa Urutan Saya
          </button>
        </div>
      </div>

      {/* SECTION 2: 5-QUESTION MULTIPLE CHOICE QUIZ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/80 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                Tantangan 2: Kuis Juara Tipat Sirikan
              </h3>
              <p className="text-xs text-slate-500">
                Uji pemahamanmu tentang filosofi, cara membuat, dan kearifan lokal!
              </p>
            </div>
          </div>

          {!quizFinished && (
            <span className="px-3 py-1 text-xs font-black rounded-full bg-slate-100 text-slate-600">
              Soal {currentQIndex + 1} / {questions.length}
            </span>
          )}
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider">
                Pertanyaan {currentQIndex + 1}
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-800 mt-1 leading-snug">
                {questions[currentQIndex].question}
              </h4>
            </div>

            <div className="space-y-3">
              {questions[currentQIndex].options.map((optionText, oIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="font-bold text-sm">{optionText}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuiz}
                disabled={selectedAnswers[currentQIndex] === undefined}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md shadow-amber-200 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                {currentQIndex === questions.length - 1 ? 'Selesai & Lihat Nilai' : 'Soal Berikutnya'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center py-8 space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/30">
              <Trophy className="w-12 h-12 text-white animate-bounce-slow" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-slate-800">
                {score >= 80 ? 'Luar Biasa, Kamu Juara Anyam!' : 'Bagus Sekali, Terus Berlatih!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kamu telah menyelesaikan 5 pertanyaan kuis budaya Tipat Sirikan.
              </p>
            </div>

            {/* Score Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-slate-500">Nilai Akhir:</span>
              <span className="text-3xl font-black text-amber-600">{score}</span>
              <span className="text-xs font-bold text-slate-500">/ 100</span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
              <button
                onClick={resetQuiz}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi Kuis
              </button>

              <button
                onClick={() => { sound.playSuccess(); setActiveTab('sertifikat'); }}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-200 flex items-center gap-2 transition-all active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Cetak Sertifikat Kelulusan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
