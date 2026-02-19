import { useEffect, useRef, useState } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: Record<string, unknown>) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = (instance[key] as (...args: unknown[]) => unknown).bind(instance);
    }
  });
}

function createTextTexture(
  gl: unknown,
  text: string,
  font = 'bold 30px DM Sans, sans-serif',
  color = 'black',
  subtitleFont = '16px DM Sans, sans-serif'
) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: null, width: 0, height: 0 };
  const lines = text.split('\n');
  const mainFont = font;
  const mainSize = parseInt(mainFont, 10) || 30;
  const lineHeight = mainSize * 1.25;
  context.font = mainFont;
  let textWidth = 0;
  lines.forEach((line, i) => {
    context.font = i === 0 ? mainFont : subtitleFont;
    textWidth = Math.max(textWidth, Math.ceil(context.measureText(line).width));
  });
  const textHeight = lines.length * lineHeight;
  canvas.width = textWidth + 24;
  canvas.height = textHeight + 24;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  const startY = canvas.height / 2 - (lines.length - 1) * (lineHeight / 2);
  lines.forEach((line, i) => {
    context.font = i === 0 ? mainFont : subtitleFont;
    context.textBaseline = 'middle';
    context.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });
  const texture = new (Texture as unknown as new (a: unknown, b: { generateMipmaps: boolean }) => unknown)(gl, { generateMipmaps: false });
  (texture as { image: HTMLCanvasElement }).image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

interface TitleOpts {
  gl: unknown;
  plane: { scale: { x: number; y: number } };
  renderer: unknown;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: unknown;
  plane: { scale: { x: number; y: number } };
  renderer: unknown;
  text: string;
  textColor: string;
  font: string;
  mesh: unknown;

  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px DM Sans, sans-serif' }: TitleOpts) {
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    autoBind(this as unknown as Record<string, unknown>);
    this.createMesh();
  }

  createMesh() {
    const subtitleFont = '500 16px DM Sans, sans-serif';
    const { texture, width, height } = createTextTexture(this.gl as WebGLRenderingContext, this.text, this.font, this.textColor, subtitleFont);
    if (!texture) return;
    const geometry = new (Plane as unknown as new (a: unknown) => unknown)(this.gl);
    const program = new (Program as unknown as new (a: unknown, b: Record<string, unknown>) => unknown)(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vec2(vUv.x, 1.0 - vUv.y));
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new (Mesh as unknown as new (a: unknown, b: Record<string, unknown>) => unknown)(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    (this.mesh as { scale: { set: (x: number, y: number, z: number) => void }; position: { y: number }; setParent: (p: unknown) => void }).scale.set(textWidth, textHeight, 1);
    (this.mesh as { position: { y: number }; setParent: (p: unknown) => void }).position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    (this.mesh as { setParent: (p: unknown) => void }).setParent(this.plane);
  }
}

interface MediaOpts {
  geometry: unknown;
  gl: unknown;
  image: string;
  index: number;
  length: number;
  renderer: unknown;
  scene: unknown;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  visibleCount: number;
}

class Media {
  plane: unknown;
  program: { uniforms: Record<string, { value: unknown }> };
  width: number;
  widthTotal: number;
  x: number;
  extra: number;
  scale: number;
  padding: number;
  isBefore: boolean;
  isAfter: boolean;
  speed: number;
  index: number;
  length: number;
  viewport: { width: number; height: number };
  screen: { width: number; height: number };
  visibleCount: number;

  constructor(opts: MediaOpts) {
    this.extra = 0;
    this.isBefore = false;
    this.isAfter = false;
    this.speed = 0;
    this.width = 0;
    this.widthTotal = 0;
    this.x = 0;
    this.scale = 0;
    this.padding = 2;
    this.index = opts.index;
    this.length = opts.length;
    this.viewport = opts.viewport;
    this.screen = opts.screen;
    this.visibleCount = opts.visibleCount;
    const {
      geometry,
      gl,
      image,
      renderer,
      scene,
      text,
      textColor,
      borderRadius = 0,
      font,
    } = opts;
    this.createShader(gl, image, borderRadius);
    this.plane = this.createMesh(gl, geometry, scene);
    this.program = (this.plane as { program: Media['program'] }).program;
    new Title({
      gl,
      plane: this.plane as { scale: { x: number; y: number } },
      renderer,
      text,
      textColor,
      font,
    });
    this.onResize({ screen: opts.screen, viewport: opts.viewport });
  }

  createShader(gl: unknown, image: string, borderRadius: number): void {
    const texture = new (Texture as unknown as new (a: unknown, b: { generateMipmaps: boolean }) => unknown)(gl, { generateMipmaps: true });
    (this as unknown as { program: Media['program'] }).program = new (Program as unknown as new (a: unknown, b: Record<string, unknown>) => unknown)(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            1.0 - (vUv.y * ratio.y + (1.0 - ratio.y) * 0.5)
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] as [number, number] },
        uImageSizes: { value: [0, 0] as [number, number] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: borderRadius },
      },
      transparent: true,
    }) as Media['program'];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image.startsWith('/') ? window.location.origin + image : image;
    img.onload = () => {
      (texture as { image: HTMLImageElement }).image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh(gl: unknown, geometry: unknown, scene: unknown) {
    const plane = new (Mesh as unknown as new (a: unknown, b: Record<string, unknown>) => unknown)(gl, {
      geometry,
      program: (this as unknown as { program: Media['program'] }).program,
    });
    (plane as { setParent: (p: unknown) => void }).setParent(scene);
    return plane;
  }

  update(
    scroll: { current: number; last: number; target: number },
    direction: 'left' | 'right',
    viewport: { width: number; height: number },
    bend: number
  ) {
    const plane = this.plane as { position: { x: number; y: number }; rotation: { z: number }; scale: { x: number; y: number }; program: { uniforms: Record<string, { value: number }> } };
    plane.position.x = this.x - scroll.current - this.extra;
    const x = plane.position.x;
    const H = viewport.width / 2;
    if (bend === 0) {
      plane.position.y = 0;
      plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (bend > 0) {
        plane.position.y = -arc;
        plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        plane.position.y = arc;
        plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    plane.program.uniforms.uTime.value += 0.04;
    plane.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = plane.scale.x / 2;
    const viewportOffset = viewport.width / 2;
    this.isBefore = plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (viewport) this.viewport = viewport;
    if (screen) this.screen = screen;
    const sv = this.viewport;
    const ss = this.screen;
    if (!sv || !ss) return;
    this.scale = ss.height / 1500;
    const plane = this.plane as { scale: { x: number; y: number }; program: { uniforms: Record<string, { value: [number, number] }> } };
    const slotWidth = sv.width / this.visibleCount;
    const gapBetweenCards = 24;
    plane.scale.x = slotWidth - gapBetweenCards;
    plane.scale.y = (sv.height * (560 * this.scale)) / ss.height;
    plane.program.uniforms.uPlaneSizes.value = [plane.scale.x, plane.scale.y];
    this.width = plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

const defaultItems = [
  { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Bridge' },
  { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Desk' },
  { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Waterfall' },
];

interface CircularGalleryProps {
  items?: { image: string; text: string; role?: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  visibleCount?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Optional: show a subtle "drag or scroll" hint that fades after interaction or a few seconds */
  showDragHint?: boolean;
}

export default function CircularGallery({
  items,
  bend = 1,
  textColor = '#121212',
  borderRadius = 0.05,
  font = 'bold 30px DM Sans, sans-serif',
  scrollSpeed = 2,
  scrollEase = 0.05,
  visibleCount = 3,
  className = '',
  style = {},
  showDragHint = false,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragHintVisible, setDragHintVisible] = useState(showDragHint);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const galleryItems = items?.length ? items : defaultItems;
    const itemsDoubled = galleryItems.concat(galleryItems);

    let screen = { width: container.clientWidth, height: container.clientHeight };
    let viewport = { width: 0, height: 0 };
    const scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    const renderer = new (Renderer as unknown as new (a: { alpha: boolean; antialias: boolean; dpr: number }) => { gl: WebGLRenderingContext; setSize: (w: number, h: number) => void; render: (a: { scene: unknown; camera: unknown }) => void })({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas as HTMLCanvasElement);

    const camera = new (Camera as unknown as new (gl: unknown) => { fov: number; position: { z: number }; aspect: number; perspective: (a: { aspect: number }) => void })(gl);
    camera.fov = 45;
    camera.position.z = 20;

    const scene = new (Transform as unknown as new () => object)();
    const planeGeometry = new (Plane as unknown as new (gl: unknown, opts: { heightSegments: number; widthSegments: number }) => unknown)(gl, { heightSegments: 50, widthSegments: 100 });

    const viewportInit = { width: 1, height: 1 };
    const labelText = (d: { text: string; role?: string }) =>
      d.role ? `${d.text}\n${d.role}` : d.text;
    const medias: Media[] = itemsDoubled.map((data, index) =>
      new Media({
        geometry: planeGeometry,
        gl,
        image: data.image,
        index,
        length: itemsDoubled.length,
        renderer,
        scene,
        screen,
        text: labelText(data),
        viewport: viewportInit,
        bend,
        textColor,
        borderRadius,
        font,
        visibleCount,
      })
    );

    const onResize = () => {
      screen = { width: container.clientWidth, height: container.clientHeight };
      renderer.setSize(screen.width, screen.height);
      camera.perspective({ aspect: screen.width / screen.height });
      const fov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      viewport = { width: height * (screen.width / screen.height), height };
      medias.forEach((media) => media.onResize({ screen, viewport }));
    };

    onResize();

    const hideHint = () => setDragHintVisible(false);

    const onWheel = (e: WheelEvent) => {
      hideHint();
      const delta = e.deltaY ?? (e as unknown as { wheelDelta: number }).wheelDelta ?? (e as unknown as { detail: number }).detail;
      scroll.target += (delta > 0 ? scrollSpeed : -scrollSpeed) * 0.2;
    };

    const onTouchDown = (e: MouseEvent | TouchEvent) => {
      hideHint();
      (scroll as unknown as { position: number }).position = scroll.current;
      (container as unknown as { _start: number })._start = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      (container as unknown as { _isDown: boolean })._isDown = true;
    };
    const onTouchMove = (e: MouseEvent | TouchEvent) => {
      if (!(container as unknown as { _isDown: boolean })._isDown) return;
      const clientX = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const distance = ((container as unknown as { _start: number })._start - clientX) * (scrollSpeed * 0.025);
      scroll.target = (scroll as unknown as { position: number }).position + distance;
    };
    const onTouchUp = () => {
      (container as unknown as { _isDown: boolean })._isDown = false;
    };

    const hintTimer = showDragHint ? window.setTimeout(hideHint, 4000) : undefined;

    window.addEventListener('resize', onResize);
    window.addEventListener('wheel', onWheel);
    window.addEventListener('mousewheel', onWheel as unknown as EventListener);
    container.addEventListener('mousedown', onTouchDown as EventListener);
    window.addEventListener('mousemove', onTouchMove as EventListener);
    window.addEventListener('mouseup', onTouchUp);
    window.addEventListener('touchstart', onTouchDown as EventListener);
    window.addEventListener('touchmove', onTouchMove as EventListener);
    window.addEventListener('touchend', onTouchUp);

    let raf = 0;
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      const direction = scroll.current > scroll.last ? 'right' : 'left';
      medias.forEach((media) => media.update(scroll, direction, viewport, bend));
      renderer.render({ scene, camera });
      scroll.last = scroll.current;
      raf = window.requestAnimationFrame(update);
    };
    update();

    return () => {
      if (hintTimer) window.clearTimeout(hintTimer);
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousewheel', onWheel as unknown as EventListener);
      container.removeEventListener('mousedown', onTouchDown as EventListener);
      window.removeEventListener('mousemove', onTouchMove as EventListener);
      window.removeEventListener('mouseup', onTouchUp);
      window.removeEventListener('touchstart', onTouchDown as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('touchend', onTouchUp);
      const canvas = gl.canvas as HTMLCanvasElement;
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, visibleCount, showDragHint]);

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative', ...style }}
    >
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        aria-label="Horizontal gallery"
      />
      {showDragHint && dragHintVisible && (
        <div
          className="circular-gallery-drag-hint"
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted, #5e5e5e)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.9,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          Drag or scroll to explore
        </div>
      )}
    </div>
  );
}
