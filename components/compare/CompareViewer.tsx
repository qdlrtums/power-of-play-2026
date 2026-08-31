"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Side-by-side viewer for the two designs.
 *
 * Both frames are same-origin, so this can do the two things a pair of browser
 * windows cannot: drive them from one set of controls, and keep their scroll
 * positions in step. Scroll is synced *proportionally* (fraction of the page
 * scrolled, not pixels) because the designs are different heights — matching
 * raw offsets would drift further apart the further down you went.
 */

const PAGES = [
  { label: "Home", v1: "/v1", v2: "/" },
  { label: "About", v1: "/v1/about", v2: "/about" },
  { label: "Contact", v1: "/v1/contact", v2: "/contact" },
] as const;

const WIDTHS = [
  { label: "Fit", value: 0 },
  { label: "390", value: 390 },
  { label: "768", value: 768 },
  { label: "1280", value: 1280 },
  { label: "1440", value: 1440 },
] as const;

type Side = "v1" | "v2";

export function CompareViewer() {
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(0);
  const [sync, setSync] = useState(true);
  const [stacked, setStacked] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const frames = useRef<Record<Side, HTMLIFrameElement | null>>({ v1: null, v2: null });
  const [box, setBox] = useState({ w: 0, h: 0 });

  /**
   * Which frame is currently driving the other, and when it last did.
   *
   * Mirroring a scroll makes the mirrored frame emit its own scroll event, so
   * without a guard the two would drive each other forever. The guard is a
   * timestamp rather than a flag cleared on the next frame: `requestAnimation-
   * Frame` does not run in a hidden or backgrounded tab, and a flag that never
   * clears leaves the sync permanently dead. A stale timestamp simply expires.
   */
  const driver = useRef<{ side: Side; at: number } | null>(null);

  /** Read inside the scroll listeners, which are attached once per frame load
   *  and would otherwise capture whatever `sync` was at that moment. */
  const syncing = useRef(sync);
  useEffect(() => {
    syncing.current = sync;
  }, [sync]);

  // The scale factor depends on how much room one column actually has, which
  // changes with the window and with the stacked toggle.
  //
  // Measured straight off the element rather than from `entry.contentRect`,
  // and measured once on mount before any observer has had a chance to fire:
  // ResizeObserver callbacks are throttled or suppressed outright while a
  // window is offscreen, and a viewer that renders nothing at all until an
  // observer fires is a viewer that is blank exactly when someone has it in a
  // background tab. The observer is the enhancement, not the source of truth.
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;

    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Below this there is no room for two columns, so it falls back to stacked
  // and the toggle is hidden rather than offering a choice that cannot render.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setStacked(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const columns = stacked ? 1 : 2;
  const gap = 16;
  const colW = Math.max(0, (box.w - gap * (columns - 1)) / columns);
  const colH = stacked ? Math.max(0, (box.h - gap) / 2) : box.h;

  // `Fit` renders the frame at its own column width — a real responsive
  // reading. A fixed width is rendered at that width and scaled down to fit,
  // which is the only way to see a 1440px layout inside a 700px column.
  const frameW = width === 0 ? colW : width;
  const scale = width === 0 ? 1 : Math.min(1, colW / width);
  const frameH = scale > 0 ? colH / scale : colH;

  const onFrameLoad = useCallback(
    (side: Side) => () => {
      const other: Side = side === "v1" ? "v2" : "v1";
      const win = frames.current[side]?.contentWindow;
      if (!win) return;

      win.addEventListener(
        "scroll",
        () => {
          if (!syncing.current) return;

          // Ignore an event that is this frame being mirrored *into*.
          const now = performance.now();
          if (driver.current && driver.current.side !== side && now - driver.current.at < 150) {
            return;
          }
          driver.current = { side, at: now };

          const travel = win.document.documentElement.scrollHeight - win.innerHeight;
          if (travel <= 0) return;
          const fraction = win.scrollY / travel;

          const target = frames.current[other]?.contentWindow;
          if (!target) return;
          const targetTravel =
            target.document.documentElement.scrollHeight - target.innerHeight;
          if (targetTravel <= 0) return;

          // Proportional, not absolute: the two designs are different heights,
          // so matching raw pixel offsets would drift further apart the
          // further down the page you went.
          target.scrollTo({ top: fraction * targetTravel, behavior: "instant" });
        },
        { passive: true },
      );
    },
    [],
  );

  const current = PAGES[page];

  return (
    <>
      <header className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 border-b border-hairline-dark px-4 py-3 sm:px-6">
        <p className="v2-label mr-auto text-paper">
          Power of Play <span className="text-ink-faint">/</span> design comparison
        </p>

        <Group label="Page">
          {PAGES.map((p, i) => (
            <Chip key={p.label} active={i === page} onClick={() => setPage(i)}>
              {p.label}
            </Chip>
          ))}
        </Group>

        <Group label="Width">
          {WIDTHS.map((w) => (
            <Chip key={w.label} active={w.value === width} onClick={() => setWidth(w.value)}>
              {w.label}
            </Chip>
          ))}
        </Group>

        <Group label="Scroll">
          <Chip active={sync} onClick={() => setSync((v) => !v)} pressed>
            Synced
          </Chip>
        </Group>

        <Group label="Layout" className="hidden lg:flex">
          <Chip active={!stacked} onClick={() => setStacked(false)}>
            Side by side
          </Chip>
          <Chip active={stacked} onClick={() => setStacked(true)}>
            Stacked
          </Chip>
        </Group>
      </header>

      <div className="min-h-0 flex-1 p-4">
        <div
          ref={stage}
          className={cn("grid h-full w-full gap-4", stacked ? "grid-rows-2" : "grid-cols-2")}
        >
          {(["v1", "v2"] as const).map((side) => (
            <Pane
              key={side}
              side={side}
              title={side === "v1" ? "Previous design" : "Live site"}
              href={side === "v1" ? current.v1 : current.v2}
              frameW={frameW}
              frameH={frameH}
              scale={scale}
              fitted={width === 0}
              onLoad={onFrameLoad(side)}
              register={(el) => {
                frames.current[side] = el;
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Group({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="v2-label hidden text-ink-faint sm:inline">{label}</span>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  pressed = false,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  /** Toggle rather than a choice within a set — announced with aria-pressed. */
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed ? active : undefined}
      aria-current={!pressed && active ? "true" : undefined}
      className={cn(
        "v2-label cursor-pointer rounded-[var(--radius-pill)] px-3 py-2 transition-colors duration-200",
        active
          ? "bg-green-400 text-obsidian"
          : "bg-obsidian-2 text-paper-dim hover:bg-hairline-dark hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}

function Pane({
  side,
  title,
  href,
  frameW,
  frameH,
  scale,
  fitted,
  onLoad,
  register,
}: {
  side: Side;
  title: string;
  href: string;
  frameW: number;
  frameH: number;
  scale: number;
  fitted: boolean;
  onLoad: () => void;
  register: (el: HTMLIFrameElement | null) => void;
}) {
  return (
    <section
      aria-label={title}
      className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[var(--radius-block)] border border-hairline-dark bg-obsidian-2"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-hairline-dark px-3 py-2">
        <p className="v2-label truncate text-paper">
          <span className={cn("mr-2 inline-block h-2 w-2 rounded-[var(--radius-pill)]", side === "v2" ? "bg-green-400" : "bg-paper-dim")} />
          {title}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="v2-label shrink-0 text-paper-dim transition-colors duration-200 hover:text-green-400"
        >
          {href} ↗
        </a>
      </div>

      <div className="grid min-h-0 flex-1 place-items-start justify-center overflow-hidden bg-paper">
        {frameW > 0 && (
          <iframe
            ref={register}
            title={title}
            src={href}
            onLoad={onLoad}
            style={{
              width: frameW,
              height: frameH,
              transform: fitted ? undefined : `scale(${scale})`,
              transformOrigin: "top center",
            }}
            className="border-0"
          />
        )}
      </div>
    </section>
  );
}
