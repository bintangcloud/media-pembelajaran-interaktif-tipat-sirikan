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
  Award, 
  ListOrdered 
} from 'lucide-react';
import { sound } from '../../utils/sound';

export default function KlakatGames({ setActiveTab, setQuizPassedScore }) {
  // Game 1: Timeline Puzzle
  const initialPuzzleItems = [
    { id: 3, text: 'Selipkan bilah kisi-kisi horisontal dan vertikal' },
    { id: 1, text: 'Belah dan serut bilah bambu hingga halus dan bersih' },
    { id: 4, text: 'Pasang 4 bilah diagonal membentuk lubang segi delapan' },
    { id: 2, text: 'Susun 4 bilah membentuk bingkai bujur sangkar luar' }
  ];

  const [puzzleItems, setPuzzleItems] = useState(initialPuzzleItems);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);
  const [puzzleChecked, setPuzzleChecked] = useState(false);

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

  // Game 2: Multiple Choice Quiz
  const questions = [
    {
      question: 'Bahan alami apakah yang digunakan sebagai bahan utama pembuatan Klakat Sudamala?',
      options: [
        'Bilah bambu (tiing) yang diserut tipis dan halus',
        'Kertas karton daur ulang',
        'Plastik cetakan pabrik'
      ],
      correct: 0,
      explanation: 'Benar! Klakat dibuat dari bilah bambu pilihan yang bersih (sukla) dan diserut halus.'
    },
    {
      question: 'Apakah makna dari kata "Sudamala" dalam ajaran kearifan lokal Bali?',
      options: [
        'Penyucian segala noda, kekotoran pikiran, dan ketidakharmonisan lahir batin',
        'Nama makanan penutup tradisional khas pegunungan',
        'Tarian adat penyambutan tamu'
      ],
      correct: 0,
      explanation: 'Tepat sekali! "Suda" berarti suci/bersih dan "Mala" berarti kotoran/noda, bermakna pembersihan diri dan alam semesta.'
    },
    {
      question: 'Berbentuk apakah lubang di bagian tengah pada Klakat Sudamala Wadon?',
      options: [
        'Segi delapan (oktagon) yang melambangkan Asta Aiswarya dan 8 penjuru angin',
        'Lingkaran bulat sempurna',
        'Segitiga runcing sama sisi'
      ],
      correct: 0,
      explanation: 'Hebat! Klakat Sudamala Wadon bercirikan lubang segi delapan di bagian tengahnya.'
    },
    {
      question: 'Apa fungsi utama dari 4 bilah bambu diagonal (serong) pada Klakat Sudamala Wadon?',
      options: [
        'Mengunci kisi-kisi dan membentuk jendela segi delapan di tengah',
        'Sebagai tali pengikat makanan',
        'Sebagai pegangan tangan saat dipotong'
      ],
      correct: 0,
      explanation: 'Luar biasa! 4 bilah diagonal di tiap kuadran sudut memotong kisi-kisi sehingga menghasilkan bentuk segi delapan yang presisi.'
    },
    {
      question: 'Pelajaran budi pekerti apa yang bisa kita teladani dari pohon bambu di lingkungan sekolah?',
      options: [
        'Hidup rukun berumpun (gotong royong), ulet, dan selalu rendah hati',
        'Mau menang sendiri dan suka bertengkar dengan teman',
        'Mudah putus asa saat menghadapi tugas sekolah'
      ],
      correct: 0,
      explanation: 'Sempurna! Pohon bambu mengajarkan hidup berumpun (kebersamaan), lentur, dan kuat menghadapi tantangan.'
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl">
              <ListOrdered className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                Tantangan 1: Urutkan Tahapan Membuat Klakat Sudamala
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
                <span className="w-8 h-8 rounded-xl bg-amber-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
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
                    Hebat! Urutan langkah kriya bambumu 100% tepat!
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Urutan masih ada yang belum tepat. Coba periksa kembali!
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={checkPuzzle}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Periksa Urutan Saya
          </button>
        </div>
      </div>

      {/* SECTION 2: MULTIPLE CHOICE QUIZ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/80 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-yellow-100 text-yellow-800 rounded-2xl">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                Tantangan 2: Kuis Juara Klakat Sudamala
              </h3>
              <p className="text-xs text-slate-500">
                Uji pengetahuanmu tentang anyaman bambu, filosofi Asta Aiswarya, dan kearifan lokal!
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
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">
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
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center ${
                        isSelected ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="font-bold text-sm">{optionText}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuiz}
                disabled={selectedAnswers[currentQIndex] === undefined}
                className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs shadow-md shadow-amber-900/20 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                {currentQIndex === questions.length - 1 ? 'Selesai & Lihat Nilai' : 'Soal Berikutnya'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center py-8 space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-xl shadow-amber-700/30">
              <Trophy className="w-12 h-12 text-white animate-bounce-slow" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-slate-800">
                {score >= 80 ? 'Luar Biasa, Kamu Juara Kriya Bambu!' : 'Bagus Sekali, Terus Berlatih!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kamu telah menyelesaikan 5 pertanyaan kuis kearifan lokal Klakat Sudamala.
              </p>
            </div>

            {/* Score Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-slate-500">Nilai Akhir:</span>
              <span className="text-3xl font-black text-amber-700">{score}</span>
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
                className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs shadow-lg shadow-amber-900/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Cetak Sertifikat Pengrajin Cilik
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
