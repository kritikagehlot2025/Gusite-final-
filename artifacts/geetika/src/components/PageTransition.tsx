import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Standard navigation timing
const DRIP_TIME = 600;
const HOLD_TIME = 520;
const LIFT_TIME = 700;
const FADE_TIME = 400;

// First-render intro: slower, more dramatic
const INTRO_DRIP = 1100;
const INTRO_HOLD = 800;
const INTRO_LIFT = 950;
const INTRO_FADE = 500;

// Decelerating goop: fast start, slow settle
const EASE_OUT_DECEL = "cubic-bezier(0.22, 1, 0.36, 1)";

// Phases:
//   idle       — panel at -180%, opacity 0, invisible, ready for next
//   dripping   — panel drops from -180% to 0%, opacity fades in
//   covered    — panel at 0%, fully visible, holds while page navigates
//   lifting    — panel drops from 0% to +180%, fully visible
//   fading     — panel stays at +180%, opacity fades to 0
//   idle       — panel snaps to -180%, opacity already 0, no glitch
type Phase = "idle" | "dripping" | "covered" | "lifting" | "fading";

const PAGE_LABELS: Record<string, string> = {
  "/": "Geetika Gehlot",
  "/about": "About",
  "/academics": "Academics",
  "/works": "Works",
  "/vault": "CV & Resume",
  "/contact": "Contact",
  "/dashboard": "Pages",
};

const DRIP_SVG_ELLIPSES = [
  [18, 92, 26, 52], [75, 118, 38, 85], [148, 86, 22, 46],
  [218, 122, 42, 92], [285, 84, 18, 36], [355, 114, 34, 74],
  [422, 96, 26, 56], [498, 130, 48, 98], [568, 88, 22, 50],
  [638, 118, 38, 80], [705, 85, 20, 42], [772, 110, 32, 68],
  [840, 124, 40, 86], [905, 84, 20, 44], [958, 108, 30, 65],
  [992, 86, 22, 46],
];

const DRIP_SVG_ELLIPSES_TOP = [
  [18, 108, 26, 52], [75, 82, 38, 85], [148, 114, 22, 46],
  [218, 78, 42, 92], [285, 116, 18, 36], [355, 86, 34, 74],
  [422, 104, 26, 56], [498, 70, 48, 98], [568, 112, 22, 50],
  [638, 82, 38, 80], [705, 115, 20, 42], [772, 90, 32, 68],
  [840, 76, 40, 86], [905, 116, 20, 44], [958, 92, 30, 65],
  [992, 114, 22, 46],
];

export function PageTransition() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [firstRender, setFirstRender] = useState(true);
  const [destLabel, setDestLabel] = useState("");
  const [isHomeDest, setIsHomeDest] = useState(false);
  const [shrinkLabel, setShrinkLabel] = useState(false);
  const timers = useRef<number[]>([]);
  const pendingDest = useRef<string | null>(null);

  // Pick timing based on whether this is the first-load intro
  const isIntro = firstRender;
  const drip = isIntro ? INTRO_DRIP : DRIP_TIME;
  const hold = isIntro ? INTRO_HOLD : HOLD_TIME;
  const lift = isIntro ? INTRO_LIFT : LIFT_TIME;
  const fade = isIntro ? INTRO_FADE : FADE_TIME;

  const runTransition = useCallback((destPathname: string, doReload = false) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setFirstRender(false);

    const label =
      PAGE_LABELS[destPathname] ??
      (destPathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");

    setDestLabel(label);
    setIsHomeDest(destPathname === "/");
    setShrinkLabel(false);
    setPhase("dripping");

    const d = DRIP_TIME;
    const h = HOLD_TIME;
    const l = LIFT_TIME;
    const f = FADE_TIME;

    timers.current.push(
      window.setTimeout(() => {
        setPhase("covered");
        if (doReload) {
          window.setTimeout(() => window.location.reload(), 60);
        } else if (pendingDest.current && pendingDest.current !== lastPath.current) {
          navigate(pendingDest.current);
        }
      }, d),
      window.setTimeout(() => {
        lastPath.current = destPathname;
        setShrinkLabel(true);
        setPhase("lifting");
      }, d + h),
      window.setTimeout(() => setPhase("fading"), d + h + l),
      window.setTimeout(() => {
        setPhase("idle");
        setShrinkLabel(false);
        pendingDest.current = null;
      }, d + h + l + f),
    );
  }, [navigate]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") ||
        href.startsWith("tel:") || anchor.hasAttribute("download") || anchor.target === "_blank"
      ) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      if (href.startsWith("#")) return;
      if (!href.startsWith("/")) return;
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("gg-force-nav", { detail: { to: href, reload: false } })
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { to, reload } = (e as CustomEvent<{ to: string; reload?: boolean }>).detail;
      if (to === pathname) {
        runTransition(to, reload ?? false);
        return;
      }
      pendingDest.current = to;
      runTransition(to, false);
    };
    window.addEventListener("gg-force-nav", handler);
    return () => window.removeEventListener("gg-force-nav", handler);
  }, [pathname, runTransition]);

  useEffect(() => {
    if (firstRender) {
      const label =
        PAGE_LABELS[pathname] ??
        (pathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home");
      setDestLabel(label);
      setIsHomeDest(pathname === "/");
      setShrinkLabel(false);
      setPhase("idle");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("dripping"));
      });

      timers.current = [
        window.setTimeout(() => setPhase("covered"), drip),
        window.setTimeout(() => {
          lastPath.current = pathname;
          setShrinkLabel(true);
          setPhase("lifting");
        }, drip + hold),
        window.setTimeout(() => setPhase("fading"), drip + hold + lift),
        window.setTimeout(() => {
          setPhase("idle");
          setShrinkLabel(false);
          setFirstRender(false);
        }, drip + hold + lift + fade),
      ];
      return () => timers.current.forEach(window.clearTimeout);
    }
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
  }, [pathname, firstRender, drip, hold, lift, fade]);

  // --- Motion ---
  //
  //  Panel position:
  //    idle      : -180% (above viewport, invisible)
  //    dripping  : 0%   (centered, dropped down from above)
  //    covered   : 0%   (holding still)
  //    lifting   : +180% (dropped down past bottom)
  //    fading    : +180% (holding still, fading out)
  //    idle      : -180% (snapped back, opacity already 0)
  //
  //  Wrapper opacity:
  //    idle      : 0
  //    dripping  : 1 (with fade-in transition)
  //    covered   : 1
  //    lifting   : 1
  //    fading    : 0 (with fade-out transition — lasts long enough!)
  //    idle      : 0 (already 0, no visual change when snapping)

  const panelTranslateY =
    phase === "idle" ? -180
    : phase === "dripping" ? 0
    : phase === "covered" ? 0
    : 180;

  const wrapperOpacity = phase === "idle" || phase === "fading" ? 0 : 1;

  const transformTransition =
    phase === "dripping"
      ? `transform ${drip}ms ${EASE_OUT_DECEL}`
      : phase === "lifting"
      ? `transform ${lift}ms ${EASE_OUT_DECEL}`
      : "none";

  const wrapperOpacityTransition =
    phase === "dripping"
      ? `opacity ${drip * 0.6}ms ease`
      : phase === "lifting"
      ? `opacity ${fade}ms ease`
      : phase === "fading"
      ? `opacity ${fade}ms ease`
      : "none";

  const labelOpacity = phase === "covered" && !shrinkLabel ? 1 : 0;

  const labelTransform =
    shrinkLabel && isHomeDest
      ? "translate(calc(-50% - 28vw), calc(-50% - 22vh)) scale(0.18)"
      : "translate(-50%, -50%) scale(1)";

  const labelTransition =
    phase === "lifting"
      ? `opacity ${Math.round(lift * 0.5)}ms ease, transform ${Math.round(lift * 0.85)}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : phase === "covered"
      ? "opacity 200ms ease 100ms"
      : "none";

  // Home intro gets a unique extra element — a thin decorative line
  const showIntroLine = isHomeDest && isIntro;

  return (
    <>
      <svg
        aria-hidden
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", zIndex: -1 }}
      >
        <defs>
          <filter id="gg-slime-goo" x="-2%" y="-10%" width="104%" height="125%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            />
          </filter>
        </defs>
      </svg>

      {/* Outer wrapper — controls opacity. Always mounted. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{
          zIndex: 9999,
          opacity: wrapperOpacity,
          transition: wrapperOpacityTransition,
        }}
      >
        {/* Inner panel — moves with transform. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${panelTranslateY}%)`,
            transition: transformTransition,
            willChange: "transform",
            opacity: 1,
          }}
        >
          {/* Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(175deg, hsl(220 52% 5%) 0%, hsl(220 48% 4%) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 45% at 50% 50%, hsl(43 60% 14% / 0.5) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Text label */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              opacity: labelOpacity,
              transform: labelTransform,
              transition: labelTransition,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.55rem",
              pointerEvents: "none",
            }}
          >
            {isHomeDest ? (
              <>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2.4rem, 7.5vw, 5.8rem)",
                    fontWeight: 600,
                    color: "hsl(43 78% 68%)",
                    letterSpacing: "0.03em",
                    lineHeight: 1,
                    textShadow:
                      "0 0 50px hsl(43 78% 55% / 0.4), 0 0 100px hsl(43 65% 42% / 0.22)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Geetika Gehlot
                </span>
                {showIntroLine && (
                  <span
                    style={{
                      width: "clamp(40px, 8vw, 80px)",
                      height: 1,
                      background: "hsl(43 60% 55% / 0.4)",
                      marginTop: "clamp(0.8rem, 2vh, 1.4rem)",
                      transition: "width 800ms ease 400ms",
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "hsl(43 60% 55% / 0.75)",
                    letterSpacing: "0.1em",
                    marginTop: "clamp(2.6rem, 8vh, 4.5rem)",
                  }}
                >
                  Home
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.9rem, 5.5vw, 4.2rem)",
                    fontWeight: 600,
                    color: "hsl(43 72% 64%)",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                    textShadow: "0 0 36px hsl(43 78% 52% / 0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {destLabel}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "hsl(43 60% 55% / 0.75)",
                    letterSpacing: "0.1em",
                    marginTop: "clamp(2.6rem, 8vh, 4.5rem)",
                  }}
                >
                  Geetika Gehlot
                </span>
              </>
            )}
          </div>

          {/* Top goop */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: -130,
              left: 0,
              right: 0,
              width: "100%",
              height: 190,
              display: "block",
              overflow: "visible",
            }}
          >
            <g filter="url(#gg-slime-goo)" fill="hsl(43 82% 50%)">
              <rect x="-20" y="140" width="1040" height="60" />
              {DRIP_SVG_ELLIPSES_TOP.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
              ))}
            </g>
          </svg>

          {/* Bottom goop */}
          <svg
            aria-hidden
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: -130,
              left: 0,
              right: 0,
              width: "100%",
              height: 190,
              display: "block",
              overflow: "visible",
            }}
          >
            <g filter="url(#gg-slime-goo)" fill="hsl(43 82% 50%)">
              <rect x="-20" y="0" width="1040" height="60" />
              {DRIP_SVG_ELLIPSES.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
