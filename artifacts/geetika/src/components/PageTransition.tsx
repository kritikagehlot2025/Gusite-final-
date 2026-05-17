import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const TRANSITION_MS = 950;

export function PageTransition() {
  const { pathname } = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (pathname === displayPath) return;
    setTransitioning(true);
    const swapTimer = window.setTimeout(() => {
      setDisplayPath(pathname);
      window.setTimeout(() => setTransitioning(false), 80);
    }, TRANSITION_MS * 0.55);
    return () => window.clearTimeout(swapTimer);
  }, [pathname, displayPath]);

  const styles = useMemo(
    () => ({
      ["--transition-ms" as string]: `${TRANSITION_MS}ms`,
    }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      <div
        className={`page-transition-shell ${transitioning ? "page-transition-shell-active" : "page-transition-shell-idle"}`}
        style={styles}
      >
        <div className="page-transition-ribbon page-transition-ribbon-a" />
        <div className="page-transition-ribbon page-transition-ribbon-b" />
        <div className="page-transition-ribbon page-transition-ribbon-c" />
        <div className="page-transition-core">
          <span>GG</span>
        </div>
      </div>
      <div className={`page-transition-wash ${transitioning ? "page-transition-wash-active" : ""}`} />
    </div>
  );
}
