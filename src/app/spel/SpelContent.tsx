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
const GRID_COLS = 30;
const GRID_ROWS = 20;
const MARGIN_TOP = 80;
const LERP_SPEED = 0.12;
const CAMERA_LERP = 0.08;
const WALK_FRAME_MS = 180;

const COLORS = {
  floorLight: "#90D26D",
  floorDark: "#7BC55C",
  floorSide: "#5BA84A",
  floorSideDark: "#4A9240",
  wall: "#3D8B37",
  wallShadow: "#2D6B27",
  bgTop: "#87CEEB",
  bgBot: "#B8E6B8",
  accent1: "#32CD32",
  accent2: "#FF8C00",
  accent3: "#4169E1",
  accent4: "#FF69B4",
  accent5: "#DAA520",
  playerHat: "#228B22",
  playerSkin: "#FDEBD0",
  playerOveralls: "#8B6F47",
  playerShoes: "#5C4033",
  shadow: "rgba(0,0,0,0.13)",
  grass1: "#8BC34A",
  grass2: "#7CB342",
  grass3: "#689F38",
  path: "#C8B99A",
  pathSide: "#A89A7A",
  pathDark: "#B8A98A",
  hedge: "#2E7D32",
  hedgeDark: "#1B5E20",
  hedgeLight: "#388E3C",
  pond: "#4FC3F7",
  pondDark: "#0288D1",
  pondEdge: "#81D4FA",
  greenhouse: "#B2EBF2",
  greenhouseFrame: "#4CAF50",
  shed: "#8D6E63",
  shedRoof: "#5D4037",
  compost: "#795548",
  compostDark: "#5D4037",
  fruitTree: "#FF9800",
  ornTree: "#E91E63",
  bench: "#A1887F",
  birdbath: "#B0BEC5",
  statue: "#9E9E9E",
  van: "#F5F5F5",
  vanAccent: "#32CD32",
  fence: "#A1887F",
  fencePost: "#795548",
  trunk: "#795548",
  leaves1: "#388E3C",
  leaves2: "#2E7D32",
  leaves3: "#43A047",
  flowerbed: "#FF69B4",
  veggie: "#8BC34A",
  parking: "#9E9E9E",
  parkingSide: "#757575",
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
// WORLD TILE TYPES
// ─────────────────────────────────────────────────────────────────────────────

type WorldTile =
  | "grass"
  | "path"
  | "path_cross"
  | "hedge"
  | "pond"
  | "pond_edge"
  | "greenhouse_wall"
  | "greenhouse_roof"
  | "shed_wall"
  | "shed_roof"
  | "compost"
  | "tree"
  | "fruit_tree"
  | "orn_tree"
  | "bench"
  | "birdbath"
  | "statue"
  | "van"
  | "flowerbed"
  | "veggie"
  | "parking"
  | "fence"
  | "house_wall"
  | "house_wall2"
  | "house_wall3"
  | "house_wall4"
  | "house_roof"
  | "house_roof2"
  | "house_door"
  | "house_window"
  | "station";

interface WorldTileInfo {
  type: WorldTile;
  solid: boolean;
  height: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATION DEFINITIONS (spread across garden areas)
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
    col: 5,
    row: 5,
    color: "#32CD32",
    colorDark: "#28A428",
    available: true,
  },
  {
    id: "prune",
    name: "Snoeien",
    emoji: "\u2702\uFE0F",
    col: 24,
    row: 4,
    color: "#FF8C00",
    colorDark: "#CC7000",
    available: false,
  },
  {
    id: "pressure",
    name: "Hogedruk",
    emoji: "\uD83D\uDCA6",
    col: 14,
    row: 16,
    color: "#4169E1",
    colorDark: "#3355BB",
    available: false,
  },
  {
    id: "plant",
    name: "Planten",
    emoji: "\uD83C\uDF31",
    col: 5,
    row: 16,
    color: "#FF69B4",
    colorDark: "#CC5490",
    available: false,
  },
  {
    id: "leaf",
    name: "Bladblazer",
    emoji: "\uD83C\uDF42",
    col: 25,
    row: 15,
    color: "#DAA520",
    colorDark: "#B0851A",
    available: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BUILD THE WORLD MAP
// ─────────────────────────────────────────────────────────────────────────────

function buildWorldMap(): WorldTileInfo[][] {
  const map: WorldTileInfo[][] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row: WorldTileInfo[] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      row.push({ type: "grass", solid: false, height: 0 });
    }
    map.push(row);
  }

  const set = (r: number, c: number, type: WorldTile, solid: boolean, height = 0) => {
    if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS) {
      map[r][c] = { type, solid, height };
    }
  };

  // === CENTRAL GARDEN PATH (stone/gravel) running vertically ===
  for (let r = 0; r < GRID_ROWS; r++) {
    set(r, 14, "path", false);
    set(r, 15, "path", false);
  }
  // Horizontal path across the middle
  for (let c = 0; c < GRID_COLS; c++) {
    set(9, c, "path", false);
    set(10, c, "path", false);
  }
  // Cross tiles
  set(9, 14, "path_cross", false);
  set(9, 15, "path_cross", false);
  set(10, 14, "path_cross", false);
  set(10, 15, "path_cross", false);

  // === HOUSES WITH FRONT YARDS (top-left) ===
  // House 1 (rows 1-3, cols 2-5)
  for (let r = 2; r <= 3; r++) for (let c = 2; c <= 5; c++) set(r, c, "house_wall", true, 24);
  for (let c = 2; c <= 5; c++) set(1, c, "house_roof", true, 30);
  set(3, 3, "house_door", true, 24);
  set(2, 4, "house_window", true, 24);

  // House 2 (rows 1-3, cols 8-11)
  for (let r = 2; r <= 3; r++) for (let c = 8; c <= 11; c++) set(r, c, "house_wall2", true, 24);
  for (let c = 8; c <= 11; c++) set(1, c, "house_roof2", true, 30);
  set(3, 9, "house_door", true, 24);
  set(2, 10, "house_window", true, 24);

  // House 3 (rows 1-3, cols 18-21)
  for (let r = 2; r <= 3; r++) for (let c = 18; c <= 21; c++) set(r, c, "house_wall3", true, 24);
  for (let c = 18; c <= 21; c++) set(1, c, "house_roof", true, 30);
  set(3, 19, "house_door", true, 24);
  set(2, 20, "house_window", true, 24);

  // House 4 (rows 1-3, cols 24-27)
  for (let r = 2; r <= 3; r++) for (let c = 24; c <= 27; c++) set(r, c, "house_wall4", true, 24);
  for (let c = 24; c <= 27; c++) set(1, c, "house_roof2", true, 30);
  set(3, 25, "house_door", true, 24);
  set(2, 26, "house_window", true, 24);

  // === HOUSES (bottom row) ===
  // House 5 (rows 13-15, cols 2-5)
  for (let r = 14; r <= 15; r++) for (let c = 2; c <= 5; c++) set(r, c, "house_wall", true, 24);
  for (let c = 2; c <= 5; c++) set(13, c, "house_roof2", true, 30);
  set(15, 3, "house_door", true, 24);
  set(14, 4, "house_window", true, 24);

  // House 6 (rows 13-15, cols 8-11)
  for (let r = 14; r <= 15; r++) for (let c = 8; c <= 11; c++) set(r, c, "house_wall3", true, 24);
  for (let c = 8; c <= 11; c++) set(13, c, "house_roof", true, 30);
  set(15, 9, "house_door", true, 24);
  set(14, 10, "house_window", true, 24);

  // House 7 (rows 14-16, cols 18-21)
  for (let r = 15; r <= 16; r++) for (let c = 18; c <= 21; c++) set(r, c, "house_wall2", true, 24);
  for (let c = 18; c <= 21; c++) set(14, c, "house_roof", true, 30);
  set(16, 19, "house_door", true, 24);
  set(15, 20, "house_window", true, 24);

  // === HEDGES (dividing garden areas) ===
  // Top hedges along front yards
  for (let c = 2; c <= 5; c++) set(4, c, "hedge", true, 10);
  for (let c = 8; c <= 11; c++) set(4, c, "hedge", true, 10);
  for (let c = 18; c <= 21; c++) set(4, c, "hedge", true, 10);
  for (let c = 24; c <= 27; c++) set(4, c, "hedge", true, 10);
  // Bottom hedges
  for (let c = 2; c <= 5; c++) set(17, c, "hedge", true, 10);
  for (let c = 8; c <= 11; c++) set(17, c, "hedge", true, 10);
  for (let c = 18; c <= 21; c++) set(17, c, "hedge", true, 10);
  // Vertical hedges dividing sections
  for (let r = 5; r <= 8; r++) set(r, 7, "hedge", true, 10);
  for (let r = 5; r <= 8; r++) set(r, 12, "hedge", true, 10);
  for (let r = 11; r <= 13; r++) set(r, 7, "hedge", true, 10);
  for (let r = 11; r <= 13; r++) set(r, 22, "hedge", true, 10);

  // === POND / WATER FEATURE (center-right) ===
  set(6, 17, "pond_edge", true, 0);
  set(6, 18, "pond_edge", true, 0);
  set(6, 19, "pond_edge", true, 0);
  set(7, 16, "pond_edge", true, 0);
  set(7, 17, "pond", true, 0);
  set(7, 18, "pond", true, 0);
  set(7, 19, "pond", true, 0);
  set(7, 20, "pond_edge", true, 0);
  set(8, 16, "pond_edge", true, 0);
  set(8, 17, "pond", true, 0);
  set(8, 18, "pond", true, 0);
  set(8, 19, "pond", true, 0);
  set(8, 20, "pond_edge", true, 0);
  set(9, 17, "pond_edge", false, 0); // path overlaps
  set(9, 18, "pond_edge", false, 0);

  // === GREENHOUSE (bottom-right area) ===
  for (let r = 12; r <= 13; r++) for (let c = 24; c <= 27; c++) set(r, c, "greenhouse_wall", true, 20);
  for (let c = 24; c <= 27; c++) set(11, c, "greenhouse_roof", true, 26);

  // === TOOL SHED (top-right corner) ===
  set(6, 28, "shed_wall", true, 20);
  set(6, 29, "shed_wall", true, 20);
  set(5, 28, "shed_roof", true, 26);
  set(5, 29, "shed_roof", true, 26);

  // === COMPOST AREA (bottom-left) ===
  set(18, 8, "compost", true, 8);
  set(18, 9, "compost", true, 8);
  set(19, 8, "compost", true, 8);
  set(19, 9, "compost", true, 8);

  // === FLOWER BEDS ===
  const flowerbedPositions = [
    [5, 3], [5, 4], [6, 3], [6, 4],        // Front yard garden 1
    [5, 9], [5, 10], [6, 9], [6, 10],       // Front yard garden 2
    [12, 3], [12, 4],                         // Lower garden
    [18, 18], [18, 19], [18, 20],            // Bottom flower strip
  ];
  for (const [r, c] of flowerbedPositions) {
    if (map[r][c].type === "grass") set(r, c, "flowerbed", false, 4);
  }

  // === VEGETABLE GARDENS ===
  const veggiePositions = [
    [11, 9], [11, 10], [11, 11], [12, 9], [12, 10], [12, 11],  // Veggie patch
    [17, 24], [17, 25], [17, 26],                                // Another patch
  ];
  for (const [r, c] of veggiePositions) {
    if (map[r][c].type === "grass") set(r, c, "veggie", false, 2);
  }

  // === TREES ===
  const treePositions = [
    [0, 0], [0, 7], [0, 13], [0, 16], [0, 22], [0, 29],
    [7, 0], [7, 6], [7, 12],
    [12, 0], [12, 7],
    [18, 0], [18, 6],
    [19, 0], [19, 14], [19, 29],
    [0, 14], [0, 15],
  ];
  for (const [r, c] of treePositions) {
    if (map[r][c].type === "grass") set(r, c, "tree", true, 40);
  }

  // === FRUIT TREES ===
  const fruitTreePositions = [
    [6, 22], [6, 23], [7, 22], [7, 23],  // Small orchard area
    [12, 17], [12, 18],                     // Near pond
    [18, 3], [18, 4],                        // Bottom-left
  ];
  for (const [r, c] of fruitTreePositions) {
    if (map[r][c].type === "grass") set(r, c, "fruit_tree", true, 36);
  }

  // === ORNAMENTAL TREES ===
  const ornTreePositions = [
    [5, 19], [5, 20],  // Near pond
    [11, 3], [11, 4],   // Lower section
    [8, 25], [8, 26],   // Right side
  ];
  for (const [r, c] of ornTreePositions) {
    if (map[r][c].type === "grass") set(r, c, "orn_tree", true, 34);
  }

  // === BENCHES ===
  set(6, 13, "bench", true, 6);
  set(8, 13, "bench", true, 6);
  set(11, 16, "bench", true, 6);
  set(18, 15, "bench", true, 6);

  // === BIRD BATHS ===
  set(7, 10, "birdbath", true, 12);
  set(12, 22, "birdbath", true, 12);

  // === GARDEN STATUES ===
  set(8, 4, "statue", true, 16);
  set(11, 19, "statue", true, 16);

  // === FENCES along some properties ===
  for (let c = 24; c <= 27; c++) set(17, c, "fence", true, 8);

  // === PARKING AREA with HovenierAI van ===
  set(9, 0, "parking", false, 0);
  set(9, 1, "parking", false, 0);
  set(10, 0, "parking", false, 0);
  set(10, 1, "parking", false, 0);
  set(9, 1, "van", true, 20);
  set(10, 1, "van", true, 20);

  // === MARK STATION TILES ===
  for (const s of STATIONS) {
    set(s.row, s.col, "station", false, 0);
  }

  return map;
}

const WORLD_MAP = buildWorldMap();

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
  { gridSize: 4, rocks: [], flowers: [], clientText: "Kun je mijn gazon maaien?" },
  { gridSize: 4, rocks: [], flowers: [], clientText: "Het gras staat veel te hoog!" },
  { gridSize: 4, rocks: [], flowers: [], clientText: "Mijn buren klagen over het gras!" },
  { gridSize: 4, rocks: [], flowers: [], clientText: "Kun je het hele gazon doen?" },
  { gridSize: 5, rocks: [[2, 2]], flowers: [[0, 4]], clientText: "Let op de bloemen alsjeblieft!" },
  { gridSize: 5, rocks: [[1, 1], [3, 3]], flowers: [[4, 0]], clientText: "Er liggen wat stenen in het gazon." },
  { gridSize: 5, rocks: [[0, 2]], flowers: [[4, 4]], clientText: "Pas op voor mijn rozenbed!" },
  { gridSize: 5, rocks: [[2, 0], [2, 4]], flowers: [[4, 2]], clientText: "De tuin is een beetje rommelig..." },
  { gridSize: 6, rocks: [[1, 1], [3, 3], [4, 1]], flowers: [[0, 5], [5, 0]], clientText: "Deze tuin is al maanden niet gedaan!" },
  { gridSize: 6, rocks: [[0, 0], [2, 4], [4, 2]], flowers: [[1, 5], [5, 1], [3, 0]], clientText: "Mijn hele achtertuin moet gemaaid!" },
  { gridSize: 6, rocks: [[1, 3], [3, 1], [4, 4], [0, 5]], flowers: [[2, 0], [5, 3]], clientText: "Het is een jungle hier geworden!" },
  { gridSize: 6, rocks: [[0, 2], [2, 0], [3, 5], [5, 3]], flowers: [[0, 4], [4, 0], [5, 5]], clientText: "De buurvrouw komt op bezoek, snel!" },
  { gridSize: 7, rocks: [[1, 1], [1, 5], [3, 3], [5, 1], [5, 5]], flowers: [[0, 6], [6, 0], [3, 6]], clientText: "Het hele landgoed moet klaar vandaag!" },
  { gridSize: 7, rocks: [[0, 3], [2, 1], [2, 5], [4, 3], [6, 1], [6, 5]], flowers: [[0, 0], [0, 6], [6, 6]], clientText: "Een enorm gazon, veel succes!" },
  { gridSize: 7, rocks: [[1, 2], [1, 4], [3, 0], [3, 6], [5, 2], [5, 4]], flowers: [[0, 0], [6, 6], [0, 6], [6, 0]], clientText: "Dit is de moeilijkste klus ooit!" },
  { gridSize: 7, rocks: [[1, 1], [1, 3], [1, 5], [3, 1], [3, 5], [5, 1], [5, 3], [5, 5]], flowers: [[0, 0], [0, 6], [6, 0]], clientText: "De finale! Laat zien wat je kan!" },
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
  { id: "faster_hands", name: "Snellere Handen", desc: "+2 seconden per ronde", cost: 50, emoji: "\uD83D\uDD90\uFE0F" },
  { id: "better_tools", name: "Beter Gereedschap", desc: "+25% muntbonus", cost: 80, emoji: "\uD83E\uDE9B" },
  { id: "safety_net", name: "Veiligheidsnet", desc: "1 extra kans bij falen", cost: 120, emoji: "\uD83D\uDEE1\uFE0F" },
  { id: "client_patience", name: "Klantvriendelijkheid", desc: "+3 seconden geduld klant", cost: 100, emoji: "\uD83D\uDE0A" },
  { id: "garden_vision", name: "Tuinvisie", desc: "Markeer optimaal pad bij start", cost: 150, emoji: "\uD83D\uDC41\uFE0F" },
  { id: "double_coins", name: "Dubbele Munten", desc: "2x munten per ronde", cost: 200, emoji: "\uD83D\uDCB0" },
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
  playerCol: number;
  playerRow: number;
  facing: Direction;
  currentRound: number;
  roundActive: boolean;
  roundTimeLimit: number;
  roundStartTime: number;
  clientMood: "waiting" | "happy" | "angry" | null;
  roundResult: "none" | "success" | "fail";
  lives: number;
  mowGrid: MowCellType[][] | null;
  mowGridSize: number;
  mowPath: [number, number][];
  mowPenalty: boolean;
  comingSoon: boolean;
}

const INITIAL_STATE: AppState = {
  screen: "title",
  coins: 0,
  totalCoins: 0,
  upgrades: {},
  progress: {},
  playerCol: 14,
  playerRow: 11,
  facing: "s",
  currentRound: 0,
  roundActive: false,
  roundTimeLimit: 0,
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
  | { type: "TIMER_EXPIRED" }
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
    if (rr < gridSize && rc < gridSize) grid[rr][rc] = "rock";
  }
  for (const [fr, fc] of flowers) {
    if (fr < gridSize && fc < gridSize) grid[fr][fc] = "flower";
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
  return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
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

function isAdjacentToStation(playerCol: number, playerRow: number, station: StationDef): boolean {
  const dx = Math.abs(playerCol - station.col);
  const dy = Math.abs(playerRow - station.row);
  return dx <= 1 && dy <= 1 && dx + dy > 0;
}

function isTileSolid(col: number, row: number): boolean {
  if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return true;
  return WORLD_MAP[row][col].solid;
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
        case "n": nr = nr - 1; break;
        case "s": nr = nr + 1; break;
        case "w": nc = nc - 1; break;
        case "e": nc = nc + 1; break;
      }
      if (nc < 0 || nc >= GRID_COLS || nr < 0 || nr >= GRID_ROWS) {
        return { ...state, facing: action.dir };
      }
      for (const st of STATIONS) {
        if (nc === st.col && nr === st.row) {
          return { ...state, facing: action.dir };
        }
      }
      if (isTileSolid(nc, nr)) {
        return { ...state, facing: action.dir };
      }
      return { ...state, playerCol: nc, playerRow: nr, facing: action.dir };
    }

    case "ENTER_STATION": {
      const station = STATIONS.find((s) => s.id === action.station);
      if (!station) return state;
      if (!station.available) {
        return { ...state, comingSoon: true };
      }
      const level = MOW_LEVELS[0];
      const grid = buildMowGrid(level);
      const timer = getTimerForRound(0, state.upgrades);
      return {
        ...state,
        screen: action.station,
        currentRound: 0,
        roundActive: true,
        roundTimeLimit: timer,
        roundStartTime: Date.now(),
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
        roundTimeLimit: timer,
        roundStartTime: Date.now(),
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
      if (row < 0 || row >= state.mowGridSize || col < 0 || col >= state.mowGridSize) return state;

      const cell = state.mowGrid[row][col];
      if (cell === "rock") return state;

      if (cell === "flower") {
        return { ...state, mowPenalty: true };
      }

      if (cell === "mowed" || cell === "current") return state;

      if (state.mowPath.length > 0) {
        const [lastR, lastC] = state.mowPath[state.mowPath.length - 1];
        if (!isAdjacent(lastR, lastC, row, col)) return state;
      }

      const newGrid = state.mowGrid.map((r) => [...r]);
      if (state.mowPath.length > 0) {
        const [prevR, prevC] = state.mowPath[state.mowPath.length - 1];
        if (newGrid[prevR][prevC] === "current") {
          newGrid[prevR][prevC] = "mowed";
        }
      }

      newGrid[row][col] = "current";
      const newPath = [...state.mowPath, [row, col] as [number, number]];

      const remaining = countUnmowed(newGrid, state.mowGridSize);
      if (remaining === 0) {
        return {
          ...state,
          mowGrid: newGrid,
          mowPath: newPath,
          roundResult: "success",
          roundActive: false,
        };
      }

      return { ...state, mowGrid: newGrid, mowPath: newPath };
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
      newStars[state.currentRound] = Math.max(newStars[state.currentRound] || 0, 1);
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
        const timer = getTimerForRound(state.currentRound, state.upgrades);
        const level = MOW_LEVELS[state.currentRound];
        const grid = buildMowGrid(level);
        return {
          ...state,
          lives: state.lives - 1,
          roundTimeLimit: timer,
          roundStartTime: Date.now(),
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

    case "TIMER_EXPIRED": {
      if (!state.roundActive) return state;
      if (state.lives > 1) {
        const timer = getTimerForRound(state.currentRound, state.upgrades);
        const level = MOW_LEVELS[state.currentRound];
        const grid = buildMowGrid(level);
        return {
          ...state,
          lives: state.lives - 1,
          roundTimeLimit: timer,
          roundStartTime: Date.now(),
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
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === "suspended") this.ctx.resume();
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
    } catch { /* Audio not available */ }
  }

  step() {
    this.playNote(220, 0.08, 0.08, "square");
    setTimeout(() => this.playNote(280, 0.06, 0.06, "square"), 50);
  }

  mowGrass() {
    this.playNote(440, 0.06, 0.1, "sawtooth");
    setTimeout(() => this.playNote(550, 0.05, 0.08, "sawtooth"), 40);
  }

  hitFlower() {
    this.playNote(150, 0.2, 0.15, "sawtooth");
    setTimeout(() => this.playNote(120, 0.15, 0.1, "square"), 100);
  }

  success() {
    [523, 659, 784, 1047].forEach((n, i) => {
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
    [660, 880, 1100, 880, 1100, 1320].forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.12, 0.08, "sine"), i * 70);
    });
  }

  tick() {
    this.playNote(800, 0.03, 0.05, "square");
  }

  titleJingle() {
    [523, 587, 659, 784, 880, 784, 659, 784].forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.2, 0.1, "sine"), i * 150);
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SPRITE GENERATION (offscreen canvas)
// ─────────────────────────────────────────────────────────────────────────────

function createPlayerSprite(facing: Direction, frame: number, scale = 3): HTMLCanvasElement {
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

  const eyeColor = "#2C3E50";
  if (facing === "s") { px(4, 4 + bob, eyeColor); px(7, 4 + bob, eyeColor); }
  else if (facing === "e") { px(7, 4 + bob, eyeColor); px(6, 4 + bob, eyeColor); }
  else if (facing === "w") { px(4, 4 + bob, eyeColor); px(5, 4 + bob, eyeColor); }

  // Body
  for (let x = 3; x <= 8; x++) {
    for (let y = 6; y <= 11; y++) px(x, y + bob, COLORS.playerOveralls);
  }
  for (let x = 3; x <= 8; x++) px(x, 8 + bob, "#228B22");

  const armOff = frame % 2 === 0 ? 0 : 1;
  px(2, 7 + bob + armOff, COLORS.playerSkin);
  px(2, 8 + bob + armOff, COLORS.playerSkin);
  px(9, 7 + bob - armOff, COLORS.playerSkin);
  px(9, 8 + bob - armOff, COLORS.playerSkin);

  const legFrame = frame % 4;
  if (legFrame === 0 || legFrame === 2) {
    for (let y = 12; y <= 15; y++) { px(4, y + bob, COLORS.playerOveralls); px(7, y + bob, COLORS.playerOveralls); }
    px(4, 16 + bob, COLORS.playerShoes); px(7, 16 + bob, COLORS.playerShoes);
    px(4, 17 + bob, COLORS.playerShoes); px(7, 17 + bob, COLORS.playerShoes);
  } else if (legFrame === 1) {
    for (let y = 12; y <= 15; y++) { px(3, y + bob, COLORS.playerOveralls); px(7, y + bob, COLORS.playerOveralls); }
    px(3, 16 + bob, COLORS.playerShoes); px(7, 16 + bob, COLORS.playerShoes);
    px(2, 17 + bob, COLORS.playerShoes); px(7, 17 + bob, COLORS.playerShoes);
  } else {
    for (let y = 12; y <= 15; y++) { px(4, y + bob, COLORS.playerOveralls); px(8, y + bob, COLORS.playerOveralls); }
    px(4, 16 + bob, COLORS.playerShoes); px(8, 16 + bob, COLORS.playerShoes);
    px(4, 17 + bob, COLORS.playerShoes); px(9, 17 + bob, COLORS.playerShoes);
  }

  return c;
}

// ─────────────────────────────────────────────────────────────────────────────
// ISOMETRIC HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function gridToScreen(col: number, row: number): { x: number; y: number } {
  return {
    x: (col - row) * (TILE_W / 2),
    y: (col + row) * (TILE_H / 2) + MARGIN_TOP,
  };
}

function screenToGrid(sx: number, sy: number): { col: number; row: number } {
  const mx = sx;
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
  useEffect(() => { stateRef.current = state; }, [state]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const soundRef = useRef<SoundEngine | null>(null);
  const lastTickRef = useRef(0);

  // Animation state
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
    cameraX: 0,
    cameraY: 0,
    cameraTargetX: 0,
    cameraTargetY: 0,
    cameraInitialized: false,
  });

  const spriteCache = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const canvasSize = useRef({ w: 800, h: 600 });

  // === REAL-TIME TIMER STATE ===
  const [timerDisplay, setTimerDisplay] = React.useState(0);
  const timerAnimRef = useRef<number>(0);

  useEffect(() => { soundRef.current = new SoundEngine(); }, []);

  const getSprite = useCallback((facing: Direction, frame: number): HTMLCanvasElement => {
    const key = `${facing}_${frame % 4}`;
    let sprite = spriteCache.current.get(key);
    if (!sprite) {
      sprite = createPlayerSprite(facing, frame % 4);
      spriteCache.current.set(key, sprite);
    }
    return sprite;
  }, []);

  // ─── DRAW ISOMETRIC TILE ─────────────────────────────────────────────
  const drawTile = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    topColor: string, leftColor: string, rightColor: string,
    depth: number = TILE_DEPTH
  ) => {
    const hw = TILE_W / 2;
    const hh = TILE_H / 2;

    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(x, y - hh);
    ctx.lineTo(x + hw, y);
    ctx.lineTo(x, y + hh);
    ctx.lineTo(x - hw, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = leftColor;
    ctx.beginPath();
    ctx.moveTo(x - hw, y);
    ctx.lineTo(x, y + hh);
    ctx.lineTo(x, y + hh + depth);
    ctx.lineTo(x - hw, y + depth);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = rightColor;
    ctx.beginPath();
    ctx.moveTo(x + hw, y);
    ctx.lineTo(x, y + hh);
    ctx.lineTo(x, y + hh + depth);
    ctx.lineTo(x + hw, y + depth);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,0.04)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y - hh);
    ctx.lineTo(x + hw, y);
    ctx.lineTo(x, y + hh);
    ctx.lineTo(x - hw, y);
    ctx.closePath();
    ctx.stroke();
  }, []);

  // ─── DRAW WORLD TILE DETAIL ──────────────────────────────────────────
  const drawWorldTile = useCallback((
    ctx: CanvasRenderingContext2D,
    col: number, row: number,
    x: number, y: number,
    tile: WorldTileInfo,
    pulse: number
  ) => {
    const hw = TILE_W / 2;
    const hh = TILE_H / 2;

    switch (tile.type) {
      case "grass": {
        const dark = (col + row) % 2 === 0;
        drawTile(ctx, x, y, dark ? COLORS.grass2 : COLORS.grass1, COLORS.grass3, COLORS.grass3);
        // Random grass blades
        if ((col * 7 + row * 13) % 5 === 0) {
          ctx.fillStyle = "#66BB6A";
          ctx.font = "8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(",", x + 5, y - 2);
          ctx.fillText(",", x - 8, y + 3);
        }
        break;
      }
      case "path":
      case "path_cross": {
        drawTile(ctx, x, y, COLORS.path, COLORS.pathSide, COLORS.pathSide, 10);
        // Gravel texture
        if ((col + row) % 3 === 0) {
          ctx.fillStyle = "rgba(0,0,0,0.06)";
          ctx.beginPath();
          ctx.arc(x - 4, y - 2, 2, 0, Math.PI * 2);
          ctx.arc(x + 6, y + 1, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "hedge": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        // Hedge body
        ctx.fillStyle = COLORS.hedge;
        ctx.fillRect(x - hw + 4, y - 14, TILE_W - 8, 12);
        // Rounded leaf tops
        ctx.fillStyle = COLORS.hedgeLight;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(x - hw + 8 + i * 10, y - 14, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        // Dark accent
        ctx.fillStyle = COLORS.hedgeDark;
        ctx.fillRect(x - hw + 6, y - 4, TILE_W - 12, 3);
        break;
      }
      case "pond": {
        // Water tile with ripple
        const ripple = Math.sin(pulse + col * 0.8 + row * 0.5) * 0.15;
        const waterColor = `rgba(79, 195, 247, ${0.85 + ripple})`;
        drawTile(ctx, x, y, waterColor, COLORS.pondDark, COLORS.pondDark, 6);
        // Ripple circles
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 0.5;
        const rx = x + Math.sin(pulse * 0.7 + col) * 4;
        const ry = y + Math.cos(pulse * 0.5 + row) * 2;
        ctx.beginPath();
        ctx.ellipse(rx, ry - 4, 8, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case "pond_edge": {
        drawTile(ctx, x, y, COLORS.pondEdge, COLORS.pondDark, COLORS.pondDark, 8);
        // Stones around edge
        ctx.fillStyle = "#90A4AE";
        ctx.beginPath();
        ctx.arc(x - 6, y - 2, 3, 0, Math.PI * 2);
        ctx.arc(x + 8, y + 1, 2.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "greenhouse_wall": {
        drawTile(ctx, x, y - 8, COLORS.greenhouse, COLORS.greenhouseFrame, COLORS.greenhouseFrame, tile.height);
        // Glass pane lines
        ctx.strokeStyle = COLORS.greenhouseFrame;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y - 8 - hh);
        ctx.lineTo(x, y - 8 + hh);
        ctx.moveTo(x - hw / 2, y - 8 - hh / 2);
        ctx.lineTo(x + hw / 2, y - 8 + hh / 2);
        ctx.stroke();
        break;
      }
      case "greenhouse_roof": {
        drawTile(ctx, x, y - 16, "#A5D6A7", darken("#A5D6A7", 15), darken("#A5D6A7", 25), 10);
        // Roof ridge
        ctx.fillStyle = COLORS.greenhouseFrame;
        ctx.fillRect(x - 8, y - 20, 16, 2);
        break;
      }
      case "shed_wall": {
        drawTile(ctx, x, y - 8, COLORS.shed, darken(COLORS.shed, 15), darken(COLORS.shed, 25), tile.height);
        // Door
        ctx.fillStyle = "#5D4037";
        ctx.fillRect(x - 5, y - 12, 10, 12);
        ctx.fillStyle = "#F4D03F";
        ctx.beginPath();
        ctx.arc(x + 2, y - 6, 1.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "shed_roof": {
        drawTile(ctx, x, y - 18, COLORS.shedRoof, darken(COLORS.shedRoof, 15), darken(COLORS.shedRoof, 25), 10);
        break;
      }
      case "compost": {
        drawTile(ctx, x, y, COLORS.compost, COLORS.compostDark, COLORS.compostDark, 12);
        // Compost heap texture
        ctx.fillStyle = "#6D4C41";
        ctx.beginPath();
        ctx.arc(x, y - 10, 10, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = "#4CAF50";
        ctx.font = "6px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("~", x - 3, y - 8);
        ctx.fillText("~", x + 4, y - 10);
        break;
      }
      case "tree": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.ellipse(x + 8, y + 4, 16, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.trunk;
        ctx.fillRect(x - 3, y - 28, 6, 28);
        const sway = Math.sin(pulse + col * 0.5) * 2;
        ctx.fillStyle = COLORS.leaves1;
        ctx.beginPath();
        ctx.arc(x + sway, y - 34, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.leaves2;
        ctx.beginPath();
        ctx.arc(x - 6 + sway, y - 30, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.leaves3;
        ctx.beginPath();
        ctx.arc(x + 6 + sway, y - 38, 10, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "fruit_tree": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.ellipse(x + 6, y + 3, 14, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.trunk;
        ctx.fillRect(x - 3, y - 24, 6, 24);
        const sway = Math.sin(pulse + col * 0.7) * 1.5;
        ctx.fillStyle = COLORS.leaves1;
        ctx.beginPath();
        ctx.arc(x + sway, y - 28, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.leaves3;
        ctx.beginPath();
        ctx.arc(x - 5 + sway, y - 25, 9, 0, Math.PI * 2);
        ctx.fill();
        // Fruit dots
        ctx.fillStyle = COLORS.fruitTree;
        const fruitPos = [[x - 3, y - 32], [x + 5, y - 26], [x - 7, y - 24], [x + 2, y - 34]];
        for (const [fx, fy] of fruitPos) {
          ctx.beginPath();
          ctx.arc(fx + sway, fy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "orn_tree": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.beginPath();
        ctx.ellipse(x + 5, y + 3, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.trunk;
        ctx.fillRect(x - 2, y - 22, 5, 22);
        const sway = Math.sin(pulse + col * 0.6) * 1.5;
        // Pink/purple ornamental foliage
        ctx.fillStyle = COLORS.ornTree;
        ctx.beginPath();
        ctx.arc(x + sway, y - 26, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F48FB1";
        ctx.beginPath();
        ctx.arc(x - 4 + sway, y - 23, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#CE93D8";
        ctx.beginPath();
        ctx.arc(x + 5 + sway, y - 30, 8, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "bench": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        ctx.fillStyle = COLORS.bench;
        ctx.fillRect(x - 14, y - 10, 28, 4);
        ctx.fillStyle = "#6D4C41";
        ctx.fillRect(x - 12, y - 6, 3, 8);
        ctx.fillRect(x + 10, y - 6, 3, 8);
        ctx.fillStyle = "#8D6E63";
        ctx.fillRect(x - 14, y - 16, 28, 3);
        break;
      }
      case "birdbath": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        // Pedestal
        ctx.fillStyle = COLORS.birdbath;
        ctx.fillRect(x - 3, y - 16, 6, 16);
        ctx.fillStyle = "#CFD8DC";
        ctx.fillRect(x - 5, y - 2, 10, 3);
        // Bowl
        ctx.fillStyle = COLORS.birdbath;
        ctx.beginPath();
        ctx.ellipse(x, y - 18, 10, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Water
        ctx.fillStyle = "#4FC3F7";
        ctx.beginPath();
        ctx.ellipse(x, y - 18, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        // Bird (sometimes)
        if ((col + row) % 3 === 0) {
          ctx.fillStyle = "#8D6E63";
          ctx.beginPath();
          ctx.arc(x + 3, y - 22, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FF9800";
          ctx.fillRect(x + 5, y - 22, 3, 1);
        }
        break;
      }
      case "statue": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        // Base
        ctx.fillStyle = "#BDBDBD";
        ctx.fillRect(x - 8, y - 6, 16, 6);
        // Statue body
        ctx.fillStyle = COLORS.statue;
        ctx.fillRect(x - 4, y - 26, 8, 20);
        // Head
        ctx.fillStyle = "#BDBDBD";
        ctx.beginPath();
        ctx.arc(x, y - 30, 6, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "van": {
        drawTile(ctx, x, y, COLORS.parking, COLORS.parkingSide, COLORS.parkingSide);
        // Van body
        ctx.fillStyle = COLORS.van;
        ctx.fillRect(x - 16, y - 22, 32, 18);
        ctx.fillStyle = "#E0E0E0";
        ctx.fillRect(x - 14, y - 28, 28, 8);
        // Window
        ctx.fillStyle = "#81D4FA";
        ctx.fillRect(x + 6, y - 26, 8, 6);
        // Wheels
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(x - 10, y - 4, 4, 0, Math.PI * 2);
        ctx.arc(x + 10, y - 4, 4, 0, Math.PI * 2);
        ctx.fill();
        // HovenierAI text
        ctx.fillStyle = COLORS.vanAccent;
        ctx.font = "bold 5px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText("HAI", x - 2, y - 12);
        // Leaf icon
        ctx.fillStyle = "#4CAF50";
        ctx.font = "10px sans-serif";
        ctx.fillText("\uD83C\uDF3F", x + 11, y - 14);
        break;
      }
      case "flowerbed": {
        drawTile(ctx, x, y, "#C8E6C9", COLORS.grass3, COLORS.grass3, 6);
        // Flowers
        const flowerColors = ["#E91E63", "#FF5722", "#9C27B0", "#F44336", "#FF9800", "#FF69B4"];
        const fc1 = flowerColors[(col * 3 + row * 7) % flowerColors.length];
        const fc2 = flowerColors[(col * 5 + row * 11) % flowerColors.length];
        // Stems
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(x - 6, y - 14, 2, 10);
        ctx.fillRect(x + 4, y - 12, 2, 8);
        ctx.fillRect(x - 1, y - 16, 2, 12);
        // Petals
        for (const [fx, fy, fc] of [[x - 5, y - 16, fc1], [x + 5, y - 14, fc2], [x, y - 18, fc1]] as [number, number, string][]) {
          ctx.fillStyle = fc;
          ctx.beginPath();
          ctx.arc(fx, fy, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFEB3B";
          ctx.beginPath();
          ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "veggie": {
        drawTile(ctx, x, y, "#8D6E63", "#795548", "#6D4C41", 4);
        // Veggie rows
        ctx.fillStyle = "#66BB6A";
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(x - 10 + i * 8, y - 8, 6, 3);
        }
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(x - 8, y - 12, 2, 6);
        ctx.fillRect(x, y - 10, 2, 4);
        ctx.fillRect(x + 6, y - 11, 2, 5);
        break;
      }
      case "parking": {
        drawTile(ctx, x, y, COLORS.parking, COLORS.parkingSide, COLORS.parkingSide);
        break;
      }
      case "fence": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        ctx.fillStyle = COLORS.fencePost;
        ctx.fillRect(x - 12, y - 18, 4, 20);
        ctx.fillRect(x + 8, y - 18, 4, 20);
        ctx.fillStyle = COLORS.fence;
        ctx.fillRect(x - 14, y - 16, 28, 3);
        ctx.fillRect(x - 14, y - 8, 28, 3);
        break;
      }
      case "house_wall":
      case "house_wall2":
      case "house_wall3":
      case "house_wall4": {
        const wallColors: Record<string, string> = {
          house_wall: "#FFCCBC",
          house_wall2: "#BBDEFB",
          house_wall3: "#C8E6C9",
          house_wall4: "#FFE0B2",
        };
        const wc = wallColors[tile.type] || "#FFCCBC";
        drawTile(ctx, x, y - 12, wc, darken(wc, 20), darken(wc, 30), tile.height);
        break;
      }
      case "house_roof":
      case "house_roof2": {
        const roofColors: Record<string, string> = {
          house_roof: "#795548",
          house_roof2: "#5D4037",
        };
        const rc = roofColors[tile.type] || "#795548";
        drawTile(ctx, x, y - 24, rc, darken(rc, 15), darken(rc, 25), 12);
        // Overhang
        ctx.fillStyle = rc;
        ctx.beginPath();
        ctx.moveTo(x, y - 24 - hh - 6);
        ctx.lineTo(x + hw + 6, y - 24 + 2);
        ctx.lineTo(x, y - 24 + hh + 4);
        ctx.lineTo(x - hw - 6, y - 24 + 2);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case "house_door": {
        drawTile(ctx, x, y - 12, "#FFCCBC", darken("#FFCCBC", 20), darken("#FFCCBC", 30), tile.height);
        ctx.fillStyle = "#5D4037";
        ctx.fillRect(x - 6, y - 16, 12, 16);
        ctx.fillStyle = "#F4D03F";
        ctx.beginPath();
        ctx.arc(x + 3, y - 8, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "house_window": {
        drawTile(ctx, x, y - 12, "#FFCCBC", darken("#FFCCBC", 20), darken("#FFCCBC", 30), tile.height);
        ctx.fillStyle = "#81D4FA";
        ctx.fillRect(x - 8, y - 16, 16, 10);
        ctx.strokeStyle = "#5D4E37";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 8, y - 16, 16, 10);
        ctx.beginPath();
        ctx.moveTo(x, y - 16);
        ctx.lineTo(x, y - 6);
        ctx.moveTo(x - 8, y - 11);
        ctx.lineTo(x + 8, y - 11);
        ctx.stroke();
        break;
      }
      case "station": {
        drawTile(ctx, x, y, COLORS.grass1, COLORS.grass3, COLORS.grass3);
        break;
      }
    }
  }, [drawTile]);

  // ─── DRAW STATION ────────────────────────────────────────────────────
  const drawStation = useCallback((
    ctx: CanvasRenderingContext2D,
    station: StationDef,
    pulse: number
  ) => {
    const { x, y } = gridToScreen(station.col, station.row);
    const pulseSc = 1 + Math.sin(pulse) * 0.03;

    drawTile(ctx, x, y - 4, station.color, station.colorDark, station.colorDark, 20);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40 * pulseSc);
    gradient.addColorStop(0, station.color + "40");
    gradient.addColorStop(1, station.color + "00");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y - 8, 40 * pulseSc, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(station.emoji, x, y - 16);

    ctx.font = "bold 9px 'Press Start 2P', monospace";
    ctx.fillStyle = "#2D5A27";
    ctx.textAlign = "center";
    ctx.fillText(station.name, x, y + 28);

    const prog = stateRef.current.progress[station.id as string];
    if (prog && prog.bestRound > 0) {
      const starCount = Math.min(3, Math.ceil(prog.bestRound / 5));
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "#F4D03F";
      ctx.fillText("\u2605".repeat(starCount) + "\u2606".repeat(3 - starCount), x, y + 42);
    }

    if (!station.available) {
      ctx.font = "bold 7px 'Press Start 2P', monospace";
      ctx.fillStyle = "#E74C3C";
      ctx.fillText("SOON", x, y + 54);
    }
  }, [drawTile]);

  // ─── DRAW PLAYER ─────────────────────────────────────────────────────
  const drawPlayer = useCallback((
    ctx: CanvasRenderingContext2D, x: number, y: number, facing: Direction, frame: number
  ) => {
    ctx.fillStyle = COLORS.shadow;
    ctx.beginPath();
    ctx.ellipse(x, y + 6, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    const sprite = getSprite(facing, frame);
    ctx.drawImage(sprite, x - sprite.width / 2, y - sprite.height + 8);
  }, [getSprite]);

  // ─── WORLD RENDER LOOP ───────────────────────────────────────────────
  const renderWorld = useCallback((
    ctx: CanvasRenderingContext2D, cw: number, ch: number, now: number
  ) => {
    const anim = animState.current;
    const st = stateRef.current;

    // Sky gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
    bgGrad.addColorStop(0, COLORS.bgTop);
    bgGrad.addColorStop(1, COLORS.bgBot);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cw, ch);

    // Calculate player target in world coords
    const playerScreen = gridToScreen(st.playerCol, st.playerRow);
    anim.playerTargetX = playerScreen.x;
    anim.playerTargetY = playerScreen.y;

    if (!anim.initialized) {
      anim.playerDrawX = anim.playerTargetX;
      anim.playerDrawY = anim.playerTargetY;
      anim.initialized = true;
    }

    anim.playerDrawX += (anim.playerTargetX - anim.playerDrawX) * LERP_SPEED;
    anim.playerDrawY += (anim.playerTargetY - anim.playerDrawY) * LERP_SPEED;

    const dx = Math.abs(anim.playerDrawX - anim.playerTargetX);
    const dy = Math.abs(anim.playerDrawY - anim.playerTargetY);
    anim.isMoving = dx > 1 || dy > 1;

    if (anim.isMoving) {
      if (now - anim.lastFrameTime > WALK_FRAME_MS) {
        anim.walkFrame = (anim.walkFrame + 1) % 4;
        anim.lastFrameTime = now;
      }
    } else {
      anim.walkFrame = 0;
    }

    anim.stationPulse = now / 500;

    // Camera target = player position
    anim.cameraTargetX = anim.playerDrawX - cw / 2;
    anim.cameraTargetY = anim.playerDrawY - ch / 2;

    if (!anim.cameraInitialized) {
      anim.cameraX = anim.cameraTargetX;
      anim.cameraY = anim.cameraTargetY;
      anim.cameraInitialized = true;
    }

    // Smooth camera lerp
    anim.cameraX += (anim.cameraTargetX - anim.cameraX) * CAMERA_LERP;
    anim.cameraY += (anim.cameraTargetY - anim.cameraY) * CAMERA_LERP;

    // Apply camera transform
    ctx.save();
    ctx.translate(-anim.cameraX, -anim.cameraY);

    // Viewport culling margins
    const margin = 100;
    const visLeft = anim.cameraX - margin;
    const visRight = anim.cameraX + cw + margin;
    const visTop = anim.cameraY - margin;
    const visBottom = anim.cameraY + ch + margin;

    // Draw floor tiles (back to front)
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const { x, y } = gridToScreen(c, r);
        if (x < visLeft - TILE_W || x > visRight + TILE_W) continue;
        if (y < visTop - 60 || y > visBottom + 60) continue;

        const tile = WORLD_MAP[r][c];
        drawWorldTile(ctx, c, r, x, y, tile, anim.stationPulse);
      }
    }

    // Collect all drawable entities for depth sorting
    interface Drawable { row: number; col: number; draw: () => void; }
    const drawables: Drawable[] = [];

    for (const station of STATIONS) {
      const { x, y } = gridToScreen(station.col, station.row);
      if (x > visLeft - 60 && x < visRight + 60 && y > visTop - 80 && y < visBottom + 60) {
        drawables.push({
          row: station.row, col: station.col,
          draw: () => drawStation(ctx, station, anim.stationPulse),
        });
      }
    }

    drawables.push({
      row: st.playerRow, col: st.playerCol,
      draw: () => drawPlayer(ctx, anim.playerDrawX, anim.playerDrawY - 12, st.facing, anim.walkFrame),
    });

    drawables.sort((a, b) => (a.row + a.col) - (b.row + b.col));
    for (const d of drawables) d.draw();

    ctx.restore();
  }, [drawTile, drawWorldTile, drawStation, drawPlayer]);

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
      animState.current.cameraInitialized = false;
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
          case "ArrowUp": case "w": case "W":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "n" });
            soundRef.current?.step();
            break;
          case "ArrowDown": case "s": case "S":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "s" });
            soundRef.current?.step();
            break;
          case "ArrowLeft": case "a": case "A":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "w" });
            soundRef.current?.step();
            break;
          case "ArrowRight": case "d": case "D":
            e.preventDefault();
            dispatch({ type: "MOVE_PLAYER", dir: "e" });
            soundRef.current?.step();
            break;
          case " ": case "Enter":
            e.preventDefault();
            for (const station of STATIONS) {
              if (isAdjacentToStation(st.playerCol, st.playerRow, station)) {
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
        if (e.key === "Escape") dispatch({ type: "EXIT_TO_WORLD" });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ─── REAL-TIME TIMER (rAF-based) ─────────────────────────────────────
  useEffect(() => {
    if (state.screen !== "mow" || !state.roundActive) {
      setTimerDisplay(0);
      return;
    }

    let lastTickSec = -1;
    let disposed = false;

    const tick = () => {
      if (disposed) return;
      const st = stateRef.current;
      if (!st.roundActive) return;

      const now = Date.now();
      const elapsedMs = now - st.roundStartTime;
      const elapsedSec = elapsedMs / 1000;
      const remaining = Math.max(0, st.roundTimeLimit - elapsedSec);

      setTimerDisplay(remaining);

      // Tick sound in last 5 seconds
      if (remaining <= 5 && remaining > 0) {
        const currentSec = Math.ceil(remaining);
        if (currentSec !== lastTickSec) {
          lastTickSec = currentSec;
          soundRef.current?.tick();
        }
      }

      // Time expired
      if (remaining <= 0) {
        dispatch({ type: "TIMER_EXPIRED" });
        soundRef.current?.fail();
        return;
      }

      timerAnimRef.current = requestAnimationFrame(tick);
    };

    timerAnimRef.current = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(timerAnimRef.current);
    };
  }, [state.screen, state.roundActive, state.roundStartTime, state.roundTimeLimit]);

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

  // Timer derived values
  const timerFraction = state.roundActive
    ? timerDisplay / getTimerForRound(state.currentRound, state.upgrades)
    : 0;

  const timerColor = timerFraction > 0.5 ? "#4CAF50" : timerFraction > 0.25 ? "#FF9800" : "#F44336";

  // Count remaining unmowed tiles
  const unmowedCount = useMemo(() => {
    if (!state.mowGrid) return 0;
    return countUnmowed(state.mowGrid, state.mowGridSize);
  }, [state.mowGrid, state.mowGridSize]);

  // ─── CLICK ON CANVAS (world) ─────────────────────────────────────────
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const st = stateRef.current;
    if (st.screen !== "world") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const anim = animState.current;

    const sx = e.clientX - rect.left + anim.cameraX;
    const sy = e.clientY - rect.top + anim.cameraY;

    for (const station of STATIONS) {
      const { x, y } = gridToScreen(station.col, station.row);
      const ddx = Math.abs(sx - x);
      const ddy = Math.abs(sy - y);
      if (ddx < TILE_W / 2 && ddy < TILE_H) {
        if (station.available) {
          dispatch({ type: "ENTER_STATION", station: station.id });
          soundRef.current?.enterStation();
        } else {
          dispatch({ type: "SHOW_COMING_SOON" });
        }
        return;
      }
    }

    const { col, row } = screenToGrid(sx, sy);
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
  }, []);

  // ─── MOW CELL CLICK ──────────────────────────────────────────────────
  const handleMowCellClick = useCallback((row: number, col: number) => {
    const st = stateRef.current;
    if (!st.mowGrid || !st.roundActive) return;
    const cell = st.mowGrid[row][col];
    if (cell === "unmowed") {
      dispatch({ type: "MOW_CELL", row, col });
      soundRef.current?.mowGrass();
    } else if (cell === "flower") {
      dispatch({ type: "MOW_CELL", row, col });
    }
  }, []);

  // ─── RENDER ───────────────────────────────────────────────────────────
  const currentLevel = state.screen === "mow" ? MOW_LEVELS[state.currentRound] : null;

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
      {/* Google Font + Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; }

        .pixel-btn {
          font-family: 'Press Start 2P', monospace;
          border: 4px solid #1B5E20;
          background: linear-gradient(180deg, #A5D6A7 0%, #81C784 100%);
          color: #1B5E20;
          padding: 12px 20px;
          font-size: 12px;
          cursor: pointer;
          image-rendering: pixelated;
          transition: transform 0.1s, box-shadow 0.1s;
          box-shadow: 4px 4px 0px #1B5E20;
          text-transform: none;
          letter-spacing: 1px;
        }
        .pixel-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #1B5E20;
        }
        .pixel-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 1px 1px 0px #1B5E20;
        }
        .pixel-btn.primary {
          background: linear-gradient(180deg, #4CAF50 0%, #388E3C 100%);
          color: white;
          border-color: #2E7D32;
          box-shadow: 4px 4px 0px #2E7D32;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
        }
        .pixel-btn.danger {
          background: linear-gradient(180deg, #FF7675 0%, #E06665 100%);
          color: white;
          border-color: #C44E4E;
          box-shadow: 4px 4px 0px #C44E4E;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
        }
        .pixel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: 4px 4px 0px #1B5E20;
        }

        .overlay-panel {
          background: linear-gradient(180deg, #F1F8E9 0%, #DCEDC8 100%);
          border: 6px solid #2E7D32;
          border-radius: 0px;
          box-shadow: 8px 8px 0px rgba(46, 125, 50, 0.4), inset 0 0 0 3px #A5D6A7;
          padding: 24px;
          image-rendering: pixelated;
        }

        .retro-border {
          border: 6px solid #2E7D32;
          box-shadow: 8px 8px 0px rgba(46, 125, 50, 0.3), inset 0 0 0 3px #A5D6A7;
        }

        .mow-cell {
          border: 3px solid #5BA84A;
          background: #90D26D;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          position: relative;
          image-rendering: pixelated;
        }
        .mow-cell:hover { background: #A8E088; transform: scale(1.05); }
        .mow-cell.rock {
          background: #8B7355;
          cursor: default;
          border-color: #6B5535;
        }
        .mow-cell.rock:hover { transform: none; }
        .mow-cell.flower {
          background: linear-gradient(135deg, #FFB7C5, #FF69B4);
          border-color: #FF1493;
          cursor: pointer;
          animation: flowerSway 2s ease-in-out infinite;
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
        .mow-cell.mowed:hover { transform: none; }
        .mow-cell.current {
          background: linear-gradient(135deg, #32CD32, #28A428);
          border-color: #1E7B1E;
          cursor: default;
          animation: currentPulse 0.8s ease-in-out infinite;
        }
        .mow-cell.current:hover { transform: none; }

        @keyframes currentPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(50, 205, 50, 0.4); }
          50% { box-shadow: 0 0 14px rgba(50, 205, 50, 0.7); }
        }
        @keyframes flowerSway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
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
          50% { transform: translateY(-10px); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 4px 4px 0px rgba(27,94,32,0.3), 0 0 20px rgba(76,175,80,0.3); }
          50% { text-shadow: 4px 4px 0px rgba(27,94,32,0.3), 0 0 40px rgba(76,175,80,0.6); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        @keyframes penaltyFlash {
          0%, 100% { background-color: rgba(255, 0, 0, 0); }
          50% { background-color: rgba(255, 0, 0, 0.2); }
        }

        .d-pad-btn {
          width: 56px;
          height: 56px;
          background: rgba(27, 94, 32, 0.7);
          border: 3px solid rgba(27, 94, 32, 0.9);
          border-radius: 4px;
          color: white;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          box-shadow: 3px 3px 0px rgba(0,0,0,0.3);
        }
        .d-pad-btn:active {
          background: rgba(27, 94, 32, 0.95);
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px rgba(0,0,0,0.3);
        }

        .timer-bar-container {
          position: relative;
          overflow: hidden;
        }
        .timer-bar-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.05) 2px,
            rgba(0,0,0,0.05) 4px
          );
          pointer-events: none;
        }
      `}</style>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          imageRendering: "pixelated",
          display: state.screen === "world" || state.screen === "shop" ? "block" : "none",
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
            background: `linear-gradient(180deg, #1B3A1B 0%, #0D2B0D 40%, #1B5E20 100%)`,
            zIndex: 100,
          }}
        >
          {/* Scanline overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Pixel art border frame */}
          <div
            style={{
              position: "absolute",
              inset: 16,
              border: "6px solid #4CAF50",
              boxShadow: "inset 0 0 0 4px #1B5E20, inset 0 0 0 8px #4CAF5044",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          <div
            style={{
              animation: "titleFloat 3s ease-in-out infinite",
              textAlign: "center",
              marginBottom: 32,
              zIndex: 3,
            }}
          >
            {/* Leaf decorations flanking the icon */}
            <div style={{ fontSize: 64, marginBottom: 12, filter: "drop-shadow(0 0 20px rgba(76,175,80,0.5))" }}>
              {"\uD83C\uDF3F"}
            </div>
            <h1
              style={{
                fontSize: 42,
                color: "#4CAF50",
                fontFamily: "'Press Start 2P', monospace",
                animation: "titleGlow 2s ease-in-out infinite",
                lineHeight: 1.4,
                letterSpacing: 4,
                margin: 0,
              }}
            >
              TuinBaas
            </h1>
            <div
              style={{
                width: 280,
                height: 4,
                background: "linear-gradient(90deg, transparent, #4CAF50, transparent)",
                margin: "12px auto",
              }}
            />
            <p
              style={{
                fontSize: 12,
                color: "#81C784",
                fontFamily: "'Press Start 2P', monospace",
                marginTop: 8,
                letterSpacing: 2,
              }}
            >
              Hovenier Simulator
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 36,
              maxWidth: 360,
              zIndex: 3,
            }}
          >
            {STATIONS.map((s) => (
              <div
                key={s.id}
                style={{
                  background: s.color + "20",
                  border: `3px solid ${s.color}80`,
                  padding: "10px 14px",
                  textAlign: "center",
                  fontSize: 8,
                  fontFamily: "'Press Start 2P', monospace",
                  color: s.color,
                  boxShadow: `3px 3px 0px ${s.color}40`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
                {s.name}
                {!s.available && (
                  <div style={{ fontSize: 6, color: "#666", marginTop: 4 }}>SOON</div>
                )}
              </div>
            ))}
          </div>

          <button
            className="pixel-btn primary"
            onClick={() => {
              dispatch({ type: "START_GAME" });
              soundRef.current?.titleJingle();
            }}
            style={{
              fontSize: 18,
              padding: "18px 40px",
              zIndex: 3,
              animation: "blink 1.5s step-end infinite",
              letterSpacing: 4,
            }}
          >
            {"\u25B6"} START
          </button>

          <div
            style={{
              fontSize: 9,
              color: "#5D7E5D",
              fontFamily: "'Press Start 2P', monospace",
              marginTop: 32,
              textAlign: "center",
              lineHeight: 2.2,
              zIndex: 3,
            }}
          >
            <span style={{ color: "#4CAF50" }}>WASD</span> / Pijltjes = Lopen
            <br />
            <span style={{ color: "#81C784" }}>SPATIE</span> = Station betreden
            <br />
            <span style={{ color: "#A5D6A7" }}>KLIK</span> = Interactie
          </div>

          {/* Version badge */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              fontSize: 7,
              color: "#5D7E5D",
              fontFamily: "'Press Start 2P', monospace",
              zIndex: 3,
            }}
          >
            v3.0
          </div>
        </div>
      )}

      {/* ─── WORLD HUD ──────────────────────────────────────────────── */}
      {(state.screen === "world" || state.screen === "shop") && (
        <>
          {/* Top bar */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              background: "linear-gradient(180deg, rgba(27,94,32,0.9) 0%, rgba(27,94,32,0.75) 100%)",
              borderBottom: "4px solid #1B5E20",
              zIndex: 50,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F4D03F", fontSize: 14, fontFamily: "'Press Start 2P', monospace" }}>
              <span style={{ fontSize: 20 }}>{"\uD83E\uDE99"}</span>
              <span>{state.coins}</span>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              {STATIONS.map((s) => {
                const prog = state.progress[s.id as string];
                const stars = prog ? Math.min(3, Math.ceil(prog.bestRound / 5)) : 0;
                return (
                  <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: 16 }}>{s.emoji}</span>
                    <span style={{ fontSize: 8, color: "#F4D03F", fontFamily: "'Press Start 2P', monospace" }}>
                      {"\u2605".repeat(stars)}{"\u2606".repeat(3 - stars)}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              className="pixel-btn"
              onClick={() => { dispatch({ type: "OPEN_SHOP" }); soundRef.current?.coin(); }}
              style={{ fontSize: 9, padding: "8px 12px" }}
            >
              {"\uD83D\uDED2"} Winkel
            </button>
          </div>

          {/* Mobile D-pad */}
          <div
            style={{
              position: "absolute",
              bottom: 20, left: 20,
              zIndex: 50,
              display: "grid",
              gridTemplateColumns: "56px 56px 56px",
              gridTemplateRows: "56px 56px 56px",
              gap: 4,
            }}
          >
            <div />
            <button className="d-pad-btn" onPointerDown={(e) => { e.preventDefault(); dispatch({ type: "MOVE_PLAYER", dir: "n" }); soundRef.current?.step(); }}>{"\u25B2"}</button>
            <div />
            <button className="d-pad-btn" onPointerDown={(e) => { e.preventDefault(); dispatch({ type: "MOVE_PLAYER", dir: "w" }); soundRef.current?.step(); }}>{"\u25C0"}</button>
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
              style={{ fontSize: 11, fontFamily: "'Press Start 2P', monospace" }}
            >
              OK
            </button>
            <button className="d-pad-btn" onPointerDown={(e) => { e.preventDefault(); dispatch({ type: "MOVE_PLAYER", dir: "e" }); soundRef.current?.step(); }}>{"\u25B6"}</button>
            <div />
            <button className="d-pad-btn" onPointerDown={(e) => { e.preventDefault(); dispatch({ type: "MOVE_PLAYER", dir: "s" }); soundRef.current?.step(); }}>{"\u25BC"}</button>
            <div />
          </div>

          {/* Minimap */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 120,
              height: 80,
              background: "rgba(0,0,0,0.6)",
              border: "3px solid #2E7D32",
              zIndex: 50,
              overflow: "hidden",
              imageRendering: "pixelated",
            }}
          >
            <canvas
              ref={(el) => {
                if (!el) return;
                const mctx = el.getContext("2d");
                if (!mctx) return;
                el.width = 120;
                el.height = 80;
                const sx = 120 / GRID_COLS;
                const sy = 80 / GRID_ROWS;
                mctx.clearRect(0, 0, 120, 80);
                for (let r = 0; r < GRID_ROWS; r++) {
                  for (let c = 0; c < GRID_COLS; c++) {
                    const t = WORLD_MAP[r][c].type;
                    if (t === "path" || t === "path_cross") mctx.fillStyle = "#c9b";
                    else if (t === "hedge") mctx.fillStyle = "#1a5";
                    else if (t === "pond" || t === "pond_edge") mctx.fillStyle = "#4cf";
                    else if (t.startsWith("house") || t === "house_door" || t === "house_window") mctx.fillStyle = "#c94";
                    else if (t.startsWith("greenhouse")) mctx.fillStyle = "#8ce";
                    else if (t.startsWith("shed")) mctx.fillStyle = "#864";
                    else if (t === "compost") mctx.fillStyle = "#754";
                    else if (t === "tree" || t === "fruit_tree" || t === "orn_tree") mctx.fillStyle = "#2a6";
                    else if (t === "flowerbed") mctx.fillStyle = "#f6b";
                    else if (t === "veggie") mctx.fillStyle = "#7a4";
                    else if (t === "fence") mctx.fillStyle = "#a87";
                    else if (t === "parking" || t === "van") mctx.fillStyle = "#888";
                    else mctx.fillStyle = "#5a5";
                    mctx.fillRect(c * sx, r * sy, sx, sy);
                  }
                }
                for (const s of STATIONS) {
                  mctx.fillStyle = s.color;
                  mctx.fillRect(s.col * sx - 1, s.row * sy - 1, sx + 2, sy + 2);
                }
                mctx.fillStyle = "#FF0";
                mctx.fillRect(state.playerCol * sx - 1, state.playerRow * sy - 1, sx + 2, sy + 2);
              }}
              width={120}
              height={80}
              style={{ width: 120, height: 80 }}
            />
            <div style={{ position: "absolute", top: 2, left: 4, fontSize: 6, color: "#aaa", fontFamily: "'Press Start 2P', monospace" }}>MAP</div>
          </div>

          {/* Station interaction hint */}
          {(() => {
            const nearStation = STATIONS.find((s) => isAdjacentToStation(state.playerCol, state.playerRow, s));
            if (!nearStation) return null;
            return (
              <div
                style={{
                  position: "absolute",
                  bottom: 110,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(27,94,32,0.9)",
                  color: "white",
                  padding: "10px 20px",
                  border: "3px solid #4CAF50",
                  fontSize: 10,
                  fontFamily: "'Press Start 2P', monospace",
                  zIndex: 50,
                  textAlign: "center",
                  animation: "fadeIn 0.3s ease",
                  boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                }}
              >
                {nearStation.emoji} {nearStation.name} {"\u2014"} Druk SPATIE
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
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div className="overlay-panel" style={{ maxWidth: 520, width: "92%", maxHeight: "80vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, color: "#2E7D32", fontFamily: "'Press Start 2P', monospace", margin: 0 }}>
                {"\uD83D\uDED2"} Winkel
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#F4D03F", fontSize: 14, fontFamily: "'Press Start 2P', monospace" }}>
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
                      padding: 14,
                      background: owned ? "#E8F5E9" : canAfford ? "#F1F8E9" : "#F5F0EB",
                      border: `3px solid ${owned ? "#4CAF50" : "#A5D6A7"}`,
                      boxShadow: `3px 3px 0px ${owned ? "#388E3C" : "#81C784"}`,
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{upg.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace", color: "#2E7D32", marginBottom: 6 }}>
                        {upg.name}
                      </div>
                      <div style={{ fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#558B2F" }}>
                        {upg.desc}
                      </div>
                    </div>
                    {owned ? (
                      <span style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#4CAF50" }}>GEKOCHT</span>
                    ) : (
                      <button
                        className="pixel-btn primary"
                        disabled={!canAfford}
                        onClick={() => { dispatch({ type: "BUY_UPGRADE", id: upg.id }); soundRef.current?.buyUpgrade(); }}
                        style={{ fontSize: 9, padding: "8px 12px", whiteSpace: "nowrap" }}
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
              style={{ marginTop: 20, width: "100%", fontSize: 11 }}
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
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 70,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => dispatch({ type: "HIDE_COMING_SOON" })}
        >
          <div className="overlay-panel" style={{ textAlign: "center", padding: 48 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{"\uD83D\uDEA7"}</div>
            <h2 style={{ fontSize: 16, fontFamily: "'Press Start 2P', monospace", color: "#2E7D32", marginBottom: 16 }}>
              Binnenkort!
            </h2>
            <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#558B2F", lineHeight: 2.2, marginBottom: 24 }}>
              Dit mini-spel wordt
              <br />
              binnenkort toegevoegd.
              <br />
              Blijf tuned!
            </p>
            <button className="pixel-btn" onClick={() => dispatch({ type: "HIDE_COMING_SOON" })}>
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
            background: `linear-gradient(180deg, #1B3A1B 0%, #0D2B0D 100%)`,
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
              background: "rgba(27,94,32,0.9)",
              borderBottom: "4px solid #1B5E20",
            }}
          >
            <button
              className="pixel-btn danger"
              onClick={() => dispatch({ type: "EXIT_TO_WORLD" })}
              style={{ fontSize: 9, padding: "8px 12px" }}
            >
              {"\u2715"} Terug
            </button>
            <div style={{ fontSize: 12, fontFamily: "'Press Start 2P', monospace", color: "#4CAF50" }}>
              Ronde {state.currentRound + 1}/16
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#F4D03F", fontSize: 12, fontFamily: "'Press Start 2P', monospace" }}>
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
                state.clientMood === "angry" ? "clientLeave 0.5s ease forwards" :
                state.clientMood === "happy" ? "clientHappy 0.5s ease infinite" :
                "clientEnter 0.4s ease",
            }}
          >
            {/* Client pixel art - garden homeowner */}
            <div style={{ width: 48, height: 64, position: "relative", imageRendering: "pixelated" }}>
              <svg viewBox="0 0 12 16" width={48} height={64} style={{ imageRendering: "pixelated" }}>
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
                  <rect x="5" y="6" width="2" height="1" fill="#E74C3C" />
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
                {/* Body - garden apron */}
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
                background: "#F1F8E9",
                border: "4px solid #2E7D32",
                borderRadius: "0",
                padding: "10px 16px",
                fontSize: 9,
                fontFamily: "'Press Start 2P', monospace",
                color: "#2E7D32",
                lineHeight: 1.8,
                maxWidth: 280,
                position: "relative",
                boxShadow: "4px 4px 0px rgba(46,125,50,0.3)",
              }}
            >
              {state.clientMood === "happy"
                ? "Prachtig! Dankjewel! \uD83C\uDF89"
                : state.clientMood === "angry"
                  ? "Te laat! Ik ga weg! \uD83D\uDE24"
                  : currentLevel?.clientText || ""}
              <div
                style={{
                  position: "absolute",
                  bottom: -12,
                  left: 6,
                  width: 0, height: 0,
                  borderTop: "12px solid #2E7D32",
                  borderRight: "12px solid transparent",
                }}
              />
            </div>
          </div>

          {/* Timer bar - REAL-TIME with rAF */}
          {state.roundActive && (
            <div
              className="timer-bar-container"
              style={{
                width: "90%",
                maxWidth: 500,
                height: 24,
                background: "#0D2B0D",
                border: "4px solid #2E7D32",
                marginBottom: 8,
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${timerFraction * 100}%`,
                  background: `linear-gradient(90deg, ${timerColor}, ${timerColor}dd)`,
                  transition: "background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: timerFraction < 0.25
                      ? "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)"
                      : "none",
                    animation: timerFraction < 0.25 ? "scanline 0.5s linear infinite" : "none",
                  }}
                />
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 9,
                  fontFamily: "'Press Start 2P', monospace",
                  color: "white",
                  textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                  zIndex: 2,
                }}
              >
                {timerDisplay.toFixed(1)}s
              </span>
            </div>
          )}

          {/* Lives indicator */}
          {state.roundActive && state.lives > 1 && (
            <div style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#E74C3C", marginBottom: 6 }}>
              {"\u2764\uFE0F".repeat(state.lives)} Extra levens
            </div>
          )}

          {/* Remaining tiles counter */}
          {state.roundActive && (
            <div style={{ fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#4CAF50", marginBottom: 8 }}>
              {"\uD83C\uDF3F"} Nog te maaien: {unmowedCount} tegels
            </div>
          )}

          {/* Mow Grid */}
          {state.mowGrid && state.roundResult !== "fail" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${state.mowGridSize}, ${Math.min(60, Math.floor(350 / state.mowGridSize))}px)`,
                gap: 3,
                padding: 14,
                background: "#1B3A1B",
                border: "4px solid #2E7D32",
                boxShadow: "6px 6px 0px rgba(0,0,0,0.3)",
                animation: "slideUp 0.3s ease",
              }}
            >
              {state.mowGrid.map((row, ri) =>
                row.map((cell, ci) => {
                  const cellSize = Math.min(60, Math.floor(350 / state.mowGridSize));

                  let isReachable = false;
                  if (cell === "unmowed" && state.mowPath.length > 0) {
                    const [lastR, lastC] = state.mowPath[state.mowPath.length - 1];
                    isReachable = isAdjacent(lastR, lastC, ri, ci);
                  } else if (cell === "unmowed" && state.mowPath.length === 0) {
                    isReachable = true;
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
                      {cell === "rock" && <span style={{ fontSize: 14, opacity: 0.8 }}>{"\uD83E\uDEA8"}</span>}
                      {cell === "flower" && <span style={{ fontSize: 16 }}>{"\uD83C\uDF3A"}</span>}
                      {cell === "unmowed" && <span style={{ fontSize: 14, opacity: 0.5 }}>{"\uD83C\uDF3E"}</span>}
                      {cell === "mowed" && <span style={{ fontSize: 10, opacity: 0.3, color: "#5BA84A" }}>{"\u2713"}</span>}
                      {cell === "current" && <span style={{ fontSize: 16 }}>{"\uD83C\uDF3F"}</span>}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Penalty warning */}
          {state.mowPenalty && (
            <div style={{ marginTop: 8, fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#E74C3C", animation: "fadeIn 0.2s ease" }}>
              {"\u26A0\uFE0F"} Bloemenbed geraakt! -1 seconde!
            </div>
          )}

          {/* Hint */}
          {state.roundActive && state.upgrades.garden_vision && state.mowGrid && (
            <div style={{ marginTop: 8, fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#558B2F", textAlign: "center" }}>
              Hint: Groene stippellijn = bereikbare tegels
            </div>
          )}

          {/* Round info at bottom */}
          {state.roundActive && currentLevel && (
            <div style={{ marginTop: 10, fontSize: 8, fontFamily: "'Press Start 2P', monospace", color: "#5D7E5D", textAlign: "center", lineHeight: 2.2, paddingBottom: 16 }}>
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
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 90,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div className="overlay-panel" style={{ textAlign: "center", padding: 36 }}>
                <div style={{ fontSize: 56, marginBottom: 16, animation: "coinPop 0.5s ease" }}>{"\uD83C\uDF89"}</div>
                <h3 style={{ fontSize: 16, fontFamily: "'Press Start 2P', monospace", color: "#4CAF50", marginBottom: 10 }}>
                  Gelukt!
                </h3>
                <p style={{ fontSize: 11, fontFamily: "'Press Start 2P', monospace", color: "#2E7D32", marginBottom: 6 }}>
                  Ronde {state.currentRound + 1} voltooid!
                </p>
                <div style={{ fontSize: 14, fontFamily: "'Press Start 2P', monospace", color: "#F4D03F", marginBottom: 24, animation: "coinPop 0.5s ease 0.2s both" }}>
                  + {getCoinsForRound(state.currentRound, state.upgrades)} {"\uD83E\uDE99"}
                </div>
                {state.currentRound + 1 < MOW_LEVELS.length ? (
                  <button
                    className="pixel-btn primary"
                    onClick={() => {
                      dispatch({ type: "NEXT_ROUND" });
                      dispatch({ type: "START_ROUND", round: state.currentRound + 1 });
                      soundRef.current?.enterStation();
                    }}
                    style={{ fontSize: 11 }}
                  >
                    Volgende Ronde {"\u2192"}
                  </button>
                ) : (
                  <div>
                    <div style={{ fontSize: 14, fontFamily: "'Press Start 2P', monospace", color: "#F4D03F", marginBottom: 20 }}>
                      {"\uD83C\uDFC6"} Alle 16 rondes voltooid!
                    </div>
                    <button
                      className="pixel-btn primary"
                      onClick={() => dispatch({ type: "START_ROUND", round: 16 })}
                      style={{ fontSize: 11 }}
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
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 90,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div className="overlay-panel" style={{ textAlign: "center", padding: 36 }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>{"\uD83D\uDE24"}</div>
                <h3 style={{ fontSize: 16, fontFamily: "'Press Start 2P', monospace", color: "#E74C3C", marginBottom: 10 }}>
                  Tijd voorbij!
                </h3>
                <p style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace", color: "#2E7D32", marginBottom: 6, lineHeight: 2.2 }}>
                  De klant is weggelopen.
                  <br />
                  Je kwam tot ronde {state.currentRound + 1}.
                </p>
                {state.currentRound > 0 && (
                  <div style={{ fontSize: 11, fontFamily: "'Press Start 2P', monospace", color: "#558B2F", marginBottom: 20 }}>
                    Totaal verdiend: {state.totalCoins} {"\uD83E\uDE99"}
                  </div>
                )}
                <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                  <button
                    className="pixel-btn primary"
                    onClick={() => { dispatch({ type: "START_ROUND", round: 0 }); soundRef.current?.enterStation(); }}
                    style={{ fontSize: 10 }}
                  >
                    Opnieuw proberen
                  </button>
                  <button
                    className="pixel-btn"
                    onClick={() => dispatch({ type: "EXIT_TO_WORLD" })}
                    style={{ fontSize: 10 }}
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

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}
