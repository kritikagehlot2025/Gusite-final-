import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const FADE_IN = 180;
const HOLD = 420;
const FADE_OUT = 260;
const TOTAL = FADE_IN + HOLD + FADE_OUT;

type Phase = "idle" | "in" | "hold" | "out";

export function PageTransition() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("in");
    timers.current.push(
      window.setTimeout(() => {
        prevPath.current = pathname;
        setPhase("hold");
      }, FADE_IN),
      window.setTimeout(() => setPhase("out"), FADE_IN + HOLD),
      window.setTimeout(() => setPhase("idle"), TOTAL),
    );
  }, [pathname]);

  const visible = phase !== "idle";
  const shellOpacity = phase === "out" ? 0.92 : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{
        opacity: visible ? shellOpacity : 0,
        visibility: visible ? "visible" : "hidden",
        transition: phase === "out"
          ? `opacity ${FADE_OUT}ms cubic-bezier(0.22,1,0.36,1)`
          : `opacity ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: 1,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[42vh] overflow-hidden">
        <div
          style={{
            transform: `translateY(${phase === "out" ? -8 : 0}%)`,
            transition: `transform ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1)`,
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[22vh] bg-[radial-gradient(circle_at_50%_0%,hsl(43_72%_62%/0.95)_0%,hsl(43_72%_62%/0.75)_18%,hsl(43_72%_62%/0.18)_48%,transparent_72%)] blur-[2px]" />
          <div className="absolute inset-x-[14%] top-[5vh] h-[16vh] bg-[radial-gradient(circle_at_50%_0%,hsl(43_72%_62%/0.95)_0%,hsl(43_72%_62%/0.7)_22%,transparent_74%)] blur-[1px]" />
          <div className="absolute inset-x-[24%] top-[2vh] h-[12vh] bg-[radial-gradient(circle_at_50%_0%,hsl(43_72%_62%/0.92)_0%,hsl(43_72%_62%/0.55)_25%,transparent_78%)] blur-[0.5px]" />
          <div className="absolute inset-x-0 top-0 h-[10vh] bg-[linear-gradient(to_bottom,hsl(43_72%_62%/0.32),transparent)]" />
          <div
            className="absolute left-1/2 top-[10vh] -translate-x-1/2"
            style={{
              color: "hsl(43 78% 66%)",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "clamp(3.25rem, 6vw, 6rem)",
              letterSpacing: "0.35em",
              textIndent: "0.35em",
              textShadow: "0 0 28px hsl(43 78% 66% / 0.55), 0 0 72px hsl(43 78% 66% / 0.22)",
              opacity: phase === "idle" ? 0 : 1,
              transform: `translateY(${phase === "in" ? 10 : phase === "out" ? -18 : 0}px) scale(${phase === "out" ? 0.95 : 1})`,
              transition: `transform ${FADE_IN}ms cubic-bezier(0.22,1,0.36,1), opacity ${FADE_IN}ms ease`,
            }}
          >
            GG
          </div>
          <div className="absolute left-[18%] top-[16vh] h-5 w-5 rounded-full bg-[hsl(43_72%_62%/0.8)] blur-[2px] animate-[drip_1.2s_ease-in-out_infinite]" />
          <div className="absolute left-[32%] top-[12vh] h-3.5 w-3.5 rounded-full bg-[hsl(43_72%_62%/0.72)] blur-[1.5px] animate-[drip_1.45s_ease-in-out_infinite]" />
          <div className="absolute right-[28%] top-[14vh] h-4.5 w-4.5 rounded-full bg-[hsl(43_72%_62%/0.78)] blur-[2px] animate-[drip_1.1s_ease-in-out_infinite]" />
          <div className="absolute right-[18%] top-[18vh] h-3 w-3 rounded-full bg-[hsl(43_72%_62%/0.65)] blur-[1px] animate-[drip_1.6s_ease-in-out_infinite]" />
          <div className="absolute inset-x-0 top-[22vh] h-[22vh] bg-[radial-gradient(circle_at_50%_0%,hsl(43_72%_62%/0.3)_0%,transparent_60%)]" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[28vh] bg-[linear-gradient(to_top,transparent,rgba(0,0,0,0.14))]" />
    </div>
  );
}
