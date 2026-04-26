"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Door data ────────────────────────────────────────────────────────────────

interface Door {
  id: string;
  name: string;
  vendor: string;
  material: string;
  priceRange: string;
  description: string;
}

const DOORS: Door[] = [
  {
    id: "classic-white",
    name: "Classic Raised Panel",
    vendor: "Clopay",
    material: "Insulated Steel",
    priceRange: "$800–$1,200",
    description: "Traditional raised-panel design in bright white with R-6 insulation.",
  },
  {
    id: "carriage-house",
    name: "Carriage House",
    vendor: "Wayne Dalton",
    material: "Composite Wood",
    priceRange: "$1,500–$2,500",
    description: "Rustic carriage-house aesthetic with decorative strap hinges and handles.",
  },
  {
    id: "modern-black",
    name: "Modern Flush",
    vendor: "Overhead Door",
    material: "Aluminum",
    priceRange: "$2,000–$3,500",
    description: "Sleek matte-black aluminum panels — ideal for contemporary architecture.",
  },
  {
    id: "glass-aluminum",
    name: "Full-View Glass",
    vendor: "Amarr",
    material: "Aluminum & Tempered Glass",
    priceRange: "$2,500–$4,000",
    description: "Floor-to-ceiling tempered glass in aluminum frames. Maximises natural light.",
  },
  {
    id: "rustic-wood",
    name: "Rustic Cedar",
    vendor: "Clopay",
    material: "Real Cedar",
    priceRange: "$3,000–$5,000",
    description: "Authentic cedar with natural wood grain — hand-crafted artisan look.",
  },
  {
    id: "steel-sandstone",
    name: "Coachman Steel",
    vendor: "Amarr",
    material: "Insulated Steel",
    priceRange: "$1,200–$1,800",
    description: "Sandstone-finish insulated steel with a row of decorative windows.",
  },
];

// ─── SVG door components ──────────────────────────────────────────────────────
// Each component accepts a `uid` prop appended to gradient/pattern IDs to
// prevent collisions when the same door appears in both the sidebar and overlay.

function ClassicWhiteDoor({ uid }: { uid: string }) {
  const g = `cwg-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dcdcdc" />
          <stop offset="50%" stopColor="#f6f6f6" />
          <stop offset="100%" stopColor="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={0} y={i * 40} width={200} height={40} fill="none" stroke="#b0b0b0" strokeWidth={1} />
          <rect x={6} y={i * 40 + 5} width={87} height={30} rx={2} fill="#e4e4e4" stroke="#c4c4c4" strokeWidth={0.8} />
          <rect x={107} y={i * 40 + 5} width={87} height={30} rx={2} fill="#e4e4e4" stroke="#c4c4c4" strokeWidth={0.8} />
          <line x1={7} y1={i * 40 + 6} x2={7} y2={i * 40 + 34} stroke="#cacaca" strokeWidth={0.6} />
          <line x1={92} y1={i * 40 + 6} x2={92} y2={i * 40 + 34} stroke="#f0f0f0" strokeWidth={0.6} />
          <line x1={108} y1={i * 40 + 6} x2={108} y2={i * 40 + 34} stroke="#cacaca" strokeWidth={0.6} />
          <line x1={193} y1={i * 40 + 6} x2={193} y2={i * 40 + 34} stroke="#f0f0f0" strokeWidth={0.6} />
        </g>
      ))}
    </svg>
  );
}

function CarriageHouseDoor({ uid }: { uid: string }) {
  const g = `chg-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08830" />
          <stop offset="50%" stopColor="#c89238" />
          <stop offset="100%" stopColor="#a87020" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[25, 50, 75, 100, 125, 150, 175].map((x) => (
        <line key={x} x1={x} y1={0} x2={x} y2={160} stroke="#8a5c18" strokeWidth={1.5} />
      ))}
      <rect x={0} y={0} width={200} height={5} fill="#7a4e10" />
      <rect x={0} y={76} width={200} height={5} fill="#7a4e10" />
      <rect x={0} y={155} width={200} height={5} fill="#7a4e10" />
      <path d="M 5,81 Q 100,32 195,81" fill="none" stroke="#7a4e10" strokeWidth={3} />
      {[26, 118].map((y) => (
        <g key={y}>
          <rect x={0} y={y} width={22} height={4} rx={2} fill="#2a2a2a" />
          <circle cx={8} cy={y + 2} r={3} fill="#1a1a1a" />
          <rect x={178} y={y} width={22} height={4} rx={2} fill="#2a2a2a" />
          <circle cx={192} cy={y + 2} r={3} fill="#1a1a1a" />
        </g>
      ))}
      <rect x={88} y={112} width={24} height={7} rx={3.5} fill="#222" />
    </svg>
  );
}

function ModernBlackDoor({ uid: _uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="160" fill="#1c1c1c" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={1} y={i * 40 + 1} width={198} height={38} fill="#212121" />
          <rect x={1} y={i * 40 + 39} width={198} height={1} fill="#141414" />
          {[10, 20, 30].map((j) => (
            <line key={j} x1={1} y1={i * 40 + j} x2={199} y2={i * 40 + j} stroke="#262626" strokeWidth={0.5} />
          ))}
        </g>
      ))}
      <rect x={98} y={0} width={4} height={160} fill="#111" />
    </svg>
  );
}

function GlassAluminumDoor({ uid }: { uid: string }) {
  const g = `gag-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#aacce0" stopOpacity="0.92" />
          <stop offset="40%" stopColor="#d4eefa" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#88b8d0" stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill="#909090" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={3} y={i * 40 + 3} width={194} height={34} fill={`url(#${g})`} stroke="#787878" strokeWidth={1} />
          <line x1={10} y1={i * 40 + 8} x2={24} y2={i * 40 + 32} stroke="white" strokeWidth={2} strokeOpacity={0.35} />
          <line x1={18} y1={i * 40 + 5} x2={38} y2={i * 40 + 33} stroke="white" strokeWidth={1} strokeOpacity={0.15} />
        </g>
      ))}
      <rect x={0} y={0} width={3} height={160} fill="#808080" />
      <rect x={197} y={0} width={3} height={160} fill="#808080" />
    </svg>
  );
}

function RusticWoodDoor({ uid }: { uid: string }) {
  const g = `rwg-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c88040" />
          <stop offset="35%" stopColor="#b87028" />
          <stop offset="70%" stopColor="#c88040" />
          <stop offset="100%" stopColor="#a06020" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[20, 40, 60, 80, 100, 120, 140].map((y) => (
        <line key={y} x1={0} y1={y} x2={200} y2={y} stroke="#8a4c14" strokeWidth={1.2} />
      ))}
      {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155].map((y, i) => (
        <path
          key={y}
          d={`M 0 ${y} Q ${55 + (i % 4) * 25} ${y + 3} 200 ${y}`}
          fill="none"
          stroke="#a06020"
          strokeWidth={0.3}
          strokeOpacity={0.4}
        />
      ))}
      <rect x={0} y={0} width={4} height={160} fill="#8a4c14" />
      <rect x={98} y={0} width={4} height={160} fill="#8a4c14" />
      <rect x={196} y={0} width={4} height={160} fill="#8a4c14" />
      <rect x={92} y={76} width={16} height={8} rx={4} fill="#333" />
    </svg>
  );
}

function SteelSandstoneDoor({ uid: _uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="160" fill="#cfc0a0" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={0} y={i * 40} width={200} height={40} fill="none" stroke="#afa080" strokeWidth={1} />
          {[8, 16, 24, 32].map((j) => (
            <line key={j} x1={0} y1={i * 40 + j} x2={200} y2={i * 40 + j} stroke="#c0b090" strokeWidth={0.5} />
          ))}
          {i === 0 &&
            [0, 1, 2, 3].map((j) => (
              <rect
                key={j}
                x={j * 46 + 10}
                y={8}
                width={34}
                height={22}
                rx={1}
                fill="#c8dce8"
                stroke="#a09070"
                strokeWidth={0.8}
                fillOpacity={0.75}
              />
            ))}
        </g>
      ))}
    </svg>
  );
}

function DoorSVG({ id, uid }: { id: string; uid: string }) {
  switch (id) {
    case "classic-white":   return <ClassicWhiteDoor uid={uid} />;
    case "carriage-house":  return <CarriageHouseDoor uid={uid} />;
    case "modern-black":    return <ModernBlackDoor uid={uid} />;
    case "glass-aluminum":  return <GlassAluminumDoor uid={uid} />;
    case "rustic-wood":     return <RusticWoodDoor uid={uid} />;
    case "steel-sandstone": return <SteelSandstoneDoor uid={uid} />;
    default:                return <ClassicWhiteDoor uid={uid} />;
  }
}

// ─── Interaction state (kept in a ref to avoid re-registering listeners) ──────

type InteractionType = "none" | "drag" | "resize";

interface Interaction {
  type: InteractionType;
  mouseStart: { x: number; y: number };
  valStart: { x: number; y: number; w: number; h: number };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("classic-white");
  const [pos, setPos] = useState({ x: 80, y: 80 });
  const [size, setSize] = useState({ w: 300, h: 240 });
  const [isDragging, setIsDragging] = useState(false);

  const interaction = useRef<Interaction>({
    type: "none",
    mouseStart: { x: 0, y: 0 },
    valStart: { x: 0, y: 0, w: 0, h: 0 },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedDoor = DOORS.find((d) => d.id === selectedId)!;

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const { type, mouseStart, valStart } = interaction.current;
      if (type === "none") return;
      const dx = e.clientX - mouseStart.x;
      const dy = e.clientY - mouseStart.y;
      if (type === "drag") {
        setPos({ x: valStart.x + dx, y: valStart.y + dy });
      } else {
        setSize({ w: Math.max(80, valStart.w + dx), h: Math.max(60, valStart.h + dy) });
      }
    }
    function onUp() {
      interaction.current.type = "none";
      setIsDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ─── UI ──────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#1a1a2e",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          width: 264,
          minWidth: 264,
          background: "#16213e",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #0f3460",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #0f3460",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "1px", color: "#a8dadc", fontWeight: 700 }}>
            AVAILABLE DOORS
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {DOORS.map((door) => (
            <div
              key={door.id}
              onClick={() => setSelectedId(door.id)}
              style={{
                border: `2px solid ${selectedId === door.id ? "#e94560" : "transparent"}`,
                borderRadius: 8,
                cursor: "pointer",
                background: "#0f3460",
                overflow: "hidden",
                transition: "border-color 0.15s",
              }}
            >
              {/* Door thumbnail */}
              <div style={{ aspectRatio: "5/3", background: "#111" }}>
                <DoorSVG id={door.id} uid={`sb-${door.id}`} />
              </div>

              <div style={{ padding: "7px 10px 9px" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{door.name}</div>
                <div style={{ fontSize: 11, color: "#a8dadc", marginTop: 2 }}>
                  {door.vendor} · {door.material}
                </div>
                <div style={{ fontSize: 11, color: "#e94560", marginTop: 3 }}>{door.priceRange}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main area ───────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            padding: "12px 20px",
            background: "#16213e",
            borderBottom: "1px solid #0f3460",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#a8dadc" }}>
              Garage Door Visualizer
            </div>
            <div style={{ fontSize: 12, color: "#566070", marginTop: 2 }}>
              {image
                ? "Drag to position · Drag red corner to resize · Click a door style to switch"
                : "Upload a photo of your house with a visible garage opening"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {image && (
              <div
                style={{
                  fontSize: 12,
                  background: "#0f3460",
                  padding: "4px 12px",
                  borderRadius: 20,
                  color: "#a8dadc",
                  border: "1px solid #1a4080",
                }}
              >
                {selectedDoor.name} ·{" "}
                <span style={{ color: "#e94560" }}>{selectedDoor.priceRange}</span>
              </div>
            )}
            <button
              onClick={() => {
                if (image) {
                  setImage(null);
                } else {
                  fileInputRef.current?.click();
                }
              }}
              style={{
                padding: "7px 16px",
                background: image ? "transparent" : "#e94560",
                color: image ? "#a8dadc" : "#fff",
                border: `1px solid ${image ? "#e94560" : "#e94560"}`,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {image ? "Change Photo" : "Upload Photo"}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {!image ? (
            /* ── Upload prompt ── */
            <div
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f) loadFile(f);
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 110,
                  border: "2px dashed #0f3460",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 52,
                }}
              >
                🏠
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "#a8dadc", marginBottom: 6 }}>
                  Upload Your House Photo
                </div>
                <div style={{ fontSize: 13, color: "#506070" }}>
                  Drag &amp; drop or click · JPG, PNG, WEBP
                </div>
              </div>
            </div>
          ) : (
            /* ── House image + overlay ── */
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Your house"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                }}
              />

              {/* Draggable door overlay */}
              <div
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  width: size.w,
                  height: size.h,
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                }}
                onMouseDown={(e) => {
                  if ((e.target as HTMLElement).dataset.handle) return;
                  e.preventDefault();
                  setIsDragging(true);
                  interaction.current = {
                    type: "drag",
                    mouseStart: { x: e.clientX, y: e.clientY },
                    valStart: { x: pos.x, y: pos.y, w: size.w, h: size.h },
                  };
                }}
              >
                {/* Door graphic */}
                <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                  <DoorSVG id={selectedId} uid="overlay" />
                </div>

                {/* Dashed border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: "2px dashed rgba(168, 218, 220, 0.65)",
                    pointerEvents: "none",
                  }}
                />

                {/* Info label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 5px)",
                    left: 0,
                    background: "rgba(22, 33, 62, 0.92)",
                    color: "#a8dadc",
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    border: "1px solid #0f3460",
                  }}
                >
                  {selectedDoor.name} — {selectedDoor.vendor}
                </div>

                {/* Resize handle */}
                <div
                  data-handle="resize"
                  style={{
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    width: 14,
                    height: 14,
                    background: "#e94560",
                    borderRadius: 3,
                    cursor: "se-resize",
                    zIndex: 10,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    interaction.current = {
                      type: "resize",
                      mouseStart: { x: e.clientX, y: e.clientY },
                      valStart: { x: pos.x, y: pos.y, w: size.w, h: size.h },
                    };
                  }}
                />
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) loadFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}
