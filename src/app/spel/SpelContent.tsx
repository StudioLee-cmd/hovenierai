"use client";

import React, { useReducer, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const COLS = 12;
const ROWS = 10;
const CELL = 48;

const CLR = {
  bg: "#0d1a0d",
  wall: "#2d5a27",
  wallBorder: "#3d7a37",
  floor: "#1a3318",
  floorAlt: "#162e14",
  player: "#8B4513",
  playerHat: "#228B22",
  coin: "#ffd700",
  progress: "#90EE90",
  progressBg: "#1a3318",
  cooldown: "#ff6b35",
  neon: "#32CD32",
  neonPink: "#FF69B4",
  neonGreen: "#90EE90",
  textPrimary: "#d4e8c0",
  textSecondary: "#7a9a68",
  overlay: "rgba(5,15,5,0.92)",
  shopBtn: "#2E8B57",
  shopBtnHover: "#3CB371",
  stationG: "#32CD32",
  stationS: "#FF8C00",
  stationH: "#4169E1",
  stationP: "#FF69B4",
  stationB: "#DAA520",
  stationExtra: "#00CED1",
};

interface StationDef {
  id: string;
  name: string;
  emoji: string;
  baseCoins: number;
  baseDuration: number;
  cooldown: number;
  color: string;
  gridX: number;
  gridY: number;
}

const STATIONS: StationDef[] = [
  { id: "G", name: "Grasmaaien", emoji: "\uD83C\uDF3F", baseCoins: 10, baseDuration: 1500, cooldown: 6000, color: CLR.stationG, gridX: 2, gridY: 2 },
  { id: "S", name: "Snoeien", emoji: "\u2702\uFE0F", baseCoins: 15, baseDuration: 2500, cooldown: 8000, color: CLR.stationS, gridX: 9, gridY: 2 },
  { id: "H", name: "Hogedruk", emoji: "\uD83D\uDCA6", baseCoins: 20, baseDuration: 3000, cooldown: 10000, color: CLR.stationH, gridX: 7, gridY: 4 },
  { id: "P", name: "Planten", emoji: "\uD83C\uDF31", baseCoins: 12, baseDuration: 2000, cooldown: 7000, color: CLR.stationP, gridX: 2, gridY: 6 },
  { id: "B", name: "Bladblazer", emoji: "\uD83C\uDF42", baseCoins: 18, baseDuration: 2500, cooldown: 7000, color: CLR.stationB, gridX: 7, gridY: 7 },
];

const EXTRA_STATION: StationDef = {
  id: "X", name: "Compostbak", emoji: "\u267B\uFE0F", baseCoins: 16, baseDuration: 2200, cooldown: 8000, color: CLR.stationExtra, gridX: 5, gridY: 5,
};

interface UpgradeDef {
  id: string;
  name: string;
  description: string;
  cost: number;
  emoji: string;
}

const UPGRADES: UpgradeDef[] = [
  { id: "speed", name: "Snellere Handen", description: "Taken 30% sneller voltooid", cost: 50, emoji: "\uD83D\uDC4B" },
  { id: "bonus", name: "Beter Gereedschap", description: "+5 munten per taak", cost: 100, emoji: "\uD83E\uDE93" },
  { id: "extra", name: "Extra Compostbak", description: "Ontgrendel 6e werkstation", cost: 150, emoji: "\u267B\uFE0F" },
  { id: "turbo", name: "Turbo Modus", description: "Taken direct af (30 sec)", cost: 200, emoji: "\uD83D\uDE80" },
];

function buildWallMap(): boolean[][] {
  const map: boolean[][] = [];
  for (let y = 0; y < ROWS; y++) {
    map[y] = [];
    for (let x = 0; x < COLS; x++) {
      map[y][x] = y === 0 || y === ROWS - 1 || x === 0 || x === COLS - 1;
    }
  }
  return map;
}
const WALL_MAP = buildWallMap();

/* ═══════════════════════════════════════════════════════════════════════════
   GAME STATE
   ═══════════════════════════════════════════════════════════════════════════ */

interface StationState {
  cooldownEnd: number;
}

interface GameState {
  playerX: number;
  playerY: number;
  facing: "up" | "down" | "left" | "right";
  coins: number;
  totalCoins: number;
  stations: Record<string, StationState>;
  activeStations: string[];
  working: { stationId: string; startTime: number; duration: number } | null;
  upgrades: Record<string, boolean>;
  turboEnd: number;
  shopOpen: boolean;
  message: string;
  messageEnd: number;
}

type Action =
  | { type: "MOVE"; dx: number; dy: number }
  | { type: "INTERACT" }
  | { type: "TICK"; now: number }
  | { type: "FINISH_WORK"; now: number }
  | { type: "BUY_UPGRADE"; upgradeId: string; now: number }
  | { type: "TOGGLE_SHOP" }
  | { type: "SET_MESSAGE"; msg: string; duration: number; now: number };

function getActiveStationDefs(state: GameState): StationDef[] {
  return state.activeStations.map(id => {
    if (id === "X") return EXTRA_STATION;
    return STATIONS.find(s => s.id === id)!;
  });
}

function isWalkable(x: number, y: number): boolean {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
  if (WALL_MAP[y][x]) return false;
  return true;
}

function getStationAt(x: number, y: number, state: GameState): StationDef | null {
  const defs = getActiveStationDefs(state);
  return defs.find(s => s.gridX === x && s.gridY === y) || null;
}

function isAdjacentToStation(px: number, py: number, station: StationDef): boolean {
  const dx = Math.abs(px - station.gridX);
  const dy = Math.abs(py - station.gridY);
  return (dx + dy === 1) || (dx === 0 && dy === 0);
}

function getEffectiveDuration(base: number, state: GameState, now: number): number {
  if (state.turboEnd > now) return 50;
  let d = base;
  if (state.upgrades["speed"]) d *= 0.7;
  return d;
}

function getEffectiveCoins(base: number, state: GameState): number {
  let c = base;
  if (state.upgrades["bonus"]) c += 5;
  return c;
}

function initState(): GameState {
  const activeIds = STATIONS.map(s => s.id);
  const stations: Record<string, StationState> = {};
  for (const s of STATIONS) {
    stations[s.id] = { cooldownEnd: 0 };
  }
  return {
    playerX: 5,
    playerY: 5,
    facing: "down",
    coins: 0,
    totalCoins: 0,
    stations,
    activeStations: activeIds,
    working: null,
    upgrades: {},
    turboEnd: 0,
    shopOpen: false,
    message: "Welkom, hovenier! Loop naar een tuinklus en druk op Spatie.",
    messageEnd: Date.now() + 5000,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "MOVE": {
      if (state.working || state.shopOpen) return state;
      const nx = state.playerX + action.dx;
      const ny = state.playerY + action.dy;
      const facing: GameState["facing"] =
        action.dx === 1 ? "right" : action.dx === -1 ? "left" :
        action.dy === 1 ? "down" : "up";
      if (!isWalkable(nx, ny)) return { ...state, facing };
      return { ...state, playerX: nx, playerY: ny, facing };
    }

    case "INTERACT": {
      if (state.shopOpen || state.working) return state;
      const now = Date.now();
      const defs = getActiveStationDefs(state);
      let target: StationDef | null = null;
      target = getStationAt(state.playerX, state.playerY, state);
      if (!target) {
        for (const s of defs) {
          if (isAdjacentToStation(state.playerX, state.playerY, s) && !(s.gridX === state.playerX && s.gridY === state.playerY)) {
            target = s;
            break;
          }
        }
      }
      if (!target) {
        return { ...state, message: "Geen tuinklus in de buurt. Loop er naartoe!", messageEnd: now + 2000 };
      }
      const ss = state.stations[target.id];
      if (ss && ss.cooldownEnd > now) {
        const remaining = Math.ceil((ss.cooldownEnd - now) / 1000);
        return { ...state, message: `${target.name} heeft nog ${remaining}s cooldown...`, messageEnd: now + 1500 };
      }
      const duration = getEffectiveDuration(target.baseDuration, state, now);
      return { ...state, working: { stationId: target.id, startTime: now, duration }, message: `${target.emoji} Bezig met ${target.name}...`, messageEnd: now + duration + 500 };
    }

    case "FINISH_WORK": {
      if (!state.working) return state;
      const w = state.working;
      const def = w.stationId === "X" ? EXTRA_STATION : STATIONS.find(s => s.id === w.stationId)!;
      const earned = getEffectiveCoins(def.baseCoins, state);
      const newStations = { ...state.stations };
      newStations[w.stationId] = { cooldownEnd: action.now + def.cooldown };
      return { ...state, working: null, coins: state.coins + earned, totalCoins: state.totalCoins + earned, stations: newStations, message: `+${earned} munten! ${def.name} klaar!`, messageEnd: action.now + 2000 };
    }

    case "BUY_UPGRADE": {
      const upg = UPGRADES.find(u => u.id === action.upgradeId);
      if (!upg) return state;
      if (state.upgrades[action.upgradeId] && action.upgradeId !== "turbo") return state;
      if (state.coins < upg.cost) {
        return { ...state, message: `Niet genoeg munten! Je hebt ${state.coins}, nodig: ${upg.cost}`, messageEnd: action.now + 2000 };
      }
      const newUpgrades = { ...state.upgrades, [action.upgradeId]: true };
      let newActiveStations = [...state.activeStations];
      let newStationsMap = { ...state.stations };
      let turboEnd = state.turboEnd;
      if (action.upgradeId === "extra" && !state.activeStations.includes("X")) {
        newActiveStations.push("X");
        newStationsMap["X"] = { cooldownEnd: 0 };
      }
      if (action.upgradeId === "turbo") {
        turboEnd = action.now + 30000;
      }
      return { ...state, coins: state.coins - upg.cost, upgrades: newUpgrades, activeStations: newActiveStations, stations: newStationsMap, turboEnd, message: `${upg.emoji} ${upg.name} gekocht!`, messageEnd: action.now + 2500 };
    }

    case "TOGGLE_SHOP": {
      if (state.working) return state;
      return { ...state, shopOpen: !state.shopOpen };
    }

    case "SET_MESSAGE": {
      return { ...state, message: action.msg, messageEnd: action.now + action.duration };
    }

    case "TICK": {
      if (state.working) {
        const elapsed = action.now - state.working.startTime;
        if (elapsed >= state.working.duration) {
          return reducer(state, { type: "FINISH_WORK", now: action.now });
        }
      }
      return state;
    }

    default:
      return state;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUDIO
   ═══════════════════════════════════════════════════════════════════════════ */

function playSound(type: "coin" | "work" | "buy" | "step" | "error") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case "coin":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.setValueAtTime(990, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
        break;
      case "work":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(550, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
        break;
      case "buy":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
        break;
      case "step":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
        break;
      case "error":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        break;
    }
  } catch (_) {}
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function SpelContent() {
  const [state, dispatch] = useReducer(reducer, null, initState);
  const gameRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const prevCoinsRef = useRef(0);
  const prevWorkingRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.coins > prevCoinsRef.current) playSound("coin");
    prevCoinsRef.current = state.coins;
  }, [state.coins]);

  useEffect(() => {
    if (state.working && !prevWorkingRef.current) playSound("work");
    prevWorkingRef.current = state.working?.stationId || null;
  }, [state.working]);

  useEffect(() => {
    const tick = () => {
      dispatch({ type: "TICK", now: Date.now() });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    switch (key) {
      case "arrowup": case "w":
        e.preventDefault(); dispatch({ type: "MOVE", dx: 0, dy: -1 }); playSound("step"); break;
      case "arrowdown":
        e.preventDefault(); dispatch({ type: "MOVE", dx: 0, dy: 1 }); playSound("step"); break;
      case "arrowleft": case "a":
        e.preventDefault(); dispatch({ type: "MOVE", dx: -1, dy: 0 }); playSound("step"); break;
      case "arrowright": case "d":
        e.preventDefault(); dispatch({ type: "MOVE", dx: 1, dy: 0 }); playSound("step"); break;
      case "s":
        if (!e.shiftKey) { e.preventDefault(); dispatch({ type: "MOVE", dx: 0, dy: 1 }); playSound("step"); }
        else { e.preventDefault(); dispatch({ type: "TOGGLE_SHOP" }); }
        break;
      case " ": case "enter":
        e.preventDefault(); dispatch({ type: "INTERACT" }); break;
      case "e":
        e.preventDefault(); dispatch({ type: "TOGGLE_SHOP" }); break;
      case "escape":
        if (state.shopOpen) { e.preventDefault(); dispatch({ type: "TOGGLE_SHOP" }); } break;
    }
  }, [state.shopOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => { gameRef.current?.focus(); }, []);

  const now = Date.now();
  const workProgress = state.working ? Math.min(1, (now - state.working.startTime) / state.working.duration) : 0;
  const turboActive = state.turboEnd > now;
  const turboRemaining = turboActive ? Math.ceil((state.turboEnd - now) / 1000) : 0;
  const allStationDefs = getActiveStationDefs(state);
  const showMessage = state.messageEnd > now;

  function renderCell(x: number, y: number) {
    const isWall = WALL_MAP[y][x];
    const station = getStationAt(x, y, state);
    const isPlayer = state.playerX === x && state.playerY === y;
    const isAltFloor = (x + y) % 2 === 0;

    let bg = isAltFloor ? CLR.floorAlt : CLR.floor;
    let content: React.ReactNode = null;
    let border = "1px solid rgba(40,80,40,0.3)";
    let boxShadow = "none";

    if (isWall) {
      bg = CLR.wall;
      border = `1px solid ${CLR.wallBorder}`;
      content = <span style={{ fontSize: 16, opacity: 0.6 }}>{"\uD83C\uDF3F"}</span>;
    }

    if (station) {
      const ss = state.stations[station.id];
      const onCooldown = ss && ss.cooldownEnd > now;
      const cooldownPct = onCooldown ? Math.max(0, (ss.cooldownEnd - now) / station.cooldown) : 0;

      bg = onCooldown ? `${station.color}33` : `${station.color}44`;
      border = `2px solid ${onCooldown ? CLR.cooldown + "88" : station.color}`;
      boxShadow = onCooldown ? "none" : `0 0 12px ${station.color}44, inset 0 0 8px ${station.color}22`;

      content = (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 20, lineHeight: 1, filter: onCooldown ? "grayscale(0.7) opacity(0.5)" : "none" }}>{station.emoji}</span>
          <span style={{ fontSize: 6, fontFamily: "'Press Start 2P', monospace", color: onCooldown ? CLR.cooldown : CLR.textPrimary, marginTop: 2, textAlign: "center", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: CELL - 4 }}>{station.name}</span>
          {onCooldown && (
            <div style={{ position: "absolute", bottom: 2, left: 2, right: 2, height: 3, background: CLR.progressBg, borderRadius: 1 }}>
              <div style={{ width: `${cooldownPct * 100}%`, height: "100%", background: CLR.cooldown, borderRadius: 1, transition: "width 0.5s linear" }} />
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={`${x}-${y}`} style={{ width: CELL, height: CELL, background: bg, border, boxShadow, position: "relative", overflow: "hidden", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {content}
        {isPlayer && renderPlayer()}
      </div>
    );
  }

  function renderPlayer() {
    const facingArrow = state.facing === "up" ? "\u25B2" : state.facing === "down" ? "\u25BC" : state.facing === "left" ? "\u25C0" : "\u25B6";
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ width: 18, height: 10, background: CLR.playerHat, borderRadius: "6px 6px 0 0", border: `1px solid ${CLR.playerHat}`, marginBottom: -2, boxShadow: `0 0 6px ${CLR.playerHat}66` }} />
        <div style={{ width: 22, height: 22, background: CLR.player, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${CLR.neon}44`, border: `2px solid ${CLR.neon}88`, position: "relative" }}>
          <span style={{ fontSize: 10, color: "#fff", fontWeight: "bold", fontFamily: "'Press Start 2P', monospace" }}>{facingArrow}</span>
        </div>
        {state.working && (
          <div style={{ position: "absolute", top: -8, left: 4, right: 4, height: 5, background: CLR.progressBg, borderRadius: 2, border: `1px solid ${CLR.neonGreen}44` }}>
            <div style={{ width: `${workProgress * 100}%`, height: "100%", background: `linear-gradient(90deg, ${CLR.neonGreen}, ${CLR.neon})`, borderRadius: 2, transition: "width 0.1s linear", boxShadow: `0 0 4px ${CLR.neonGreen}` }} />
          </div>
        )}
      </div>
    );
  }

  function renderGrid() {
    const rows: React.ReactNode[] = [];
    for (let y = 0; y < ROWS; y++) {
      const cells: React.ReactNode[] = [];
      for (let x = 0; x < COLS; x++) cells.push(renderCell(x, y));
      rows.push(<div key={y} style={{ display: "flex" }}>{cells}</div>);
    }
    return rows;
  }

  function renderDPad() {
    const btnStyle = (): React.CSSProperties => ({
      width: 52, height: 52, background: CLR.wall, border: `2px solid ${CLR.neon}66`, borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: CLR.neon,
      cursor: "pointer", userSelect: "none", WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 12 }}>
        <button style={btnStyle()} onTouchStart={(e) => { e.preventDefault(); dispatch({ type: "MOVE", dx: 0, dy: -1 }); playSound("step"); }} onClick={() => { dispatch({ type: "MOVE", dx: 0, dy: -1 }); playSound("step"); }} aria-label="Omhoog">{"\u25B2"}</button>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={btnStyle()} onTouchStart={(e) => { e.preventDefault(); dispatch({ type: "MOVE", dx: -1, dy: 0 }); playSound("step"); }} onClick={() => { dispatch({ type: "MOVE", dx: -1, dy: 0 }); playSound("step"); }} aria-label="Links">{"\u25C0"}</button>
          <button style={{ ...btnStyle(), background: CLR.neonGreen + "33", border: `2px solid ${CLR.neonGreen}`, fontSize: 10, fontFamily: "'Press Start 2P', monospace", color: CLR.neonGreen }}
            onTouchStart={(e) => { e.preventDefault(); dispatch({ type: "INTERACT" }); }} onClick={() => dispatch({ type: "INTERACT" })} aria-label="Actie">ACTIE</button>
          <button style={btnStyle()} onTouchStart={(e) => { e.preventDefault(); dispatch({ type: "MOVE", dx: 1, dy: 0 }); playSound("step"); }} onClick={() => { dispatch({ type: "MOVE", dx: 1, dy: 0 }); playSound("step"); }} aria-label="Rechts">{"\u25B6"}</button>
        </div>
        <button style={btnStyle()} onTouchStart={(e) => { e.preventDefault(); dispatch({ type: "MOVE", dx: 0, dy: 1 }); playSound("step"); }} onClick={() => { dispatch({ type: "MOVE", dx: 0, dy: 1 }); playSound("step"); }} aria-label="Omlaag">{"\u25BC"}</button>
      </div>
    );
  }

  function renderShop() {
    if (!state.shopOpen) return null;
    return (
      <div style={{ position: "fixed", inset: 0, background: CLR.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }} onClick={() => dispatch({ type: "TOGGLE_SHOP" })}>
        <div style={{ background: CLR.bg, border: `2px solid ${CLR.neonPink}`, borderRadius: 12, padding: 24, maxWidth: 420, width: "100%", boxShadow: `0 0 30px ${CLR.neonPink}44` }} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 16, color: CLR.neonPink, textAlign: "center", marginTop: 0, marginBottom: 16, textShadow: `0 0 10px ${CLR.neonPink}88` }}>{"\uD83C\uDF3B"} Tuinwinkel</h2>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: CLR.coin, textAlign: "center", marginBottom: 16 }}>{"\uD83E\uDE99"} {state.coins} munten</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {UPGRADES.map(upg => {
              const owned = state.upgrades[upg.id] && upg.id !== "turbo";
              const canAfford = state.coins >= upg.cost;
              const isTurboActive = upg.id === "turbo" && turboActive;
              return (
                <button key={upg.id} disabled={owned || !canAfford || isTurboActive}
                  onClick={() => { dispatch({ type: "BUY_UPGRADE", upgradeId: upg.id, now: Date.now() }); playSound("buy"); }}
                  style={{ background: owned ? CLR.neonGreen + "22" : canAfford ? CLR.shopBtn : CLR.wall, border: `1px solid ${owned ? CLR.neonGreen : canAfford ? CLR.shopBtnHover : CLR.textSecondary}44`, borderRadius: 8, padding: "10px 14px", cursor: owned || !canAfford || isTurboActive ? "not-allowed" : "pointer", opacity: owned || isTurboActive ? 0.5 : 1, display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}>
                  <span style={{ fontSize: 24 }}>{upg.emoji}</span>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: owned ? CLR.neonGreen : CLR.textPrimary, marginBottom: 4 }}>{upg.name} {owned && "\u2713"}</div>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: CLR.textSecondary }}>{upg.description}</div>
                  </div>
                  {!owned && <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: canAfford ? CLR.coin : CLR.cooldown, whiteSpace: "nowrap" }}>{"\uD83E\uDE99"}{upg.cost}</div>}
                </button>
              );
            })}
          </div>
          <button onClick={() => dispatch({ type: "TOGGLE_SHOP" })} style={{ marginTop: 16, width: "100%", padding: 10, background: "transparent", border: `1px solid ${CLR.textSecondary}`, borderRadius: 8, fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: CLR.textSecondary, cursor: "pointer" }}>Sluiten (ESC)</button>
        </div>
      </div>
    );
  }

  function renderStationList() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 8 }}>
        {allStationDefs.map(s => {
          const ss = state.stations[s.id];
          const onCooldown = ss && ss.cooldownEnd > now;
          const cdSec = onCooldown ? Math.ceil((ss.cooldownEnd - now) / 1000) : 0;
          return (
            <div key={s.id} style={{ background: onCooldown ? CLR.wall : `${s.color}22`, border: `1px solid ${onCooldown ? CLR.cooldown + "44" : s.color + "66"}`, borderRadius: 6, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: onCooldown ? CLR.cooldown : CLR.textPrimary, opacity: onCooldown ? 0.6 : 1 }}>
              <span style={{ fontSize: 14 }}>{s.emoji}</span>
              <span>{s.name}</span>
              {onCooldown && <span>({cdSec}s)</span>}
              {!onCooldown && <span style={{ color: CLR.coin }}>+{getEffectiveCoins(s.baseCoins, state)}</span>}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .tuin-game * { box-sizing: border-box; }
        .tuin-game { outline: none; }
        .shop-btn:hover { background: ${CLR.shopBtnHover} !important; transform: scale(1.05); }
        @keyframes pulse-neon { 0%, 100% { text-shadow: 0 0 8px ${CLR.neon}88; } 50% { text-shadow: 0 0 16px ${CLR.neon}, 0 0 24px ${CLR.neon}66; } }
        @keyframes coin-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .turbo-indicator { animation: pulse-neon 0.5s ease-in-out infinite; }
      `}</style>

      <div ref={gameRef} className="tuin-game" tabIndex={0} style={{ minHeight: "100vh", background: CLR.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 8px", fontFamily: "'Press Start 2P', monospace", color: CLR.textPrimary, userSelect: "none" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h1 style={{ fontSize: 20, color: CLR.neon, margin: "0 0 4px 0", textShadow: `0 0 10px ${CLR.neon}88`, animation: "pulse-neon 3s ease-in-out infinite", letterSpacing: 2 }}>{"\uD83C\uDF3F"} TuinBaas</h1>
          <p style={{ fontSize: 8, color: CLR.textSecondary, margin: 0 }}>Hovenier Simulator</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: CLR.coin + "11", border: `1px solid ${CLR.coin}44`, borderRadius: 8, padding: "6px 12px" }}>
            <span style={{ fontSize: 16, animation: "coin-bounce 1s ease-in-out infinite" }}>{"\uD83E\uDE99"}</span>
            <span style={{ fontSize: 14, color: CLR.coin }}>{state.coins}</span>
          </div>
          {turboActive && (
            <div className="turbo-indicator" style={{ fontSize: 9, color: CLR.neonPink, background: CLR.neonPink + "11", border: `1px solid ${CLR.neonPink}44`, borderRadius: 8, padding: "6px 10px" }}>{"\uD83D\uDE80"} TURBO {turboRemaining}s</div>
          )}
          <button className="shop-btn" onClick={() => dispatch({ type: "TOGGLE_SHOP" })} style={{ background: CLR.shopBtn, border: `1px solid ${CLR.shopBtnHover}`, borderRadius: 8, padding: "6px 14px", fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#fff", cursor: "pointer", transition: "all 0.2s" }}>{"\uD83C\uDF3B"} Winkel (E)</button>
          <div style={{ fontSize: 8, color: CLR.textSecondary, background: CLR.wall, borderRadius: 8, padding: "6px 10px" }}>Totaal: {state.totalCoins}</div>
        </div>

        {showMessage && (
          <div style={{ marginBottom: 8, padding: "6px 16px", background: CLR.neon + "11", border: `1px solid ${CLR.neon}33`, borderRadius: 8, fontSize: 8, color: CLR.neon, textAlign: "center", maxWidth: COLS * CELL, animation: "fade-in 0.3s ease-out" }}>{state.message}</div>
        )}

        <div style={{ border: `2px solid ${CLR.neon}44`, borderRadius: 4, overflow: "hidden", boxShadow: `0 0 20px ${CLR.neon}22`, lineHeight: 0 }}>{renderGrid()}</div>

        {renderStationList()}
        {renderDPad()}

        <div style={{ marginTop: 16, fontSize: 7, color: CLR.textSecondary, textAlign: "center", lineHeight: 2, maxWidth: 500 }}>
          <span style={{ color: CLR.neon }}>Pijltjes/WASD</span> = bewegen &nbsp;|&nbsp;
          <span style={{ color: CLR.neonGreen }}>Spatie</span> = actie &nbsp;|&nbsp;
          <span style={{ color: CLR.neonPink }}>E</span> = winkel &nbsp;|&nbsp;
          <span style={{ color: CLR.textSecondary }}>ESC</span> = sluiten
        </div>

        <div style={{ marginTop: 12, fontSize: 7, color: CLR.textSecondary + "88", textAlign: "center" }}>
          Een spel van <a href="https://www.hovenierai.nl" style={{ color: CLR.neon, textDecoration: "none" }}>HovenierAI.nl</a>
        </div>
      </div>

      {renderShop()}
    </>
  );
}
