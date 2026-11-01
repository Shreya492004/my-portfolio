import { useEffect, useRef } from "react";

export function useTypingEffect(phrases: string[], elementRef: React.RefObject<HTMLSpanElement | null>) {
  const phraseIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdxRef.current];

      if (!isDeletingRef.current) {
        el!.textContent = currentPhrase.substring(0, charIdxRef.current + 1);
        charIdxRef.current++;
        if (charIdxRef.current === currentPhrase.length) {
          isDeletingRef.current = true;
          timer = setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        el!.textContent = currentPhrase.substring(0, charIdxRef.current - 1);
        charIdxRef.current--;
        if (charIdxRef.current === 0) {
          isDeletingRef.current = false;
          phraseIdxRef.current = (phraseIdxRef.current + 1) % phrases.length;
        }
      }

      const speed = isDeletingRef.current ? 45 : 95;
      timer = setTimeout(typeLoop, speed);
    }

    typeLoop();
    return () => clearTimeout(timer);
  }, [phrases, elementRef]);
}