import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ExternalLink, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { EmbedItem, TopicData } from "@/data/clusters";

function getGallery(topic: TopicData): EmbedItem[] {
  return topic.gallery?.length ? topic.gallery : topic.embed ? [topic.embed] : [];
}

function getYTThumbnail(src: string): string | null {
  const m = src.match(/\/embed\/([A-Za-z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}

/* ──────────────────────────────────────────
   Tile mini-preview: shows collage of first
   1–4 gallery items as tile background.
   ────────────────────────────────────────── */
function TilePreview({ gallery }: { gallery: EmbedItem[] }) {
  if (!gallery.length) return null;

  const items = gallery.slice(0, 4);
  const single = items.length === 1;
  const two = items.length === 2;
  const multi = items.length >= 3;

  const renderThumb = (item: EmbedItem, key: number) => {
    if (item.type === "image") {
      return (
        <div key={key} className="relative w-full h-full overflow-hidden">
          <img
            src={item.src}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      );
    }
    if (item.type === "youtube") {
      const thumb = getYTThumbnail(item.src);
      return (
        <div key={key} className="relative w-full h-full overflow-hidden bg-navy-deep/90">
          {thumb && (
            <img
              src={thumb}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-navy-deep/70 border border-gold/60 flex items-center justify-center">
              <Play className="w-2 h-2 text-gold ml-0.5" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={key} className="relative w-full h-full bg-navy-deep/80 flex items-center justify-center">
        <ExternalLink className="w-3 h-3 text-gold/40" />
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {single && (
        <div className="absolute inset-0">
          {renderThumb(items[0], 0)}
        </div>
      )}
      {two && (
        <div className="absolute inset-0 grid grid-cols-2 gap-px">
          {items.map((item, i) => renderThumb(item, i))}
        </div>
      )}
      {multi && (
        <div
          className="absolute inset-0 grid gap-px"
          style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}
        >
          {items.map((item, i) => renderThumb(item, i))}
        </div>
      )}
      {/* Dark blue semi-transparent overlay so text is always legible */}
      <div className="absolute inset-0 bg-navy-deep/65" />
    </div>
  );
}

/* ──────────────────────────────────────────
   Lightbox collage thumbnail (object-contain so nothing is cropped)
   ────────────────────────────────────────── */
function CollageThumb({
  item,
  onClick,
  label,
}: {
  item: EmbedItem;
  onClick: () => void;
  label: string;
}) {
  if (item.type === "image") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative w-full h-full overflow-hidden group cursor-pointer bg-navy-deep/90"
      >
        <img
          src={item.src}
          alt={item.caption ?? label}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/30 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-6 h-6 border border-gold/60 bg-navy-deep/50 flex items-center justify-center">
            <ArrowUpRight className="w-3 h-3 text-gold" />
          </div>
        </div>
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-navy-deep/90 to-transparent">
            <p className="font-mono text-[0.42rem] uppercase tracking-[0.18em] text-gold/60 line-clamp-1">{item.caption}</p>
          </div>
        )}
      </button>
    );
  }
  if (item.type === "youtube") {
    const thumb = getYTThumbnail(item.src);
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative w-full h-full overflow-hidden group cursor-pointer bg-navy-deep/80"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={item.caption ?? label}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-gold/30">Playlist</span>
          </div>
        )}
        <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-navy-deep/40 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-navy-deep/60 border border-gold/50 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-200">
            <Play className="w-3.5 h-3.5 text-gold ml-0.5" />
          </div>
        </div>
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-navy-deep/90 to-transparent">
            <p className="font-mono text-[0.42rem] uppercase tracking-[0.18em] text-gold/60 line-clamp-1">{item.caption}</p>
          </div>
        )}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full h-full bg-navy-deep/50 flex flex-col items-center justify-center gap-1 group cursor-pointer hover:bg-navy-deep/80 transition-colors duration-200"
    >
      <ExternalLink className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
      <span className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-gold/30 group-hover:text-gold/60 transition-colors">
        {item.src.replace(/^https?:\/\//, "").split("/")[0]}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────
   Layout engine — 6-column grid
   Pattern: [span-3, span-3], [span-2, span-2, span-2], repeat
   ────────────────────────────────────────── */
type LayoutEntry =
  | { kind: "tile"; topicIndex: number; span: 2 | 3 | 4 }
  | { kind: "filler"; span: 2 | 3 | 4 };

function buildLayout(topics: TopicData[], wideSlug?: string): LayoutEntry[] {
  const entries: LayoutEntry[] = [];
  let pp = 0;

  for (let i = 0; i < topics.length; i++) {
    const isWide = pp >= 2 && topics[i].slug === wideSlug;
    if (pp < 2) {
      entries.push({ kind: "tile", topicIndex: i, span: 3 });
      pp = (pp + 1) % 5;
    } else if (isWide) {
      entries.push({ kind: "tile", topicIndex: i, span: 4 });
      pp += 2;
      if (pp >= 5) pp -= 5;
    } else {
      entries.push({ kind: "tile", topicIndex: i, span: 2 });
      pp = (pp + 1) % 5;
    }
  }

  if (pp === 1) entries.push({ kind: "filler", span: 3 });
  else if (pp === 3) entries.push({ kind: "filler", span: 4 });
  else if (pp === 4) entries.push({ kind: "filler", span: 2 });

  return entries;
}

const SPAN_CLASS: Record<number, string> = {
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

/* ──────────────────────────────────────────
   Tile height based on gallery size
   ────────────────────────────────────────── */
function tileMinHeight(count: number): number {
  if (count === 0) return 150;
  if (count === 1) return 185;
  if (count <= 3) return 205;
  return 225;
}

function ArchiveTile({
  topic,
  spanClass,
}: {
  topic: TopicData;
  index: number;
  spanClass: string;
}) {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"collage" | "expanded">("collage");
  const [mediaIndex, setMediaIndex] = useState(0);
  const gallery = useMemo(() => getGallery(topic), [topic]);
  const media = gallery[mediaIndex];
  const isMulti = gallery.length > 1;
  const hasMedia = gallery.length > 0;

  const openDialog = () => {
    setMediaIndex(0);
    setViewMode(isMulti ? "collage" : "expanded");
    setOpen(true);
  };

  const expandAt = (i: number) => {
    setMediaIndex(i);
    setViewMode("expanded");
  };

  const showCollage = isMulti && viewMode === "collage";

  /* Lightbox width adapts to media count */
  const dialogMaxW = !hasMedia
    ? "max-w-lg"
    : gallery.length >= 5
    ? "max-w-4xl"
    : "max-w-2xl";

  const minH = tileMinHeight(gallery.length);

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={`fancy-tile group/tile relative ${spanClass} overflow-hidden bg-paper border border-border hover:border-gold transition-all duration-500 ease-cinematic hover:-translate-y-0.5 fibers stipple text-left`}
        style={{ minHeight: `${minH}px` }}
      >
        {/* Background mini-preview */}
        <TilePreview gallery={gallery} />

        {/* Hover overlay tint */}
        <div className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500 bg-navy-deep/20 z-[1]" />

        {/* Content — always on top */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6" style={{ minHeight: `${minH}px` }}>
          <div className="flex items-start justify-end">
            <ArrowUpRight className={`w-4 h-4 transition-all duration-400 ${hasMedia ? "text-gold/70 group-hover/tile:text-gold" : "text-ink-soft group-hover/tile:text-gold"} group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5`} />
          </div>
          <div className="space-y-2 mt-auto">
            <h3 className={`font-display text-base md:text-lg leading-snug transition-colors duration-300 ${hasMedia ? "text-paper-contrast" : "group-hover/tile:text-paper-contrast"}`}>
              {topic.label}
            </h3>
            <p className={`font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-colors duration-300 line-clamp-2 ${hasMedia ? "text-paper-contrast-soft" : "text-ink-soft group-hover/tile:text-paper-contrast-soft"}`}>
              {topic.blurb}
            </p>
          </div>
        </div>

        <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover/tile:w-full z-10" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`${dialogMaxW} p-0 overflow-hidden bg-paper`}>
          {hasMedia ? (
            /* ── Split layout: left media + right text ── */
            <div className="grid md:grid-cols-[1fr,1.1fr]">
              {/* LEFT: media panel */}
              <div className="flex flex-col min-h-[200px] md:min-h-[440px] bg-navy-deep overflow-hidden">
                {showCollage ? (
                  /* COLLAGE GRID */
                  <div
                    className="flex-1 grid gap-px bg-navy-deep/60"
                    style={{
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridAutoRows: `${Math.max(90, Math.floor(440 / Math.ceil(gallery.length / 2)))}px`,
                    }}
                  >
                    {gallery.map((item, i) => (
                      <CollageThumb
                        key={`${item.type}-${item.src}-${i}`}
                        item={item}
                        onClick={() => expandAt(i)}
                        label={topic.label}
                      />
                    ))}
                  </div>
                ) : (
                  /* EXPANDED SINGLE VIEW */
                  <>
                    <div className="flex-1 relative overflow-hidden bg-navy-deep/95">
                      {media?.type === "youtube" && (
                        <iframe
                          src={media.src}
                          title={media.caption ?? topic.label}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 0 }}
                        />
                      )}
                      {media?.type === "image" && (
                        <img
                          src={media.src}
                          alt={media.caption ?? topic.label}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      )}
                      {media?.type === "link" && (
                        <iframe
                          src={media.src}
                          title={media.caption ?? topic.label}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 0 }}
                        />
                      )}
                      {!media && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-4xl text-gold/20 tracking-widest">—</span>
                        </div>
                      )}

                      {media?.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/30 to-transparent p-3 pointer-events-none">
                          <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-gold/55 line-clamp-2">
                            {media.caption}
                          </p>
                        </div>
                      )}

                      {isMulti && (
                        <button
                          type="button"
                          onClick={() => setViewMode("collage")}
                          className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-navy-deep/70 border border-gold/30 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-gold hover:bg-gold/10 transition-colors duration-200 pointer-events-auto"
                        >
                          <ChevronLeft className="w-3 h-3" /> All
                        </button>
                      )}

                      {media?.type === "link" && (
                        <a
                          href={media.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 bg-navy-deep/70 border border-gold/40 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-gold hover:bg-gold/10 transition-colors duration-200"
                        >
                          Open <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {isMulti && (
                      <div className="shrink-0 flex items-center justify-center gap-2 py-2.5 bg-navy-deep/80 border-t border-gold/10">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setMediaIndex(i)}
                            className={`rounded-full transition-all duration-200 ${
                              i === mediaIndex
                                ? "w-4 h-1.5 bg-gold"
                                : "w-1.5 h-1.5 bg-gold/25 hover:bg-gold/50"
                            }`}
                            aria-label={`Go to item ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* RIGHT: text panel */}
              <div className="p-7 md:p-9 flex flex-col justify-center overflow-y-auto max-h-[440px] md:max-h-none">
                <DialogTitle className="font-display text-2xl md:text-3xl leading-tight text-ink mb-2">
                  {topic.label}
                </DialogTitle>
                <p className="font-accent italic text-base text-ink-soft mb-5">{topic.blurb}</p>
                <div className="h-px bg-border mb-5" />
                <DialogDescription asChild>
                  <div className="text-sm md:text-base leading-relaxed text-ink-soft font-display">
                    {topic.detail.split("\n").map((p, i) => (
                      <p key={i} className={i > 0 ? "mt-3" : ""}>
                        {p}
                      </p>
                    ))}
                  </div>
                </DialogDescription>
              </div>
            </div>
          ) : (
            /* ── Text-only layout (no media) ── */
            <div className="p-8 md:p-10 max-h-[80vh] overflow-y-auto">
              <DialogTitle className="font-display text-2xl md:text-3xl leading-tight text-ink mb-2">
                {topic.label}
              </DialogTitle>
              <p className="font-accent italic text-base text-ink-soft mb-5">{topic.blurb}</p>
              <div className="h-px bg-border mb-5" />
              <DialogDescription asChild>
                <div className="text-sm md:text-base leading-relaxed text-ink-soft font-display">
                  {topic.detail.split("\n").map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-3" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function FillerTile({ spanClass }: { spanClass: string }) {
  return (
    <div
      className={`relative ${spanClass} border border-dashed`}
      style={{ minHeight: "150px", borderColor: "hsl(43 60% 55% / 0.18)" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 3vw, 42px)",
            color: "hsl(43 60% 55% / 0.32)",
            letterSpacing: "0.3em",
            lineHeight: 1,
          }}
        >
          ...
        </span>
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "8px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "hsl(43 60% 55% / 0.22)",
          }}
        >
          Future endeavors
        </span>
      </div>
    </div>
  );
}

export function ArchiveMosaic({
  topics,
  wideSlug,
}: {
  topics: TopicData[];
  wideSlug?: string;
}) {
  const layout = buildLayout(topics, wideSlug);
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-6 gap-3 md:gap-3.5">
        {layout.map((entry, i) => {
          const spanClass = SPAN_CLASS[entry.span] ?? "col-span-2";
          if (entry.kind === "tile") {
            return (
              <ArchiveTile
                key={topics[entry.topicIndex].slug}
                topic={topics[entry.topicIndex]}
                index={entry.topicIndex}
                spanClass={spanClass}
              />
            );
          }
          return <FillerTile key={`filler-${i}`} spanClass={spanClass} />;
        })}
      </div>
    </section>
  );
}
