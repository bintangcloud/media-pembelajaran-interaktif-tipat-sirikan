import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Eye, 
  Play, 
  Pause, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Maximize2 
} from 'lucide-react';
import { sound } from '../../utils/sound';

export default function KlakatViewer3D() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const klakatGroupRef = useRef(null);
  const slatsRef = useRef([]);
  const animationFrameId = useRef(null);

  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [theme, setTheme] = useState('alami'); // 'alami' | 'kering' | 'emas'
  const [mode, setMode] = useState('realistis'); // 'realistis' | 'struktur' | 'xray' | 'exploded'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);

  // Hotspot definitions for Klakat Sudamala Wadon
  const hotspots = [
    {
      id: 'mata-sudamala',
      title: 'Mata Sudamala (Lubang Segi Delapan)',
      part: 'Tengah Anyaman',
      desc: 'Ciri khas utama Klakat Sudamala Wadon: lubang segi delapan di bagian tengah yang melambangkan Asta Aiswarya (8 kemahakuasaan Tuhan) dan simbol Pradana (kesuburan & pembersihan mala).',
      pos: [0, 0, 0.45],
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'bilah-diagonal',
      title: '4 Bilah Diagonal (Serong)',
      part: 'Empat Kuadran Sudut',
      desc: 'Empat bilah bambu yang dipasang menyerong di tiap sudut. Bilah ini mengunci kisi-kisi dan secara presisi membentuk jendela segi delapan di tengah.',
      pos: [0.85, 0.85, 0.35],
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'bingkai-persegi',
      title: 'Bingkai Luar Bujur Sangkar',
      part: 'Empat Sisi Luar',
      desc: 'Terdiri dari bilah bambu tebal berlapis yang saling mengapit dan mengunci, melambangkan Catur Loka Pala (empat penjuru penopang alam).',
      pos: [0, 1.85, 0.25],
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'ujung-berlebih',
      title: 'Ujung Bilah Berlebih (Taji)',
      part: 'Pojok Bingkai Luar',
      desc: 'Bilah bambu sengaja dilebihkan sedikit di sudut-sudutnya sebagai ciri khas kriya bambu Bali, memudahkan pengikatan tali saat upacara.',
      pos: [2.05, 2.05, 0.15],
      badgeColor: 'bg-teal-600 text-white',
    },
    {
      id: 'tali-tengah',
      title: 'Tali Penyeimbang / Gantungan',
      part: 'Pusat Lubang',
      desc: 'Tali serat bambu atau benang tebusan di tengah lubang untuk mengikat perlengkapan banten atau caru sudamala.',
      pos: [0, 0, 0.1],
      badgeColor: 'bg-rose-600 text-white',
    }
  ];

  // Procedural Bamboo Texture Generator
  const createBambooTexture = (type) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    let baseColor, fiberColor, highlightColor;
    if (type === 'kering') {
      // Bambu kering upakara (warm golden beige)
      baseColor = '#d9b375';
      fiberColor = '#b88f4b';
      highlightColor = '#ecd5a4';
    } else if (type === 'emas') {
      // Bambu kuning sakral (ceremonial golden)
      baseColor = '#eab308';
      fiberColor = '#ca8a04';
      highlightColor = '#fef08a';
    } else {
      // Bambu alami segar (sukla - natural fresh bamboo)
      baseColor = '#d4c59b';
      fiberColor = '#b3a072';
      highlightColor = '#ede3c5';
    }

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);

    // Fine bamboo longitudinal fibers (serat lurus bilah bambu)
    for (let x = 0; x < 512; x += 2) {
      ctx.strokeStyle = Math.random() > 0.4 ? fiberColor : highlightColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25 + Math.random() * 0.35;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() * 2 - 1), 512);
      ctx.stroke();
    }

    // Subtle bamboo nodes (ruas bambu halus)
    for (let y = 120; y < 512; y += 220) {
      const gradNode = ctx.createLinearGradient(0, y - 10, 0, y + 10);
      gradNode.addColorStop(0, 'rgba(0,0,0,0.18)');
      gradNode.addColorStop(0.5, 'rgba(255,255,255,0.25)');
      gradNode.addColorStop(1, 'rgba(0,0,0,0.18)');
      ctx.fillStyle = gradNode;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, y - 10, 512, 20);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf6f8f5);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 16;
    controls.minDistance = 3.2;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 1.9);
    dirLight1.position.set(6, 9, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaad8b0, 0.7);
    dirLight2.position.set(-6, -5, -4);
    scene.add(dirLight2);

    // 6. Klakat 3D Group
    const klakatGroup = new THREE.Group();
    klakatGroupRef.current = klakatGroup;
    scene.add(klakatGroup);

    buildKlakat(theme, mode);

    // Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Build Klakat Sudamala Wadon 3D model
  const buildKlakat = (currentTheme, currentMode) => {
    const klakatGroup = klakatGroupRef.current;
    if (!klakatGroup) return;

    // Clear previous objects
    while (klakatGroup.children.length > 0) {
      const obj = klakatGroup.children[0];
      klakatGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    slatsRef.current = [];

    const texture = createBambooTexture(currentTheme);

    // Material setup
    let bambooMat;
    if (currentMode === 'wireframe') {
      bambooMat = new THREE.MeshBasicMaterial({
        color: 0xca8a04,
        wireframe: true,
      });
    } else if (currentMode === 'xray') {
      bambooMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        transparent: true,
        opacity: 0.42,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
    } else if (currentMode === 'struktur') {
      bambooMat = new THREE.MeshStandardMaterial({
        color: currentTheme === 'emas' ? 0xf59e0b : 0xd4a373,
        roughness: 0.25,
        metalness: 0.1,
      });
    } else {
      // Realistis
      bambooMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.55,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
    }

    const explodeZ = currentMode === 'exploded' ? 0.35 : 0;

    // Helper: Create a single bamboo slat (bilah tiing)
    const createSlat = (length, width, thickness, x, y, z, rotZ = 0) => {
      const geom = new THREE.BoxGeometry(length, width, thickness, 4, 1, 1);
      const mesh = new THREE.Mesh(geom, bambooMat);
      mesh.position.set(x, y, z);
      mesh.rotation.z = rotZ;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      klakatGroup.add(mesh);
      slatsRef.current.push(mesh);
      return mesh;
    };

    const slatW = 0.22; // slat width
    const slatT = 0.045; // slat thickness
    const frameLength = 4.2; // frame length with extended corner tips

    // -------------------------------------------------------------
    // 1. OUTER BORDER FRAME (Bingkai Luar Bujur Sangkar dengan Ujung Berlebih)
    // -------------------------------------------------------------
    // Top Frame Slats (Double layers for authentic overlap)
    createSlat(frameLength, slatW * 1.15, slatT, 0, 1.82, 0.05 + explodeZ);
    createSlat(frameLength, slatW * 1.15, slatT, 0, 1.82, -0.05 - explodeZ);

    // Bottom Frame Slats
    createSlat(frameLength, slatW * 1.15, slatT, 0, -1.82, 0.05 + explodeZ);
    createSlat(frameLength, slatW * 1.15, slatT, 0, -1.82, -0.05 - explodeZ);

    // Left Frame Slats
    createSlat(frameLength, slatW * 1.15, slatT, -1.82, 0, 0.02 + explodeZ, Math.PI / 2);
    createSlat(frameLength, slatW * 1.15, slatT, -1.82, 0, -0.02 - explodeZ, Math.PI / 2);

    // Right Frame Slats
    createSlat(frameLength, slatW * 1.15, slatT, 1.82, 0, 0.02 + explodeZ, Math.PI / 2);
    createSlat(frameLength, slatW * 1.15, slatT, 1.82, 0, -0.02 - explodeZ, Math.PI / 2);

    // -------------------------------------------------------------
    // 2. INNER HORIZONTAL & VERTICAL GRID SLATS (Kisi-Kisi Anyaman)
    // -------------------------------------------------------------
    // 2 Inner Vertical Slats (leaving center open)
    createSlat(3.9, slatW, slatT, -0.72, 0, 0.01, Math.PI / 2);
    createSlat(3.9, slatW, slatT, 0.72, 0, 0.01, Math.PI / 2);

    // 2 Inner Horizontal Slats
    createSlat(3.9, slatW, slatT, 0, 0.72, -0.01);
    createSlat(3.9, slatW, slatT, 0, -0.72, -0.01);

    // Additional side reinforcement slats near borders
    createSlat(3.7, slatW * 0.9, slatT, -1.35, 0, 0.015, Math.PI / 2);
    createSlat(3.7, slatW * 0.9, slatT, 1.35, 0, 0.015, Math.PI / 2);
    createSlat(3.7, slatW * 0.9, slatT, 0, 1.35, -0.015);
    createSlat(3.7, slatW * 0.9, slatT, 0, -1.35, -0.015);

    // -------------------------------------------------------------
    // 3. THE 4 DIAGONAL SLATS (MATA SUDAMALA WADON - SEGI DELAPAN DI TENGAH)
    // -------------------------------------------------------------
    // These 4 diagonal slats traverse across the 4 corners,
    // cutting off the square corners and creating the OCTAGONAL aperture!
    const diagLength = 2.15;

    // Top-Left Diagonal Slat (Quadrant 2)
    // From (-1.8, 0.6) to (-0.6, 1.8) -> center around (-0.95, 0.95)
    createSlat(diagLength, slatW * 0.95, slatT, -0.92, 0.92, 0.03 + explodeZ * 0.5, Math.PI / 4);

    // Top-Right Diagonal Slat (Quadrant 1)
    // From (0.6, 1.8) to (1.8, 0.6) -> center around (0.95, 0.95)
    createSlat(diagLength, slatW * 0.95, slatT, 0.92, 0.92, 0.03 + explodeZ * 0.5, -Math.PI / 4);

    // Bottom-Left Diagonal Slat (Quadrant 3)
    // From (-1.8, -0.6) to (-0.6, -1.8) -> center around (-0.95, -0.95)
    createSlat(diagLength, slatW * 0.95, slatT, -0.92, -0.92, 0.03 + explodeZ * 0.5, -Math.PI / 4);

    // Bottom-Right Diagonal Slat (Quadrant 4)
    // From (0.6, -1.8) to (1.8, -0.6) -> center around (0.95, -0.95)
    createSlat(diagLength, slatW * 0.95, slatT, 0.92, -0.92, 0.03 + explodeZ * 0.5, Math.PI / 4);

    // -------------------------------------------------------------
    // 4. CENTRAL SUSPENSION STRAND / TIE (Tali Tengah Penyeimbang)
    // -------------------------------------------------------------
    const tieCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.68, 0),
      new THREE.Vector3(0.04, 0.25, 0.12),
      new THREE.Vector3(-0.03, -0.20, 0.15),
      new THREE.Vector3(0, -0.68, 0)
    ]);
    const tieGeom = new THREE.TubeGeometry(tieCurve, 20, 0.022, 6, false);
    const tieMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.8,
    });
    const tieMesh = new THREE.Mesh(tieGeom, tieMat);
    tieMesh.castShadow = true;
    klakatGroup.add(tieMesh);

    // Small suspension knot at bottom
    const knotGeom = new THREE.SphereGeometry(0.065, 8, 8);
    const knotMesh = new THREE.Mesh(knotGeom, tieMat);
    knotMesh.position.set(0, -0.25, 0.14);
    klakatGroup.add(knotMesh);
  };

  useEffect(() => {
    buildKlakat(theme, mode);
  }, [theme, mode]);

  const toggleAutoRotate = () => {
    sound.playPop();
    const nextState = !isAutoRotate;
    setIsAutoRotate(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  const setCameraPreset = (preset) => {
    sound.playPop();
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'depan') {
      camera.position.set(0, 0, 7.8);
      controls.target.set(0, 0, 0);
    } else if (preset === 'mata-sudamala') {
      // Focus closely on the central octagonal opening
      camera.position.set(0, 0, 3.8);
      controls.target.set(0, 0, 0);
      setActiveHotspot('mata-sudamala');
      setTooltipInfo(hotspots.find(h => h.id === 'mata-sudamala'));
    } else if (preset === 'bilah-diagonal') {
      // Focus closely on Top-Right diagonal slat
      camera.position.set(1.5, 1.5, 4.2);
      controls.target.set(0.9, 0.9, 0);
      setActiveHotspot('bilah-diagonal');
      setTooltipInfo(hotspots.find(h => h.id === 'bilah-diagonal'));
    } else if (preset === 'miring') {
      camera.position.set(4.2, 3.8, 6.2);
      controls.target.set(0, 0, 0);
    }
    controls.update();
  };

  const handleHotspotClick = (h) => {
    sound.playChime();
    setActiveHotspot(h.id);
    setTooltipInfo(h);

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (camera && controls) {
      controls.target.set(h.pos[0] * 0.7, h.pos[1] * 0.7, h.pos[2]);
      camera.position.set(h.pos[0] * 1.3, h.pos[1] * 1.3, 4.8);
      controls.update();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100/80 transition-all">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              Laboratorium 3D Klakat Sudamala
            </h2>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Model Sudamala Wadon (Segi Delapan)
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Gunakan mouse atau sentuhan jari untuk memutar, zoom, dan memeriksa konstruksi bilah bambu serta lubang segi delapan di tengah.
          </p>
        </div>

        {/* View Mode & Theme Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Theme Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => { sound.playPop(); setTheme('alami'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'alami' ? 'bg-amber-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bambu Sukla
            </button>
            <button
              onClick={() => { sound.playPop(); setTheme('kering'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'kering' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bambu Kering
            </button>
            <button
              onClick={() => { sound.playPop(); setTheme('emas'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'emas' ? 'bg-yellow-500 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bambu Kuning
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => { sound.playPop(); setMode('realistis'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'realistis' ? 'bg-amber-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              Realistis
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('struktur'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'struktur' ? 'bg-teal-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              Rangka Bilah
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('exploded'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'exploded' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              Merekah
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('wireframe'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'wireframe' ? 'bg-purple-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              Jala (Mesh)
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative mt-4 w-full h-[460px] md:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-b from-amber-950/5 via-slate-100/50 to-amber-50/40 border border-slate-200">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Quick Action Overlay (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <button
            onClick={toggleAutoRotate}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-sm border transition-all ${
              isAutoRotate 
                ? 'bg-amber-700/90 text-white border-amber-600' 
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
          >
            {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoRotate ? 'Jeda Putar' : 'Putar Otomatis'}
          </button>

          <button
            onClick={() => setCameraPreset('mata-sudamala')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-amber-500/95 text-white backdrop-blur-md shadow-sm border border-amber-400 hover:bg-amber-600 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Fokus Mata Sudamala (Segi Delapan)
          </button>

          <button
            onClick={() => setCameraPreset('bilah-diagonal')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600/95 text-white backdrop-blur-md shadow-sm border border-emerald-500 hover:bg-emerald-700 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            Bilah Serong Sudut
          </button>
        </div>

        {/* Camera Views Quick Bar (Bottom Left) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200 z-10 text-xs font-bold">
          <span className="text-slate-400 px-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Sudut Pandang:
          </span>
          <button
            onClick={() => setCameraPreset('depan')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 transition-colors"
          >
            Depan
          </button>
          <button
            onClick={() => setCameraPreset('miring')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 transition-colors"
          >
            Isometrik
          </button>
        </div>

        {/* Interactive Tooltip / Hotspot Modal (Bottom Right) */}
        {tooltipInfo && (
          <div className="absolute bottom-3 right-3 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-amber-200 z-20 animate-fadeIn transition-all">
            <div className="flex items-start justify-between gap-2">
              <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${tooltipInfo.badgeColor}`}>
                {tooltipInfo.part}
              </span>
              <button
                onClick={() => setTooltipInfo(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            </div>
            <h4 className="font-extrabold text-slate-800 text-base mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {tooltipInfo.title}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {tooltipInfo.desc}
            </p>
          </div>
        )}
      </div>

      {/* Hotspots Reference Cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hotspots.map((h) => (
          <button
            key={h.id}
            onClick={() => handleHotspotClick(h)}
            className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
              activeHotspot === h.id
                ? 'bg-amber-50/80 border-amber-400 shadow-sm ring-2 ring-amber-200'
                : 'bg-slate-50/60 border-slate-200 hover:bg-amber-50/40 hover:border-amber-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${h.badgeColor}`}>
                  {h.part}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <h5 className="font-bold text-slate-800 text-sm mt-2">{h.title}</h5>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{h.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
