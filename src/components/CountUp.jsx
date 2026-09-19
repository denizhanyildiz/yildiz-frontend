import React, { useEffect, useRef, useState } from 'react';

// "+20", "10+", "%98" gibi değerlerdeki sayıyı görününce 0'dan artırır; "7/24" gibi değerleri olduğu gibi bırakır.
export default function CountUp({ value }) {
  const m = /^(\D*)(\d+)(\D*)$/.exec(value);
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!m) return;
    const target = Number(m[2]);
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduce || !('IntersectionObserver' in window)) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  if (!m) return <span>{value}</span>;
  return <span ref={ref}>{m[1]}{n}{m[3]}</span>;
}
