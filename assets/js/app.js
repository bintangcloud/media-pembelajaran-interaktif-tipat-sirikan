/**
 * Bahan Ajar Interaktif: Tipat Sirikan untuk Anak SD
 * Modul Aplikasi Utama, Interaksi Gamifikasi, Audio Synth, & Edukasi
 * Komunitas: GenBI Mengajar (Generasi Baru Indonesia)
 */

class TipatApp {
  constructor() {
    this.viewer = null;
    this.currentStep = 1;
    this.totalSteps = 6;
    this.soundEnabled = true;
    this.audioCtx = null;
    
    // Quiz State
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    // Data Tutorial Step-by-Step
    this.stepsData = [
      {
        step: 1,
        title: 'Siapkan Si Daun Muda (Janur & Lidi)',
        badge: 'Persiapan Awal',
        instruction: 'Pilihlah 1 helai janur kelapa yang masih muda (*busung* berwarna kuning kehijauan) yang lentur dan tidak sobek. Buang lidinya dari bagian tengah ke ujung atas, tetapi <strong>sisakan lidi di bagian pangkal sekitar 5 cm</strong> (kira-kira sepanjang ibu jarimu). Lidi sisa ini akan menjadi tiang pegangan yang sangat penting!',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Jangan buang lidi seluruhnya ya! Lidi 5 cm di pangkal berfungsi sebagai "kancing jangkar" agar anyamanmu tidak lepas saat diputar.',
        svgType: 'step1'
      },
      {
        step: 2,
        title: 'Membelah & Menggulung di Kedua Tangan',
        badge: 'Bentuk Lingkaran',
        instruction: 'Belah janur menjadi dua bilah (helai kiri dan kanan) yang masih menyatu di pangkal lidi tadi. Ambil tangan kirimu, gulung helai pertama sebanyak <strong>3 putaran</strong> dengan pangkal lidi menghadap ke atas. Lalu di tangan kananmu, gulung helai kedua sebanyak 3 putaran dengan posisi berlawanan (ujung janur menghadap ke bawah).',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Kuncinya ada di posisi yang berlawanan! Tangan kiri menghadap ke atas, tangan kanan menghadap ke bawah.',
        svgType: 'step2'
      },
      {
        step: 3,
        title: 'Menyilangkan Helai Pertama (Pola Atas-Bawah)',
        badge: 'Mulai Menganyam',
        instruction: 'Sekarang satukan kedua gulungan! Ambil helai janur pertama dari tangan kanan, lalu masukkan menyilang ke sela-sela gulungan tangan kiri dengan rumus ajaib: <strong>ATAS ➡️ BAWAH ➡️ ATAS</strong>. Lakukan dengan tenang dan lembut agar gulungan daun tidak bergeser.',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Ingat kata kuncinya: "Masuk - Keluar - Masuk"! Seperti ikan kecil yang melompati ombak laut Bali.',
        svgType: 'step3'
      },
      {
        step: 4,
        title: 'Menyilangkan Helai Kedua & Ketiga',
        badge: 'Pola Berselang',
        instruction: 'Lanjutkan dengan helai kedua! Kali ini gunakan rumus kebalikannya: <strong>BAWAH ➡️ ATAS ➡️ BAWAH</strong>. Kemudian untuk helai ketiga, kembali seperti langkah awal: <strong>ATAS ➡️ BAWAH ➡️ ATAS</strong>. Wah, lihat! Kerangka anyaman segi empat tipat sirikan sudah mulai terlihat mengunci satu sama lain!',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Anyaman yang benar akan membentuk pola selang-seling seperti kotak papan catur yang cantik.',
        svgType: 'step4'
      },
      {
        step: 5,
        title: 'Mengunci Sudut Runcing (Pucuk & Bongkol)',
        badge: 'Kunci Bentuk',
        instruction: 'Ambil ujung pucuk janur dan arahkan melingkari sudut anyaman yang masih berlubang. Selipkan pucuk janur mengikuti jalur anyaman terdekat hingga bertemu di sudut atas. Lakukan hal yang sama pada bagian pangkal janur menuju sudut bawah hingga membentuk empat sudut lancip khas Tipat Sirikan.',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Sudut yang runcing inilah yang membedakan Tipat Sirikan dari jenis tipat lainnya di Bali!',
        svgType: 'step5'
      },
      {
        step: 6,
        title: 'Mengisi Beras di Pojok & Menarik Rapat (*Sinteng*)',
        badge: 'Finishing Sempurna',
        instruction: 'Tahap terakhir: Buka sedikit celah di <strong>pojok kiri atas (tempat sisa helai janur)</strong>, lalu masukkan butiran beras sebanyak <strong>1/2 sampai 2/3 bagian</strong> saja. Setelah terisi, tarik perlahan kedua sisa helai janur hingga seluruh anyaman rapat, padat, dan mengunci sempurna! Tipat Sirikanmu kini siap direbus!',
        tip: '💡 <strong>Tips Kakak Pengajar:</strong> Celah pengisian beras dibuka tepat di pojok kiri atas di sela-sela sisa helai janur ya! Setelah beras terisi, tarik kencang (*sinteng*) agar beras terkunci rapat.',
        svgType: 'step6'
      }
    ];

    // Data Kuis Pilihan Ganda (5 Soal Edukatif untuk Anak SD)
    this.quizQuestions = [
      {
        q: 'Berapa helai janur utuh yang dibutuhkan untuk membuat satu buah Tipat Sirikan?',
        options: ['1 helai janur utuh', '2 helai janur besar', '4 helai janur', 'Setengah helai janur'],
        correct: 0,
        explanation: 'Hebat! Tipat Sirikan sangat istimewa karena hanya dibuat dari 1 helai janur utuh yang dibelah dua helai daunnya!'
      },
      {
        q: 'Berapa panjang lidi yang disisakan di bagian pangkal janur saat mulai membuat tipat?',
        options: ['Semua lidi dibuang habis', 'Sekitar 5 cm (sepanjang ibu jari)', 'Sepanjang 30 cm', '1 meter'],
        correct: 1,
        explanation: 'Benar sekali! Lidi sisa sekitar 5 cm berfungsi sebagai pengunci awal dan pegangan tangan saat menganyam.'
      },
      {
        q: 'Dalam upacara adat pernikahan di Bali, Tipat Sirikan biasanya digunakan pada prosesi apa?',
        options: ['Upacara Potong Gigi', 'Prosesi Mejauman / Mepamit', 'Upacara Otonan anak', 'Lomba Layang-Layang'],
        correct: 1,
        explanation: 'Tepat! Tipat Sirikan adalah sarana wajib saat upacara Mejauman/Mepamit, sebagai simbol mohon izin dan doa restu yang tulus.'
      },
      {
        q: 'Berapa banyak beras yang sebaiknya dimasukkan ke dalam wadah Tipat Sirikan sebelum direbus?',
        options: ['Diisi penuh sampai tumpah', 'Diisi 1/2 sampai 2/3 bagian saja', 'Hanya diisi 1 butir beras', 'Tidak perlu diisi beras'],
        correct: 1,
        explanation: 'Pintar! Beras akan mengembang saat matang menjadi ketupat, jadi cukup diisi 1/2 sampai 2/3 bagian agar tipat tidak pecah.'
      },
      {
        q: 'Nilai karakter baik apa yang kita dapatkan dari belajar menganyam (*ngulat*) tipat?',
        options: ['Belajar malas-malasan', 'Sabar, teliti, dan mencintai budaya', 'Bermain gadget seharian', 'Suka marah-marah'],
        correct: 1,
        explanation: 'Luar biasa! Menganyam melatih motorik halus, kesabaran, ketelitian, serta menumbuhkan rasa bangga pada warisan budaya nusantara!'
      }
    ];

    // Data Puzzle Langkah Menganyam
    this.puzzleItems = [
      { id: 1, text: '1. Pilih 1 helai janur muda & sisakan lidi pangkal 5 cm', correctOrder: 1 },
      { id: 2, text: '2. Gulung 3 putaran di tangan kiri & kanan berlawanan', correctOrder: 2 },
      { id: 3, text: '3. Silangkan helai pertama dengan pola Atas-Bawah-Atas', correctOrder: 3 },
      { id: 4, text: '4. Silangkan helai kedua dengan pola Bawah-Atas-Bawah', correctOrder: 4 },
      { id: 5, text: '5. Kunci pucuk & pangkal pada keempat sudut runcing', correctOrder: 5 },
      { id: 6, text: '6. Tarik rapat (*sinteng*) dan isi beras 1/2 bagian', correctOrder: 6 }
    ];

    // Scramble the puzzle initially
    this.currentPuzzleState = [...this.puzzleItems].sort(() => Math.random() - 0.5);

    this.init();
  }

  init() {
    this.setupAudioContext();
    this.setupTabs();
    this.setup3DViewer();
    this.setupStepNavigation();
    this.setupPuzzleGame();
    this.setupQuiz();
    this.setupLKPDPrint();
    this.renderCurrentStep();
    this.renderHotspotChipButtons();
  }

  /* ========================================================================
     WEB AUDIO SYNTHESIZER (Pure offline cheerful sound effects for kids)
     ======================================================================== */
  setupAudioContext() {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn('Web Audio not supported');
    }

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled ? '🔊 Suara: AKTIF' : '🔇 Suara: MATI';
        if (this.soundEnabled) this.playSound('click');
      });
    }
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;

    if (type === 'click') {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'correct') {
      // Pleasant bright ding-dong chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (i * 0.08));
        gain.gain.setValueAtTime(0.2, now + (i * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.08) + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + (i * 0.08));
        osc.stop(now + (i * 0.08) + 0.35);
      });
    } else if (type === 'wrong') {
      // Gentle soft buzz
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      // Fanfare celebration arpeggio
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.1));
        gain.gain.setValueAtTime(0.22, now + (idx * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.1) + 0.45);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + (idx * 0.1));
        osc.stop(now + (idx * 0.1) + 0.45);
      });
    }
  }

  /* ========================================================================
     TEXT-TO-SPEECH NARRATOR (Web Speech API)
     ======================================================================== */
  narrateText(text) {
    if (!('speechSynthesis' in window)) {
      alert('Maaf, peramban ini belum mendukung suara narator otomatis.');
      return;
    }
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    // Clean markdown/html tags from text
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Friendly gentle pace for elementary school
    utterance.pitch = 1.1; // Cheerful warm pitch

    window.speechSynthesis.speak(utterance);
    this.playSound('click');
  }

  /* ========================================================================
     TABS & NAVIGATION
     ======================================================================== */
  setupTabs() {
    const tabButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // Also support custom action buttons with data-target-tab
    document.querySelectorAll('[data-target-tab]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = el.getAttribute('data-target-tab');
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(targetTabId) {
    const tabButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === targetTabId);
    });

    tabContents.forEach(content => {
      const isActive = content.id === `tab-${targetTabId}`;
      content.classList.toggle('active', isActive);
      if (isActive) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.playSound('click');

    // If 3D tab opened, trigger resize to ensure proper canvas scale
    if (targetTabId === '3d' && this.viewer) {
      setTimeout(() => this.viewer.onWindowResize(), 100);
    }
  }

  /* ========================================================================
     3D VIEWER INTEGRATION
     ======================================================================== */
  setup3DViewer() {
    if (window.Tipat3DViewer) {
      this.viewer = new window.Tipat3DViewer('tipat-3d-canvas');
    }

    // Auto spin toggle
    const spinBtn = document.getElementById('btn-spin-toggle');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => {
        if (this.viewer) {
          const isSpinning = this.viewer.toggleAutoSpin();
          spinBtn.classList.toggle('active', isSpinning);
          spinBtn.title = isSpinning ? 'Hentikan Putaran' : 'Putar Otomatis';
          this.playSound('click');
        }
      });
    }

    // Reset camera button
    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.viewer) {
          this.viewer.setCameraView('front');
          this.playSound('click');
        }
      });
    }

    // Camera view buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (this.viewer) {
          this.viewer.setCameraView(view);
          this.playSound('click');
        }
      });
    });

    // Theme selector buttons (busung, slepan, emas)
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-theme]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.getAttribute('data-theme');
        if (this.viewer) {
          this.viewer.setTheme(theme);
          this.playSound('click');
        }
      });
    });

    // Display mode buttons (realistic, wireframe, xray, exploded)
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        if (this.viewer) {
          this.viewer.setDisplayMode(mode);
          this.playSound('click');
        }
      });
    });
  }

  renderHotspotChipButtons() {
    const chipsContainer = document.getElementById('hotspot-chips-container');
    if (!chipsContainer || !this.viewer) return;

    chipsContainer.innerHTML = '';
    this.viewer.hotspotsData.forEach((hotspot) => {
      const btn = document.createElement('button');
      btn.className = 'chip-btn';
      btn.innerText = hotspot.name.split(' (')[0];
      btn.setAttribute('data-hotspot-id', hotspot.id);
      btn.addEventListener('click', () => {
        if (this.viewer) {
          this.viewer.selectHotspot(hotspot.id);
        }
      });
      chipsContainer.appendChild(btn);
    });
  }

  updateHotspotUI(data) {
    const badge = document.getElementById('hotspot-badge');
    const name = document.getElementById('hotspot-name');
    const desc = document.getElementById('hotspot-desc');

    if (badge) badge.innerText = data.badge;
    if (name) name.innerText = data.name;
    if (desc) desc.innerText = data.desc;

    // Highlight corresponding chip button
    document.querySelectorAll('.chip-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-hotspot-id') === data.id);
    });
  }

  /* ========================================================================
     STEP-BY-STEP TUTORIAL
     ======================================================================== */
  setupStepNavigation() {
    // Nav step circles
    const circleContainer = document.getElementById('step-circles-nav');
    if (circleContainer) {
      circleContainer.innerHTML = '';
      for (let i = 1; i <= this.totalSteps; i++) {
        const circle = document.createElement('button');
        circle.className = `step-circle-btn ${i === 1 ? 'active' : ''}`;
        circle.innerText = i;
        circle.setAttribute('data-step', i);
        circle.addEventListener('click', () => {
          this.goToStep(i);
        });
        circleContainer.appendChild(circle);
      }
    }

    // Previous and Next buttons
    const prevBtn = document.getElementById('btn-step-prev');
    const nextBtn = document.getElementById('btn-step-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.goToStep(this.currentStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.totalSteps) {
          this.goToStep(this.currentStep + 1);
        } else {
          // Reached end of steps: prompt quiz
          this.switchTab('quiz');
        }
      });
    }

    // Narrate button
    const narrateBtn = document.getElementById('btn-step-narrate');
    if (narrateBtn) {
      narrateBtn.addEventListener('click', () => {
        const stepData = this.stepsData[this.currentStep - 1];
        const speechText = `Langkah ${stepData.step}: ${stepData.title}. ${stepData.instruction}`;
        this.narrateText(speechText);
      });
    }
  }

  goToStep(stepNumber) {
    this.currentStep = stepNumber;
    this.renderCurrentStep();
    this.playSound('click');
  }

  renderCurrentStep() {
    const data = this.stepsData[this.currentStep - 1];
    if (!data) return;

    // Update active circle
    document.querySelectorAll('.step-circle-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-step')) === this.currentStep);
    });

    // Update content elements
    const badgeEl = document.getElementById('step-badge-text');
    const titleEl = document.getElementById('step-title-text');
    const instructionEl = document.getElementById('step-instruction-text');
    const tipEl = document.getElementById('step-tip-text');
    const prevBtn = document.getElementById('btn-step-prev');
    const nextBtn = document.getElementById('btn-step-next');

    if (badgeEl) badgeEl.innerText = `Langkah ${data.step} dari ${this.totalSteps} • ${data.badge}`;
    if (titleEl) titleEl.innerText = data.title;
    if (instructionEl) instructionEl.innerHTML = data.instruction;
    if (tipEl) tipEl.innerHTML = data.tip;

    if (prevBtn) prevBtn.disabled = (this.currentStep === 1);
    if (nextBtn) {
      nextBtn.innerHTML = (this.currentStep === this.totalSteps) ? '🎮 Lanjut ke Kuis & Games ➡️' : 'Langkah Berikutnya ➡️';
    }

    // Render corresponding SVG visual illustration
    this.renderStepSVG(data.svgType);
  }

  renderStepSVG(type) {
    const box = document.getElementById('step-svg-box');
    if (!box) return;

    let svgMarkup = '';

    switch (type) {
      case 'step1':
        // Janur dengan lidi 5 cm di pangkal
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Lidi tengah dibuang ke atas, ada sisa 5cm di pangkal -->
            <path d="M 150 220 L 150 170" stroke="#8d6e63" stroke-width="8" stroke-linecap="round"/>
            <text x="170" y="200" font-size="12" font-weight="bold" fill="#5d4037">Sisa Lidi 5 cm</text>
            <!-- Helai daun kiri dan kanan terbelah -->
            <path d="M 150 170 C 130 130 110 80 130 30" stroke="#aed581" stroke-width="26" fill="none" stroke-linecap="round"/>
            <path d="M 150 170 C 170 130 190 80 170 30" stroke="#c5e1a5" stroke-width="26" fill="none" stroke-linecap="round"/>
            <!-- Tanda panah pemisah -->
            <text x="110" y="110" font-size="20">👈</text>
            <text x="175" y="110" font-size="20">👉</text>
            <text x="150" y="235" text-anchor="middle" font-size="13" font-weight="bold" fill="#33691e">1 Helai Janur Utuh Dibelah Dua</text>
          </svg>
        `;
        break;

      case 'step2':
        // Dua gulungan di tangan kiri dan kanan
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Gulungan Tangan Kiri (Pangkal ke atas) -->
            <g transform="translate(80, 110)">
              <ellipse cx="0" cy="0" rx="40" ry="55" fill="none" stroke="#8bc34a" stroke-width="14"/>
              <ellipse cx="0" cy="0" rx="30" ry="42" fill="none" stroke="#9ccc65" stroke-width="12"/>
              <path d="M 0 -55 L 0 -75" stroke="#795548" stroke-width="6" stroke-linecap="round"/>
              <text x="0" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Tangan Kiri 🖐️</text>
              <text x="0" y="100" text-anchor="middle" font-size="11" fill="#558b2f">(Pangkal Atas ⬆️)</text>
            </g>
            <!-- Simbol Silang Berlawanan -->
            <text x="150" y="115" text-anchor="middle" font-size="28">🔁</text>
            <!-- Gulungan Tangan Kanan (Ujung ke bawah) -->
            <g transform="translate(220, 110)">
              <ellipse cx="0" cy="0" rx="40" ry="55" fill="none" stroke="#c0ca33" stroke-width="14"/>
              <ellipse cx="0" cy="0" rx="30" ry="42" fill="none" stroke="#d4e157" stroke-width="12"/>
              <path d="M 0 55 L -10 75" stroke="#aed581" stroke-width="6" stroke-linecap="round"/>
              <text x="0" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Tangan Kanan ✋</text>
              <text x="0" y="100" text-anchor="middle" font-size="11" fill="#558b2f">(Pucuk Bawah ⬇️)</text>
            </g>
          </svg>
        `;
        break;

      case 'step3':
        // Menyilangkan helai pertama: Atas - Bawah - Atas
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Tiga kolom tegak (tangan kiri) -->
            <line x1="100" y1="40" x2="100" y2="190" stroke="#c5e1a5" stroke-width="18" stroke-linecap="round"/>
            <line x1="150" y1="40" x2="150" y2="190" stroke="#c5e1a5" stroke-width="18" stroke-linecap="round"/>
            <line x1="200" y1="40" x2="200" y2="190" stroke="#c5e1a5" stroke-width="18" stroke-linecap="round"/>
            <!-- Helai pertama menyilang: ATAS (100) -> BAWAH (150) -> ATAS (200) -->
            <path d="M 60 90 L 110 90" stroke="#8bc34a" stroke-width="18" stroke-linecap="round"/>
            <!-- Melewati bawah kolom tengah -->
            <path d="M 140 90 L 160 90" stroke="#689f38" stroke-width="12" stroke-dasharray="4,4"/>
            <!-- Keluar di atas kolom ketiga -->
            <path d="M 190 90 L 240 90" stroke="#8bc34a" stroke-width="18" stroke-linecap="round"/>
            <!-- Teks Rumus -->
            <rect x="50" y="195" width="200" height="30" rx="15" fill="#fbc02d"/>
            <text x="150" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#3e2723">Rumus 1: ATAS - BAWAH - ATAS</text>
          </svg>
        `;
        break;

      case 'step4':
        // Helai kedua dan ketiga berjalin membentuk kerangka segi empat
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Anyaman Anyaman Kotak 3x3 -->
            <g transform="translate(150, 110) rotate(45)">
              <rect x="-45" y="-45" width="90" height="90" fill="#dce775" stroke="#9e9d24" stroke-width="3"/>
              <!-- Garis silang anyaman -->
              <line x1="-45" y1="-15" x2="45" y2="-15" stroke="#827717" stroke-width="4"/>
              <line x1="-45" y1="15" x2="45" y2="15" stroke="#827717" stroke-width="4"/>
              <line x1="-15" y1="-45" x2="-15" y2="45" stroke="#827717" stroke-width="4"/>
              <line x1="15" y1="-45" x2="15" y2="45" stroke="#827717" stroke-width="4"/>
            </g>
            <text x="150" y="200" text-anchor="middle" font-size="13" font-weight="bold" fill="#33691e">Kerangka Anyaman Terkunci Sempurna!</text>
          </svg>
        `;
        break;

      case 'step5':
        // Membentuk 4 sudut runcing khas tipat sirikan
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Bentuk Belah Ketupat Khas Tipat Sirikan -->
            <polygon points="150,30 230,120 150,210 70,120" fill="#d4e157" stroke="#689f38" stroke-width="4"/>
            <!-- Pola Garis Anyaman Di Dalam -->
            <line x1="110" y1="75" x2="190" y2="165" stroke="#558b2f" stroke-width="4"/>
            <line x1="190" y1="75" x2="110" y2="165" stroke="#558b2f" stroke-width="4"/>
            <line x1="150" y1="30" x2="150" y2="210" stroke="#33691e" stroke-width="2" stroke-dasharray="4,4"/>
            <!-- Indikator 4 Sudut Runcing -->
            <circle cx="150" cy="30" r="8" fill="#f57c00"/>
            <circle cx="230" cy="120" r="8" fill="#f57c00"/>
            <circle cx="150" cy="210" r="8" fill="#f57c00"/>
            <circle cx="70" cy="120" r="8" fill="#f57c00"/>
            <text x="150" y="232" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">4 Sudut Runcing Khas Sirikan ✨</text>
          </svg>
        `;
        break;

      case 'step6':
      default:
        // Tipat Sirikan 3x3 Lengkap dengan Celah Beras di Pojok Kiri Atas
        svgMarkup = `
          <svg class="step-svg-visual" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="240" rx="16" fill="#f1f8e9"/>
            <!-- Bujursangkar 3x3 Tipat Sirikan Selesai -->
            <rect x="95" y="55" width="105" height="105" rx="4" fill="#d4e157" stroke="#2e7d32" stroke-width="4"/>
            <!-- Anyaman Kotak 3x3 -->
            <line x1="130" y1="55" x2="130" y2="160" stroke="#558b2f" stroke-width="3"/>
            <line x1="165" y1="55" x2="165" y2="160" stroke="#558b2f" stroke-width="3"/>
            <line x1="95" y1="90" x2="200" y2="90" stroke="#558b2f" stroke-width="3"/>
            <line x1="95" y1="125" x2="200" y2="125" stroke="#558b2f" stroke-width="3"/>
            <!-- Sisa 2 Janur di Pojok Kiri Atas (Celah Pengisian Beras) -->
            <path d="M 95 55 C 65 38 35 32 10 36" stroke="#2e7d32" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M 95 55 C 75 25 50 15 20 10" stroke="#4caf50" stroke-width="4" fill="none" stroke-linecap="round"/>
            <!-- Sisa 2 Janur di Pojok Kanan Bawah -->
            <path d="M 200 160 L 235 195" stroke="#2e7d32" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M 200 160 L 228 180" stroke="#4caf50" stroke-width="4" stroke-linecap="round"/>
            <!-- Indikator Celah Pengisian Beras di Pojok Kiri Atas -->
            <circle cx="95" cy="55" r="14" fill="none" stroke="#e65100" stroke-width="2.5" stroke-dasharray="3,3"/>
            <text x="12" y="78" font-size="11" font-weight="bold" fill="#e65100">🍚 Celah Beras</text>
            <text x="12" y="93" font-size="9" fill="#bf360c">(Pojok Kiri Atas)</text>
            <!-- Bintang Keberhasilan -->
            <text x="50" y="140" font-size="20">⭐</text>
            <text x="245" y="70" font-size="20">⭐</text>
            <text x="150" y="225" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">Tipat Rapat (*Sinteng*) Berisi Beras Siap Direbus! 🍚</text>
          </svg>
        `;
        break;
    }

    box.innerHTML = svgMarkup;
  }

  /* ========================================================================
     GAME 1: PUZZLE SUSUN LANGKAH MENGANYAM
     ======================================================================== */
  setupPuzzleGame() {
    this.renderPuzzleList();

    const checkBtn = document.getElementById('btn-check-puzzle');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.verifyPuzzleOrder();
      });
    }

    const resetBtn = document.getElementById('btn-reset-puzzle');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentPuzzleState = [...this.puzzleItems].sort(() => Math.random() - 0.5);
        this.renderPuzzleList();
        this.playSound('click');
        const feedback = document.getElementById('puzzle-feedback');
        if (feedback) feedback.innerText = '';
      });
    }
  }

  renderPuzzleList() {
    const container = document.getElementById('puzzle-items-container');
    if (!container) return;

    container.innerHTML = '';
    this.currentPuzzleState.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'puzzle-item';
      card.innerHTML = `
        <span>${item.text}</span>
        <div class="move-buttons">
          <button class="btn-arrow btn-up" title="Geser ke Atas" ${index === 0 ? 'disabled' : ''}>▲</button>
          <button class="btn-arrow btn-down" title="Geser ke Bawah" ${index === this.currentPuzzleState.length - 1 ? 'disabled' : ''}>▼</button>
        </div>
      `;

      // Up button
      card.querySelector('.btn-up').addEventListener('click', (e) => {
        e.stopPropagation();
        if (index > 0) {
          const temp = this.currentPuzzleState[index];
          this.currentPuzzleState[index] = this.currentPuzzleState[index - 1];
          this.currentPuzzleState[index - 1] = temp;
          this.renderPuzzleList();
          this.playSound('click');
        }
      });

      // Down button
      card.querySelector('.btn-down').addEventListener('click', (e) => {
        e.stopPropagation();
        if (index < this.currentPuzzleState.length - 1) {
          const temp = this.currentPuzzleState[index];
          this.currentPuzzleState[index] = this.currentPuzzleState[index + 1];
          this.currentPuzzleState[index + 1] = temp;
          this.renderPuzzleList();
          this.playSound('click');
        }
      });

      container.appendChild(card);
    });
  }

  verifyPuzzleOrder() {
    const isCorrect = this.currentPuzzleState.every((item, i) => item.correctOrder === i + 1);
    const feedback = document.getElementById('puzzle-feedback');

    if (isCorrect) {
      if (feedback) {
        feedback.innerHTML = '<strong style="color: #2e7d32; font-size: 1.1rem;">🎉 HEBAT SEKALI! Urutan anyamanmu 100% Tepat! Kamu sudah cocok jadi Pengrajin Cilik! ⭐</strong>';
      }
      this.playSound('victory');
      this.triggerConfetti();
    } else {
      if (feedback) {
        feedback.innerHTML = '<strong style="color: #c62828;">Ayo coba periksa lagi! Pastikan mulai dari memilih janur muda lalu menggulung di kedua tangan ya. Semangat! 💪</strong>';
      }
      this.playSound('wrong');
    }
  }

  /* ========================================================================
     GAME 2: KUIS PILIHAN GANDA ANAK SD (5 SOAL)
     ======================================================================== */
  setupQuiz() {
    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const qData = this.quizQuestions[this.currentQuizIndex];
    const box = document.getElementById('quiz-box-container');
    if (!box || !qData) return;

    this.quizAnswered = false;

    let optionsMarkup = '';
    const letters = ['A', 'B', 'C', 'D'];
    qData.options.forEach((opt, idx) => {
      optionsMarkup += `
        <button class="option-btn" data-opt-idx="${idx}">
          <span class="option-letter">${letters[idx]}</span>
          <span>${opt}</span>
        </button>
      `;
    });

    box.innerHTML = `
      <div class="quiz-progress">
        <span>SOAL ${this.currentQuizIndex + 1} DARI ${this.quizQuestions.length}</span>
        <span>Skor Saat Ini: ${this.quizScore * 20} Poin ⭐</span>
      </div>
      <div class="quiz-question">${qData.q}</div>
      <div class="quiz-options">${optionsMarkup}</div>
      <div id="quiz-feedback-box" style="margin-top: 14px; font-weight: 700; min-height: 24px;"></div>
      <div style="margin-top: 16px; text-align: right;">
        <button id="btn-next-quiz" class="btn-primary" style="display: none; padding: 10px 22px; font-size: 0.95rem;">
          ${this.currentQuizIndex === this.quizQuestions.length - 1 ? 'Lihat Hasil & Sertifikat 🏆' : 'Soal Berikutnya ➡️'}
        </button>
      </div>
    `;

    // Attach option listeners
    box.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.quizAnswered) return;
        const chosen = parseInt(btn.getAttribute('data-opt-idx'));
        this.handleQuizAnswer(chosen);
      });
    });

    const nextBtn = document.getElementById('btn-next-quiz');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentQuizIndex < this.quizQuestions.length - 1) {
          this.currentQuizIndex++;
          this.renderQuizQuestion();
          this.playSound('click');
        } else {
          this.showQuizSummary();
        }
      });
    }
  }

  handleQuizAnswer(chosenIdx) {
    this.quizAnswered = true;
    const qData = this.quizQuestions[this.currentQuizIndex];
    const isCorrect = (chosenIdx === qData.correct);
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const nextBtn = document.getElementById('btn-next-quiz');

    // Visual mark buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-opt-idx'));
      if (idx === qData.correct) {
        btn.classList.add('selected-correct');
      } else if (idx === chosenIdx && !isCorrect) {
        btn.classList.add('selected-wrong');
      }
    });

    if (isCorrect) {
      this.quizScore++;
      this.playSound('correct');
      this.triggerConfetti(0.4);
      if (feedbackBox) {
        feedbackBox.innerHTML = `<span style="color: #2e7d32;">🎉 TEPAT BANGET! ${qData.explanation}</span>`;
      }
    } else {
      this.playSound('wrong');
      if (feedbackBox) {
        feedbackBox.innerHTML = `<span style="color: #c62828;">Kurang tepat, tapi jangan berkecil hati ya! Jawaban yang benar adalah pilihan berwarna hijau.</span>`;
      }
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  showQuizSummary() {
    const box = document.getElementById('quiz-box-container');
    const certContainer = document.getElementById('certificate-container');
    const totalPoints = this.quizScore * 20;

    this.playSound('victory');
    this.triggerConfetti(1.0);

    if (box) {
      box.innerHTML = `
        <div class="quiz-result-card">
          <div class="quiz-score-badge">${totalPoints}</div>
          <h3 style="font-size: 1.4rem; color: #2e7d32; margin-bottom: 8px;">
            ${totalPoints >= 80 ? '🌟 SELAMAT! KAMU JUARA CILIK TIPAT SIRIKAN!' : '👏 HEBAT! KAMU TELAH MENYELESAIKAN KUIS DENGAN GIGIH!'}
          </h3>
          <p style="color: #555; margin-bottom: 20px;">
            Kamu berhasil menjawab ${this.quizScore} dari ${this.quizQuestions.length} pertanyaan dengan benar.
          </p>
          <button id="btn-restart-quiz" class="btn-secondary">🔄 Ulangi Kuis</button>
        </div>
      `;

      document.getElementById('btn-restart-quiz').addEventListener('click', () => {
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.renderQuizQuestion();
        this.playSound('click');
      });
    }

    // Show Certificate
    if (certContainer) {
      certContainer.classList.add('visible');
      certContainer.scrollIntoView({ behavior: 'smooth' });

      // Live update certificate name
      const nameInput = document.getElementById('cert-student-name');
      const certPrintName = document.getElementById('cert-print-name');
      if (nameInput) {
        nameInput.addEventListener('input', () => {
          const val = nameInput.value.trim() || 'Siswa Berprestasi';
          if (certPrintName) certPrintName.innerText = val;
        });
      }

      // Print Certificate Button
      const printCertBtn = document.getElementById('btn-print-cert');
      if (printCertBtn) {
        printCertBtn.addEventListener('click', () => {
          if (nameInput && certPrintName) {
            certPrintName.innerText = nameInput.value.trim() || 'Siswa Berprestasi';
          }
          document.body.classList.add('print-cert-mode');
          setTimeout(() => {
            window.print();
            setTimeout(() => {
              document.body.classList.remove('print-cert-mode');
            }, 1000);
          }, 150);
        });
      }
    }
  }

  /* ========================================================================
     CONFETTI CELEBRATION
     ======================================================================== */
  triggerConfetti(intensity = 0.8) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: Math.floor(70 * intensity),
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4caf50', '#fbc02d', '#ff9800', '#0288d1', '#e91e63']
      });
    }
  }

  /* ========================================================================
     LKPD & MODUL CETAK HANDLER
     ======================================================================== */
  setupLKPDPrint() {
    const printBtn = document.getElementById('btn-print-lkpd');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        document.body.classList.remove('print-cert-mode');
        this.switchTab('lkpd');
        setTimeout(() => {
          window.print();
        }, 200);
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.TipatApp = new TipatApp();
});
