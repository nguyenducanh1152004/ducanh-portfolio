/* Cảnh hệ hành tinh 3D. Planet maps: Solar System Scope, CC BY 4.0 (xem THIRD_PARTY.md). */
window.Space = (() => {
  const T = window.THREE;
  const TAU = Math.PI * 2;
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

  const SPECS = [
    { key: 'about', map: 'earth.jpg', r: 0.8, orbit: 4.7, angle: 2.5, speed: 0.085, color: '#7cc4ff', tilt: 0.41, clouds: true, moon: true },
    { key: 'skills', map: 'neptune.jpg', r: 0.72, orbit: 6.5, angle: 0.4, speed: 0.062, color: '#9d8cff', tilt: 0.49 },
    { key: 'projects', map: 'saturn.jpg', r: 0.9, orbit: 8.4, angle: 5.75, speed: 0.046, color: '#f2c38b', tilt: 0.47, ring: true },
    { key: 'experience', map: 'mars.jpg', r: 0.62, orbit: 10.2, angle: 1.55, speed: 0.035, color: '#ff8a7a', tilt: 0.44 },
    { key: 'contact', map: 'uranus.jpg', r: 0.74, orbit: 11.9, angle: 3.2, speed: 0.027, color: '#7fe3d4', tilt: 1.2, moon: true }
  ];

  function supported() {
    try {
      const c = document.createElement('canvas');
      return !!(T && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch { return false; }
  }

  function radial(stops, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(([o, col]) => g.addColorStop(o, col));
    x.fillStyle = g;
    x.fillRect(0, 0, size, size);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }

  function create({ host, labels = {}, reduced = false, onHover, onSelect, onProgress, onReady }) {
    const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x03050b, 1);
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(38, 1, 0.1, 500);
    const system = new T.Group();
    scene.add(system);

    /* ---------- tải texture ---------- */
    let ready = false;
    const manager = new T.LoadingManager();
    manager.onProgress = (_, loaded, total) => onProgress && onProgress(loaded / total);
    const finish = () => {
      if (ready) return;
      ready = true;
      onReady && onReady();
      startIntro();
    };
    manager.onLoad = finish;
    setTimeout(finish, 9000);
    const loader = new T.TextureLoader(manager);
    const textures = [];
    const tex = (name, srgb = true) => {
      const t = loader.load('assets/planets/' + name);
      if (srgb) t.colorSpace = T.SRGBColorSpace;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textures.push(t);
      return t;
    };

    /* ---------- bầu trời ---------- */
    const sky = new T.Mesh(
      new T.SphereGeometry(240, 48, 32),
      new T.MeshBasicMaterial({ map: tex('milky_way.jpg'), side: T.BackSide, color: 0x6f7fa8, depthWrite: false })
    );
    sky.rotation.set(0.5, 1.2, 0.35);
    scene.add(sky);

    const STAR_COUNT = 2600;
    const sPos = new Float32Array(STAR_COUNT * 3);
    const sTint = new Float32Array(STAR_COUNT * 3);
    const sPhase = new Float32Array(STAR_COUNT);
    const sSize = new Float32Array(STAR_COUNT);
    const palette = ['#ffffff', '#cfe0ff', '#ffe2c4', '#c9c2ff', '#bff4ff'].map(c => new T.Color(c));
    for (let i = 0; i < STAR_COUNT; i++) {
      const u = Math.random() * 2 - 1, th = Math.random() * TAU, rad = 100 + Math.random() * 110, s = Math.sqrt(1 - u * u);
      sPos.set([rad * s * Math.cos(th), rad * u, rad * s * Math.sin(th)], i * 3);
      palette[(Math.random() * palette.length) | 0].toArray(sTint, i * 3);
      sPhase[i] = Math.random() * TAU;
      sSize[i] = 0.7 + Math.pow(Math.random(), 7) * 3.6;
    }
    const starGeo = new T.BufferGeometry();
    starGeo.setAttribute('position', new T.BufferAttribute(sPos, 3));
    starGeo.setAttribute('tint', new T.BufferAttribute(sTint, 3));
    starGeo.setAttribute('phase', new T.BufferAttribute(sPhase, 1));
    starGeo.setAttribute('size', new T.BufferAttribute(sSize, 1));
    const starU = { time: { value: 0 }, pr: { value: 1 } };
    scene.add(new T.Points(starGeo, new T.ShaderMaterial({
      uniforms: starU,
      vertexShader: 'attribute vec3 tint;attribute float phase;attribute float size;uniform float time;uniform float pr;varying vec3 vc;varying float va;void main(){va=.55+.45*sin(phase+time*(.5+fract(phase*3.7)*1.4));vc=tint;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=size*pr;}',
      fragmentShader: 'varying vec3 vc;varying float va;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vc,smoothstep(.5,.0,d)*va);}',
      transparent: true, depthWrite: false, blending: T.AdditiveBlending
    })));

    /* ---------- mặt trời ---------- */
    const SUN_R = 1.4;
    const sunU = { time: { value: 0 }, map: { value: tex('sun.jpg') } };
    const sun = new T.Mesh(new T.SphereGeometry(SUN_R, 64, 48), new T.ShaderMaterial({
      uniforms: sunU,
      vertexShader: 'varying vec2 vUv;varying vec3 vN;varying vec3 vV;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'uniform float time;uniform sampler2D map;varying vec2 vUv;varying vec3 vN;varying vec3 vV;void main(){vec3 a=texture2D(map,vUv+vec2(time*.004,0.)).rgb;vec3 b=texture2D(map,vUv*1.8-vec2(time*.007,time*.002)).rgb;vec3 c=mix(a,b,.4)*vec3(2.1,1.35,.7)+vec3(.35,.12,.01);float rim=pow(1.-max(dot(vN,vV),0.),2.2);c+=vec3(1.,.6,.25)*rim*1.2;gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'
    }));
    system.add(sun);
    const glowA = new T.Sprite(new T.SpriteMaterial({ map: radial([[0, 'rgba(255,240,210,1)'], [0.16, 'rgba(255,190,110,.75)'], [0.38, 'rgba(255,130,60,.16)'], [1, 'rgba(255,110,50,0)']]), transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
    glowA.scale.setScalar(SUN_R * 5.6);
    const glowB = new T.Sprite(new T.SpriteMaterial({ map: radial([[0, 'rgba(255,170,90,.35)'], [0.3, 'rgba(255,120,80,.08)'], [1, 'rgba(120,80,255,0)']]), transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
    glowB.scale.setScalar(SUN_R * 12);
    system.add(glowA, glowB);

    /* ---------- ánh sáng ---------- */
    system.add(new T.PointLight(0xfff0dc, 3.8, 0, 0));
    scene.add(new T.AmbientLight(0x4a5a88, 1.15));
    scene.add(new T.HemisphereLight(0x3b4a7a, 0x0b0d16, 0.35));

    /* ---------- hành tinh ---------- */
    const atmVS = 'varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}';
    const atmFS = 'uniform vec3 color;uniform float strength;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.-abs(dot(vN,vV)),2.6);gl_FragColor=vec4(color,f*strength);}';
    const moonMat = new T.MeshStandardMaterial({ map: tex('moon.jpg'), roughness: 1 });
    const planets = [];
    const hitTargets = [];
    const byKey = {};

    SPECS.forEach(spec => {
      const pivot = new T.Group();
      system.add(pivot);
      const tilt = new T.Group();
      tilt.rotation.z = spec.tilt;
      pivot.add(tilt);
      const mesh = new T.Mesh(new T.SphereGeometry(spec.r, 72, 48), new T.MeshStandardMaterial({ map: tex(spec.map), roughness: 0.92, metalness: 0 }));
      tilt.add(mesh);

      const atmU = { color: { value: new T.Color(spec.color) }, strength: { value: 0.6 } };
      const atm = new T.Mesh(new T.SphereGeometry(spec.r * 1.07, 48, 32), new T.ShaderMaterial({ uniforms: atmU, vertexShader: atmVS, fragmentShader: atmFS, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
      pivot.add(atm);

      let clouds = null;
      if (spec.clouds) {
        const cm = tex('earth_clouds.jpg');
        clouds = new T.Mesh(new T.SphereGeometry(spec.r * 1.015, 64, 40), new T.MeshStandardMaterial({ map: cm, alphaMap: cm, transparent: true, opacity: 0.6, depthWrite: false, roughness: 1 }));
        tilt.add(clouds);
      }

      if (spec.ring) {
        const inner = spec.r * 1.25, outer = spec.r * 2.25;
        const g = new T.RingGeometry(inner, outer, 160, 1);
        const p = g.attributes.position, uv = g.attributes.uv;
        for (let i = 0; i < p.count; i++) uv.setXY(i, (Math.hypot(p.getX(i), p.getY(i)) - inner) / (outer - inner), 0.5);
        const ringTex = tex('saturn_ring.png');
        const ring = new T.Mesh(g, new T.MeshStandardMaterial({ map: ringTex, transparent: true, opacity: 0.95, side: T.DoubleSide, roughness: 1, depthWrite: false, emissive: 0x3a2c1c, emissiveMap: ringTex }));
        ring.rotation.x = -Math.PI / 2 + 0.38;
        tilt.add(ring);
      }

      let moon = null;
      if (spec.moon) {
        moon = new T.Mesh(new T.SphereGeometry(spec.r * 0.24, 32, 20), moonMat);
        pivot.add(moon);
      }

      const hit = new T.Mesh(new T.SphereGeometry(spec.r * (spec.ring ? 2.1 : 1.65), 16, 12), new T.MeshBasicMaterial({ visible: false }));
      hit.userData.key = spec.key;
      pivot.add(hit);
      hitTargets.push(hit);

      const pts = [];
      for (let i = 0; i <= 256; i++) { const a = (i / 256) * TAU; pts.push(new T.Vector3(Math.cos(a), 0, Math.sin(a))); }
      const orbitLine = new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: spec.color, transparent: true, opacity: 0.12, depthWrite: false }));
      system.add(orbitLine);

      const planet = { spec, pivot, mesh, atmU, clouds, moon, orbitLine, angle: spec.angle, hover: 0, label: labels[spec.key] };
      planets.push(planet);
      byKey[spec.key] = planet;
    });

    /* ---------- vành đai bụi ngoài cùng ---------- */
    const ROCKS = 900;
    const rocks = new T.InstancedMesh(new T.DodecahedronGeometry(0.026, 0), new T.MeshStandardMaterial({ color: 0x4d5470, roughness: 1 }), ROCKS);
    const dummy = new T.Object3D();
    for (let i = 0; i < ROCKS; i++) {
      const a = Math.random() * TAU, rr = 13.7 + (Math.random() - 0.5) * 1.4 + Math.random() * Math.random() * 1.2;
      dummy.position.set(Math.cos(a) * rr, (Math.random() - 0.5) * 0.35, Math.sin(a) * rr);
      dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      dummy.scale.setScalar(0.35 + Math.pow(Math.random(), 4) * 1.5);
      dummy.updateMatrix();
      rocks.setMatrixAt(i, dummy.matrix);
    }
    const belt = new T.Group();
    belt.add(rocks);
    system.add(belt);

    /* ---------- trạng thái camera ---------- */
    let W = 1, H = 1, L = null;
    let mode = 'intro', focusKey = null, hoverKey = null;
    let az = -0.55, azTarget = -0.55, timeScale = reduced ? 0 : 1, osCur = 1;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    const focusDir = new T.Vector3();
    const cur = { pos: new T.Vector3(), look: new T.Vector3(), ox: 0, oy: 0 };
    let trans = null;

    function layout() {
      const a = W / H;
      if (a < 0.8) return { os: 0.52, dist: 42, el: 0.8, ox: 0, oy: -0.15, fd: 10, fov: 55, fa: 1.0, fox: 0, foy: 0.25 };
      if (a < 1.25 || W < 900) return { os: 0.8, dist: 38, el: 0.62, ox: 0, oy: -0.13, fd: 8.5, fov: 50, fa: 0.95, fox: 0, foy: 0.25 };
      return { os: 1, dist: 34, el: 0.44, ox: -0.15, oy: 0.03, fd: 6.6, fov: 38, fa: 0.75, fox: 0.21, foy: 0 };
    }

    const tmp = new T.Vector3(), tmp2 = new T.Vector3(), UP = new T.Vector3(0, 1, 0);
    function planetWorld(p, out) { return p.pivot.getWorldPosition(out); }

    function overviewPose(out) {
      const e = L.el + par.y * 0.05, a = az + par.x * 0.08, d = L.dist;
      out.pos.set(Math.sin(a) * Math.cos(e) * d, Math.sin(e) * d, Math.cos(a) * Math.cos(e) * d);
      out.look.set(0, 0, 0);
      out.ox = L.ox; out.oy = L.oy;
      return out;
    }
    function focusPose(out) {
      const p = byKey[focusKey];
      planetWorld(p, out.look);
      const d = p.spec.r * (p.spec.ring ? 1.75 : 1) * L.fd;
      tmp.copy(focusDir).applyAxisAngle(UP, par.x * 0.12);
      out.pos.copy(out.look).addScaledVector(tmp, d);
      out.pos.y += par.y * d * 0.05;
      out.ox = L.fox; out.oy = L.foy;
      return out;
    }
    const desired = { pos: new T.Vector3(), look: new T.Vector3(), ox: 0, oy: 0 };
    function computeDesired() { return mode === 'focus' ? focusPose(desired) : overviewPose(desired); }

    function beginTransition(duration, ease = easeInOut, from = null) {
      const f = from || { pos: cur.pos.clone(), look: cur.look.clone(), ox: cur.ox, oy: cur.oy };
      trans = { from: f, t: 0, duration: reduced ? 0.001 : duration, ease };
    }

    function startIntro() {
      mode = 'overview';
      overviewPose(desired);
      const d = desired.pos.clone();
      const from = {
        pos: d.clone().applyAxisAngle(UP, -0.9).multiplyScalar(2.3).add(new T.Vector3(0, 12, 0)),
        look: new T.Vector3(0, 2, 0), ox: L.ox, oy: L.oy
      };
      beginTransition(3.4, easeOut, from);
    }

    function applyCamera() {
      camera.position.copy(cur.pos);
      camera.lookAt(cur.look);
      camera.setViewOffset(W, H, cur.ox * W, cur.oy * H, W, H);
    }

    // Đo lại kích thước thật của khung mỗi khung hình: Safari trên iPhone đổi chiều cao
    // (thanh địa chỉ co/giãn) mà không phải lúc nào cũng phát sự kiện resize.
    const targetPR = () => Math.min(devicePixelRatio || 1, 2);
    function resize() {
      const w = Math.round(host.clientWidth || innerWidth);
      const h = Math.round(host.clientHeight || innerHeight);
      if (!w || !h) return;
      if (w === W && h === H && renderer.getPixelRatio() === targetPR()) return;
      W = w;
      H = h;
      L = layout();
      renderer.setPixelRatio(targetPR());
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      starU.pr.value = renderer.getPixelRatio();
      if (mode !== 'focus') osCur = L.os;
    }
    resize();
    overviewPose(cur);
    cur.pos.multiplyScalar(2.3);
    applyCamera();

    /* ---------- tương tác con trỏ ---------- */
    const ray = new T.Raycaster();
    const ndc = new T.Vector2(9, 9);
    let pointerInside = false, down = null, dragged = false;
    const el = renderer.domElement;

    function setHover(key) {
      if (key === hoverKey) return;
      hoverKey = key;
      el.style.cursor = key ? 'pointer' : (mode === 'overview' ? 'grab' : 'default');
      onHover && onHover(key);
    }
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      pointerInside = true;
      if (!reduced && e.pointerType === 'mouse') { par.tx = ndc.x; par.ty = ndc.y; }
      if (down) {
        const dx = e.clientX - down.x;
        if (Math.abs(dx) > 5 || Math.abs(e.clientY - down.y) > 5) dragged = true;
        if (dragged) {
          const step = (e.clientX - down.lx) * 0.005;
          if (mode === 'overview') azTarget -= step;
          else if (mode === 'focus') focusDir.applyAxisAngle(UP, -step);
          down.lx = e.clientX;
          el.style.cursor = 'grabbing';
        }
      }
    });
    el.addEventListener('pointerleave', () => { pointerInside = false; par.tx = par.ty = 0; setHover(null); });
    el.addEventListener('pointerdown', e => {
      down = { x: e.clientX, y: e.clientY, lx: e.clientX };
      dragged = false;
      try { el.setPointerCapture(e.pointerId); } catch { /* bỏ qua */ }
      // chạm trên mobile: tính hover ngay tại điểm chạm
      setNdc(e);
      pick();
    });
    function setNdc(e) {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      pointerInside = true;
    }
    el.addEventListener('pointerup', e => {
      if (down && !dragged) { setNdc(e); pick(); if (hoverKey && hoverKey !== focusKey) onSelect && onSelect(hoverKey); }
      down = null;
      el.style.cursor = hoverKey ? 'pointer' : (mode === 'overview' ? 'grab' : 'default');
      if (e.pointerType !== 'mouse') { pointerInside = false; setHover(null); }
    });

    function pick() {
      if (!pointerInside || mode === 'intro' || (trans && mode === 'focus')) { setHover(null); return; }
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(hitTargets, false)[0];
      setHover(hit ? hit.object.userData.key : null);
    }

    /* ---------- vòng lặp ---------- */
    const clock = new T.Clock();
    let elapsed = 0, raf = 0;
    const proj = new T.Vector3();

    /* Nhãn hành tinh: đặt sao cho không đè lên nhau, không che hành tinh/mặt trời.
       Mỗi nhãn thử 4 vị trí (dưới, trên, phải, trái) và chọn chỗ ít chồng lấn nhất;
       giữ vị trí cũ nếu vẫn ổn để nhãn không nhảy qua lại, và trượt mượt tới vị trí mới. */
    const SIDES = ['below', 'above', 'right', 'left'];
    const sunScreen = { x: 0, y: 0, r: 0 };
    function screenOf(world, radius, out, halfH) {
      const dist = world.distanceTo(camera.position);
      world.project(camera);
      out.x = (world.x * 0.5 + 0.5) * W;
      out.y = (-world.y * 0.5 + 0.5) * H;
      out.r = (radius / (dist * halfH)) * (H / 2);
      out.behind = world.z > 1;
      return out;
    }
    function rectAt(side, s, w, h) {
      const gap = 8;
      if (side === 'below') return { x: s.x - w / 2, y: s.y + s.lr + gap, w, h };
      if (side === 'above') return { x: s.x - w / 2, y: s.y - s.lr - gap - h, w, h };
      if (side === 'right') return { x: s.x + s.lr + gap, y: s.y - h / 2, w, h };
      return { x: s.x - s.lr - gap - w, y: s.y - h / 2, w, h };
    }
    function overlapRect(a, b) {
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      return ox > 0 && oy > 0 ? ox * oy : 0;
    }
    function overlapCircle(a, c) {
      const k = c.r * 0.85; // ô vuông nội tiếp gần đúng của hình tròn
      return overlapRect(a, { x: c.x - k, y: c.y - k, w: 2 * k, h: 2 * k });
    }
    function cost(rect, placed, circles) {
      let c = 0;
      placed.forEach(o => { c += overlapRect(rect, o) * 3; });
      circles.forEach(o => { c += overlapCircle(rect, o); });
      const m = 6; // ra ngoài màn hình hoặc chui dưới thanh menu
      const top = W < 900 || W / H < 1.25 ? 120 : 76;
      if (rect.x < m) c += (m - rect.x) * rect.h;
      if (rect.x + rect.w > W - m) c += (rect.x + rect.w - W + m) * rect.h;
      if (rect.y < top) c += (top - rect.y) * rect.w;
      if (rect.y + rect.h > H - 56) c += (rect.y + rect.h - H + 56) * rect.w;
      return c;
    }
    function placeLabels(dt = 0.016) {
      const halfH = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
      screenOf(proj.set(0, 0, 0), SUN_R, sunScreen, halfH);
      const circles = [sunScreen];
      const items = [];
      planets.forEach(p => {
        if (!p.label) return;
        const s = p.screen || (p.screen = {});
        planetWorld(p, proj);
        screenOf(proj, p.spec.r * p.pivot.scale.x, s, halfH);
        s.lr = s.r * (p.spec.ring ? 2.15 : 1.05);
        if (s.behind) { p.label.style.visibility = 'hidden'; return; }
        circles.push({ x: s.x, y: s.y, r: s.lr });
        items.push(p);
      });
      if (mode === 'focus') return; // nhãn đã ẩn khi xem cận cảnh
      // nhãn gần camera (to hơn) được ưu tiên đặt trước
      items.sort((a, b) => b.screen.r - a.screen.r);
      const placed = [];
      items.forEach(p => {
        const el = p.label;
        const w = el.offsetWidth, h = el.offsetHeight; // đọc lại mỗi khung: font tải xong / đổi cỡ chữ
        const others = circles.filter(c => Math.abs(c.x - p.screen.x) > 0.5 || Math.abs(c.y - p.screen.y) > 0.5);
        let best = null, bestCost = Infinity, bestSide = p.side || 'below';
        SIDES.forEach(side => {
          const r = rectAt(side, p.screen, w, h);
          // ưu tiên giữ nguyên vị trí cũ, sau đó ưu tiên “dưới”
          const bias = (side === p.side ? 0 : 60) + SIDES.indexOf(side) * 5;
          const c = cost(r, placed, others) + bias;
          if (c < bestCost) { bestCost = c; best = r; bestSide = side; }
        });
        p.side = bestSide;
        best.x = Math.max(6, Math.min(W - 6 - w, best.x)); // luôn nằm trong màn hình
        placed.push(best);
        if (p.lx === undefined) { p.lx = best.x; p.ly = best.y; }
        p.lx = damp(p.lx, best.x, 12, dt);
        p.ly = damp(p.ly, best.y, 12, dt);
        el.style.visibility = '';
        el.style.transform = `translate3d(${p.lx.toFixed(1)}px,${p.ly.toFixed(1)}px,0)`;
      });
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      resize();
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      timeScale = damp(timeScale, reduced || mode === 'focus' ? 0 : 1, 2.5, dt);
      par.x = damp(par.x, par.tx, 2.2, dt);
      par.y = damp(par.y, par.ty, 2.2, dt);
      if (mode === 'overview' && !down && !reduced) azTarget += dt * 0.012 * timeScale;
      az = damp(az, azTarget, 4, dt);

      sunU.time.value = elapsed;
      starU.time.value = reduced ? 0 : elapsed;
      sun.rotation.y += dt * 0.03;
      belt.rotation.y += dt * 0.006 * timeScale;
      // khi xem cận cảnh: giãn quỹ đạo về kích thước thật + đổi góc nhìn
      osCur = damp(osCur, mode === 'focus' ? 1 : L.os, 3, dt);
      belt.scale.setScalar(osCur);
      const fovT = mode === 'focus' ? L.fov : 38;
      if (Math.abs(camera.fov - fovT) > 0.01) { camera.fov = damp(camera.fov, fovT, 3, dt); camera.updateProjectionMatrix(); }

      planets.forEach(p => {
        p.angle += p.spec.speed * dt * timeScale;
        const o = p.spec.orbit * osCur;
        p.orbitLine.scale.setScalar(o);
        p.pivot.position.set(Math.cos(p.angle) * o, 0, -Math.sin(p.angle) * o);
        p.mesh.rotation.y += dt * (reduced ? 0.02 : 0.11);
        if (p.clouds) p.clouds.rotation.y += dt * (reduced ? 0.025 : 0.14);
        if (p.moon) {
          const ma = elapsed * (reduced ? 0.05 : 0.45) + p.spec.angle;
          const mr = p.spec.r * 2.1;
          p.moon.position.set(Math.cos(ma) * mr, Math.sin(ma) * mr * 0.18, Math.sin(ma) * mr);
        }
        const target = p.spec.key === hoverKey || p.spec.key === focusKey ? 1 : 0;
        p.hover = damp(p.hover, target, 6, dt);
        p.atmU.strength.value = 0.55 + p.hover * (mode === 'focus' ? 0.25 : 0.75);
        // xem cận cảnh: các hành tinh khác thu nhỏ dần để hành tinh được chọn đứng một mình
        const show = mode !== 'focus' || p.spec.key === focusKey ? 1 : 0;
        p.vis = damp(p.vis ?? 1, show, show ? 3 : 2.2, dt);
        p.pivot.visible = p.vis > 0.01;
        p.pivot.scale.setScalar(p.vis * (1 + p.hover * (mode === 'focus' ? 0 : 0.08)));
        p.orbitLine.material.opacity = ((mode === 'focus' ? 0.05 : 0.11) + p.hover * 0.32) * (0.25 + 0.75 * p.vis);
      });

      computeDesired();
      if (trans) {
        trans.t = Math.min(1, trans.t + dt / trans.duration);
        const k = trans.ease(trans.t);
        const arc = Math.sin(Math.PI * k) * trans.from.pos.distanceTo(desired.pos) * 0.12;
        cur.pos.lerpVectors(trans.from.pos, desired.pos, k);
        cur.pos.y += arc;
        cur.look.lerpVectors(trans.from.look, desired.look, k);
        cur.ox = trans.from.ox + (desired.ox - trans.from.ox) * k;
        cur.oy = trans.from.oy + (desired.oy - trans.from.oy) * k;
        if (trans.t >= 1) trans = null;
      } else {
        cur.pos.copy(desired.pos);
        cur.look.copy(desired.look);
        cur.ox = desired.ox;
        cur.oy = desired.oy;
      }
      applyCamera();
      if (!down || !dragged) pick();
      placeLabels(dt);
      renderer.render(scene, camera);
    }
    frame();

    const onResize = () => resize();
    addEventListener('resize', onResize);
    window.visualViewport && visualViewport.addEventListener('resize', onResize);
    addEventListener('pageshow', onResize);

    return {
      focus(key) {
        if (!byKey[key]) return;
        if (mode === 'intro') { mode = 'overview'; }
        const p = byKey[key];
        planetWorld(p, tmp);
        // hướng nhìn: đứng phía mặt trời chiếu, lệch ~35° để thấy rõ đường sáng tối
        tmp2.copy(tmp).negate().setY(0).normalize();
        focusDir.copy(tmp2).applyAxisAngle(UP, L.fa);
        focusDir.y = 0.26;
        focusDir.normalize();
        focusKey = key;
        mode = 'focus';
        setHover(null);
        beginTransition(focusKey && trans ? 1.5 : 1.6);
      },
      overview() {
        if (mode !== 'focus') return;
        mode = 'overview';
        focusKey = null;
        beginTransition(1.5);
      },
      get mode() { return mode; },
      destroy() {
        cancelAnimationFrame(raf);
        removeEventListener('resize', onResize);
        renderer.dispose();
        textures.forEach(t => t.dispose());
        el.remove();
      }
    };
  }

  return { create, supported, SPECS };
})();
