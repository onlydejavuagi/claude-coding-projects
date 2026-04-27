"use client";

import { useState, useRef, useCallback } from "react";

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
  { id: "classic-white",   name: "Classic Raised Panel", vendor: "Clopay",        material: "Insulated Steel",  priceRange: "$800–$1,200",  description: "Traditional white raised-panel with R-6 insulation." },
  { id: "carriage-house",  name: "Carriage House",        vendor: "Wayne Dalton",  material: "Composite Wood",   priceRange: "$1,500–$2,500", description: "Rustic carriage-house look with decorative strap hinges." },
  { id: "modern-black",    name: "Modern Flush",          vendor: "Overhead Door", material: "Aluminum",         priceRange: "$2,000–$3,500", description: "Sleek matte-black aluminum for contemporary homes." },
  { id: "glass-aluminum",  name: "Full-View Glass",       vendor: "Amarr",         material: "Aluminum & Glass", priceRange: "$2,500–$4,000", description: "Tempered glass panels in an aluminum frame." },
  { id: "rustic-wood",     name: "Rustic Cedar",          vendor: "Clopay",        material: "Real Cedar",       priceRange: "$3,000–$5,000", description: "Authentic cedar with natural wood grain." },
  { id: "steel-sandstone", name: "Coachman Steel",        vendor: "Amarr",         material: "Insulated Steel",  priceRange: "$1,200–$1,800", description: "Sandstone steel with decorative top-panel windows." },
];

// ─── SVG door previews ────────────────────────────────────────────────────────

function ClassicWhiteDoor({ uid }: { uid: string }) {
  const g = `cw-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dcdcdc" /><stop offset="50%" stopColor="#f6f6f6" /><stop offset="100%" stopColor="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={0} y={i*40} width={200} height={40} fill="none" stroke="#b0b0b0" strokeWidth={1} />
          <rect x={6}   y={i*40+5} width={87} height={30} rx={2} fill="#e4e4e4" stroke="#c4c4c4" strokeWidth={0.8} />
          <rect x={107} y={i*40+5} width={87} height={30} rx={2} fill="#e4e4e4" stroke="#c4c4c4" strokeWidth={0.8} />
        </g>
      ))}
    </svg>
  );
}

function CarriageHouseDoor({ uid }: { uid: string }) {
  const g = `ch-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08830" /><stop offset="50%" stopColor="#c89238" /><stop offset="100%" stopColor="#a87020" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[25,50,75,100,125,150,175].map(x => <line key={x} x1={x} y1={0} x2={x} y2={160} stroke="#8a5c18" strokeWidth={1.5} />)}
      <rect x={0} y={0}   width={200} height={5} fill="#7a4e10" />
      <rect x={0} y={76}  width={200} height={5} fill="#7a4e10" />
      <rect x={0} y={155} width={200} height={5} fill="#7a4e10" />
      <path d="M 5,81 Q 100,32 195,81" fill="none" stroke="#7a4e10" strokeWidth={3} />
      {[26,118].map(y => (
        <g key={y}>
          <rect x={0}   y={y} width={22} height={4} rx={2} fill="#2a2a2a" />
          <rect x={178} y={y} width={22} height={4} rx={2} fill="#2a2a2a" />
        </g>
      ))}
    </svg>
  );
}

function ModernBlackDoor() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="160" fill="#1c1c1c" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={1} y={i*40+1} width={198} height={38} fill="#212121" />
          <rect x={1} y={i*40+39} width={198} height={1} fill="#141414" />
          {[10,20,30].map(j => <line key={j} x1={1} y1={i*40+j} x2={199} y2={i*40+j} stroke="#262626" strokeWidth={0.5} />)}
        </g>
      ))}
      <rect x={98} y={0} width={4} height={160} fill="#111" />
    </svg>
  );
}

function GlassAluminumDoor({ uid }: { uid: string }) {
  const g = `ga-${uid}`;
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
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={3} y={i*40+3} width={194} height={34} fill={`url(#${g})`} stroke="#787878" strokeWidth={1} />
          <line x1={10} y1={i*40+8} x2={24} y2={i*40+32} stroke="white" strokeWidth={2} strokeOpacity={0.35} />
        </g>
      ))}
      <rect x={0} y={0} width={3} height={160} fill="#808080" />
      <rect x={197} y={0} width={3} height={160} fill="#808080" />
    </svg>
  );
}

function RusticWoodDoor({ uid }: { uid: string }) {
  const g = `rw-${uid}`;
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c88040" /><stop offset="35%" stopColor="#b87028" /><stop offset="70%" stopColor="#c88040" /><stop offset="100%" stopColor="#a06020" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#${g})`} />
      {[20,40,60,80,100,120,140].map(y => <line key={y} x1={0} y1={y} x2={200} y2={y} stroke="#8a4c14" strokeWidth={1.2} />)}
      <rect x={0}   y={0} width={4} height={160} fill="#8a4c14" />
      <rect x={98}  y={0} width={4} height={160} fill="#8a4c14" />
      <rect x={196} y={0} width={4} height={160} fill="#8a4c14" />
    </svg>
  );
}

function SteelSandstoneDoor() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="160" fill="#cfc0a0" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={0} y={i*40} width={200} height={40} fill="none" stroke="#afa080" strokeWidth={1} />
          {[8,16,24,32].map(j => <line key={j} x1={0} y1={i*40+j} x2={200} y2={i*40+j} stroke="#c0b090" strokeWidth={0.5} />)}
          {i === 0 && [0,1,2,3].map(j => (
            <rect key={j} x={j*46+10} y={8} width={34} height={22} rx={1} fill="#c8dce8" stroke="#a09070" strokeWidth={0.8} fillOpacity={0.75} />
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
    case "modern-black":    return <ModernBlackDoor />;
    case "glass-aluminum":  return <GlassAluminumDoor uid={uid} />;
    case "rustic-wood":     return <RusticWoodDoor uid={uid} />;
    case "steel-sandstone": return <SteelSandstoneDoor />;
    default:                return <ClassicWhiteDoor uid={uid} />;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resizeToPNG(src: string, maxPx = 1024): Promise<string> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(maxPx / img.naturalWidth, maxPx / img.naturalHeight, 1);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.naturalWidth  * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
}

// ─── Main component ───────────────────────────────────────────────────────────

type View = "original" | "result";

export default function Home() {
  const [image,          setImage]      = useState<string | null>(null);
  const [selectedId,     setSelectedId] = useState("classic-white");
  const [generating,     setGenerating] = useState(false);
  const [generatedImage, setGenerated]  = useState<string | null>(null);
  const [view,           setView]       = useState<View>("original");
  const [genError,       setGenError]   = useState<string | null>(null);
  const [showPwModal,    setShowPwModal] = useState(false);
  const [password,       setPassword]   = useState("");
  const [pwError,        setPwError]    = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedDoor = DOORS.find(d => d.id === selectedId)!;

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      setImage(e.target?.result as string);
      setGenerated(null);
      setView("original");
      setGenError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  // Opens the password modal instead of generating directly
  function openPasswordModal() {
    setPassword("");
    setPwError("");
    setShowPwModal(true);
  }

  async function handleGenerate(pw: string) {
    if (!image) return;
    setShowPwModal(false);
    setGenerating(true);
    setGenError(null);
    try {
      const png = await resizeToPNG(image);
      const res  = await fetch("/api/generate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ image: png, doorId: selectedId, password: pw }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setPwError("Incorrect password.");
        setShowPwModal(true);
        setGenerating(false);
        return;
      }
      if (data.image) {
        setGenerated(data.image);
        setView("result");
      } else {
        setGenError(data.error ?? "Generation failed");
      }
    } catch {
      setGenError("Network error — check the dev server.");
    }
    setGenerating(false);
  }

  // ── render ─────────────────────────────────────────────────────────────────

  const S = {
    root:    { display:"flex", height:"100vh", background:"#1a1a2e", color:"#fff", fontFamily:"system-ui, sans-serif", overflow:"hidden" } as React.CSSProperties,
    sidebar: { width:270, minWidth:270, background:"#16213e", display:"flex", flexDirection:"column" as const, borderRight:"1px solid #0f3460" },
    sbHead:  { padding:"14px 16px", borderBottom:"1px solid #0f3460", flexShrink:0 as 0 },
    sbList:  { flex:1, overflowY:"auto" as const, padding:10, display:"flex", flexDirection:"column" as const, gap:8 },
    main:    { flex:1, display:"flex", flexDirection:"column" as const, overflow:"hidden" },
    header:  { padding:"12px 20px", background:"#16213e", borderBottom:"1px solid #0f3460", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 as 0 },
    canvas:  { flex:1, overflow:"hidden", position:"relative" as const },
  };

  return (
    <div style={S.root}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <div style={S.sidebar}>
        <div style={S.sbHead}>
          <div style={{ fontSize:11, letterSpacing:"1px", color:"#a8dadc", fontWeight:700 }}>AVAILABLE DOORS</div>
          <div style={{ fontSize:11, color:"#566070", marginTop:4 }}>Select a style, then click Generate</div>
        </div>
        <div style={S.sbList}>
          {DOORS.map(door => (
            <div
              key={door.id}
              onClick={() => { setSelectedId(door.id); setGenerated(null); setView("original"); setGenError(null); }}
              style={{
                border:`2px solid ${selectedId === door.id ? "#e94560" : "transparent"}`,
                borderRadius:8, cursor:"pointer", background:"#0f3460",
                overflow:"hidden", transition:"border-color 0.15s",
              }}
            >
              <div style={{ aspectRatio:"5/3", background:"#111" }}>
                <DoorSVG id={door.id} uid={door.id} />
              </div>
              <div style={{ padding:"7px 10px 9px" }}>
                <div style={{ fontWeight:600, fontSize:13, color: selectedId === door.id ? "#e94560" : "#fff" }}>{door.name}</div>
                <div style={{ fontSize:11, color:"#a8dadc", marginTop:2 }}>{door.vendor} · {door.material}</div>
                <div style={{ fontSize:11, color:"#e94560", marginTop:3 }}>{door.priceRange}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div style={S.main}>

        {/* Header */}
        <div style={S.header}>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:"#a8dadc" }}>Garage Door Visualizer</div>
            <div style={{ fontSize:12, color:"#566070", marginTop:2 }}>
              {!image
                ? "Upload a photo of your house with a visible garage"
                : view === "result"
                ? `Showing AI result · ${selectedDoor.name} by ${selectedDoor.vendor}`
                : `Select a door style on the left, then click Generate with AI`}
            </div>
          </div>

          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {/* Before / After toggle */}
            {generatedImage && (
              <div style={{ display:"flex", background:"#0f3460", borderRadius:6, border:"1px solid #1a4080", overflow:"hidden" }}>
                {(["original","result"] as View[]).map(v => (
                  <button key={v} onClick={() => setView(v)} style={{
                    padding:"6px 14px", cursor:"pointer", fontSize:12, border:"none",
                    background: view === v ? "#e94560" : "transparent",
                    color: view === v ? "#fff" : "#a8dadc", transition:"background 0.15s",
                  }}>
                    {v === "original" ? "Original" : "AI Result"}
                  </button>
                ))}
              </div>
            )}

            {/* Generate button */}
            {image && (
              <button
                onClick={openPasswordModal}
                disabled={generating}
                style={{
                  padding:"7px 18px",
                  background: generating ? "#2a1a3a" : "linear-gradient(135deg, #7b2d8b, #9b3dab)",
                  color: generating ? "#888" : "#fff",
                  border:"1px solid #9b3dab", borderRadius:6,
                  cursor: generating ? "not-allowed" : "pointer",
                  fontSize:13, fontWeight:600,
                  display:"flex", alignItems:"center", gap:7,
                  boxShadow: generating ? "none" : "0 2px 12px rgba(155,61,171,0.4)",
                }}
              >
                {generating
                  ? <><Spinner /> Generating…</>
                  : "✦ Generate with AI"}
              </button>
            )}

            {/* Upload / Change */}
            <button
              onClick={() => image ? (setImage(null), setGenerated(null), setView("original")) : fileInputRef.current?.click()}
              style={{
                padding:"7px 16px", fontSize:13, fontWeight:500, borderRadius:6, cursor:"pointer",
                background: image ? "transparent" : "#e94560",
                color: image ? "#a8dadc" : "#fff",
                border:"1px solid #e94560",
              }}
            >
              {image ? "Change Photo" : "Upload Photo"}
            </button>
          </div>
        </div>

        {/* Canvas area */}
        <div style={S.canvas}>

          {/* Error toast */}
          {genError && (
            <div style={{
              position:"absolute", top:12, left:"50%", transform:"translateX(-50%)",
              zIndex:20, background:"#4a1010", border:"1px solid #e94560",
              color:"#ffaaaa", padding:"8px 18px", borderRadius:6, fontSize:13, whiteSpace:"nowrap",
            }}>
              {genError}
            </div>
          )}

          {!image ? (
            /* Upload zone */
            <div
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", gap:16 }}
            >
              <div style={{ width:140, height:110, border:"2px dashed #0f3460", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>🏠</div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:20, color:"#a8dadc", marginBottom:6 }}>Upload Your House Photo</div>
                <div style={{ fontSize:13, color:"#506070" }}>Drag &amp; drop or click · JPG, PNG, WEBP</div>
              </div>
            </div>

          ) : view === "result" && generatedImage ? (
            /* AI result */
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#111" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={generatedImage} alt="AI-generated result" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
            </div>

          ) : (
            /* Original house photo */
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#111" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Your house" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
              {/* Selected door badge */}
              <div style={{
                position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
                background:"rgba(22,33,62,0.92)", border:"1px solid #0f3460",
                color:"#a8dadc", fontSize:13, padding:"8px 18px", borderRadius:20,
                display:"flex", alignItems:"center", gap:10, whiteSpace:"nowrap",
              }}>
                <span style={{ width:28, height:21, display:"inline-block", flexShrink:0 }}>
                  <DoorSVG id={selectedId} uid="badge" />
                </span>
                <span><strong style={{ color:"#fff" }}>{selectedDoor.name}</strong> · {selectedDoor.vendor} · <span style={{ color:"#e94560" }}>{selectedDoor.priceRange}</span></span>
              </div>
            </div>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:"none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ""; }} />
        </div>
      </div>

      {/* ── Password modal ──────────────────────────────────────────────────── */}
      {showPwModal && (
        <div
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}
          onClick={e => { if (e.target === e.currentTarget) setShowPwModal(false); }}
        >
          <div style={{ background:"#16213e", border:"1px solid #0f3460", borderRadius:12, padding:"32px 36px", width:340, boxShadow:"0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize:17, fontWeight:700, color:"#a8dadc", marginBottom:6 }}>Enter Password</div>
            <div style={{ fontSize:13, color:"#566070", marginBottom:20 }}>This feature is password protected.</div>

            <input
              type="password"
              value={password}
              autoFocus
              placeholder="Password"
              onChange={e => { setPassword(e.target.value); setPwError(""); }}
              onKeyDown={e => { if (e.key === "Enter") handleGenerate(password); }}
              style={{
                width:"100%", boxSizing:"border-box" as const,
                padding:"10px 14px", fontSize:14,
                background:"#0f3460", border:`1px solid ${pwError ? "#e94560" : "#1a4080"}`,
                borderRadius:6, color:"#fff", outline:"none",
              }}
            />
            {pwError && (
              <div style={{ color:"#e94560", fontSize:12, marginTop:6 }}>{pwError}</div>
            )}

            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button
                onClick={() => setShowPwModal(false)}
                style={{ flex:1, padding:"9px 0", background:"transparent", border:"1px solid #1a4080", borderRadius:6, color:"#a8dadc", cursor:"pointer", fontSize:13 }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleGenerate(password)}
                disabled={!password}
                style={{
                  flex:2, padding:"9px 0",
                  background: password ? "linear-gradient(135deg,#7b2d8b,#9b3dab)" : "#2a1a3a",
                  border:"1px solid #9b3dab", borderRadius:6,
                  color: password ? "#fff" : "#555", cursor: password ? "pointer" : "not-allowed",
                  fontSize:13, fontWeight:600,
                }}
              >
                Generate with AI
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

function Spinner() {
  return (
    <span style={{
      display:"inline-block", width:13, height:13,
      border:"2px solid #555", borderTopColor:"#ccc",
      borderRadius:"50%", animation:"spin 0.7s linear infinite",
    }} />
  );
}
