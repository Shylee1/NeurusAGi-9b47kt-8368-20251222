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
  logoUrl?: string;
}

const LOGO_URL = '/src/assets/neurus-logo-bg.jpeg';

// Fibonacci sphere distribution for even spacing
function fibonacciSphere(count: number) {
  const points: { theta: number; phi: number }[] = [];
  const goldenAngle = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = goldenAngle * i;
    points.push({ theta, phi });
  }
  return points;
}

export function SphereGallery({ articles, onArticleClick, logoUrl = LOGO_URL }: SphereGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: -15, y: 0 });
  const targetRotationRef = useRef({ x: -15, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const autoRotateRef = useRef(true);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(0);

  // Total tiles - at least 40 slots
  const TOTAL_TILES = Math.max(40, Math.ceil(articles.length / 10) * 10 + 10);
  const points = fibonacciSphere(TOTAL_TILES);

  // Responsive radius
  const getRadius = () => {
    if (typeof window === 'undefined') return 200;
    if (window.innerWidth < 480) return 130;
    if (window.innerWidth < 768) return 160;
    if (window.innerWidth < 1024) return 190;
    return 220;
  };

  const [radius, setRadius] = useState(getRadius());

  useEffect(() => {
    const handleResize = () => setRadius(getRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (autoRotateRef.current && !isDraggingRef.current) {
      targetRotationRef.current.y += 0.15;
    }
    // Smooth interpolation
    rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
    rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
    setRotX(rotationRef.current.x);
    setRotY(rotationRef.current.y);
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate]);

  // Pointer events
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    targetRotationRef.current.y += dx * 0.4;
    targetRotationRef.current.x += dy * 0.3;
    // Clamp vertical
    targetRotationRef.current.x = Math.max(-70, Math.min(70, targetRotationRef.current.x));
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => { autoRotateRef.current = true; }, 3000);
  };

  // Touch events (mobile)
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - lastTouchRef.current.x;
    const dy = e.touches[0].clientY - lastTouchRef.current.y;
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    targetRotationRef.current.y += dx * 0.4;
    targetRotationRef.current.x += dy * 0.3;
    targetRotationRef.current.x = Math.max(-70, Math.min(70, targetRotationRef.current.x));
  };
  const onTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => { autoRotateRef.current = true; }, 3000);
  };

  // Compute tile sizes
  const getTileSize = () => {
    if (typeof window === 'undefined') return { w: 80, h: 55 };
    if (window.innerWidth < 480) return { w: 60, h: 42 };
    if (window.innerWidth < 768) return { w: 70, h: 50 };
    return { w: 85, h: 58 };
  };

  const [tileSize, setTileSize] = useState(getTileSize());
  useEffect(() => {
    const handleResize = () => setTileSize(getTileSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-grab active:cursor-grabbing"
      style={{
        width: '100%',
        height: radius * 2 + tileSize.h * 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${radius * 4}px`,
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient glow behind sphere */}
      <div
        style={{
          position: 'absolute',
          width: radius * 2.2,
          height: radius * 2.2,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,206,209,0.06) 0%, rgba(255,215,0,0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D scene */}
      <div
        style={{
          position: 'relative',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: isDraggingRef.current ? 'none' : undefined,
        }}
      >
        {points.map((point, i) => {
          const article = articles[i] || null;
          const sinTheta = Math.sin(point.theta);
          const x = radius * sinTheta * Math.cos(point.phi);
          const y = radius * sinTheta * Math.sin(point.phi);
          const z = radius * Math.cos(point.theta);

          // Face outward: rotateY first, then rotateX
          const rotY2 = -Math.atan2(x, z) * (180 / Math.PI);
          const rotX2 = Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI);

          return (
            <div
              key={i}
              onClick={(e) => {
                if (!isDraggingRef.current && article) {
                  e.stopPropagation();
                  onArticleClick(article);
                }
              }}
              style={{
                position: 'absolute',
                width: tileSize.w,
                height: tileSize.h,
                marginLeft: -tileSize.w / 2,
                marginTop: -tileSize.h / 2,
                transform: `rotateY(${rotY2}deg) rotateX(${rotX2}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                cursor: article ? 'pointer' : 'default',
                borderRadius: 8,
                overflow: 'hidden',
                border: article ? '1px solid rgba(0,206,209,0.4)' : '1px solid rgba(0,206,209,0.12)',
                boxShadow: article ? '0 0 12px rgba(0,206,209,0.2)' : 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                backfaceVisibility: 'hidden',
              }}
              className={article ? 'hover:scale-110' : ''}
            >
              {article ? (
                <>
                  {/* Article tile */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: article.thumbnail ? `url(${article.thumbnail})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '5px 6px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: tileSize.w < 70 ? '7px' : '8px',
                          fontWeight: 600,
                          color: '#e0ffff',
                          lineHeight: 1.2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                        }}
                      >
                        {article.title}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty tile - show logo */
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${logoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.18,
                    backgroundColor: '#000',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Drag hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: 'rgba(0,206,209,0.5)',
          pointerEvents: 'none',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Drag to explore &bull; Click an article to read
      </div>
    </div>
  );
}
