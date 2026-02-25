import { useState, useEffect, useRef } from 'react';

export interface TextTypeProps {
  /** Strings to type in sequence (cycles through) */
  text?: string[];
  /** Alternative: single string to type once */
  texts?: string[];
  /** Typing speed in ms per character */
  typingSpeed?: number;
  /** Pause at end of each string before deleting (ms) */
  pauseDuration?: number;
  /** Speed when deleting (ms per character) */
  deletingSpeed?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Cursor character */
  cursorCharacter?: string;
  /** Cursor blink duration in seconds */
  cursorBlinkDuration?: number;
  /** Use random speed between min/max per keystroke */
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  /** Optional className for the wrapper */
  className?: string;
  /** Optional tag for wrapper (default span) */
  as?: 'span' | 'div' | 'p';
  /** If false, type once and stop (no delete/cycle). Default true. */
  loop?: boolean;
}

export default function TextType({
  text = [],
  texts = [],
  typingSpeed = 75,
  pauseDuration = 1500,
  deletingSpeed = 50,
  showCursor = true,
  cursorCharacter = '_',
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  className = '',
  as: Wrapper = 'span',
  loop = true,
}: TextTypeProps) {
  const phrases = text.length > 0 ? text : texts;
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const charIndexRef = useRef(0);
  const phraseIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Typing effect: single phrase, type once (loop=false) or multi-phrase cycle
  useEffect(() => {
    if (phrases.length === 0) return;

    charIndexRef.current = 0;
    phraseIndexRef.current = 0;
    isDeletingRef.current = false;
    setDisplayText('');

    const speed = () =>
      variableSpeedEnabled
        ? variableSpeedMin + Math.random() * (variableSpeedMax - variableSpeedMin)
        : typingSpeed;

    const tick = () => {
      const currentPhrase = phrases[phraseIndexRef.current] ?? '';
      const isLastPhrase = phraseIndexRef.current >= phrases.length - 1;

      if (isDeletingRef.current) {
        // Deleting
        if (charIndexRef.current <= 0) {
          isDeletingRef.current = false;
          if (isLastPhrase && !loop) return;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          charIndexRef.current = 0;
          timeoutRef.current = setTimeout(tick, typingSpeed);
          return;
        }
        charIndexRef.current -= 1;
        setDisplayText((phrases[phraseIndexRef.current] ?? '').slice(0, charIndexRef.current));
        timeoutRef.current = setTimeout(tick, deletingSpeed);
        return;
      }

      // Typing
      if (charIndexRef.current >= currentPhrase.length) {
        // Reached end of current phrase
        if (isLastPhrase && !loop) return;
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          charIndexRef.current = currentPhrase.length;
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        }, pauseDuration);
        return;
      }

      charIndexRef.current += 1;
      setDisplayText(currentPhrase.slice(0, charIndexRef.current));
      timeoutRef.current = setTimeout(tick, speed());
    };

    timeoutRef.current = setTimeout(tick, speed());
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases.join(','), typingSpeed, pauseDuration, deletingSpeed, variableSpeedEnabled, variableSpeedMin, variableSpeedMax, loop]);

  useEffect(() => {
    if (!showCursor) return;
    blinkRef.current = setInterval(() => {
      setCursorVisible((v) => !v);
    }, cursorBlinkDuration * 1000);
    return () => {
      if (blinkRef.current) clearInterval(blinkRef.current);
    };
  }, [showCursor, cursorBlinkDuration]);

  if (phrases.length === 0) return <Wrapper className={className} />;

  return (
    <Wrapper className={className}>
      {displayText}
      {showCursor && (
        <span
          className="text-type-cursor"
          style={{ opacity: cursorVisible ? 1 : 0 }}
          aria-hidden
        >
          {cursorCharacter}
        </span>
      )}
    </Wrapper>
  );
}
