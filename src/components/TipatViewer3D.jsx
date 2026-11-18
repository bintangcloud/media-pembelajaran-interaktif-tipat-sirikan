import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, 
  Play, 
  Pause, 
  Eye, 
  ZoomIn, 
  Sparkles, 
  Layers, 
  Info, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function TipatViewer3D() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const tipatGroupRef = useRef(null);
  const stripsRef = useRef([]);
  const riceGroupRef = useRef(null);
  const animationFrameId = useRef(null);

  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [theme, setTheme] = useState('busung'); // 'busung' | 'slepan' | 'emas'
  const [mode, setMode] = useState('realistis'); // 'realistis' | 'xray' | 'wireframe' | 'exploded'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);

  // Hotspots definitions (Updated for 4x4 weave)
  const hotspots = [
    {
      id: 'celah-beras',
      title: 'Celah Pengisian Beras',
      corner: 'Pojok Kiri Atas',
      desc: 'Di pojok kiri atas inilah anyaman dilonggarkan sedikit untuk memasukkan beras 1/2 atau 2/3 penuh sebelum ditarik kencang.',
      pos: [-1.7, 1.7, 0.45],
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'sisa-panjang',
      title: 'Pangkal & Sisa Janur Panjang',
      corner: 'Pojok Kiri Atas',
      desc: 'Dua helai sisa janur panjang keluar dari pojok kiri atas. Janur ini nantinya digunakan sebagai tali pengikat atau gantungan.',
      pos: [-2.1, 2.1, 0.2],
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'ujung-pendek',
      title: 'Ujung Janur (Pengunci)',
      corner: 'Pojok Kanan Bawah',
      desc: 'Dua ujung janur yang lebih pendek keluar di pojok kanan bawah setelah mengunci seluruh anyaman silang 4x4 agar tidak buyar.',
      pos: [1.85, -1.85, -0.1],
      badgeColor: 'bg-teal-600 text-white',
    },
    {
      id: 'anyaman-sasak',
      title: 'Anyaman Bujur Sangkar 4x4 (16 Kotak)',
      corner: 'Tengah Badan Tipat',
      desc: 'Anyaman Sasak berpola selang-seling (atas-bawah) membentuk 16 kotak (4 baris x 4 kolom) bujur sangkar yang rapat, kokoh, dan rapi.',
      pos: [0, 0, 0.72],
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'sudut-siku',
      title: 'Sudut Siku Rapi 90°',
      corner: 'Pojok Kanan Atas & Kiri Bawah',
      desc: 'Dua sudut ini terlipat rapi 90 derajat tanpa sisa janur, menyempurnakan bentuk bantal ketupat yang simetris.',
      pos: [1.7, 1.7, 0.1],
      badgeColor: 'bg-blue-600 text-white',
    }
  ];

  // Procedural leaf texture generator
  const createLeafTexture = (type) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    let baseColor, stripeColor, highlightColor;
    if (type === 'slepan') {
      baseColor = '#32661f';
      stripeColor = '#244e15';
      highlightColor = '#4a8e2e';
    } else if (type === 'emas') {
      baseColor = '#d9971e';
      stripeColor = '#b87c12';
      highlightColor = '#f5c842';
    } else {
      // busung muda (default)
      baseColor = '#c4dd4d';
      stripeColor = '#9ebc30';
      highlightColor = '#dcf26f';
    }

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);

    // Fine leaf longitudinal lines (serat daun janur alami)
    for (let x = 0; x < 512; x += 3) {
      ctx.strokeStyle = Math.random() > 0.5 ? stripeColor : highlightColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25 + Math.random() * 0.35;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() * 4 - 2), 512);
      ctx.stroke();
    }

    // Leaf center midrib / tulang daun subtle gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.15)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.22)');
    grad.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 2);
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f8f4);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);
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
    controls.minDistance = 3.5;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff8e7, 1.8);
    dirLight1.position.set(5, 8, 6);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x99ddff, 0.8);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    // 6. Build 3D Tipat Sirikan Group (Upright 4x4 square)
    const tipatGroup = new THREE.Group();
    tipatGroup.rotation.z = 0;
    tipatGroupRef.current = tipatGroup;
    scene.add(tipatGroup);

    buildModel(theme, mode);

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

  // Rebuild model when theme or mode changes
  const buildModel = (currentTheme, currentMode) => {
    const tipatGroup = tipatGroupRef.current;
    if (!tipatGroup) return;

    // Clear previous children
    while (tipatGroup.children.length > 0) {
      const obj = tipatGroup.children[0];
      tipatGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    stripsRef.current = [];

    const texture = createLeafTexture(currentTheme);

    // Material setup based on mode
    let leafMat;
    if (currentMode === 'wireframe') {
      leafMat = new THREE.MeshBasicMaterial({
        color: currentTheme === 'emas' ? 0xf59e0b : 0x10b981,
        wireframe: true,
      });
    } else if (currentMode === 'xray') {
      leafMat = new THREE.MeshStandardMaterial({
        color: currentTheme === 'emas' ? 0xf59e0b : currentTheme === 'slepan' ? 0x2e7d32 : 0x84cc16,
        transparent: true,
        opacity: 0.38,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
    } else {
      // Realistis
      leafMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.45,
        metalness: 0.08,
        side: THREE.DoubleSide,
      });
    }

    const explodeDist = currentMode === 'exploded' ? 0.45 : 0;

    // Helper: Create a curved woven ribbon block
    const createRibbonSegment = (x, y, z, width, length, isHorizontal, over, explodeOffset) => {
      const geom = new THREE.BoxGeometry(
        isHorizontal ? length : width,
        isHorizontal ? width : length,
        0.18,
        8,
        8,
        2
      );

      // Pillow curvature: bulge in center, thinner toward edges
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const distCenter = 1.0 - Math.min(1.0, Math.sqrt(vx * vx + vy * vy) / 2.3);
        const vz = pos.getZ(i);
        const wave = over ? Math.sin(vx * 2.2) * 0.07 : -Math.sin(vy * 2.2) * 0.07;
        pos.setZ(i, vz + wave + (z > 0 ? 1 : -1) * distCenter * 0.46);
      }
      geom.computeVertexNormals();

      const mesh = new THREE.Mesh(geom, leafMat);
      mesh.position.set(
        x + (explodeOffset ? explodeOffset.x : 0),
        y + (explodeOffset ? explodeOffset.y : 0),
        z + (explodeOffset ? explodeOffset.z : 0)
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      tipatGroup.add(mesh);
      stripsRef.current.push(mesh);
      return mesh;
    };

    // ==========================================
    // 4x4 Grid Coordinates (16 Kotak Anyaman Sasak)
    // 4 positions: -1.35, -0.45, 0.45, 1.35
    // Quad size: ~0.92
    // ==========================================
    const coords4 = [-1.35, -0.45, 0.45, 1.35];
    const quadSize = 0.92;

    // Front Face Anyaman 4x4 (16 Kotak)
    coords4.forEach((rowY, rIdx) => {
      coords4.forEach((colX, cIdx) => {
        const isOver = (rIdx + cIdx) % 2 === 0;
        const frontZ = 0.52 + (isOver ? 0.08 : -0.08);
        const expOffset = {
          x: colX * explodeDist * 0.8,
          y: rowY * explodeDist * 0.8,
          z: explodeDist * 0.9,
        };
        createRibbonSegment(colX, rowY, frontZ, quadSize, quadSize * 1.02, isOver, isOver, expOffset);
      });
    });

    // Back Face Anyaman 4x4 (16 Kotak)
    coords4.forEach((rowY, rIdx) => {
      coords4.forEach((colX, cIdx) => {
        const isOver = (rIdx + cIdx) % 2 === 1;
        const backZ = -0.52 - (isOver ? 0.08 : -0.08);
        const expOffset = {
          x: colX * explodeDist * 0.8,
          y: rowY * explodeDist * 0.8,
          z: -explodeDist * 0.9,
        };
        createRibbonSegment(colX, rowY, backZ, quadSize, quadSize * 1.02, !isOver, isOver, expOffset);
      });
    });

    // Four Side Border Walls (to seal the 4x4 pillow)
    const wallGeomH = new THREE.BoxGeometry(3.68, 0.28, 0.9, 12, 2, 4);
    const wallGeomV = new THREE.BoxGeometry(0.28, 3.68, 0.9, 2, 12, 4);

    const topWall = new THREE.Mesh(wallGeomH, leafMat);
    topWall.position.set(0, 1.80, 0);
    tipatGroup.add(topWall);

    const bottomWall = new THREE.Mesh(wallGeomH, leafMat);
    bottomWall.position.set(0, -1.80, 0);
    tipatGroup.add(bottomWall);

    const leftWall = new THREE.Mesh(wallGeomV, leafMat);
    leftWall.position.set(-1.80, 0, 0);
    tipatGroup.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeomV, leafMat);
    rightWall.position.set(1.80, 0, 0);
    tipatGroup.add(rightWall);

    // ==========================================
    // CORNER TAILS (SISA JANUR):
    // 1. POJOK KIRI ATAS: SISA JANUR PANJANG & CELAH PENGISIAN BERAS
    // 2. POJOK KANAN BAWAH: SISA JANUR PENDEK
    // ==========================================

    const createCurvingTail = (points, width) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geom = new THREE.TubeGeometry(curve, 32, width, 8, false);
      const mesh = new THREE.Mesh(geom, leafMat);
      mesh.castShadow = true;
      tipatGroup.add(mesh);
      return mesh;
    };

    // Sisa Janur Panjang at POJOK KIRI ATAS (-1.8, +1.8)
    createCurvingTail([
      new THREE.Vector3(-1.75, 1.75, 0.25),
      new THREE.Vector3(-2.20, 2.30, 0.35),
      new THREE.Vector3(-2.60, 3.15, 0.45),
      new THREE.Vector3(-2.90, 3.90, 0.25),
      new THREE.Vector3(-3.15, 4.40, -0.15)
    ], 0.11);

    createCurvingTail([
      new THREE.Vector3(-1.78, 1.70, -0.15),
      new THREE.Vector3(-2.35, 2.15, -0.05),
      new THREE.Vector3(-3.00, 2.70, 0.25),
      new THREE.Vector3(-3.50, 3.25, 0.15),
      new THREE.Vector3(-3.90, 3.60, -0.10)
    ], 0.095);

    // Sisa Janur Pendek at POJOK KANAN BAWAH (+1.8, -1.8)
    createCurvingTail([
      new THREE.Vector3(1.75, -1.75, 0.15),
      new THREE.Vector3(2.15, -2.18, 0.20),
      new THREE.Vector3(2.60, -2.58, 0.10),
      new THREE.Vector3(3.00, -2.88, -0.05)
    ], 0.10);

    createCurvingTail([
      new THREE.Vector3(1.70, -1.78, -0.15),
      new THREE.Vector3(2.10, -2.08, -0.10),
      new THREE.Vector3(2.45, -2.38, 0.05),
      new THREE.Vector3(2.70, -2.58, 0.00)
    ], 0.085);

    // ==========================================
    // 3D RICE GRAINS (BERAS DI CELAH POJOK KIRI ATAS & DALAM)
    // ==========================================
    const riceGroup = new THREE.Group();
    riceGroupRef.current = riceGroup;
    tipatGroup.add(riceGroup);

    const riceMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });
    const riceGeom = new THREE.SphereGeometry(0.085, 8, 8);
    riceGeom.scale(1, 1.9, 0.85);

    // Visible rice grains nestled in the Pojok Kiri Atas opening
    for (let i = 0; i < 20; i++) {
      const grain = new THREE.Mesh(riceGeom, riceMat);
      grain.position.set(
        -1.62 + (Math.random() * 0.35 - 0.17),
        1.62 + (Math.random() * 0.35 - 0.17),
        0.25 + (Math.random() * 0.3 - 0.15)
      );
      grain.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      riceGroup.add(grain);
    }

    // Inside grains (visible in X-Ray / Exploded mode)
    for (let i = 0; i < 55; i++) {
      const grain = new THREE.Mesh(riceGeom, riceMat);
      grain.position.set(
        (Math.random() * 2.4 - 1.2),
        (Math.random() * 2.4 - 1.2),
        (Math.random() * 0.6 - 0.3)
      );
      grain.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      riceGroup.add(grain);
    }
  };

  // Re-run buildModel on state change
  useEffect(() => {
    buildModel(theme, mode);
  }, [theme, mode]);

  // Handle Auto Rotate toggle
  const toggleAutoRotate = () => {
    sound.playPop();
    const nextState = !isAutoRotate;
    setIsAutoRotate(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  // Camera preset transitions
  const setCameraPreset = (preset) => {
    sound.playPop();
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'depan') {
      camera.position.set(0, 0, 8.5);
      controls.target.set(0, 0, 0);
    } else if (preset === 'belakang') {
      camera.position.set(0, 0, -8.5);
      controls.target.set(0, 0, 0);
    } else if (preset === 'celah-beras') {
      camera.position.set(-2.8, 2.8, 4.2);
      controls.target.set(-1.6, 1.6, 0.3);
      setActiveHotspot('celah-beras');
      setTooltipInfo(hotspots.find(h => h.id === 'celah-beras'));
    } else if (preset === 'sisa-janur') {
      camera.position.set(2.8, -2.8, 3.8);
      controls.target.set(1.7, -1.7, 0);
      setActiveHotspot('ujung-pendek');
      setTooltipInfo(hotspots.find(h => h.id === 'ujung-pendek'));
    } else if (preset === 'miring') {
      camera.position.set(4.5, 4.5, 6.5);
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
      controls.target.set(h.pos[0] * 0.8, h.pos[1] * 0.8, h.pos[2]);
      camera.position.set(h.pos[0] * 1.5, h.pos[1] * 1.5, 5.5);
      controls.update();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/80 transition-all">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              Laboratorium 3D Tipat Sirikan
            </h2>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Sasak 4x4 Interaktif (16 Kotak)
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Gunakan mouse atau sentuhan jari untuk memutar, memperbesar (zoom), dan memeriksa detail anyaman bujur sangkar 4x4.
          </p>
        </div>

        {/* View Mode & Theme Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Theme Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => { sound.playPop(); setTheme('busung'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'busung' ? 'bg-lime-500 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Busung Muda
            </button>
            <button
              onClick={() => { sound.playPop(); setTheme('slepan'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'slepan' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Slepan Tua
            </button>
            <button
              onClick={() => { sound.playPop(); setTheme('emas'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                theme === 'emas' ? 'bg-amber-500 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Janur Kuning
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => { sound.playPop(); setMode('realistis'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'realistis' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600'
              }`}
              title="Tampilan Alami Realistis"
            >
              Realistis
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('xray'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'xray' ? 'bg-teal-600 text-white shadow' : 'text-slate-600'
              }`}
              title="Lihat Beras di Dalam Ketupat"
            >
              X-Ray (Beras)
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('exploded'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'exploded' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'
              }`}
              title="Anyaman Merekah Terurai"
            >
              Merekah
            </button>
            <button
              onClick={() => { sound.playPop(); setMode('wireframe'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                mode === 'wireframe' ? 'bg-purple-600 text-white shadow' : 'text-slate-600'
              }`}
              title="Struktur Geometri Anyaman"
            >
              Jala (Mesh)
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative mt-4 w-full h-[460px] md:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/5 via-slate-100/50 to-emerald-50/40 border border-slate-200">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Quick Action Overlay (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <button
            onClick={toggleAutoRotate}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-sm border transition-all ${
              isAutoRotate 
                ? 'bg-emerald-600/90 text-white border-emerald-500' 
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
          >
            {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoRotate ? 'Jeda Putar' : 'Putar Otomatis'}
          </button>

          <button
            onClick={() => setCameraPreset('celah-beras')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-amber-500/95 text-white backdrop-blur-md shadow-sm border border-amber-400 hover:bg-amber-600 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Celah Beras (Pojok Kiri Atas)
          </button>

          <button
            onClick={() => setCameraPreset('sisa-janur')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-teal-600/95 text-white backdrop-blur-md shadow-sm border border-teal-500 hover:bg-teal-700 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            Ujung Janur (Pojok Kanan Bawah)
          </button>
        </div>

        {/* Camera Views Quick Bar (Bottom Left) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200 z-10 text-xs font-bold">
          <span className="text-slate-400 px-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Sudut Pandang:
          </span>
          <button
            onClick={() => setCameraPreset('depan')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            Depan (4x4)
          </button>
          <button
            onClick={() => setCameraPreset('miring')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            Isometrik
          </button>
          <button
            onClick={() => setCameraPreset('belakang')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            Belakang
          </button>
        </div>

        {/* Interactive Tooltip / Hotspot Modal (Bottom Right) */}
        {tooltipInfo && (
          <div className="absolute bottom-3 right-3 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-200 z-20 animate-fadeIn transition-all">
            <div className="flex items-start justify-between gap-2">
              <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${tooltipInfo.badgeColor}`}>
                {tooltipInfo.corner}
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
                ? 'bg-emerald-50/80 border-emerald-400 shadow-sm ring-2 ring-emerald-200'
                : 'bg-slate-50/60 border-slate-200 hover:bg-emerald-50/40 hover:border-emerald-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${h.badgeColor}`}>
                  {h.corner}
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
