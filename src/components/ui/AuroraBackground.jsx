import { useEffect, useRef } from 'react';

/**
 * The signature bright backdrop: a soft-white field with slow morphing aurora
 * blobs, a faint grid, and a gentle pointer-follow highlight. Pure CSS/DOM —
 * cheap, GPU-friendly, and the visual constant behind every section.
 */
export default function AuroraBackground({ interactive = true }) {
  const glowRef = useRef(null);

  useEffect(() => {
    if (!interactive) return;
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.4;
    let cx = tx;
    let cy = ty;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [interactive]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-paper" aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-wash-from)] via-[var(--bg-wash-via)] to-[var(--bg-wash-to)]" />

      {/* Morphing aurora blobs */}
      <div className="aurora-blob blob-violet animate-blob w-[46vw] h-[46vw] max-w-[720px] max-h-[720px] -top-[10%] -left-[8%]" />
      <div
        className="aurora-blob blob-blue animate-blob w-[42vw] h-[42vw] max-w-[640px] max-h-[640px] top-[12%] right-[-6%]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="aurora-blob blob-cyan animate-blob w-[38vw] h-[38vw] max-w-[560px] max-h-[560px] bottom-[6%] left-[18%]"
        style={{ animationDelay: '-11s' }}
      />
      <div
        className="aurora-blob blob-pink animate-blob w-[34vw] h-[34vw] max-w-[520px] max-h-[520px] bottom-[-8%] right-[14%]"
        style={{ animationDelay: '-3s' }}
      />

      {/* Fine grid — technical precision at whisper opacity */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        }}
      />

      {/* Pointer-follow highlight */}
      {interactive && (
        <div
          ref={glowRef}
          className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(138,124,255,0.14), rgba(95,208,230,0.06) 40%, transparent 68%)',
          }}
        />
      )}

      {/* Top + bottom soft fade so content breathes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--fade-from)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--fade-to)] to-transparent" />
    </div>
  );
}
