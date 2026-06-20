// ============================================================
// useScrollSpy — active-section tracking via GSAP ScrollTrigger (doc 03 §9).
// Replaces the old manual scroll listener. One ScrollTrigger per section; the
// active id is whichever section straddles the viewport center. Because Lenis
// calls ScrollTrigger.update() on scroll (useLenis), these stay in sync on the
// single RAF — no extra scroll listener.
// ============================================================

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollSpy(ids, onChange) {
  const [active, setActive] = useState(ids[0]);
  const cbRef = useRef(onChange);
  cbRef.current = onChange;

  const key = ids.join(',');

  useEffect(() => {
    const triggers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActive(id);
              cbRef.current?.(id);
            }
          },
        });
      })
      .filter(Boolean);

    // Sections mount after the preloader; recalc positions once wired up.
    ScrollTrigger.refresh();

    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

export default useScrollSpy;
