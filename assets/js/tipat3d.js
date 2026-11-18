/**
 * Bahan Ajar Interaktif: Tipat Sirikan untuk Anak SD
 * Modul 3D Viewer menggunakan Three.js & OrbitControls
 * Model Realistis: Anyaman Sasak 3x3 Janur Kelapa Muda (Busung) Khas Bali
 * Posisi Presisi: Sisa Janur Tepat di Pojok Kiri Atas & Kanan Bawah Sesuai Foto Asli
 * Komunitas: GenBI Mengajar (Generasi Baru Indonesia)
 */

class Tipat3DViewer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error(`Canvas with id ${canvasId} not found.`);
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.tipatGroup = null;
    this.hotspotsGroup = null;
    this.raycaster = null;
    this.mouse = null;
    
    // Materials & Textures
    this.currentTheme = 'busung'; // 'busung', 'slepan', 'emas'
    this.currentMode = 'realistic'; // 'realistic', 'wireframe', 'xray', 'exploded'
    this.materials = {};
    this.wovenMeshes = [];
    this.stripTiles = [];
    this.riceCoreMesh = null;
    
    this.isAutoSpinning = true;
    this.activeHotspotId = null;
    this.animationFrameId = null;

    // Hotspot Data matching real Tipat Sirikan anatomy (exact pojok corners)
    this.hotspotsData = [
      {
        id: 'pangkal-tails',
        name: 'Pojok Kiri Atas (Sisa 2 Janur Panjang)',
        badge: 'Pojok Pangkal',
        position: [-1.8, 1.8, 0.25],
        desc: 'Tepat di pojok kiri atas ini menjulur 2 helai sisa janur panjang. Tipat Sirikan dibuat dari 1 helai janur utuh yang dibelah dua helai daunnya dan diawali dari pojok ini!',
        cameraTarget: [-2.2, 2.2, 5.0]
      },
      {
        id: 'awak-grid',
        name: 'Badan Anyaman Sasak 3x3 (Awak Tipat)',
        badge: 'Jantung Anyaman',
        position: [0, 0, 0.75],
        desc: 'Perhatikan 9 kotak anyaman selang-seling (atas-bawah) yang rapi ini! Pola anyaman papan catur yang saling mengunci rapat melambangkan kerukunan dan persatuan yang kokoh.',
        cameraTarget: [0, 0, 5.5]
      },
      {
        id: 'bucu-kanan-atas',
        name: 'Pojok Kanan Atas (Sudut Lipatan Runcing)',
        badge: 'Pojok Runcing 90°',
        position: [1.8, 1.8, 0.2],
        desc: 'Pojok kanan atas terlipat rapi 90 derajat tanpa ada daun yang sobek. Kerapian pojok inilah yang membuat bentuk Tipat Sirikan simetris dan anggun.',
        cameraTarget: [2.2, 2.2, 5.0]
      },
      {
        id: 'bucu-kiri-bawah',
        name: 'Pojok Kiri Bawah (Sudut Lipatan Simetris)',
        badge: 'Pojok Simetris',
        position: [-1.8, -1.8, 0.2],
        desc: 'Pojok kiri bawah mengunci anyaman bagian bawah sehingga saat direbus dan beras mengembang, bentuk tipat tetap kokoh dan tidak bocor.',
        cameraTarget: [-2.2, -2.2, 5.0]
      },
      {
        id: 'pucuk-tails',
        name: 'Pojok Kanan Bawah (Sisa Ujung Janur)',
        badge: 'Pojok Pucuk',
        position: [2.15, -2.15, 0.25],
        desc: 'Di pojok kanan bawah ini terdapat 2 sisa ujung janur muda yang dipotong rapi setelah anyaman selesai.',
        cameraTarget: [2.5, -2.5, 4.8]
      },
      {
        id: 'lubang-beras',
        name: 'Celah Pengisian Beras (Pojok Kiri Atas)',
        badge: 'Tempat Masuk Beras',
        position: [-1.68, 1.68, 0.32],
        desc: 'Tepat di pojok kiri atas inilah celah untuk memasukkan beras! Anyaman di sela-sela pojok ini dilonggarkan sedikit agar butiran beras bisa dimasukkan 1/2 sampai 2/3 bagian, lalu kedua helai janur ditarik rapat (*nyinteng*) agar beras tidak tumpah saat direbus.',
        cameraTarget: [-2.1, 2.1, 4.4]
      }
    ];

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js is not loaded yet. Retrying in 300ms...');
      setTimeout(() => this.init(), 300);
      return;
    }

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLighting();
    this.setupControls();
    this.generateTextures();
    this.buildRealisticTipatModel();
    this.buildHotspots();
    this.setupEvents();
    this.animate();

    console.log('✅ Realistic Tipat Sirikan 3D Model with exact corner tails initialized!');
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 7.2);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  setupLighting() {
    // Ambient soft natural warm light
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 0.92);
    this.scene.add(ambientLight);

    // Warm Sun Key Light
    const keyLight = new THREE.DirectionalLight(0xfffae8, 1.05);
    keyLight.position.set(4, 6, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    // Green bounce fill light
    const fillLight = new THREE.DirectionalLight(0xe8f5e9, 0.55);
    fillLight.position.set(-6, -4, 4);
    this.scene.add(fillLight);

    // Rim Light (back-lighting highlighting leaf edges)
    const rimLight = new THREE.DirectionalLight(0xfffff0, 0.6);
    rimLight.position.set(0, 4, -6);
    this.scene.add(rimLight);
  }

  setupControls() {
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.minDistance = 2.5;
      this.controls.maxDistance = 12;
      this.controls.maxPolarAngle = Math.PI * 0.98;
      this.controls.autoRotate = this.isAutoSpinning;
      this.controls.autoRotateSpeed = 1.3;
    }
  }

  /**
   * High-Fidelity Procedural Textures for Young Coconut Leaf (Janur / Busung)
   * Matches the photo: fresh lime green margin, sunny yellow-green body, fine vascular lines.
   */
  generateTextures() {
    // 1. Horizontal Leaf Strip Texture (Veins run along X)
    const canvasH = document.createElement('canvas');
    canvasH.width = 512;
    canvasH.height = 512;
    const ctxH = canvasH.getContext('2d');

    const gradH = ctxH.createLinearGradient(0, 0, 0, 512);
    gradH.addColorStop(0.0, '#6da12d'); // fresh green leaf edge
    gradH.addColorStop(0.2, '#8ec23c');
    gradH.addColorStop(0.5, '#d6e85d'); // sunny chartreuse body
    gradH.addColorStop(0.8, '#ecf48b'); // pale yellow center
    gradH.addColorStop(1.0, '#bada4d');
    ctxH.fillStyle = gradH;
    ctxH.fillRect(0, 0, 512, 512);

    ctxH.strokeStyle = 'rgba(110, 155, 30, 0.35)';
    ctxH.lineWidth = 1.0;
    for (let y = 0; y < 512; y += 3) {
      ctxH.beginPath();
      ctxH.moveTo(0, y);
      ctxH.lineTo(512, y + (Math.sin(y * 0.2) * 1.0));
      ctxH.stroke();
    }

    ctxH.strokeStyle = 'rgba(93, 64, 55, 0.28)';
    ctxH.lineWidth = 3;
    ctxH.strokeRect(2, 2, 508, 508);

    this.leafTextureH = new THREE.CanvasTexture(canvasH);
    this.leafTextureH.wrapS = THREE.ClampToEdgeWrapping;
    this.leafTextureH.wrapT = THREE.ClampToEdgeWrapping;

    // 2. Vertical Leaf Strip Texture (Veins run along Y)
    const canvasV = document.createElement('canvas');
    canvasV.width = 512;
    canvasV.height = 512;
    const ctxV = canvasV.getContext('2d');

    const gradV = ctxV.createLinearGradient(0, 0, 512, 0);
    gradV.addColorStop(0.0, '#6da12d');
    gradV.addColorStop(0.2, '#8ec23c');
    gradV.addColorStop(0.5, '#d6e85d');
    gradV.addColorStop(0.8, '#ecf48b');
    gradV.addColorStop(1.0, '#bada4d');
    ctxV.fillStyle = gradV;
    ctxV.fillRect(0, 0, 512, 512);

    ctxV.strokeStyle = 'rgba(110, 155, 30, 0.35)';
    ctxV.lineWidth = 1.0;
    for (let x = 0; x < 512; x += 3) {
      ctxV.beginPath();
      ctxV.moveTo(x, 0);
      ctxV.lineTo(x + (Math.sin(x * 0.2) * 1.0), 512);
      ctxV.stroke();
    }

    ctxV.strokeStyle = 'rgba(93, 64, 55, 0.28)';
    ctxV.lineWidth = 3;
    ctxV.strokeRect(2, 2, 508, 508);

    this.leafTextureV = new THREE.CanvasTexture(canvasV);
    this.leafTextureV.wrapS = THREE.ClampToEdgeWrapping;
    this.leafTextureV.wrapT = THREE.ClampToEdgeWrapping;

    this.updateMaterials();
  }

  updateMaterials() {
    let colorTint = 0xffffff;
    let roughness = 0.38;
    let metalness = 0.02;

    if (this.currentTheme === 'slepan') {
      colorTint = 0x81c784;
      roughness = 0.45;
    } else if (this.currentTheme === 'emas') {
      colorTint = 0xffd54f;
      roughness = 0.28;
      metalness = 0.25;
    }

    const isWire = (this.currentMode === 'wireframe');
    const isXray = (this.currentMode === 'xray');

    this.materials.leafH = new THREE.MeshStandardMaterial({
      color: colorTint,
      map: this.leafTextureH,
      roughness: roughness,
      metalness: metalness,
      side: THREE.DoubleSide,
      shadowSide: THREE.DoubleSide,
      wireframe: isWire,
      transparent: isXray,
      opacity: (isXray ? 0.32 : 1.0)
    });

    this.materials.leafV = new THREE.MeshStandardMaterial({
      color: colorTint,
      map: this.leafTextureV,
      roughness: roughness,
      metalness: metalness,
      side: THREE.DoubleSide,
      shadowSide: THREE.DoubleSide,
      wireframe: isWire,
      transparent: isXray,
      opacity: (isXray ? 0.32 : 1.0)
    });

    this.materials.leafPlain = new THREE.MeshStandardMaterial({
      color: (this.currentTheme === 'slepan' ? 0x4caf50 : (this.currentTheme === 'emas' ? 0xffca28 : 0xc0ca33)),
      roughness: roughness,
      metalness: metalness,
      side: THREE.DoubleSide,
      wireframe: isWire,
      transparent: isXray,
      opacity: (isXray ? 0.32 : 1.0)
    });

    this.materials.lidi = new THREE.MeshStandardMaterial({
      color: 0x8d6e63,
      roughness: 0.85,
      metalness: 0.05
    });

    this.materials.rice = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: (isXray ? 0.88 : 0.0)
    });

    if (this.wovenMeshes) {
      this.wovenMeshes.forEach(mesh => {
        if (mesh.userData.materialType === 'leafH') mesh.material = this.materials.leafH;
        else if (mesh.userData.materialType === 'leafV') mesh.material = this.materials.leafV;
        else if (mesh.userData.materialType === 'lidi') mesh.material = this.materials.lidi;
        else mesh.material = this.materials.leafPlain;
      });
    }
    if (this.riceCoreMesh) {
      this.riceCoreMesh.material = this.materials.rice;
    }
  }

  /**
   * Helper to generate a flat, wide ribbon along a 3D Catmull-Rom spline
   * Produces realistic coconut leaf blades (thin flat ribbons, not round pipes!)
   */
  createFlatRibbon(curve, width = 0.32, segments = 24) {
    const points = curve.getPoints(segments);
    const geom = new THREE.BufferGeometry();
    const vertices = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const pt = points[i];
      const t = i / segments;
      const tangent = curve.getTangent(t).normalize();
      const up = new THREE.Vector3(0, 0, 1);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Leaf tapers gently towards the tip
      const w = width * (1.0 - t * 0.32);

      vertices.push(pt.x + normal.x * w * 0.5, pt.y + normal.y * w * 0.5, pt.z + normal.z * w * 0.5);
      uvs.push(0, t * 3);

      vertices.push(pt.x - normal.x * w * 0.5, pt.y - normal.y * w * 0.5, pt.z - normal.z * w * 0.5);
      uvs.push(1, t * 3);

      if (i < segments) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
        // Back-face triangles for double-sided solidity
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  /**
   * Build High-Fidelity 3D Model of Balinese Tipat Sirikan
   * - Upright Square with 4 clear corners (Pojok)
   * - 3x3 woven Sasak checkerboard quads
   * - Sisa 2 helai janur panjang emerge PRECISELY AT POJOK KIRI ATAS (-halfS, +halfS)
   * - Sisa 2 ujung janur pendek emerge PRECISELY AT POJOK KANAN BAWAH (+halfS, -halfS)
   * - Clean 90-degree folded corners at POJOK KANAN ATAS & KIRI BAWAH
   */
  buildRealisticTipatModel() {
    this.tipatGroup = new THREE.Group();
    this.wovenMeshes = [];
    this.stripTiles = [];

    const S = 3.6; // Total width and height of the square cushion
    const N = 3;   // 3x3 grid
    const Wstrip = S / N; // 1.2 per strip
    const Tmax = 0.55;    // Center puffiness
    const halfS = S * 0.5; // 1.8

    // Helper for organic pillow curvature
    const getPillowZ = (x, y) => {
      const bound = halfS * 1.04;
      const cosX = Math.cos((x / bound) * (Math.PI * 0.5));
      const cosY = Math.cos((y / bound) * (Math.PI * 0.5));
      return Tmax * Math.max(0, cosX * cosY);
    };

    // 1. Internal Rice Core (Visible in X-Ray mode)
    const coreGeo = new THREE.BoxGeometry(S * 0.85, S * 0.85, Tmax * 1.45, 8, 8, 4);
    const posAttr = coreGeo.attributes.position;
    for (let k = 0; k < posAttr.count; k++) {
      const vx = posAttr.getX(k);
      const vy = posAttr.getY(k);
      const vz = posAttr.getZ(k);
      const factor = Math.cos((vx / (S * 0.52)) * (Math.PI * 0.45)) * Math.cos((vy / (S * 0.52)) * (Math.PI * 0.45));
      posAttr.setZ(k, vz * (0.35 + factor * 0.65));
    }
    coreGeo.computeVertexNormals();
    this.riceCoreMesh = new THREE.Mesh(coreGeo, this.materials.rice);
    this.tipatGroup.add(this.riceCoreMesh);

    // 2. Build 3x3 Woven Tiles on FRONT (+Z) and BACK (-Z) Faces
    [-1, 1].forEach((faceSign) => {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const xc = -halfS + (i + 0.5) * Wstrip;
          const yc = -halfS + (j + 0.5) * Wstrip;

          const isHorizOnTop = (faceSign === 1) ? ((i + j) % 2 === 0) : ((i + j) % 2 === 1);

          const tileRes = 8;
          const tileGeo = new THREE.PlaneGeometry(Wstrip * 0.985, Wstrip * 0.985, tileRes, tileRes);
          const tPos = tileGeo.attributes.position;

          for (let p = 0; p < tPos.count; p++) {
            const u = tPos.getX(p);
            const v = tPos.getY(p);
            const wx = xc + u;
            const wy = yc + v;

            const basePillowZ = getPillowZ(wx, wy);

            let arch = 0;
            if (isHorizOnTop) {
              const normV = Math.abs(v / (Wstrip * 0.5));
              const normU = Math.abs(u / (Wstrip * 0.5));
              arch = 0.05 * (1.0 - normV * normV) + 0.035 * Math.cos(normU * Math.PI * 0.5);
            } else {
              const normU = Math.abs(u / (Wstrip * 0.5));
              const normV = Math.abs(v / (Wstrip * 0.5));
              arch = 0.05 * (1.0 - normU * normU) + 0.035 * Math.cos(normV * Math.PI * 0.5);
            }

            const distFromEdge = Math.min((Wstrip * 0.5) - Math.abs(u), (Wstrip * 0.5) - Math.abs(v));
            const edgeBevel = (distFromEdge < 0.08) ? -0.02 * (1 - distFromEdge / 0.08) : 0;

            const finalZ = (basePillowZ + arch + edgeBevel + 0.02) * faceSign;
            tPos.setXYZ(p, u, v, finalZ);
          }

          tileGeo.computeVertexNormals();

          const matType = isHorizOnTop ? 'leafH' : 'leafV';
          const tileMesh = new THREE.Mesh(tileGeo, isHorizOnTop ? this.materials.leafH : this.materials.leafV);
          tileMesh.position.set(xc, yc, 0);
          tileMesh.castShadow = true;
          tileMesh.receiveShadow = true;
          tileMesh.userData = {
            materialType: matType,
            origPos: tileMesh.position.clone(),
            faceSign: faceSign,
            col: i,
            row: j
          };

          this.tipatGroup.add(tileMesh);
          this.wovenMeshes.push(tileMesh);
          this.stripTiles.push(tileMesh);
        }
      }
    });

    // 3. Side Perimeter Edge Wraps (Connecting front & back tiles along 4 borders)
    const edgeRadius = Tmax * 0.28;
    const createEdgeFold = (start, end, axis, matType) => {
      const curve = new THREE.LineCurve3(new THREE.Vector3(...start), new THREE.Vector3(...end));
      const tubeGeo = new THREE.TubeGeometry(curve, 8, edgeRadius, 8, false);
      tubeGeo.scale(1, axis === 'x' ? 0.35 : 1, axis === 'y' ? 0.35 : 1);
      const mesh = new THREE.Mesh(tubeGeo, this.materials[matType] || this.materials.leafPlain);
      mesh.castShadow = true;
      mesh.userData = { materialType: matType, origPos: mesh.position.clone() };
      this.tipatGroup.add(mesh);
      this.wovenMeshes.push(mesh);
    };

    for (let k = 0; k < N; k++) {
      const offset = -halfS + (k + 0.5) * Wstrip;
      const span = Wstrip * 0.46;
      createEdgeFold([offset - span, halfS, 0], [offset + span, halfS, 0], 'y', 'leafH');
      createEdgeFold([offset - span, -halfS, 0], [offset + span, -halfS, 0], 'y', 'leafH');
      createEdgeFold([-halfS, offset - span, 0], [-halfS, offset + span, 0], 'x', 'leafV');
      createEdgeFold([halfS, offset - span, 0], [halfS, offset + span, 0], 'x', 'leafV');
    }

    // 4. CORNERS (POJOK) ATTACHMENT:
    // POJOK KANAN ATAS (+halfS, +halfS): Clean 90-degree folded corner
    const cornerTRCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(halfS - 0.25, halfS, 0),
      new THREE.Vector3(halfS + 0.05, halfS + 0.05, 0),
      new THREE.Vector3(halfS, halfS - 0.25, 0)
    );
    const cornerTRMesh = new THREE.Mesh(
      new THREE.TubeGeometry(cornerTRCurve, 8, 0.12, 6, false),
      this.materials.leafH
    );
    cornerTRMesh.scale.set(1, 1, 0.4);
    cornerTRMesh.userData = { materialType: 'leafH', origPos: cornerTRMesh.position.clone() };
    this.tipatGroup.add(cornerTRMesh);
    this.wovenMeshes.push(cornerTRMesh);

    // POJOK KIRI BAWAH (-halfS, -halfS): Clean 90-degree folded corner
    const cornerBLCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-halfS + 0.25, -halfS, 0),
      new THREE.Vector3(-halfS - 0.05, -halfS - 0.05, 0),
      new THREE.Vector3(-halfS, -halfS + 0.25, 0)
    );
    const cornerBLMesh = new THREE.Mesh(
      new THREE.TubeGeometry(cornerBLCurve, 8, 0.12, 6, false),
      this.materials.leafV
    );
    cornerBLMesh.scale.set(1, 1, 0.4);
    cornerBLMesh.userData = { materialType: 'leafV', origPos: cornerBLMesh.position.clone() };
    this.tipatGroup.add(cornerBLMesh);
    this.wovenMeshes.push(cornerBLMesh);

    // 5. SISA JANUR DI POJOK (EXACTLY AS IN THE USER'S PHOTO!)
    // POJOK KIRI ATAS (-halfS, +halfS):
    // Dua helai sisa janur panjang menyembul KELUAR TEPAT DARI POJOK KIRI ATAS!
    // Tail 1: Helai pertama (daun lentur panjang melengkung anggun ke atas-kiri)
    const tail1Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-halfS, halfS, 0.04),                     // Tepat di pojok!
      new THREE.Vector3(-halfS - 0.7, halfS + 0.65, 0.14),
      new THREE.Vector3(-halfS - 1.6, halfS + 1.45, 0.18),
      new THREE.Vector3(-halfS - 2.6, halfS + 2.1, 0.08),
      new THREE.Vector3(-halfS - 3.7, halfS + 2.6, -0.06),
      new THREE.Vector3(-halfS - 4.6, halfS + 2.9, -0.16)
    ]);
    const tail1Geo = this.createFlatRibbon(tail1Spline, 0.32, 28);
    const tail1Mesh = new THREE.Mesh(tail1Geo, this.materials.leafH);
    tail1Mesh.castShadow = true;
    tail1Mesh.userData = { materialType: 'leafH', origPos: tail1Mesh.position.clone() };
    this.tipatGroup.add(tail1Mesh);
    this.wovenMeshes.push(tail1Mesh);

    // Tail 2: Helai kedua (menyembul tepat dari pojok yang sama, melengkung ke atas)
    const tail2Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-halfS, halfS, -0.04),                    // Tepat di pojok!
      new THREE.Vector3(-halfS - 0.5, halfS + 0.9, -0.12),
      new THREE.Vector3(-halfS - 1.15, halfS + 1.9, 0.02),
      new THREE.Vector3(-halfS - 1.7, halfS + 2.9, 0.16),
      new THREE.Vector3(-halfS - 2.2, halfS + 3.8, 0.22),
      new THREE.Vector3(-halfS - 2.6, halfS + 4.5, 0.16)
    ]);
    const tail2Geo = this.createFlatRibbon(tail2Spline, 0.28, 28);
    const tail2Mesh = new THREE.Mesh(tail2Geo, this.materials.leafV);
    tail2Mesh.castShadow = true;
    tail2Mesh.userData = { materialType: 'leafV', origPos: tail2Mesh.position.clone() };
    this.tipatGroup.add(tail2Mesh);
    this.wovenMeshes.push(tail2Mesh);

    // Tulang Lidi (Midrib) di helai Tail 1 di pojok
    const lidiCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-halfS, halfS, 0.05),
      new THREE.Vector3(-halfS - 0.7, halfS + 0.65, 0.15),
      new THREE.Vector3(-halfS - 1.4, halfS + 1.25, 0.18)
    ]);
    const lidiGeo = new THREE.TubeGeometry(lidiCurve, 12, 0.026, 6, false);
    const lidiMesh = new THREE.Mesh(lidiGeo, this.materials.lidi);
    lidiMesh.castShadow = true;
    lidiMesh.userData = { materialType: 'lidi', origPos: lidiMesh.position.clone() };
    this.tipatGroup.add(lidiMesh);
    this.wovenMeshes.push(lidiMesh);

    // POJOK KANAN BAWAH (+halfS, -halfS):
    // Dua sisa ujung janur pendek menyembul KELUAR TEPAT DARI POJOK KANAN BAWAH!
    // Tip 1:
    const tip1Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(halfS, -halfS, 0.04),                     // Tepat di pojok!
      new THREE.Vector3(halfS + 0.5, -halfS - 0.45, 0.08),
      new THREE.Vector3(halfS + 1.05, -halfS - 0.95, 0.04)
    ]);
    const tip1Geo = this.createFlatRibbon(tip1Spline, 0.3, 12);
    const tip1Mesh = new THREE.Mesh(tip1Geo, this.materials.leafH);
    tip1Mesh.castShadow = true;
    tip1Mesh.userData = { materialType: 'leafH', origPos: tip1Mesh.position.clone() };
    this.tipatGroup.add(tip1Mesh);
    this.wovenMeshes.push(tip1Mesh);

    // Tip 2:
    const tip2Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(halfS, -halfS, -0.04),                    // Tepat di pojok!
      new THREE.Vector3(halfS + 0.38, -halfS - 0.38, -0.08),
      new THREE.Vector3(halfS + 0.8, -halfS - 0.75, -0.03)
    ]);
    const tip2Geo = this.createFlatRibbon(tip2Spline, 0.26, 12);
    const tip2Mesh = new THREE.Mesh(tip2Geo, this.materials.leafV);
    tip2Mesh.castShadow = true;
    tip2Mesh.userData = { materialType: 'leafV', origPos: tip2Mesh.position.clone() };
    this.tipatGroup.add(tip2Mesh);
    this.wovenMeshes.push(tip2Mesh);

    // Celah Pengisian Beras & Butiran Beras di Pojok Kiri Atas:
    const riceGrainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05
    });
    const grainGeo = new THREE.SphereGeometry(0.065, 8, 8);
    grainGeo.scale(1, 1.8, 0.8);

    const grainOffsets = [
      [-halfS + 0.16, halfS - 0.16, 0.08, 0.35],
      [-halfS + 0.24, halfS - 0.24, 0.12, -0.4],
      [-halfS + 0.12, halfS - 0.24, -0.06, 0.65]
    ];

    grainOffsets.forEach(([gx, gy, gz, rot]) => {
      const grain = new THREE.Mesh(grainGeo, riceGrainMat);
      grain.position.set(gx, gy, gz);
      grain.rotation.z = rot;
      grain.castShadow = true;
      grain.userData = { materialType: 'riceGrain', origPos: grain.position.clone() };
      this.tipatGroup.add(grain);
      this.wovenMeshes.push(grain);
    });

    // 6. ORIENTASI SEGI EMPAT TEGAK (UPRIGHT SQUARE):
    // Tanpa rotasi Z 45 derajat agar tipat berdiri sebagai bujursangkar tegak!
    // Hanya sedikit tilt X & Y agar ada kedalaman perspektif 3D yang indah.
    this.tipatGroup.rotation.x = THREE.MathUtils.degToRad(8);
    this.tipatGroup.rotation.y = THREE.MathUtils.degToRad(-10);
    this.tipatGroup.rotation.z = 0; // POJOK KIRI ATAS, KANAN ATAS, KANAN BAWAH, KIRI BAWAH PERSIS SESUAI FOTO!

    this.scene.add(this.tipatGroup);
  }

  /**
   * Build floating glowing 3D Hotspot pins matching real Tipat parts
   */
  buildHotspots() {
    this.hotspotsGroup = new THREE.Group();
    this.hotspotMeshes = [];

    this.hotspotsData.forEach((data) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(...data.position);

      const ringGeo = new THREE.RingGeometry(0.14, 0.2, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff9800,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      pinGroup.add(ring);

      const sphereGeo = new THREE.SphereGeometry(0.11, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xf57c00,
        emissive: 0xffb74d,
        emissiveIntensity: 0.7,
        roughness: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      pinGroup.add(sphere);

      pinGroup.userData = {
        hotspotData: data,
        initialY: data.position[1],
        ringMesh: ring
      };

      this.hotspotsGroup.add(pinGroup);
      this.hotspotMeshes.push(pinGroup);
    });

    this.scene.add(this.hotspotsGroup);
  }

  setupEvents() {
    window.addEventListener('resize', () => this.onWindowResize());
    this.canvas.addEventListener('click', (event) => this.onCanvasClick(event));
  }

  onWindowResize() {
    if (!this.canvas || !this.renderer || !this.camera) return;
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight || 500;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  onCanvasClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const intersects = this.raycaster.intersectObjects(this.hotspotMeshes, true);
    if (intersects.length > 0) {
      let targetGroup = intersects[0].object;
      while (targetGroup.parent && !targetGroup.userData.hotspotData) {
        targetGroup = targetGroup.parent;
      }
      if (targetGroup.userData && targetGroup.userData.hotspotData) {
        this.selectHotspot(targetGroup.userData.hotspotData.id);
      }
    }
  }

  selectHotspot(hotspotId) {
    const data = this.hotspotsData.find(h => h.id === hotspotId);
    if (!data) return;

    this.activeHotspotId = hotspotId;

    this.hotspotMeshes.forEach(pin => {
      const isSelected = pin.userData.hotspotData.id === hotspotId;
      pin.userData.ringMesh.material.color.setHex(isSelected ? 0x2e7d32 : 0xff9800);
      pin.userData.ringMesh.scale.setScalar(isSelected ? 1.4 : 1.0);
    });

    if (window.TipatApp && typeof window.TipatApp.updateHotspotUI === 'function') {
      window.TipatApp.updateHotspotUI(data);
    }

    if (window.TipatApp && typeof window.TipatApp.playSound === 'function') {
      window.TipatApp.playSound('click');
    }

    if (data.cameraTarget) {
      this.flyCameraTo(data.cameraTarget);
    }
  }

  flyCameraTo(targetPos) {
    if (!this.controls) return;
    const startPos = this.camera.position.clone();
    const endPos = new THREE.Vector3(...targetPos);
    let progress = 0;

    const animateCamera = () => {
      progress += 0.05;
      this.camera.position.lerpVectors(startPos, endPos, Math.min(progress, 1));
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };
    animateCamera();
  }

  setCameraView(viewName) {
    this.isAutoSpinning = false;
    if (this.controls) this.controls.autoRotate = false;

    switch (viewName) {
      case 'front':
        this.flyCameraTo([0, 0, 7.2]);
        break;
      case 'top':
        this.flyCameraTo([0, 7.2, 0.1]);
        break;
      case 'side':
        this.flyCameraTo([7.2, 0, 0]);
        break;
      case 'bottom':
        this.flyCameraTo([0, -7.2, 0.1]);
        break;
      case 'iso':
      default:
        this.flyCameraTo([3.5, 3.0, 6.0]);
        break;
    }
  }

  toggleAutoSpin(forcedState = null) {
    this.isAutoSpinning = (forcedState !== null) ? forcedState : !this.isAutoSpinning;
    if (this.controls) {
      this.controls.autoRotate = this.isAutoSpinning;
    }
    return this.isAutoSpinning;
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    this.updateMaterials();
  }

  setDisplayMode(mode) {
    this.currentMode = mode;
    this.updateMaterials();

    if (mode === 'exploded') {
      this.stripTiles.forEach(tile => {
        const factor = (tile.userData.faceSign || 1) * 0.45;
        tile.position.z = tile.userData.origPos.z + factor;
      });
    } else {
      this.stripTiles.forEach(tile => {
        if (tile.userData.origPos) {
          tile.position.copy(tile.userData.origPos);
        }
      });
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    if (this.hotspotsGroup && this.camera) {
      const time = performance.now() * 0.003;
      this.hotspotMeshes.forEach((pin, i) => {
        pin.quaternion.copy(this.camera.quaternion);
        pin.position.y = pin.userData.initialY + Math.sin(time + i) * 0.04;
      });
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

window.Tipat3DViewer = Tipat3DViewer;
