"use client";

import React, {
  useReducer,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const TILE_W = 64;
const TILE_H = 32;
const TILE_DEPTH = 16;
const GRID_COLS = 12;
const GRID_ROWS = 10;
const MARGIN_TOP = 80;
const LERP_SPEED = 0.12;
const WALK_FRAME_MS = 180;

const COLORS = {
  floorLight: "#90D26D", // bright spring grass
  floorDark: "#7BC55C", // alternating grass
  floorSide: "#5BA84A", // tile sides
  floorSideDark: "#4A9240",
  wall: "#3D8B37", // hedge walls (face)
  wallShadow: "#2D6B27", // hedge walls (side)
  bgTop: "#87CEEB", // sky blue
  bgBot: "#B8E6B8", // horizon green
  accent1: "#32CD32", // mowing station green
  accent2: "#FF8C00", // pruning orange
  accent3: "#4169E1", // pressure wash blue
  accent4: "#FF69B4", // planting pink
  accent5: "#DAA520", // leaf blower gold
  playerHat: "#228B22", // green gardener hat
  playerSkin: "#FDEBD0",
  playerOveralls: "#8B6F47", // brown gardener outfit
  playerShoes: "#5C4033",
  shadow: "rgba(0,0,0,0.13)",
};

type Direction = "n" | "s" | "e" | "w";
type Screen =
  | "title"
  | "world"
  | "mow"
  | "prune"
  | "pressure"
  | "plant"
  | "leaf"
  | "shop";

// ─────────────────────────────────────────────────────────────────────────────
// STATION DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

interface StationDef {
  id: Screen;
  name: string;
  emoji: string;
  col: number;
  row: number;
  color: string;
  colorDark: string;
  available: boolean;
}

const STATIONS: StationDef[] = [
  {
    id: "mow",
    name: "Grasmaaien",
    emoji: "\uD83C\uDF3F",
    col: 2,
    row: 2,
    color: "#32CD32",
    colorDark: "#28A428",
    available: true,
  },
  {
    id: "prune",
    name: "Snoeien",
    emoji: "\u2702\uFE0F",
    col: 9,
    row: 2,
    color: "#FF8C00",
    colorDark: "#CC7000",
    available: false,
  },
  {
    id: "pressure",
    name: "Hogedruk",
    emoji: "\uD83D\uDCA6",
    col: 5,
    row: 7,
    color: "#4169E1",
    colorDark: "#3355BB",
    available: false,
  },
  {
    id: "plant",
    name: "Planten",
    emoji: "\uD83C\uDF31",
    col: 1,
    row: 7,
    color: "#FF69B4",
    colorDark: "#CC5490",
    available: false,
  },
  {
    id: "leaf",
    name: "Bladblazer",
    emoji: "\uD83C\uDF42",
    col: 10,
    row: 7,
    color: "#DAA520",
    colorDark: "#B0851A",
    available: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOW THE LAWN LEVEL DATA (16 rounds)
// ─────────────────────────────────────────────────────────────────────────────

interface MowLevel {
  gridSize: number;
  rocks: [number, number][];
  flowers: [number, number][];
  clientText: string;
}

const TIMER_CURVE = [15, 13, 11, 10, 9, 8, 7, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2];

const MOW_LEVELS: MowLevel[] = [
  // Rounds 1-4: 4x4, no obstacles, generous time
  {
    gridSize: 4,
    rocks: [],
    flowers: [],
    clientText: "Kun je mijn gazon maaien?",
  },
  {
    gridSize: 4,
    rocks: [],
    flowers: [],
    clientText: "Het gras staat veel te hoog!",
  },
  {
    gridSize: 4,
    rocks: [],
    flowers: [],
    clientText: "Mijn buren klagen over het gras!",
  },
  {
    gridSize: 4,
    rocks: [],
    flowers: [],
    clientText: "Kun je het hele gazon doen?",
  },

  // Rounds 5-8: 5x5, 1-2 rocks, 1 flower bed
  {
    gridSize: 5,
    rocks: [[2, 2]],
    flowers: [[0, 4]],
    clientText: "Let op de bloemen alsjeblieft!",
  },
  {
    gridSize: 5,
    rocks: [[1, 1], [3, 3]],
    flowers: [[4, 0]],
    clientText: "Er liggen wat stenen in het gazon.",
  },
  {
    gridSize: 5,
    rocks: [[0, 2]],
    flowers: [[4, 4]],
    clientText: "Pas op voor mijn rozenbed!",
  },
  {
    gridSize: 5,
    rocks: [[2, 0], [2, 4]],
    flowers: [[4, 2]],
    clientText: "De tuin is een beetje rommelig...",
  },

  // Rounds 9-12: 6x6, 3-4 rocks, 2-3 flower beds
  {
    gridSize: 6,
    rocks: [[1, 1], [3, 3], [4, 1]],
    flowers: [[0, 5], [5, 0]],
    clientText: "Deze tuin is al maanden niet gedaan!",
  },
  {
    gridSize: 6,
    rocks: [[0, 0], [2, 4], [4, 2]],
    flowers: [[1, 5], [5, 1], [3, 0]],
    clientText: "Mijn hele achtertuin moet gemaaid!",
  },
  {
    gridSize: 6,
    rocks: [[1, 3], [3, 1], [4, 4], [0, 5]],
    flowers: [[2, 0], [5, 3]],
    clientText: "Het is een jungle hier geworden!",
  },
  {
    gridSize: 6,
    rocks: [[0, 2], [2, 0], [3, 5], [5, 3]],
    flowers: [[0, 4], [4, 0], [5, 5]],
    clientText: "De buurvrouw komt op bezoek, snel!",
  },

  // Rounds 13-16: 7x7, 5+ rocks, 3+ flowers, tight timer
  {
    gridSize: 7,
    rocks: [[1, 1], [1, 5], [3, 3], [5, 1], [5, 5]],
    flowers: [[0, 6], [6, 0], [3, 6]],
    clientText: "Het hele landgoed moet klaar vandaag!",
  },
  {
    gridSize: 7,
    rocks: [[0, 3], [2, 1], [2, 5], [4, 3], [6, 1], [6, 5]],
    flowers: [[0, 0], [0, 6], [6, 6]],
    clientText: "Een enorm gazon, veel succes!",
  },
  {
    gridSize: 7,
    rocks: [[1, 2], [1, 4], [3, 0], [3, 6], [5, 2], [5, 4]],
    flowers: [[0, 0], [6, 6], [0, 6], [6, 0]],
    clientText: "Dit is de moeilijkste klus ooit!",
  },
  {
    gridSize: 7,
    rocks: [[1, 1], [1, 3], [1, 5], [3, 1], [3, 5], [5, 1], [5, 3], [5, 5]],
    flowers: [[0, 0], [0, 6], [6, 0]],
    clientText: "De finale! Laat zien wat je kan!",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UPGRADE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

interface UpgradeDef {
  id: string;
  name: string;
  desc: string;
  cost: number;
  emoji: string;
}

const UPGRADES: UpgradeDef[] = [
  {
    id: "faster_hands",
    name: "Snellere Handen",
    desc: "+2 seconden per ronde",
    cost: 50,
    emoji: "\uD83D\uDD90\uFE0F",
  },
  {
    id: "better_tools",
    name: "Beter Gereedschap",
    desc: "+25% muntbonus",
    cost: 100,
    emoji: "\uD83E\uDE9B",
  },
  {
    id: "safety_net",
    name: "Veiligheidsnet",
    desc: "1 extra kans bij falen",
    cost: 150,
    emoji: "\uD83D\uDEE1\uFE0F",
  },
  {
    id: "client_patience",
    name: "Klantvriendelijkheid",
    desc: "+3 seconden geduld klant",
    cost: 200,
    emoji: "\uD83D\uDE0A",
  },
  {
    id: "garden_vision",
    name: "Tuinvisie",
    desc: "Markeer optimaal pad bij start",
    cost: 250,
    emoji: "\uD83D\uDC41\uFE0F",
  },
  {
    id: "double_coins",
    name: "Dubbele Munten",
    desc: "2x munten voor 3 rondes",
    cost: 300,
    emoji: "\uD83D\uDCB0",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOW GRID CELL TYPES
// ─────────────────────────────────────────────────────────────────────────────

type MowCellType = "unmowed" | "mowed" | "rock" | "flower" | "current";

// ─────────────────────────────────────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────────────────────────────────────

interface StationProgress {
  bestRound: number;
  stars: number[];
}

interface AppState {
  screen: Screen;
  coins: number;
  totalCoins: number;
  upgrades: Record<string, boolean>;
  progress: Record<string, StationProgress>;
  // World
  playerCol: number;
  playerRow: number;
  facing: Direction;
  // Mini-game
  currentRound: number;
  roundActive: boolean;
  roundTimer: number;
  roundStartTime: number;
  clientMood: "waiting" | "happy" | "angry" | null;
  roundResult: "none" | "success" | "fail";
  lives: number;
  // Mow the lawn
  mowGrid: MowCellType[][] | null;
  mowGridSize: number;
  mowPath: [number, number][];
  mowPenalty: boolean;
  // Coming soon
  comingSoon: boolean;
}

const INITIAL_STATE: AppState = {
  screen: "title",
  coins: 0,
  totalCoins: 0,
  upgrades: {},
  progress: {},
  playerCol: 6,
  playerRow: 5,
  facing: "s",
  currentRound: 0,
  roundActive: false,
  roundTimer: 0,
  roundStartTime: 0,
  clientMood: null,
  roundResult: "none",
  lives: 1,
  mowGrid: null,
  mowGridSize: 0,
  mowPath: [],
  mowPenalty: false,
  comingSoon: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────

type Action =
  | { type: "START_GAME" }
  | { type: "MOVE_PLAYER"; dir: Direction }
  | { type: "ENTER_STATION"; station: Screen }
  | { type: "EXIT_TO_WORLD" }
  | { type: "OPEN_SHOP" }
  | { type: "CLOSE_SHOP" }
  | { type: "BUY_UPGRADE"; id: string }
  | { type: "START_ROUND"; round: number }
  | { type: "MOW_CELL"; row: number; col: number }
  | { type: "CHECK_MOWED" }
  | { type: "ROUND_SUCCESS" }
  | { type: "ROUND_FAIL" }
  | { type: "NEXT_ROUND" }
  | { type: "TICK_TIMER"; now: number }
  | { type: "SHOW_COMING_SOON" }
  | { type: "HIDE_COMING_SOON" }
  | { type: "CLEAR_PENALTY" };

function buildMowGrid(level: MowLevel): MowCellType[][] {
  const { gridSize, rocks, flowers } = level;
  const grid: MowCellType[][] = [];
  for (let r = 0; r < gridSize; r++) {
    const row: MowCellType[] = [];
    for (let c = 0; c < gridSize; c++) {
      row.push("unmowed");
    }
    grid.push(row);
  }
  for (const [rr, rc] of rocks) {
    if (rr < gridSize && rc < gridSize) {
      grid[rr][rc] = "rock";
    }
  }
  for (const [fr, fc] of flowers) {
    if (fr < gridSize && fc < gridSize) {
      grid[fr][fc] = "flower";
    }
  }
  return grid;
}

function countUnmowed(grid: MowCellType[][], gridSize: number): number {
  let count = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === "unmowed") count++;
    }
  }
  return count;
}

function isAdjacent(r1: number, c1: number, r2: number, c2: number): boolean {
  const dr = Math.abs(r1 - r2);
  const dc = Math.abs(c1 - c2);
  return (dr + dc) === 1;
}

function getTimerForRound(round: number, upgrades: Record<string, boolean>): number {
  let base = TIMER_CURVE[Math.min(round, TIMER_CURVE.length - 1)];
  if (upgrades.faster_hands) base += 2;
  if (upgrades.client_patience) base += 3;
  return base;
}

function getCoinsForRound(round: number, upgrades: Record<string, boolean>): number {
  let base = 5 + round * 3;
  if (upgrades.better_tools) base = Math.floor(base * 1.25);
  if (upgrades.double_coins) base *= 2;
  return base;
}

// Check if a station is adjacent to player
function isAdjacentToStation(
  playerCol: number,
  playerRow: number,
  station: StationDef
): boolean {
  const dx = Math.abs(playerCol - station.col);
  const dy = Math.abs(playerRow - station.row);
  return (dx <= 1 && dy <= 1) && (dx + dy > 0);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "START_GAME":
      return { ...state, screen: "world" };

    case "MOVE_PLAYER": {
      if (state.screen !== "world") return state;
      let nc = state.playerCol;
      let nr = state.playerRow;
      switch (action.dir) {
        case "n":
          nr = Math.max(0, nr - 1);
          break;
        case "s":
          nr = Math.min(GRID_ROWS - 1, nr + 1);
          break;
        case "w":
          nc = Math.max(0, nc - 1);
          break;
        case "e":
          nc = Math.min(GRID_COLS - 1, nc + 1);
          break;
      }
      // Don't walk onto station tiles
      for (const st of STATIONS) {
        if (nc === st.col && nr === st.row) {
          return { ...state, facing: action.dir };
        }
      }
      return { ...state, playerCol: nc, playerRow: nr, facing: action.dir };
    }

    case "ENTER_STATION": {
      const station = STATIONS.find((s) => s.id === action.station);
      if (!station) return state;
      if (!station.available) {
        return { ...state, comingSoon: true };
      }
      // Start at round 0
      const level = MOW_LEVELS[0];
      const grid = buildMowGrid(level);
      const timer = getTimerForRound(0, state.upgrades);
      return {
        ...state,
        screen: action.station,
        currentRound: 0,
        roundActive: true,
        roundTimer: timer,
        roundStartTime: Date.now() / 1000,
        clientMood: "waiting",
        roundResult: "none",
        lives: state.upgrades.safety_net ? 2 : 1,
        mowGrid: grid,
        mowGridSize: level.gridSize,
        mowPath: [],
        mowPenalty: false,
      };
    }

    case "EXIT_TO_WORLD":
      return {
        ...state,
        screen: "world",
        roundActive: false,
        mowGrid: null,
        mowPath: [],
        clientMood: null,
        comingSoon: false,
      };

    case "OPEN_SHOP":
      return { ...state, screen: "shop" };

    case "CLOSE_SHOP":
      return { ...state, screen: "world" };

    case "BUY_UPGRADE": {
      const upg = UPGRADES.find((u) => u.id === action.id);
      if (!upg) return state;
      if (state.upgrades[action.id]) return state;
      if (state.coins < upg.cost) return state;
      return {
        ...state,
        coins: state.coins - upg.cost,
        upgrades: { ...state.upgrades, [action.id]: true },
      };
    }

    case "START_ROUND": {
      const round = action.round;
      if (round >= MOW_LEVELS.length) {
        // All rounds done! Back to world with max progress
        const prog = { ...state.progress };
        prog["mow"] = {
          bestRound: 16,
          stars: Array.from({ length: 16 }, (_, i) =>
            (state.progress["mow"]?.stars?.[i] ?? 0) || 1
          ),
        };
        return {
          ...state,
          screen: "world",
          roundActive: false,
          mowGrid: null,
          mowPath: [],
          clientMood: null,
          progress: prog,
        };
      }
      const level = MOW_LEVELS[round];
      const grid = buildMowGrid(level);
      const timer = getTimerForRound(round, state.upgrades);
      return {
        ...state,
        currentRound: round,
        roundActive: true,
        roundTimer: timer,
        roundStartTime: Date.now() / 1000,
        clientMood: "waiting",
        roundResult: "none",
        mowGrid: grid,
        mowGridSize: level.gridSize,
        mowPath: [],
        mowPenalty: false,
      };
    }

    case "MOW_CELL": {
      if (!state.mowGrid || !state.roundActive) return state;
      const { row, col } = action;
      if (row < 0 || row >= state.mowGridSize || col < 0 || col >= state.mowGridSize)
        return state;

      const cell = state.mowGrid[row][col];

      // Can't mow rocks
      if (cell === "rock") return state;

      // Hit a flower bed — penalty!
      if (cell === "flower") {
        // Deduct 1 second as penalty, flash indicator
        const newTimer = Math.max(0, state.roundTimer - 1);
        return {
          ...state,
          roundTimer: newTimer,
          mowPenalty: true,
        };
      }

      // Can't retrace already-mowed tiles
      if (cell === "mowed" || cell === "current") return state;

      // Must be adjacent to the last mowed tile (or first move)
      if (state.mowPath.length > 0) {
        const [lastR, lastC] = state.mowPath[state.mowPath.length - 1];
        if (!isAdjacent(lastR, lastC, row, col)) return state;
      }

      // Mow this cell
      const newGrid = state.mowGrid.map((r) => [...r]);

      // Set previous current to mowed
      if (state.mowPath.length > 0) {
        const [prevR, prevC] = state.mowPath[state.mowPath.length - 1];
        if (newGrid[prevR][prevC] === "current") {
          newGrid[prevR][prevC] = "mowed";
        }
      }

      newGrid[row][col] = "current";
      const newPath = [...state.mowPath, [row, col] as [number, number]];

      // Check if all unmowed tiles are now mowed
      const remaining = countUnmowed(newGrid, state.mowGridSize);
      if (remaining === 0) {
        // All mowed! Success
        return {
          ...state,
          mowGrid: newGrid,
          mowPath: newPath,
          roundResult: "success",
          roundActive: false,
        };
      }

      return {
        ...state,
        mowGrid: newGrid,
        mowPath: newPath,
      };
    }

    case "CHECK_MOWED": {
      if (!state.mowGrid || !state.roundActive) return state;
      const remaining = countUnmowed(state.mowGrid, state.mowGridSize);
      if (remaining === 0) {
        return { ...state, roundResult: "success", roundActive: false };
      }
      return state;
    }

    case "ROUND_SUCCESS": {
      const coinsEarned = getCoinsForRound(state.currentRound, state.upgrades);
      const prog = { ...state.progress };
      const stationProg = prog["mow"] || { bestRound: 0, stars: [] };
      const newStars = [...stationProg.stars];
      newStars[state.currentRound] = Math.max(
        newStars[state.currentRound] || 0,
        1
      );
      prog["mow"] = {
        bestRound: Math.max(stationProg.bestRound, state.currentRound + 1),
        stars: newStars,
      };
      return {
        ...state,
        coins: state.coins + coinsEarned,
        totalCoins: state.totalCoins + coinsEarned,
        clientMood: "happy",
        progress: prog,
      };
    }

    case "ROUND_FAIL": {
      if (state.lives > 1) {
        // Use a life, restart timer
        const timer = getTimerForRound(state.currentRound, state.upgrades);
        const level = MOW_LEVELS[state.currentRound];
        const grid = buildMowGrid(level);
        return {
          ...state,
          lives: state.lives - 1,
          roundTimer: timer,
          roundStartTime: Date.now() / 1000,
          roundResult: "none",
          mowGrid: grid,
          mowPath: [],
          mowPenalty: false,
        };
      }
      return {
        ...state,
        roundActive: false,
        clientMood: "angry",
        roundResult: "fail",
      };
    }

    case "NEXT_ROUND":
      return { ...state, roundResult: "none" };

    case "TICK_TIMER": {
      if (!state.roundActive) return state;
      const elapsed = action.now / 1000 - state.roundStartTime;
      const remaining = state.roundTimer - elapsed;
      if (remaining <= 0) {
        // Time's up
        if (state.lives > 1) {
          const timer = getTimerForRound(state.currentRound, state.upgrades);
          const level = MOW_LEVELS[state.currentRound];
          const grid = buildMowGrid(level);
          return {
            ...state,
            lives: state.lives - 1,
            roundTimer: timer,
            roundStartTime: action.now / 1000,
            mowGrid: grid,
            mowPath: [],
            mowPenalty: false,
          };
        }
        return {
          ...state,
          roundActive: false,
          clientMood: "angry",
          roundResult: "fail",
        };
      }
      return state;
    }

    case "SHOW_COMING_SOON":
      return { ...state, comingSoon: true };

    case "HIDE_COMING_SOON":
      return { ...state, comingSoon: false };

    case "CLEAR_PENALTY":
      return { ...state, mowPenalty: false };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WEB AUDIO SOUND SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

class SoundEngine {
  private ctx: AudioContext | null = null;

  private ensureCtx() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playNote(freq: number, duration: number, volume = 0.15, type: OscillatorType = "sine") {
    try {
      const ctx = this.ensureCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not available
    }
  }

  step() {
    this.playNote(220, 0.08, 0.08, "square");
    setTimeout(() => this.playNote(280, 0.06, 0.06, "square"), 50);
  }

  mowGrass() {
    // Short satisfying snip/mow sound
    this.playNote(440, 0.06, 0.1, "sawtooth");
    setTimeout(() => this.playNote(550, 0.05, 0.08, "sawtooth"), 40);
  }

  hitFlower() {
    // Warning buzz
    this.playNote(150, 0.2, 0.15, "sawtooth");
    setTimeout(() => this.playNote(120, 0.15, 0.1, "square"), 100);
  }

  success() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.2, 0.12, "sine"), i * 100);
    });
  }

  fail() {
    this.playNote(200, 0.3, 0.15, "sawtooth");
    setTimeout(() => this.playNote(150, 0.4, 0.12, "sawtooth"), 200);
  }

  coin() {
    this.playNote(988, 0.08, 0.1, "square");
    setTimeout(() => this.playNote(1319, 0.15, 0.12, "square"), 80);
  }

  enterStation() {
    this.playNote(440, 0.1, 0.1, "sine");
    setTimeout(() => this.playNote(554, 0.1, 0.1, "sine"), 80);
    setTimeout(() => this.playNote(659, 0.15, 0.12, "sine"), 160);
  }

  buyUpgrade() {
    const notes = [660, 880, 1100, 880, 1100, 1320];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.12, 0.08, "sine"), i * 70);
    });
  }

  tick() {
    this.playNote(800, 0.03, 0.05, "square");
  }

  titleJingle() {
    // Nature-inspired melody with birds chirp feel
    const melody = [523, 587, 659, 784, 880, 784, 659, 784];
    melody.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.2, 0.1, "sine"), i * 150);
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SPRITE GENERATION (offscreen canvas)
// ─────────────────────────────────────────────────────────────────────────────

function createPlayerSprite(
  facing: Direction,
  frame: number,
  scale = 3
): HTMLCanvasElement {
  const w = 12 * scale;
  const h = 18 * scale;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  const px = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * scale, y * scale, scale, scale);
  };

  // Walk bob
  const bob = frame % 2 === 0 ? 0 : -1;

  // Green gardener hat
  for (let x = 3; x <= 8; x++) px(x, 0 + bob, COLORS.playerHat);
  for (let x = 2; x <= 9; x++) px(x, 1 + bob, COLORS.playerHat);
  for (let x = 3; x <= 8; x++) px(x, 2 + bob, COLORS.playerHat);

  // Face
  for (let x = 3; x <= 8; x++) {
    px(x, 3 + bob, COLORS.playerSkin);
    px(x, 4 + bob, COLORS.playerSkin);
    px(x, 5 + bob, COLORS.playerSkin);
  }

  // Eyes based on facing
  const eyeColor = "#2C3E50";
  if (facing === "s") {
    px(4, 4 + bob, eyeColor);
    px(7, 4 + bob, eyeColor);
  } else if (facing === "n") {
    // Back of head - no eyes
  } else if (facing === "e") {
    px(7, 4 + bob, eyeColor);
    px(6, 4 + bob, eyeColor);
  } else {
    px(4, 4 + bob, eyeColor);
    px(5, 4 + bob, eyeColor);
  }

  // Body (brown gardener outfit)
  for (let x = 3; x <= 8; x++) {
    for (let y = 6; y <= 11; y++) {
      px(x, y + bob, COLORS.playerOveralls);
    }
  }
  // Belt (green)
  for (let x = 3; x <= 8; x++) px(x, 8 + bob, "#228B22");

  // Arms
  const armOff = frame % 2 === 0 ? 0 : 1;
  px(2, 7 + bob + armOff, COLORS.playerSkin);
  px(2, 8 + bob + armOff, COLORS.playerSkin);
  px(9, 7 + bob - armOff, COLORS.playerSkin);
  px(9, 8 + bob - armOff, COLORS.playerSkin);

  // Legs
  const legFrame = frame % 4;
  if (legFrame === 0 || legFrame === 2) {
    for (let y = 12; y <= 15; y++) {
      px(4, y + bob, COLORS.playerOveralls);
      px(7, y + bob, COLORS.playerOveralls);
    }
    px(4, 16 + bob, COLORS.playerShoes);
    px(7, 16 + bob, COLORS.playerShoes);
    px(4, 17 + bob, COLORS.playerShoes);
    px(7, 17 + bob, COLORS.playerShoes);
  } else if (legFrame === 1) {
    for (let y = 12; y <= 15; y++) {
      px(3, y + bob, COLORS.playerOveralls);
      px(7, y + bob, COLORS.playerOveralls);
    }
    px(3, 16 + bob, COLORS.playerShoes);
    px(7, 16 + bob, COLORS.playerShoes);
    px(2, 17 + bob, COLORS.playerShoes);
    px(7, 17 + bob, COLORS.playerShoes);
  } else {
    for (let y = 12; y <= 15; y++) {
      px(4, y + bob, COLORS.playerOveralls);
      px(8, y + bob, COLORS.playerOveralls);
    }
    px(4, 16 + bob, COLORS.playerShoes);
    px(8, 16 + bob, COLORS.playerShoes);
    px(4, 17 + bob, COLORS.playerShoes);
    px(9, 17 + bob, COLORS.playerShoes);
  }

  return c;
}

// ─────────────────────────────────────────────────────────────────────────────
// ISOMETRIC HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function gridToScreen(
  col: number,
  row: number,
  canvasWidth: number
): { x: number; y: number } {
  return {
    x: (col - row) * (TILE_W / 2) + canvasWidth / 2,
    y: (col + row) * (TILE_H / 2) + MARGIN_TOP,
  };
}

function screenToGrid(
  sx: number,
  sy: number,
  canvasWidth: number
): { col: number; row: number } {
  const mx = sx - canvasWidth / 2;
  const my = sy - MARGIN_TOP;
  const col = Math.round((mx / (TILE_W / 2) + my / (TILE_H / 2)) / 2);
  const row = Math.round((my / (TILE_H / 2) - mx / (TILE_W / 2)) / 2);
  return { col, row };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function SpelContent() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const soundRef = useRef<SoundEngine | null>(null);
  const lastTickRef = useRef(0);

  // Animation state (not in reducer for smooth visuals)
  const animState = useRef({
    playerDrawX: 0,
    playerDrawY: 0,
    playerTargetX: 0,
    playerTargetY: 0,
    walkFrame: 0,
    lastFrameTime: 0,
    isMoving: false,
    initialized: false,
    stationPulse: 0,
    clientBob: 0,
  });

  // Sprite cache
  const spriteCache = useRef<Map<string, HTMLCanvasElement>>(new Map());

  // Canvas size
  const canvasSize = useRef({ w: 800, h: 600 });

  // Initialize sound
  useEffect(() => {
    soundRef.current = new SoundEngine();
  }, []);

  // Get or create sprite
  const getSprite = useCallback(
    (facing: Direction, frame: number): HTMLCanvasElement => {
      const key = `${facing}_${frame % 4}`;
      let sprite = spriteCache.current.get(key);
      if (!sprite) {
        sprite = createPlayerSprite(facing, frame % 4);
        spriteCache.current.set(key, sprite);
      }
      return sprite;
    },
    []
  );

  // ─── DRAW ISOMETRIC TILE ─────────────────────────────────────────────
  const drawTile = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      topColor: string,
      leftColor: string,
      rightColor: string,
      depth: number = TILE_DEPTH
    ) => {
      const hw = TILE_W / 2;
      const hh = TILE_H / 2;

      // Top face
      ctx.fillStyle = topColor;
      ctx.beginPath();
      ctx.moveTo(x, y - hh);
      ctx.lineTo(x + hw, y);
      ctx.lineTo(x, y + hh);
      ctx.lineTo(x - hw, y);
      ctx.closePath();
      ctx.fill();

      // Left face
      ctx.fillStyle = leftColor;
      ctx.beginPath();
      ctx.moveTo(x - hw, y);
      ctx.lineTo(x, y + hh);
      ctx.lineTo(x, y + hh + depth);
      ctx.lineTo(x - hw, y + depth);
      ctx.closePath();
      ctx.fill();

      // Right face
      ctx.fillStyle = rightColor;
      ctx.beginPath();
      ctx.moveTo(x + hw, y);
      ctx.lineTo(x, y + hh);
      ctx.lineTo(x, y + hh + depth);
      ctx.lineTo(x + hw, y + depth);
      ctx.closePath();
      ctx.fill();

      // Top face outline
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y - hh);
      ctx.lineTo(x + hw, y);
      ctx.lineTo(x, y + hh);
      ctx.lineTo(x - hw, y);
      ctx.closePath();
      ctx.stroke();
    },
    []
  );

  // ─── DRAW STATION ────────────────────────────────────────────────────
  const drawStation = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      station: StationDef,
      cw: number,
      pulse: number
    ) => {
      const { x, y } = gridToScreen(station.col, station.row, cw);
      const pulseSc = 1 + Math.sin(pulse) * 0.03;

      // Platform (taller tile)
      drawTile(ctx, x, y - 4, station.color, station.colorDark, station.colorDark, 20);

      // Glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40 * pulseSc);
      gradient.addColorStop(0, station.color + "40");
      gradient.addColorStop(1, station.color + "00");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y - 8, 40 * pulseSc, 0, Math.PI * 2);
      ctx.fill();

      // Emoji icon
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(station.emoji, x, y - 16);

      // Label
      ctx.font = "bold 9px 'Press Start 2P', monospace";
      ctx.fillStyle = "#2D5A27";
      ctx.textAlign = "center";
      ctx.fillText(station.name, x, y + 28);

      // Progress stars
      const prog = stateRef.current.progress[station.id as string];
      if (prog && prog.bestRound > 0) {
        const starCount = Math.min(3, Math.ceil(prog.bestRound / 5));
        const starStr = "\u2605".repeat(starCount) + "\u2606".repeat(3 - starCount);
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#F4D03F";
        ctx.fillText(starStr, x, y + 42);
      }
    },
    [drawTile]
  );

  // ─── DRAW PLAYER ─────────────────────────────────────────────────────
  const drawPlayer = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, facing: Direction, frame: number) => {
      // Shadow
      ctx.fillStyle = COLORS.shadow;
      ctx.beginPath();
      ctx.ellipse(x, y + 6, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sprite
      const sprite = getSprite(facing, frame);
      ctx.drawImage(sprite, x - sprite.width / 2, y - sprite.height + 8);
    },
    [getSprite]
  );

  // ─── DRAW HEDGE WALLS ────────────────────────────────────────────────
  const drawWalls = useCallback(
    (ctx: CanvasRenderingContext2D, cw: number) => {
      // Back hedge (row 0) — tall green hedge
      for (let c = 0; c < GRID_COLS; c++) {
        const { x, y } = gridToScreen(c, 0, cw);
        // Hedge face
        ctx.fillStyle = COLORS.wall;
        ctx.beginPath();
        ctx.moveTo(x, y - TILE_H / 2 - 30);
        ctx.lineTo(x + TILE_W / 2, y - 30);
        ctx.lineTo(x + TILE_W / 2, y);
        ctx.lineTo(x, y + TILE_H / 2);
        ctx.lineTo(x - TILE_W / 2, y);
        ctx.lineTo(x - TILE_W / 2, y - 30);
        ctx.closePath();
        ctx.fill();

        // Hedge shadow side
        ctx.fillStyle = COLORS.wallShadow;
        ctx.beginPath();
        ctx.moveTo(x - TILE_W / 2, y - 30);
        ctx.lineTo(x, y - TILE_H / 2 - 30);
        ctx.lineTo(x, y - TILE_H / 2);
        ctx.lineTo(x - TILE_W / 2, y);
        ctx.closePath();
        ctx.fill();

        // Leaf detail dots on hedge
        ctx.fillStyle = "#4AA844";
        const leafPositions = [
          [x - 8, y - 20],
          [x + 5, y - 15],
          [x - 3, y - 25],
          [x + 10, y - 22],
        ];
        for (const [lx, ly] of leafPositions) {
          ctx.beginPath();
          ctx.arc(lx, ly, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Left hedge (col 0)
      for (let r = 0; r < GRID_ROWS; r++) {
        const { x, y } = gridToScreen(0, r, cw);
        ctx.fillStyle = COLORS.wall;
        ctx.beginPath();
        ctx.moveTo(x - TILE_W / 2, y - 30);
        ctx.lineTo(x, y - TILE_H / 2 - 30);
        ctx.lineTo(x, y - TILE_H / 2);
        ctx.lineTo(x - TILE_W / 2, y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = COLORS.wallShadow + "80";
        ctx.beginPath();
        ctx.moveTo(x - TILE_W / 2, y);
        ctx.lineTo(x - TILE_W / 2 - 6, y + 4);
        ctx.lineTo(x - TILE_W / 2 - 6, y - 26);
        ctx.lineTo(x - TILE_W / 2, y - 30);
        ctx.closePath();
        ctx.fill();
      }
    },
    []
  );

  // ─── WORLD RENDER LOOP ───────────────────────────────────────────────
  const renderWorld = useCallback(
    (ctx: CanvasRenderingContext2D, cw: number, ch: number, now: number) => {
      const anim = animState.current;
      const st = stateRef.current;

      // Sky blue to horizon green gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
      bgGrad.addColorStop(0, COLORS.bgTop);
      bgGrad.addColorStop(1, COLORS.bgBot);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Draw some clouds in the sky
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      const cloudTime = now / 5000;
      const cloud1X = ((cloudTime * 20) % (cw + 100)) - 50;
      const cloud2X = ((cloudTime * 12 + 300) % (cw + 100)) - 50;
      ctx.beginPath();
      ctx.arc(cloud1X, 30, 15, 0, Math.PI * 2);
      ctx.arc(cloud1X + 20, 25, 18, 0, Math.PI * 2);
      ctx.arc(cloud1X + 40, 30, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cloud2X, 50, 12, 0, Math.PI * 2);
      ctx.arc(cloud2X + 18, 46, 15, 0, Math.PI * 2);
      ctx.arc(cloud2X + 34, 50, 11, 0, Math.PI * 2);
      ctx.fill();

      // Calculate player target
      const playerScreen = gridToScreen(st.playerCol, st.playerRow, cw);
      anim.playerTargetX = playerScreen.x;
      anim.playerTargetY = playerScreen.y;

      if (!anim.initialized) {
        anim.playerDrawX = anim.playerTargetX;
        anim.playerDrawY = anim.playerTargetY;
        anim.initialized = true;
      }

      // Lerp player position
      anim.playerDrawX += (anim.playerTargetX - anim.playerDrawX) * LERP_SPEED;
      anim.playerDrawY += (anim.playerTargetY - anim.playerDrawY) * LERP_SPEED;

      const dx = Math.abs(anim.playerDrawX - anim.playerTargetX);
      const dy = Math.abs(anim.playerDrawY - anim.playerTargetY);
      anim.isMoving = dx > 1 || dy > 1;

      // Walk animation
      if (anim.isMoving) {
        if (now - anim.lastFrameTime > WALK_FRAME_MS) {
          anim.walkFrame = (anim.walkFrame + 1) % 4;
          anim.lastFrameTime = now;
        }
      } else {
        anim.walkFrame = 0;
      }

      // Station pulse
      anim.stationPulse = now / 500;

      // Client bob
      anim.clientBob = Math.sin(now / 300) * 2;

      // Draw grass floor tiles (back to front)
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const { x, y } = gridToScreen(c, r, cw);
          const isCheckerDark = (c + r) % 2 === 0;
          const topColor = isCheckerDark ? COLORS.floorDark : COLORS.floorLight;
          drawTile(ctx, x, y, topColor, COLORS.floorSide, COLORS.floorSideDark);
        }
      }

      // Draw hedge walls
      drawWalls(ctx, cw);

      // Collect all drawable entities for depth sorting
      interface Drawable {
        row: number;
        col: number;
        draw: () => void;
      }
      const drawables: Drawable[] = [];

      // Add stations
      for (const station of STATIONS) {
        drawables.push({
          row: station.row,
          col: station.col,
          draw: () => drawStation(ctx, station, cw, anim.stationPulse),
        });
      }

      // Add player
      drawables.push({
        row: st.playerRow,
        col: st.playerCol,
        draw: () =>
          drawPlayer(
            ctx,
            anim.playerDrawX,
            anim.playerDrawY - 12,
            st.facing,
            anim.walkFrame
          ),
      });

      // Sort by row then col for proper depth
      drawables.sort((a, b) => {
        const depthA = a.row + a.col;
        const depthB = b.row + b.col;
        return depthA - depthB;
      });

      // Draw all entities
      for (const d of drawables) {
        d.draw();
      }

      // Garden decorations on empty tiles
      const decorPositions = [
        { c: 4, r: 1, emoji: "\uD83C\uDF3B" },  // sunflower
        { c: 7, r: 1, emoji: "\uD83E\uDEB4" },  // potted plant
        { c: 0, r: 4, emoji: "\uD83E\uDDF9" },  // broom/rake
        { c: 11, r: 3, emoji: "\uD83E\uDDF0" },  // toolbox
        { c: 3, r: 9, emoji: "\uD83E\uDD8B" },  // butterfly
        { c: 8, r: 9, emoji: "\uD83C\uDF37" },  // tulip
        { c: 11, r: 8, emoji: "\uD83D\uDEBF" },  // watering
        { c: 6, r: 1, emoji: "\uD83C\uDFE1" },  // house
      ];

      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const dec of decorPositions) {
        // Don't draw if player or station is on this tile
        const isStation = STATIONS.some(
          (s) => s.col === dec.c && s.row === dec.r
        );
        if (isStation) continue;
        const { x, y } = gridToScreen(dec.c, dec.r, cw);
        ctx.globalAlpha = 0.7;
        ctx.fillText(dec.emoji, x, y - 6);
        ctx.globalAlpha = 1;
      }

      // Animated butterflies
      const butterflyTime = now / 1000;
      ctx.font = "12px sans-serif";
      ctx.globalAlpha = 0.5;
      const bx1 = cw * 0.7 + Math.sin(butterflyTime * 1.5) * 30;
      const by1 = 120 + Math.cos(butterflyTime * 2) * 15;
      ctx.fillText("\uD83E\uDD8B", bx1, by1);
      const bx2 = cw * 0.3 + Math.cos(butterflyTime * 1.2) * 25;
      const by2 = 160 + Math.sin(butterflyTime * 1.8) * 12;
      ctx.fillText("\uD83E\uDD8B", bx2, by2);
      ctx.globalAlpha = 1;
    },
    [drawTile, drawStation, drawPlayer, drawWalls]
  );

  // ─── CANVAS GAME LOOP ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      canvasSize.current = { w: rect.width, h: rect.height };
      animState.current.initialized = false;
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = (timestamp: number) => {
      const st = stateRef.current;
      const { w, h } = canvasSize.current;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      if (st.screen === "world" || st.screen === "shop") {
        renderWorld(ctx, w, h, timestamp);
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [renderWorld]);

  // ─── KEYBOARD INPUT ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const st = stateRef.current;

      if (st.screen === "title") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dispatch({ type: "START_GAME" });
          soundRef.current?.enterStation();
        }
        return;
      }

      if (st.screen === "world") {
        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "n" });
            soundRef.current?.step();
            break;
          case "ArrowDown":
          case "s":
          case "S":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "s" });
            soundRef.current?.step();
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "w" });
            soundRef.current?.step();
            break;
          case "ArrowRight":
          case "d":
          case "D":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "e" });
            soundRef.current?.step();
            break;
          case " ":
          case "Enter":
            e.preventDefault();
            // Check if adjacent to any station
            for (const station of STATIONS) {
              if (
                isAdjacentToStation(st.playerCol, st.playerRow, station)
              ) {
                if (station.available) {
                  dispatch({ type: "ENTER_STATION", station: station.id });
                  soundRef.current?.enterStation();
                } else {
                  dispatch({ type: "SHOW_COMING_SOON" });
                }
                break;
              }
            }
            break;
        }
        return;
      }

      if (st.screen === "mow" && st.roundActive) {
        if (e.key === "Escape") {
          dispatch({ type: "EXIT_TO_WORLD" });
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ─── ROUND TIMER ─────────────────────────────────────────────────────
  useEffect(() => {
    if (state.screen !== "mow" || !state.roundActive) return;

    const interval = setInterval(() => {
      const st = stateRef.current;
      if (!st.roundActive) return;
      const now = Date.now();
      const elapsed = now / 1000 - st.roundStartTime;
      const remaining = st.roundTimer - elapsed;

      // Tick sound in last 5 seconds
      if (remaining <= 5 && remaining > 0) {
        const currentSecond = Math.ceil(remaining);
        if (currentSecond !== lastTickRef.current) {
          lastTickRef.current = currentSecond;
          soundRef.current?.tick();
        }
      }

      if (remaining <= 0) {
        dispatch({ type: "ROUND_FAIL" });
        soundRef.current?.fail();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [state.screen, state.roundActive, state.currentRound]);

  // ─── HANDLE ROUND RESULT ─────────────────────────────────────────────
  useEffect(() => {
    if (state.roundResult === "success" && state.clientMood !== "happy") {
      dispatch({ type: "ROUND_SUCCESS" });
      soundRef.current?.success();
      soundRef.current?.coin();
    }
  }, [state.roundResult, state.clientMood]);

  // ─── PENALTY FLASH CLEAR ─────────────────────────────────────────────
  useEffect(() => {
    if (state.mowPenalty) {
      soundRef.current?.hitFlower();
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_PENALTY" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.mowPenalty]);

  // Timer display calculation
  const timeRemaining = useMemo(() => {
    if (!state.roundActive) return 0;
    const elapsed = Date.now() / 1000 - state.roundStartTime;
    return Math.max(0, state.roundTimer - elapsed);
  }, [state.roundActive, state.roundTimer, state.roundStartTime]);

  // Force re-render for timer display
  const [, setTick] = React.useState(0);
  useEffect(() => {
    if (state.screen !== "mow" || !state.roundActive) return;
    const timer = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(timer);
  }, [state.screen, state.roundActive]);

  // Compute live timer
  const liveTimer = useMemo(() => {
    if (!state.roundActive) return 0;
    const elapsed = Date.now() / 1000 - state.roundStartTime;
    return Math.max(0, state.roundTimer - elapsed);
  }, [state.roundActive, state.roundTimer, state.roundStartTime, state]);

  // ─── CLICK ON CANVAS (world) ─────────────────────────────────────────
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const st = stateRef.current;
      if (st.screen !== "world") return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      // Check if clicked on a station
      for (const station of STATIONS) {
        const { x, y } = gridToScreen(
          station.col,
          station.row,
          canvasSize.current.w
        );
        const dx = Math.abs(sx - x);
        const dy = Math.abs(sy - y);
        if (dx < TILE_W / 2 && dy < TILE_H) {
          if (station.available) {
            dispatch({ type: "ENTER_STATION", station: station.id });
            soundRef.current?.enterStation();
          } else {
            dispatch({ type: "SHOW_COMING_SOON" });
          }
          return;
        }
      }

      // Otherwise try to move player toward clicked position
      const { col, row } = screenToGrid(sx, sy, canvasSize.current.w);
      if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
        const dc = col - st.playerCol;
        const dr = row - st.playerRow;
        if (Math.abs(dc) >= Math.abs(dr)) {
          dispatch({ type: "MOVE_PLAYER", dir: dc > 0 ? "e" : "w" });
        } else {
          dispatch({ type: "MOVE_PLAYER", dir: dr > 0 ? "s" : "n" });
        }
        soundRef.current?.step();
      }
    },
    []
  );

  // ─── MOW CELL CLICK ──────────────────────────────────────────────────
  const handleMowCellClick = useCallback(
    (row: number, col: number) => {
      const st = stateRef.current;
      if (!st.mowGrid || !st.roundActive) return;

      const cell = st.mowGrid[row][col];
      if (cell === "unmowed") {
        dispatch({ type: "MOW_CELL", row, col });
        soundRef.current?.mowGrass();
      } else if (cell === "flower") {
        dispatch({ type: "MOW_CELL", row, col });
        // sound handled by penalty effect
      }
    },
    []
  );

  // ─── RENDER ───────────────────────────────────────────────────────────
  const currentLevel =
    state.screen === "mow" ? MOW_LEVELS[state.currentRound] : null;

  const timerFraction = state.roundActive
    ? liveTimer / getTimerForRound(state.currentRound, state.upgrades)
    : 0;

  const timerColor =
    timerFraction > 0.5
      ? "#4CAF50"
      : timerFraction > 0.25
        ? "#FF9800"
        : "#F44336";

  // Count remaining unmowed tiles for display
  const unmowedCount = useMemo(() => {
    if (!state.mowGrid) return 0;
    return countUnmowed(state.mowGrid, state.mowGridSize);
  }, [state.mowGrid, state.mowGridSize]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: COLORS.bgTop,
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        * { box-sizing: border-box; }

        .pixel-btn {
          font-family: 'Press Start 2P', monospace;
          border: 3px solid #2D5A27;
          background: linear-gradient(180deg, #B8E6B8 0%, #90D26D 100%);
          color: #2D5A27;
          padding: 10px 16px;
          font-size: 10px;
          cursor: pointer;
          image-rendering: pixelated;
          transition: transform 0.1s, box-shadow 0.1s;
          box-shadow: 3px 3px 0px #2D5A27;
          text-transform: none;
        }
        .pixel-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #2D5A27;
        }
        .pixel-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px #2D5A27;
        }
        .pixel-btn.primary {
          background: linear-gradient(180deg, #32CD32 0%, #28A428 100%);
          color: white;
          border-color: #1E7B1E;
          box-shadow: 3px 3px 0px #1E7B1E;
        }
        .pixel-btn.danger {
          background: linear-gradient(180deg, #FF7675 0%, #E06665 100%);
          color: white;
          border-color: #C44E4E;
          box-shadow: 3px 3px 0px #C44E4E;
        }
        .pixel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: 3px 3px 0px #2D5A27;
        }

        .overlay-panel {
          background: linear-gradient(180deg, #F0FFF0 0%, #E8F5E8 100%);
          border: 4px solid #2D5A27;
          border-radius: 4px;
          box-shadow: 6px 6px 0px rgba(45, 90, 39, 0.3);
          padding: 20px;
        }

        .mow-cell {
          border: 2px solid #5BA84A;
          background: #90D26D;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          position: relative;
        }
        .mow-cell:hover {
          background: #A8E088;
          transform: scale(1.05);
        }
        .mow-cell.rock {
          background: #9E9E9E;
          cursor: default;
          border-color: #757575;
        }
        .mow-cell.rock:hover {
          transform: none;
        }
        .mow-cell.flower {
          background: linear-gradient(135deg, #FFB7C5, #FF69B4);
          border-color: #FF1493;
          cursor: pointer;
          animation: flowerSway 2s ease-in-out infinite;
        }
        .mow-cell.flower:hover {
          transform: scale(1.05);
        }
        .mow-cell.unmowed {
          background: linear-gradient(135deg, #6B8E23, #556B2F);
          border-color: #4A7A1A;
        }
        .mow-cell.unmowed:hover {
          background: linear-gradient(135deg, #7BA833, #658B3F);
        }
        .mow-cell.mowed {
          background: linear-gradient(135deg, #90D26D, #7BC55C);
          border-color: #5BA84A;
          cursor: default;
        }
        .mow-cell.mowed:hover {
          transform: none;
        }
        .mow-cell.current {
          background: linear-gradient(135deg, #32CD32, #28A428);
          border-color: #1E7B1E;
          cursor: default;
          animation: currentPulse 0.8s ease-in-out infinite;
        }
        .mow-cell.current:hover {
          transform: none;
        }

        @keyframes currentPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(50, 205, 50, 0.4); }
          50% { box-shadow: 0 0 14px rgba(50, 205, 50, 0.7); }
        }

        @keyframes flowerSway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }

        @keyframes penaltyFlash {
          0%, 100% { background-color: rgba(255, 0, 0, 0); }
          50% { background-color: rgba(255, 0, 0, 0.2); }
        }

        @keyframes clientEnter {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes clientLeave {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100px); opacity: 0; }
        }

        @keyframes clientHappy {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-8px); }
          75% { transform: translateY(-4px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes coinPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .d-pad-btn {
          width: 50px;
          height: 50px;
          background: rgba(45, 90, 39, 0.6);
          border: 2px solid rgba(45, 90, 39, 0.8);
          border-radius: 4px;
          color: white;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        .d-pad-btn:active {
          background: rgba(45, 90, 39, 0.9);
        }
      `}</style>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          display:
            state.screen === "world" || state.screen === "shop"
              ? "block"
              : "none",
        }}
      />

      {/* ─── TITLE SCREEN ───────────────────────────────────────────── */}
      {state.screen === "title" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(180deg, ${COLORS.bgTop} 0%, ${COLORS.bgBot} 100%)`,
            zIndex: 100,
          }}
        >
          <div
            style={{
              animation: "titleFloat 3s ease-in-out infinite",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\uD83C\uDF3F"}</div>
            <h1
              style={{
                fontSize: 28,
                color: "#2D5A27",
                fontFamily: "'Press Start 2P', monospace",
                textShadow: "3px 3px 0px rgba(45,90,39,0.2)",
                lineHeight: 1.4,
              }}
            >
              HovenierAI
            </h1>
            <p
              style={{
                fontSize: 10,
                color: "#3D8B37",
                fontFamily: "'Press Start 2P', monospace",
                marginTop: 12,
              }}
            >
              Hovenier Simulator
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 32,
              maxWidth: 300,
            }}
          >
            {STATIONS.map((s) => (
              <div
                key={s.id}
                style={{
                  background: s.color + "30",
                  border: `2px solid ${s.color}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  textAlign: "center",
                  fontSize: 8,
                  fontFamily: "'Press Start 2P', monospace",
                  color: "#2D5A27",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.emoji}</div>
                {s.name}
              </div>
            ))}
          </div>

          <button
            className="pixel-btn primary"
            onClick={() => {
              dispatch({ type: "START_GAME" });
              soundRef.current?.titleJingle();
            }}
            style={{ fontSize: 14, padding: "14px 28px" }}
          >
            START
          </button>

          <p
            style={{
              fontSize: 8,
              color: "#5BA84A",
              fontFamily: "'Press Start 2P', monospace",
              marginTop: 24,
              textAlign: "center",
              lineHeight: 2,
            }}
          >
            WASD / Pijltjes = Lopen
            <br />
            Spatie = Station betreden
            <br />
            Klik = Interactie
          </p>
        </div>
      )}

      {/* ─── WORLD HUD ──────────────────────────────────────────────── */}
      {(state.screen === "world" || state.screen === "shop") && (
        <>
          {/* Top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              background: "linear-gradient(180deg, rgba(45,90,39,0.85) 0%, rgba(45,90,39,0.7) 100%)",
              zIndex: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#F4D03F",
                fontSize: 12,
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              <span style={{ fontSize: 18 }}>{"\uD83E\uDE99"}</span>
              <span>{state.coins}</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              {STATIONS.map((s) => {
                const prog = state.progress[s.id as string];
                const stars = prog ? Math.min(3, Math.ceil(prog.bestRound / 5)) : 0;
                return (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{s.emoji}</span>
                    <span
                      style={{
                        fontSize: 8,
                        color: "#F4D03F",
                        fontFamily: "'Press Start 2P', monospace",
                      }}
                    >
                      {"\u2605".repeat(stars)}
                      {"\u2606".repeat(3 - stars)}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              className="pixel-btn"
              onClick={() => {
                dispatch({ type: "OPEN_SHOP" });
                soundRef.current?.coin();
              }}
              style={{ fontSize: 8, padding: "6px 10px" }}
            >
              {"\uD83D\uDED2"} Winkel
            </button>
          </div>

          {/* Mobile D-pad */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              zIndex: 50,
              display: "grid",
              gridTemplateColumns: "50px 50px 50px",
              gridTemplateRows: "50px 50px 50px",
              gap: 4,
            }}
          >
            <div />
            <button
              className="d-pad-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                dispatch({ type: "MOVE_PLAYER", dir: "n" });
                soundRef.current?.step();
              }}
            >
              {"\u25B2"}
            </button>
            <div />
            <button
              className="d-pad-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                dispatch({ type: "MOVE_PLAYER", dir: "w" });
                soundRef.current?.step();
              }}
            >
              {"\u25C0"}
            </button>
            <button
              className="d-pad-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                const st = stateRef.current;
                for (const station of STATIONS) {
                  if (isAdjacentToStation(st.playerCol, st.playerRow, station)) {
                    if (station.available) {
                      dispatch({ type: "ENTER_STATION", station: station.id });
                      soundRef.current?.enterStation();
                    } else {
                      dispatch({ type: "SHOW_COMING_SOON" });
                    }
                    return;
                  }
                }
              }}
              style={{ fontSize: 10 }}
            >
              OK
            </button>
            <button
              className="d-pad-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                dispatch({ type: "MOVE_PLAYER", dir: "e" });
                soundRef.current?.step();
              }}
            >
              {"\u25B6"}
            </button>
            <div />
            <button
              className="d-pad-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                dispatch({ type: "MOVE_PLAYER", dir: "s" });
                soundRef.current?.step();
              }}
            >
              {"\u25BC"}
            </button>
            <div />
          </div>

          {/* Station interaction hint */}
          {(() => {
            const nearStation = STATIONS.find((s) =>
              isAdjacentToStation(state.playerCol, state.playerRow, s)
            );
            if (!nearStation) return null;
            return (
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(45,90,39,0.85)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 4,
                  fontSize: 9,
                  fontFamily: "'Press Start 2P', monospace",
                  zIndex: 50,
                  textAlign: "center",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {nearStation.emoji} {nearStation.name} — Druk SPATIE
                {!nearStation.available && " (Binnenkort)"}
              </div>
            );
          })()}
        </>
      )}

      {/* ─── SHOP OVERLAY ───────────────────────────────────────────── */}
      {state.screen === "shop" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            className="overlay-panel"
            style={{
              maxWidth: 500,
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  color: "#2D5A27",
                  fontFamily: "'Press Start 2P', monospace",
                  margin: 0,
                }}
              >
                {"\uD83D\uDED2"} Winkel
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#F4D03F",
                  fontSize: 12,
                  fontFamily: "'Press Start 2P', monospace",
                }}
              >
                {"\uD83E\uDE99"} {state.coins}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {UPGRADES.map((upg) => {
                const owned = state.upgrades[upg.id];
                const canAfford = state.coins >= upg.cost;
                return (
                  <div
                    key={upg.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 12,
                      background: owned
                        ? "#E8F5E9"
                        : canAfford
                          ? "#F0FFF0"
                          : "#F5F5F0",
                      border: `2px solid ${owned ? "#4CAF50" : "#5BA84A"}`,
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{upg.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontFamily: "'Press Start 2P', monospace",
                          color: "#2D5A27",
                          marginBottom: 4,
                        }}
                      >
                        {upg.name}
                      </div>
                      <div
                        style={{
                          fontSize: 8,
                          fontFamily: "'Press Start 2P', monospace",
                          color: "#3D8B37",
                        }}
                      >
                        {upg.desc}
                      </div>
                    </div>
                    {owned ? (
                      <span
                        style={{
                          fontSize: 8,
                          fontFamily: "'Press Start 2P', monospace",
                          color: "#4CAF50",
                        }}
                      >
                        GEKOCHT
                      </span>
                    ) : (
                      <button
                        className="pixel-btn primary"
                        disabled={!canAfford}
                        onClick={() => {
                          dispatch({ type: "BUY_UPGRADE", id: upg.id });
                          soundRef.current?.buyUpgrade();
                        }}
                        style={{ fontSize: 8, padding: "6px 10px", whiteSpace: "nowrap" }}
                      >
                        {"\uD83E\uDE99"} {upg.cost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              className="pixel-btn"
              onClick={() => dispatch({ type: "CLOSE_SHOP" })}
              style={{ marginTop: 16, width: "100%", fontSize: 10 }}
            >
              Terug
            </button>
          </div>
        </div>
      )}

      {/* ─── COMING SOON OVERLAY ────────────────────────────────────── */}
      {state.comingSoon && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 70,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => dispatch({ type: "HIDE_COMING_SOON" })}
        >
          <div
            className="overlay-panel"
            style={{ textAlign: "center", padding: 40 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>{"\uD83D\uDEA7"}</div>
            <h2
              style={{
                fontSize: 14,
                fontFamily: "'Press Start 2P', monospace",
                color: "#2D5A27",
                marginBottom: 12,
              }}
            >
              Binnenkort beschikbaar!
            </h2>
            <p
              style={{
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#3D8B37",
                lineHeight: 2,
                marginBottom: 20,
              }}
            >
              Dit mini-spel wordt binnenkort
              <br />
              toegevoegd. Blijf tuned!
            </p>
            <button
              className="pixel-btn"
              onClick={() => dispatch({ type: "HIDE_COMING_SOON" })}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ─── MOW THE LAWN MINI-GAME ─────────────────────────────────── */}
      {state.screen === "mow" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, #87CEEB 0%, #B8E6B8 100%)`,
            zIndex: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeIn 0.3s ease",
            overflow: "auto",
          }}
        >
          {/* Penalty flash overlay */}
          {state.mowPenalty && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255, 0, 0, 0.15)",
                zIndex: 85,
                pointerEvents: "none",
                animation: "penaltyFlash 0.5s ease",
              }}
            />
          )}

          {/* Top bar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              background: "rgba(45,90,39,0.85)",
            }}
          >
            <button
              className="pixel-btn danger"
              onClick={() => dispatch({ type: "EXIT_TO_WORLD" })}
              style={{ fontSize: 8, padding: "6px 10px" }}
            >
              {"\u2715"} Terug
            </button>
            <div
              style={{
                fontSize: 10,
                fontFamily: "'Press Start 2P', monospace",
                color: "white",
              }}
            >
              Ronde {state.currentRound + 1}/16
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#F4D03F",
                fontSize: 10,
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              {"\uD83E\uDE99"} {state.coins}
            </div>
          </div>

          {/* Client character area */}
          <div
            style={{
              width: "100%",
              maxWidth: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              gap: 16,
              animation:
                state.clientMood === "angry"
                  ? "clientLeave 0.5s ease forwards"
                  : state.clientMood === "happy"
                    ? "clientHappy 0.5s ease infinite"
                    : "clientEnter 0.4s ease",
            }}
          >
            {/* Client pixel art — garden homeowner */}
            <div
              style={{
                width: 48,
                height: 64,
                position: "relative",
                imageRendering: "pixelated",
              }}
            >
              <svg
                viewBox="0 0 12 16"
                width={48}
                height={64}
                style={{ imageRendering: "pixelated" }}
              >
                {/* Sun hat */}
                <rect x="2" y="0" width="8" height="1" fill="#F5DEB3" />
                <rect x="1" y="1" width="10" height="2" fill="#DEB887" />
                <rect x="3" y="1" width="6" height="2" fill="#F5DEB3" />
                {/* Face */}
                <rect x="3" y="3" width="6" height="4" fill="#FDEBD0" />
                {/* Eyes */}
                <rect x="4" y="4" width="1" height="1" fill="#2C3E50" />
                <rect x="7" y="4" width="1" height="1" fill="#2C3E50" />
                {/* Mouth */}
                {state.clientMood === "happy" && (
                  <>
                    <rect x="5" y="6" width="2" height="1" fill="#E74C3C" />
                  </>
                )}
                {state.clientMood === "angry" && (
                  <>
                    <rect x="4" y="6" width="4" height="1" fill="#E74C3C" />
                    <rect x="4" y="3" width="1" height="1" fill="#2C3E50" />
                    <rect x="7" y="3" width="1" height="1" fill="#2C3E50" />
                  </>
                )}
                {(!state.clientMood || state.clientMood === "waiting") && (
                  <rect x="5" y="6" width="2" height="1" fill="#CD6155" />
                )}
                {/* Body — garden apron */}
                <rect x="3" y="7" width="6" height="5" fill="#8FBC8F" />
                <rect x="4" y="8" width="4" height="3" fill="#F5DEB3" />
                {/* Legs */}
                <rect x="4" y="12" width="2" height="3" fill="#556B2F" />
                <rect x="7" y="12" width="2" height="3" fill="#556B2F" />
                {/* Shoes */}
                <rect x="3" y="15" width="3" height="1" fill="#5C4033" />
                <rect x="7" y="15" width="3" height="1" fill="#5C4033" />
              </svg>
            </div>

            {/* Speech bubble */}
            <div
              style={{
                background: "white",
                border: "3px solid #2D5A27",
                borderRadius: "12px 12px 12px 0",
                padding: "8px 14px",
                fontSize: 9,
                fontFamily: "'Press Start 2P', monospace",
                color: "#2D5A27",
                lineHeight: 1.8,
                maxWidth: 280,
                position: "relative",
              }}
            >
              {state.clientMood === "happy"
                ? "Prachtig! Dankjewel! \uD83C\uDF89"
                : state.clientMood === "angry"
                  ? "Te laat! Ik ga weg! \uD83D\uDE24"
                  : currentLevel?.clientText || ""}

              {/* Bubble tail */}
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderTop: "10px solid #2D5A27",
                  borderRight: "10px solid transparent",
                }}
              />
            </div>
          </div>

          {/* Timer bar */}
          {state.roundActive && (
            <div
              style={{
                width: "90%",
                maxWidth: 500,
                height: 16,
                background: "#C8E6C9",
                border: "2px solid #2D5A27",
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${timerFraction * 100}%`,
                  background: timerColor,
                  transition: "width 0.1s linear, background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 7,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "white",
                    textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  {liveTimer.toFixed(1)}s
                </span>
              </div>
            </div>
          )}

          {/* Lives indicator */}
          {state.roundActive && state.lives > 1 && (
            <div
              style={{
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#E74C3C",
                marginBottom: 4,
              }}
            >
              {"\u2764\uFE0F".repeat(state.lives)} Extra levens
            </div>
          )}

          {/* Remaining tiles counter */}
          {state.roundActive && (
            <div
              style={{
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#2D5A27",
                marginBottom: 8,
              }}
            >
              {"\uD83C\uDF3F"} Nog te maaien: {unmowedCount} tegels
            </div>
          )}

          {/* Mow Grid */}
          {state.mowGrid && state.roundResult !== "fail" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${state.mowGridSize}, ${Math.min(
                  60,
                  Math.floor(350 / state.mowGridSize)
                )}px)`,
                gap: 3,
                padding: 12,
                background: "#E8F5E9",
                border: "3px solid #2D5A27",
                borderRadius: 4,
                animation: "slideUp 0.3s ease",
              }}
            >
              {state.mowGrid.map((row, ri) =>
                row.map((cell, ci) => {
                  const cellSize = Math.min(
                    60,
                    Math.floor(350 / state.mowGridSize)
                  );

                  // Check if this cell is adjacent to the current position (can be mowed next)
                  let isReachable = false;
                  if (cell === "unmowed" && state.mowPath.length > 0) {
                    const [lastR, lastC] = state.mowPath[state.mowPath.length - 1];
                    isReachable = isAdjacent(lastR, lastC, ri, ci);
                  } else if (cell === "unmowed" && state.mowPath.length === 0) {
                    isReachable = true; // First move, any unmowed tile is reachable
                  }

                  return (
                    <div
                      key={`${ri}-${ci}`}
                      className={`mow-cell ${cell}`}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        opacity: cell === "unmowed" && !isReachable && state.mowPath.length > 0 ? 0.7 : 1,
                        outline: isReachable && state.upgrades.garden_vision
                          ? "2px dashed #32CD32"
                          : "none",
                      }}
                      onClick={() => handleMowCellClick(ri, ci)}
                    >
                      {cell === "rock" && (
                        <span style={{ fontSize: 14, opacity: 0.8 }}>{"\uD83E\uDEA8"}</span>
                      )}
                      {cell === "flower" && (
                        <span style={{ fontSize: 16 }}>{"\uD83C\uDF3A"}</span>
                      )}
                      {cell === "unmowed" && (
                        <span
                          style={{
                            fontSize: 14,
                            opacity: 0.5,
                          }}
                        >
                          {"\uD83C\uDF3E"}
                        </span>
                      )}
                      {cell === "mowed" && (
                        <span
                          style={{
                            fontSize: 10,
                            opacity: 0.3,
                            color: "#5BA84A",
                          }}
                        >
                          {"\u2713"}
                        </span>
                      )}
                      {cell === "current" && (
                        <span style={{ fontSize: 16 }}>{"\uD83C\uDF3F"}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Penalty warning */}
          {state.mowPenalty && (
            <div
              style={{
                marginTop: 8,
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#E74C3C",
                animation: "fadeIn 0.2s ease",
              }}
            >
              {"\u26A0\uFE0F"} Bloemenbed geraakt! -1 seconde!
            </div>
          )}

          {/* Hint */}
          {state.roundActive && state.upgrades.garden_vision && state.mowGrid && (
            <div
              style={{
                marginTop: 8,
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#3D8B37",
                textAlign: "center",
              }}
            >
              Hint: Groene stippellijn = bereikbare tegels
            </div>
          )}

          {/* Round info */}
          {state.roundActive && currentLevel && (
            <div
              style={{
                marginTop: 8,
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                color: "#5BA84A",
                textAlign: "center",
                lineHeight: 2,
                paddingBottom: 16,
              }}
            >
              Raster: {currentLevel.gridSize}x{currentLevel.gridSize} |
              Stenen: {currentLevel.rocks.length} |
              Bloemen: {currentLevel.flowers.length}
              <br />
              Klik ongemaaaid gras = maaien | Vermijd bloemen!
            </div>
          )}

          {/* Success result */}
          {state.roundResult === "success" && state.clientMood === "happy" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 90,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                className="overlay-panel"
                style={{ textAlign: "center", padding: 32 }}
              >
                <div
                  style={{
                    fontSize: 48,
                    marginBottom: 12,
                    animation: "coinPop 0.5s ease",
                  }}
                >
                  {"\uD83C\uDF89"}
                </div>
                <h3
                  style={{
                    fontSize: 14,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#4CAF50",
                    marginBottom: 8,
                  }}
                >
                  Gelukt!
                </h3>
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#2D5A27",
                    marginBottom: 4,
                  }}
                >
                  Ronde {state.currentRound + 1} voltooid!
                </p>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#F4D03F",
                    marginBottom: 20,
                    animation: "coinPop 0.5s ease 0.2s both",
                  }}
                >
                  + {getCoinsForRound(state.currentRound, state.upgrades)} {"\uD83E\uDE99"}
                </div>
                {state.currentRound + 1 < MOW_LEVELS.length ? (
                  <button
                    className="pixel-btn primary"
                    onClick={() => {
                      dispatch({ type: "NEXT_ROUND" });
                      dispatch({
                        type: "START_ROUND",
                        round: state.currentRound + 1,
                      });
                      soundRef.current?.enterStation();
                    }}
                    style={{ fontSize: 10 }}
                  >
                    Volgende Ronde {"\u2192"}
                  </button>
                ) : (
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "'Press Start 2P', monospace",
                        color: "#F4D03F",
                        marginBottom: 16,
                      }}
                    >
                      {"\uD83C\uDFC6"} Alle 16 rondes voltooid!
                    </div>
                    <button
                      className="pixel-btn primary"
                      onClick={() => {
                        dispatch({ type: "START_ROUND", round: 16 });
                      }}
                      style={{ fontSize: 10 }}
                    >
                      Terug naar Wereld
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fail result */}
          {state.roundResult === "fail" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 90,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                className="overlay-panel"
                style={{ textAlign: "center", padding: 32 }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>{"\uD83D\uDE24"}</div>
                <h3
                  style={{
                    fontSize: 14,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#E74C3C",
                    marginBottom: 8,
                  }}
                >
                  Tijd voorbij!
                </h3>
                <p
                  style={{
                    fontSize: 9,
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#2D5A27",
                    marginBottom: 4,
                    lineHeight: 2,
                  }}
                >
                  De klant is weggelopen.
                  <br />
                  Je kwam tot ronde {state.currentRound + 1}.
                </p>
                {state.currentRound > 0 && (
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "'Press Start 2P', monospace",
                      color: "#3D8B37",
                      marginBottom: 16,
                    }}
                  >
                    Totaal verdiend: {state.totalCoins} {"\uD83E\uDE99"}
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button
                    className="pixel-btn primary"
                    onClick={() => {
                      dispatch({ type: "START_ROUND", round: 0 });
                      soundRef.current?.enterStation();
                    }}
                    style={{ fontSize: 9 }}
                  >
                    Opnieuw proberen
                  </button>
                  <button
                    className="pixel-btn"
                    onClick={() => dispatch({ type: "EXIT_TO_WORLD" })}
                    style={{ fontSize: 9 }}
                  >
                    Terug
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
