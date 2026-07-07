import { useEffect, useState } from 'react';

/**
 * Types out `text` character-by-character after an optional delay, then hides
 * the caret. Respects reduced motion by rendering the full string immediately.
 */
export default function TypingText({ text, speed = 34, delay = 900, className = '' }) {
  const reducedInitial =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayed, setDisplayed] = useState(reducedInitial ? text : '');
  const [caret, setCaret] = useState(!reducedInitial);

  useEffect(() => {
    if (reducedInitial) return undefined;

    let interval = 0;
    let hideCaret = 0;
    const startTimer = setTimeout(() => {
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          hideCaret = window.setTimeout(() => setCaret(false), 1600);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
      clearTimeout(hideCaret);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      {caret && (
        <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] bg-aurora-violet animate-pulse" />
      )}
    </span>
  );
}
