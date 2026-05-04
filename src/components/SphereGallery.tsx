import { useRef, useEffect, useState, useCallback } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  thumbnail?: string;
  author?: string;
}

interface SphereGalleryProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

// Fibonacci sphere - evenly distributes N points on a sphere surface
function fibonacciSphere(n: number): Array<{ x: number; y: number; z: number }> {
  const pts: Array<{ x: number; y: number; z: number }> = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

const TILE_COUNT = 50;
const SPHERE_RADIUS = 240;

export function SphereGallery({ articles, onArticleClick }: SphereGalleryProps) {
  // Rotation state stored in refs for smooth animation, replicated to state for render
  const rotX = useRef(-20);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.12); // auto-spin speed
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const [renderRotX, setRenderRotX] = useState(-20);
  const [renderRotY, setRenderRotY] = useState(0);
  const hasDragged = useRef(false);

  // Responsive radius
  const [radius, setRadius] = useState(SPHERE_RADIUS);
  const [tileW, setTileW] = useState(96);
  const [tileH, setTileH] = useState(64);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) { setRadius(130); setTileW(60); setTileH(42); }
      else if (w < 768) { setRadius(170); setTileW(74); setTileH(50); }
      else if (w < 1024) { setRadius(200); setTileW(84); setTileH(56); }
      else { setRadius(240); setTileW(96); setTileH(64); }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Animation loop with inertia
  const animate = useCallback(() => {
    if (!isDragging.current) {
      rotX.current += velX.current;
      rotY.current += velY.current;
      // Dampen user-thrown velocity toward auto-spin
      velX.current *= 0.94;
      if (Math.abs(velY.current) < 0.12) velY.current += (0.12 - velY.current) * 0.02;
      velY.current *= 0.98;
    }
    setRenderRotX(rotX.current);
    setRenderRotY(rotY.current);
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged.current = true;
    velY.current = dx * 0.35;
    velX.current = dy * 0.25;
    rotY.current += dx * 0.35;
    rotX.current += dy * 0.25;
    // Clamp vertical tilt
    rotX.current = Math.max(-80, Math.min(80, rotX.current));
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging.current = false;
    // Resume gentle auto-spin
    if (Math.abs(velY.current) < 0.12) velY.current = 0.12;
  };

  // Touch
  const lastTouch = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    velX.current = 0;
    velY.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastTouch.current.x;
    const dy = e.touches[0].clientY - lastTouch.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged.current = true;
    velY.current = dx * 0.35;
    velX.current = dy * 0.25;
    rotY.current += dx * 0.35;
    rotX.current += dy * 0.25;
    rotX.current = Math.max(-80, Math.min(80, rotX.current));
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    if (Math.abs(velY.current) < 0.12) velY.current = 0.12;
  };

  const pts = fibonacciSphere(TILE_COUNT);
  const containerH = radius * 2 + tileH * 2 + 40;

  return (
    <div
      className="relative select-none w-full flex flex-col items-center"
      style={{ height: containerH, cursor: isDragging.current ? 'grabbing' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: radius * 2.4,
          height: radius * 2.4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,206,209,0.07) 0%, rgba(255,215,0,0.04) 45%, transparent 70%)',
        }}
      />
      {/* Equator ring */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: radius * 2.1,
          height: radius * 2.1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(0,206,209,0.08)',
          borderRadius: '50%',
        }}
      />

      {/* 3D Scene wrapper */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          perspective: radius * 5,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${renderRotX}deg) rotateY(${renderRotY}deg)`,
          }}
        >
          {pts.map((pt, i) => {
            const article = articles[i] || null;

            // Position tile at point on sphere surface
            // rotateY then rotateX to face outward
            const yawDeg = (Math.atan2(pt.x, pt.z) * 180) / Math.PI;
            const pitchDeg = -(Math.asin(pt.y) * 180) / Math.PI;

            return (
              <div
                key={i}
                onClick={(e) => {
                  if (!hasDragged.current && article) {
                    e.stopPropagation();
                    onArticleClick(article);
                  }
                }}
                style={{
                  position: 'absolute',
                  width: tileW,
                  height: tileH,
                  marginLeft: -tileW / 2,
                  marginTop: -tileH / 2,
                  transform: `rotateY(${yawDeg}deg) rotateX(${pitchDeg}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 7,
                  overflow: 'hidden',
                  cursor: article ? 'pointer' : 'default',
                  border: article
                    ? '1px solid rgba(0,206,209,0.45)'
                    : '1px solid rgba(0,206,209,0.1)',
                  boxShadow: article
                    ? '0 0 14px rgba(0,206,209,0.22), inset 0 0 6px rgba(0,206,209,0.06)'
                    : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                className={article ? 'hover:border-primary/80 hover:shadow-primary/50' : ''}
              >
                {article ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: article.thumbnail ? `url(${article.thumbnail})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: 'rgba(0,0,0,0.85)',
                      position: 'relative',
                    }}
                  >
                    {/* Gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 55%, rgba(0,206,209,0.06) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '4px 5px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: tileW < 70 ? 6.5 : 7.5,
                          fontWeight: 700,
                          color: '#d0fffe',
                          lineHeight: 1.25,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                          letterSpacing: 0.2,
                        }}
                      >
                        {article.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Empty tile - subtle logo watermark */
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: "url('/neurus-logo.jpeg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.12,
                      backgroundColor: '#050505',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag hint */}
      <p
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none"
        style={{
          fontSize: 11,
          color: 'rgba(0,206,209,0.45)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Drag to spin &bull; Click to read
      </p>
    </div>
  );
}
