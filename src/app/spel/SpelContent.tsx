"use client";

import React, { useReducer, useCallback, useEffect, useRef, useState } from "react";

// =============================================================================
// TYPES
// =============================================================================

type ElementType =
  | "flower_rose"
  | "flower_sunflower"
  | "flower_tulip"
  | "tree_oak"
  | "tree_pine"
  | "hedge"
  | "water"
  | "rock"
  | "bench"
  | "path"
  | "gnome"
  | "lantern"
  | "fence";

interface GardenElement {
  type: ElementType;
  emoji: string;
  name: string;
  description: string;
  category: "bloemen" | "bomen" | "structuur" | "water" | "decoratie";
}

interface PlacedElement {
  elementType: ElementType | null; // null = empty grass
}

interface LevelBudget {
  elementType: ElementType;
  count: number;
}

interface BonusResult {
  description: string;
  points: number;
}

interface Level {
  id: number;
  name: string;
  description: string;
  gridSize: number; // always 8
  budget: LevelBudget[];
  targetScore: number; // 1 star
  twoStarScore: number;
  threeStarScore: number;
  entranceRow: number;
  entranceCol: number;
  fixedElements: { row: number; col: number; type: ElementType }[];
  blockedCells: { row: number; col: number }[]; // rocks/obstacles that can't be placed on
}

type Screen = "menu" | "game" | "level-complete" | "all-complete";

interface GameState {
  screen: Screen;
  currentLevel: number;
  grid: PlacedElement[][];
  budget: Map<ElementType, number>;
  selectedElement: ElementType | null;
  beautyScore: number;
  bonuses: BonusResult[];
  totalBeautyScore: number;
  stars: Map<number, number>; // levelId -> stars earned
  highScore: number;
  message: string | null;
  messageType: "success" | "error" | "info";
}

type GameAction =
  | { type: "START_GAME" }
  | { type: "SELECT_LEVEL"; level: number }
  | { type: "SELECT_ELEMENT"; elementType: ElementType | null }
  | { type: "PLACE_ELEMENT"; row: number; col: number }
  | { type: "REMOVE_ELEMENT"; row: number; col: number }
  | { type: "SUBMIT_GARDEN" }
  | { type: "NEXT_LEVEL" }
  | { type: "BACK_TO_MENU" }
  | { type: "LOAD_SAVE"; stars: Map<number, number>; highScore: number }
  | { type: "CLEAR_MESSAGE" };

// =============================================================================
// ELEMENT DEFINITIONS
// =============================================================================

const ELEMENTS: Record<ElementType, GardenElement> = {
  flower_rose: {
    type: "flower_rose",
    emoji: "\uD83C\uDF39",
    name: "Roos",
    description: "Bonus naast water",
    category: "bloemen",
  },
  flower_sunflower: {
    type: "flower_sunflower",
    emoji: "\uD83C\uDF3B",
    name: "Zonnebloem",
    description: "Bonus naast water",
    category: "bloemen",
  },
  flower_tulip: {
    type: "flower_tulip",
    emoji: "\uD83C\uDF37",
    name: "Tulp",
    description: "Bonus naast water",
    category: "bloemen",
  },
  tree_oak: {
    type: "tree_oak",
    emoji: "\uD83C\uDF33",
    name: "Eik",
    description: "Heeft ruimte nodig",
    category: "bomen",
  },
  tree_pine: {
    type: "tree_pine",
    emoji: "\uD83C\uDF32",
    name: "Den",
    description: "Heeft ruimte nodig",
    category: "bomen",
  },
  hedge: {
    type: "hedge",
    emoji: "\uD83C\uDF3F",
    name: "Haag",
    description: "Bonus bij 3+ op rij",
    category: "structuur",
  },
  water: {
    type: "water",
    emoji: "\uD83D\uDCA7",
    name: "Water",
    description: "Bloemen bonus",
    category: "water",
  },
  rock: {
    type: "rock",
    emoji: "\uD83E\uDEA8",
    name: "Steen",
    description: "Decoratief accent",
    category: "decoratie",
  },
  bench: {
    type: "bench",
    emoji: "\uD83E\uDE91",
    name: "Bankje",
    description: "Bonus naast bloemen",
    category: "decoratie",
  },
  path: {
    type: "path",
    emoji: "\uD83D\uDFEB",
    name: "Pad",
    description: "Verbind ingang met elementen",
    category: "structuur",
  },
  gnome: {
    type: "gnome",
    emoji: "\uD83C\uDFE0",
    name: "Tuinkabouter",
    description: "Bonus bij bloemen",
    category: "decoratie",
  },
  lantern: {
    type: "lantern",
    emoji: "\uD83C\uDFEE",
    name: "Lantaarn",
    description: "Bonus langs pad",
    category: "decoratie",
  },
  fence: {
    type: "fence",
    emoji: "\uD83E\uDDF1",
    name: "Hek",
    description: "Rand bonus",
    category: "structuur",
  },
};

const isFlower = (t: ElementType | null): boolean =>
  t === "flower_rose" || t === "flower_sunflower" || t === "flower_tulip";

const isTree = (t: ElementType | null): boolean =>
  t === "tree_oak" || t === "tree_pine";

// =============================================================================
// LEVEL DATA -- 8 progressively harder levels
// =============================================================================

const LEVELS: Level[] = [
  {
    id: 1,
    name: "De Eerste Tuin",
    description: "Plant bloemen en leg een pad. Simpel en mooi!",
    gridSize: 8,
    budget: [
      { elementType: "flower_rose", count: 4 },
      { elementType: "path", count: 6 },
      { elementType: "hedge", count: 3 },
    ],
    targetScore: 30,
    twoStarScore: 50,
    threeStarScore: 70,
    entranceRow: 7,
    entranceCol: 3,
    fixedElements: [],
    blockedCells: [],
  },
  {
    id: 2,
    name: "De Vijvertuin",
    description: "Gebruik water voor bloemenbonus. Paden verbinden alles!",
    gridSize: 8,
    budget: [
      { elementType: "flower_rose", count: 3 },
      { elementType: "flower_sunflower", count: 3 },
      { elementType: "water", count: 4 },
      { elementType: "path", count: 5 },
    ],
    targetScore: 50,
    twoStarScore: 80,
    threeStarScore: 110,
    entranceRow: 7,
    entranceCol: 4,
    fixedElements: [
      { row: 3, col: 3, type: "water" },
      { row: 3, col: 4, type: "water" },
    ],
    blockedCells: [
      { row: 0, col: 0 },
      { row: 0, col: 7 },
    ],
  },
  {
    id: 3,
    name: "Hagen & Heggen",
    description: "Maak rijen van 3+ hagen voor een flinke bonus!",
    gridSize: 8,
    budget: [
      { elementType: "hedge", count: 8 },
      { elementType: "flower_tulip", count: 4 },
      { elementType: "path", count: 5 },
      { elementType: "rock", count: 2 },
    ],
    targetScore: 60,
    twoStarScore: 100,
    threeStarScore: 140,
    entranceRow: 7,
    entranceCol: 3,
    fixedElements: [],
    blockedCells: [
      { row: 2, col: 2 },
      { row: 2, col: 5 },
      { row: 5, col: 2 },
      { row: 5, col: 5 },
    ],
  },
  {
    id: 4,
    name: "Het Parkje",
    description: "Bomen hebben ruimte nodig! Combineer met bankjes en paden.",
    gridSize: 8,
    budget: [
      { elementType: "tree_oak", count: 3 },
      { elementType: "bench", count: 3 },
      { elementType: "flower_rose", count: 3 },
      { elementType: "path", count: 6 },
      { elementType: "lantern", count: 2 },
    ],
    targetScore: 80,
    twoStarScore: 130,
    threeStarScore: 180,
    entranceRow: 7,
    entranceCol: 4,
    fixedElements: [{ row: 0, col: 4, type: "water" }],
    blockedCells: [
      { row: 3, col: 0 },
      { row: 3, col: 7 },
    ],
  },
  {
    id: 5,
    name: "Symmetrie Meester",
    description: "Symmetrische tuinen scoren flinke bonuspunten!",
    gridSize: 8,
    budget: [
      { elementType: "flower_rose", count: 4 },
      { elementType: "flower_sunflower", count: 4 },
      { elementType: "hedge", count: 6 },
      { elementType: "water", count: 2 },
      { elementType: "path", count: 6 },
    ],
    targetScore: 100,
    twoStarScore: 160,
    threeStarScore: 220,
    entranceRow: 7,
    entranceCol: 3,
    fixedElements: [{ row: 3, col: 3, type: "water" }],
    blockedCells: [],
  },
  {
    id: 6,
    name: "De Herenhuis Tuin",
    description: "Alles komt samen: bloemen, bomen, water en symmetrie!",
    gridSize: 8,
    budget: [
      { elementType: "tree_oak", count: 2 },
      { elementType: "tree_pine", count: 2 },
      { elementType: "flower_rose", count: 3 },
      { elementType: "flower_tulip", count: 3 },
      { elementType: "hedge", count: 6 },
      { elementType: "water", count: 3 },
      { elementType: "path", count: 7 },
      { elementType: "bench", count: 2 },
      { elementType: "lantern", count: 2 },
    ],
    targetScore: 140,
    twoStarScore: 220,
    threeStarScore: 300,
    entranceRow: 7,
    entranceCol: 3,
    fixedElements: [],
    blockedCells: [
      { row: 0, col: 0 },
      { row: 0, col: 7 },
      { row: 7, col: 0 },
      { row: 7, col: 7 },
    ],
  },
  {
    id: 7,
    name: "De Kasteeltuin",
    description: "Een koninklijke tuin. Gebruik alle elementen optimaal!",
    gridSize: 8,
    budget: [
      { elementType: "tree_oak", count: 2 },
      { elementType: "tree_pine", count: 2 },
      { elementType: "flower_rose", count: 4 },
      { elementType: "flower_sunflower", count: 3 },
      { elementType: "flower_tulip", count: 3 },
      { elementType: "hedge", count: 8 },
      { elementType: "water", count: 4 },
      { elementType: "path", count: 8 },
      { elementType: "bench", count: 2 },
      { elementType: "rock", count: 2 },
      { elementType: "lantern", count: 3 },
      { elementType: "gnome", count: 1 },
    ],
    targetScore: 200,
    twoStarScore: 320,
    threeStarScore: 440,
    entranceRow: 7,
    entranceCol: 3,
    fixedElements: [
      { row: 3, col: 3, type: "water" },
      { row: 3, col: 4, type: "water" },
      { row: 4, col: 3, type: "water" },
      { row: 4, col: 4, type: "water" },
    ],
    blockedCells: [],
  },
  {
    id: 8,
    name: "Meesterwerk",
    description: "Het ultieme tuinontwerp. Laat zien wat je kunt!",
    gridSize: 8,
    budget: [
      { elementType: "tree_oak", count: 3 },
      { elementType: "tree_pine", count: 3 },
      { elementType: "flower_rose", count: 5 },
      { elementType: "flower_sunflower", count: 4 },
      { elementType: "flower_tulip", count: 4 },
      { elementType: "hedge", count: 10 },
      { elementType: "water", count: 5 },
      { elementType: "path", count: 10 },
      { elementType: "bench", count: 3 },
      { elementType: "rock", count: 3 },
      { elementType: "lantern", count: 3 },
      { elementType: "gnome", count: 2 },
      { elementType: "fence", count: 6 },
    ],
    targetScore: 280,
    twoStarScore: 440,
    threeStarScore: 600,
    entranceRow: 7,
    entranceCol: 4,
    fixedElements: [
      { row: 2, col: 3, type: "water" },
      { row: 2, col: 4, type: "water" },
    ],
    blockedCells: [
      { row: 0, col: 0 },
      { row: 0, col: 7 },
      { row: 7, col: 0 },
      { row: 7, col: 7 },
    ],
  },
];

// =============================================================================
// SCORING ENGINE
// =============================================================================

const DIRS4: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function getCell(
  grid: PlacedElement[][],
  r: number,
  c: number,
  size: number
): ElementType | null {
  if (r < 0 || r >= size || c < 0 || c >= size) return null;
  return grid[r][c].elementType;
}

function calculateScore(
  grid: PlacedElement[][],
  level: Level
): { total: number; bonuses: BonusResult[] } {
  const size = level.gridSize;
  const bonuses: BonusResult[] = [];
  let total = 0;

  // --- 1. Base points per element placed ---
  let basePts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const el = grid[r][c].elementType;
      if (el) {
        basePts += 3; // 3 pts per placed element
      }
    }
  }
  if (basePts > 0) {
    bonuses.push({ description: "Geplaatste elementen", points: basePts });
    total += basePts;
  }

  // --- 2. Flowers near water: +8 per flower adjacent to water ---
  let flowerWaterPts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const el = grid[r][c].elementType;
      if (isFlower(el)) {
        for (const [dr, dc] of DIRS4) {
          if (getCell(grid, r + dr, c + dc, size) === "water") {
            flowerWaterPts += 8;
            break; // only count once per flower
          }
        }
      }
    }
  }
  if (flowerWaterPts > 0) {
    bonuses.push({
      description: "Bloemen naast water",
      points: flowerWaterPts,
    });
    total += flowerWaterPts;
  }

  // --- 3. Hedge rows: +10 per group of 3+ hedges in a row or column ---
  let hedgeRowPts = 0;
  // Check rows
  for (let r = 0; r < size; r++) {
    let run = 0;
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "hedge") {
        run++;
      } else {
        if (run >= 3) hedgeRowPts += 10 + (run - 3) * 5;
        run = 0;
      }
    }
    if (run >= 3) hedgeRowPts += 10 + (run - 3) * 5;
  }
  // Check columns
  for (let c = 0; c < size; c++) {
    let run = 0;
    for (let r = 0; r < size; r++) {
      if (grid[r][c].elementType === "hedge") {
        run++;
      } else {
        if (run >= 3) hedgeRowPts += 10 + (run - 3) * 5;
        run = 0;
      }
    }
    if (run >= 3) hedgeRowPts += 10 + (run - 3) * 5;
  }
  if (hedgeRowPts > 0) {
    bonuses.push({
      description: "Haag rijen (3+)",
      points: hedgeRowPts,
    });
    total += hedgeRowPts;
  }

  // --- 4. Tree spacing: +10 per tree with no adjacent trees, -5 if adjacent ---
  let treePts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isTree(grid[r][c].elementType)) {
        let hasAdjacentTree = false;
        for (const [dr, dc] of DIRS4) {
          const neighbor = getCell(grid, r + dr, c + dc, size);
          if (isTree(neighbor)) {
            hasAdjacentTree = true;
            break;
          }
        }
        // Also check diagonals for trees
        const diags: [number, number][] = [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ];
        for (const [dr, dc] of diags) {
          const neighbor = getCell(grid, r + dr, c + dc, size);
          if (isTree(neighbor)) {
            hasAdjacentTree = true;
            break;
          }
        }
        treePts += hasAdjacentTree ? -5 : 10;
      }
    }
  }
  if (treePts !== 0) {
    bonuses.push({
      description: treePts > 0 ? "Bomen met ruimte" : "Bomen te dicht bij elkaar",
      points: treePts,
    });
    total += treePts;
  }

  // --- 5. Path connectivity: bonus if path connects entrance to elements ---
  let pathPts = 0;
  const pathConnected = findPathConnected(grid, level);
  if (pathConnected.size > 0) {
    pathPts = pathConnected.size * 5;
    bonuses.push({
      description: `Pad verbindt ${pathConnected.size} elementen`,
      points: pathPts,
    });
    total += pathPts;
  }

  // --- 6. Bench near flowers: +6 per bench adjacent to a flower ---
  let benchPts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "bench") {
        let nearFlower = false;
        for (const [dr, dc] of DIRS4) {
          if (isFlower(getCell(grid, r + dr, c + dc, size))) {
            nearFlower = true;
            break;
          }
        }
        if (nearFlower) benchPts += 6;
      }
    }
  }
  if (benchPts > 0) {
    bonuses.push({ description: "Bankjes bij bloemen", points: benchPts });
    total += benchPts;
  }

  // --- 7. Lantern along path: +5 per lantern adjacent to path ---
  let lanternPts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "lantern") {
        for (const [dr, dc] of DIRS4) {
          if (getCell(grid, r + dr, c + dc, size) === "path") {
            lanternPts += 5;
            break;
          }
        }
      }
    }
  }
  if (lanternPts > 0) {
    bonuses.push({ description: "Lantaarns langs pad", points: lanternPts });
    total += lanternPts;
  }

  // --- 8. Gnome near flowers: +8 per gnome adjacent to a flower ---
  let gnomePts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "gnome") {
        for (const [dr, dc] of DIRS4) {
          if (isFlower(getCell(grid, r + dr, c + dc, size))) {
            gnomePts += 8;
            break;
          }
        }
      }
    }
  }
  if (gnomePts > 0) {
    bonuses.push({ description: "Tuinkabouters bij bloemen", points: gnomePts });
    total += gnomePts;
  }

  // --- 9. Fence on border: +4 per fence on edge of grid ---
  let fencePts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "fence") {
        if (r === 0 || r === size - 1 || c === 0 || c === size - 1) {
          fencePts += 4;
        }
      }
    }
  }
  if (fencePts > 0) {
    bonuses.push({ description: "Hekken aan de rand", points: fencePts });
    total += fencePts;
  }

  // --- 10. Symmetry bonus ---
  const symPts = calculateSymmetry(grid, size);
  if (symPts > 0) {
    bonuses.push({ description: "Symmetrie bonus", points: symPts });
    total += symPts;
  }

  // --- 11. Variety bonus: +5 per unique element type used (min 3 types) ---
  const usedTypes = new Set<ElementType>();
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const el = grid[r][c].elementType;
      if (el) usedTypes.add(el);
    }
  }
  if (usedTypes.size >= 3) {
    const varietyPts = usedTypes.size * 5;
    bonuses.push({
      description: `Variatie (${usedTypes.size} soorten)`,
      points: varietyPts,
    });
    total += varietyPts;
  }

  // --- 12. Water cluster: +6 for each water adjacent to another water ---
  let waterClusterPts = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].elementType === "water") {
        for (const [dr, dc] of DIRS4) {
          if (getCell(grid, r + dr, c + dc, size) === "water") {
            waterClusterPts += 3;
            break; // count once per water cell
          }
        }
      }
    }
  }
  if (waterClusterPts > 0) {
    bonuses.push({ description: "Waterpartij cluster", points: waterClusterPts });
    total += waterClusterPts;
  }

  return { total: Math.max(0, total), bonuses };
}

// BFS path connectivity from entrance
function findPathConnected(
  grid: PlacedElement[][],
  level: Level
): Set<string> {
  const size = level.gridSize;
  const visited = Array.from({ length: size }, () =>
    new Array(size).fill(false)
  );
  const connectedElements = new Set<string>();

  // Start BFS from entrance
  const startR = level.entranceRow;
  const startC = level.entranceCol;

  // Entrance must have a path element or be adjacent to one
  if (grid[startR]?.[startC]?.elementType !== "path") {
    // Check if any adjacent cell to entrance has a path
    let foundPathStart = false;
    for (const [dr, dc] of DIRS4) {
      const nr = startR + dr;
      const nc = startC + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        if (grid[nr][nc].elementType === "path") {
          foundPathStart = true;
          break;
        }
      }
    }
    if (!foundPathStart) return connectedElements;
  }

  const queue: [number, number][] = [[startR, startC]];
  visited[startR][startC] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const el = grid[r][c].elementType;

    // If this cell is a non-path element adjacent to path, it's "connected"
    if (el && el !== "path") {
      connectedElements.add(`${r},${c}`);
    }

    for (const [dr, dc] of DIRS4) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      if (visited[nr][nc]) continue;
      visited[nr][nc] = true;

      const neighborEl = grid[nr][nc].elementType;
      if (neighborEl === "path") {
        // Continue BFS through paths
        queue.push([nr, nc]);
      } else if (neighborEl) {
        // Non-path element adjacent to path = connected
        connectedElements.add(`${nr},${nc}`);
      }
    }
  }

  return connectedElements;
}

// Symmetry: check horizontal (left-right) mirror
function calculateSymmetry(grid: PlacedElement[][], size: number): number {
  let matchingPairs = 0;
  let totalPairs = 0;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < Math.floor(size / 2); c++) {
      const mirrorC = size - 1 - c;
      const left = grid[r][c].elementType;
      const right = grid[r][mirrorC].elementType;

      // Only count pairs where at least one side has an element
      if (left || right) {
        totalPairs++;
        if (left === right) {
          matchingPairs++;
        }
      }
    }
  }

  if (totalPairs === 0) return 0;

  const symmetryRatio = matchingPairs / totalPairs;

  // Need at least 40% symmetry to get any bonus
  if (symmetryRatio < 0.4) return 0;

  // Scale: 40% = 10pts, 60% = 25pts, 80% = 45pts, 100% = 60pts
  if (symmetryRatio >= 0.9) return 60;
  if (symmetryRatio >= 0.75) return 45;
  if (symmetryRatio >= 0.6) return 25;
  return 10;
}

// =============================================================================
// SOUND EFFECTS -- Web Audio API
// =============================================================================

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  volume = 0.08
) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function sfxPlace() {
  playTone(523, 0.08, "triangle", 0.06);
  setTimeout(() => playTone(659, 0.06, "triangle", 0.04), 60);
}

function sfxRemove() {
  playTone(330, 0.08, "square", 0.04);
}

function sfxSelect() {
  playTone(440, 0.05, "triangle", 0.04);
}

function sfxBonus() {
  playTone(659, 0.1, "triangle", 0.06);
  setTimeout(() => playTone(784, 0.1, "triangle", 0.06), 80);
  setTimeout(() => playTone(988, 0.12, "triangle", 0.06), 160);
}

function sfxError() {
  playTone(200, 0.12, "sawtooth", 0.06);
  setTimeout(() => playTone(160, 0.15, "sawtooth", 0.06), 100);
}

function sfxLevelComplete() {
  [523, 659, 784, 988, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.15, "triangle", 0.07), i * 100);
  });
}

function sfxStar() {
  playTone(880, 0.08, "triangle", 0.05);
  setTimeout(() => playTone(1108, 0.1, "triangle", 0.05), 70);
}

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

function buildGrid(level: Level): PlacedElement[][] {
  const grid: PlacedElement[][] = Array.from({ length: level.gridSize }, () =>
    Array.from({ length: level.gridSize }, () => ({ elementType: null }))
  );

  // Place fixed elements
  for (const fe of level.fixedElements) {
    grid[fe.row][fe.col] = { elementType: fe.type };
  }

  return grid;
}

function buildBudget(level: Level): Map<ElementType, number> {
  const budget = new Map<ElementType, number>();
  for (const b of level.budget) {
    budget.set(b.elementType, b.count);
  }
  return budget;
}

function initialState(): GameState {
  return {
    screen: "menu",
    currentLevel: 0,
    grid: [],
    budget: new Map(),
    selectedElement: null,
    beautyScore: 0,
    bonuses: [],
    totalBeautyScore: 0,
    stars: new Map(),
    highScore: 0,
    message: null,
    messageType: "info",
  };
}

function isBlockedCell(level: Level, r: number, c: number): boolean {
  return level.blockedCells.some((bc) => bc.row === r && bc.col === c);
}

function isFixedCell(level: Level, r: number, c: number): boolean {
  return level.fixedElements.some((fe) => fe.row === r && fe.col === c);
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LOAD_SAVE":
      return {
        ...state,
        stars: action.stars,
        highScore: action.highScore,
      };

    case "START_GAME": {
      const level = LEVELS[0];
      const grid = buildGrid(level);
      const scoreResult = calculateScore(grid, level);
      return {
        ...state,
        screen: "game",
        currentLevel: 0,
        grid,
        budget: buildBudget(level),
        selectedElement: null,
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        message: null,
        messageType: "info",
      };
    }

    case "SELECT_LEVEL": {
      const level = LEVELS[action.level];
      if (!level) return state;
      const grid = buildGrid(level);
      const scoreResult = calculateScore(grid, level);
      return {
        ...state,
        screen: "game",
        currentLevel: action.level,
        grid,
        budget: buildBudget(level),
        selectedElement: null,
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        message: null,
        messageType: "info",
      };
    }

    case "SELECT_ELEMENT": {
      sfxSelect();
      return {
        ...state,
        selectedElement: action.elementType,
        message: null,
      };
    }

    case "PLACE_ELEMENT": {
      const { row, col } = action;
      const level = LEVELS[state.currentLevel];

      // Can't place on blocked cells
      if (isBlockedCell(level, row, col)) {
        sfxError();
        return {
          ...state,
          message: "Dit vak is geblokkeerd!",
          messageType: "error",
        };
      }

      // Can't place on fixed elements
      if (isFixedCell(level, row, col)) {
        sfxError();
        return {
          ...state,
          message: "Dit element staat vast!",
          messageType: "error",
        };
      }

      // If no element selected, ignore
      if (!state.selectedElement) {
        return {
          ...state,
          message: "Kies eerst een element uit de werkbalk!",
          messageType: "info",
        };
      }

      // Cell must be empty
      if (state.grid[row][col].elementType !== null) {
        sfxError();
        return {
          ...state,
          message: "Dit vak is al bezet! Klik op een element om het te verwijderen.",
          messageType: "error",
        };
      }

      // Check budget
      const remaining = state.budget.get(state.selectedElement) ?? 0;
      if (remaining <= 0) {
        sfxError();
        return {
          ...state,
          message: `Geen ${ELEMENTS[state.selectedElement].name} meer over!`,
          messageType: "error",
        };
      }

      sfxPlace();
      const newGrid = state.grid.map((r) =>
        r.map((c) => ({ ...c }))
      );
      newGrid[row][col] = { elementType: state.selectedElement };

      const newBudget = new Map(state.budget);
      newBudget.set(state.selectedElement, remaining - 1);

      const scoreResult = calculateScore(newGrid, level);

      return {
        ...state,
        grid: newGrid,
        budget: newBudget,
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        message: null,
      };
    }

    case "REMOVE_ELEMENT": {
      const { row, col } = action;
      const level = LEVELS[state.currentLevel];

      // Can't remove fixed elements
      if (isFixedCell(level, row, col)) {
        sfxError();
        return {
          ...state,
          message: "Dit element staat vast!",
          messageType: "error",
        };
      }

      const currentElement = state.grid[row][col].elementType;
      if (!currentElement) return state;

      sfxRemove();
      const newGrid = state.grid.map((r) =>
        r.map((c) => ({ ...c }))
      );
      newGrid[row][col] = { elementType: null };

      // Return to budget
      const newBudget = new Map(state.budget);
      const current = newBudget.get(currentElement) ?? 0;
      newBudget.set(currentElement, current + 1);

      const scoreResult = calculateScore(newGrid, level);

      return {
        ...state,
        grid: newGrid,
        budget: newBudget,
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        message: null,
      };
    }

    case "SUBMIT_GARDEN": {
      const level = LEVELS[state.currentLevel];
      const scoreResult = calculateScore(state.grid, level);

      if (scoreResult.total < level.targetScore) {
        sfxError();
        return {
          ...state,
          beautyScore: scoreResult.total,
          bonuses: scoreResult.bonuses,
          message: `Score ${scoreResult.total} is te laag! Je hebt ${level.targetScore} nodig voor 1 ster.`,
          messageType: "error",
        };
      }

      sfxLevelComplete();

      const earnedStars =
        scoreResult.total >= level.threeStarScore
          ? 3
          : scoreResult.total >= level.twoStarScore
            ? 2
            : 1;

      // Star sound effects
      for (let i = 0; i < earnedStars; i++) {
        setTimeout(() => sfxStar(), 600 + i * 300);
      }

      const newStars = new Map(state.stars);
      const prevStars = newStars.get(level.id) ?? 0;
      if (earnedStars > prevStars) {
        newStars.set(level.id, earnedStars);
      }

      const newTotal = state.totalBeautyScore + scoreResult.total;
      const newHighScore = Math.max(state.highScore, newTotal);

      // Save to localStorage
      try {
        const starsObj: Record<number, number> = {};
        newStars.forEach((v, k) => {
          starsObj[k] = v;
        });
        localStorage.setItem(
          "tuinontwerper",
          JSON.stringify({
            stars: starsObj,
            highScore: newHighScore,
          })
        );
      } catch {
        // ignore
      }

      const isLast = state.currentLevel >= LEVELS.length - 1;

      return {
        ...state,
        screen: isLast ? "all-complete" : "level-complete",
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        totalBeautyScore: newTotal,
        stars: newStars,
        highScore: newHighScore,
        message: null,
      };
    }

    case "NEXT_LEVEL": {
      const nextIdx = state.currentLevel + 1;
      if (nextIdx >= LEVELS.length) {
        return { ...state, screen: "all-complete" };
      }
      const level = LEVELS[nextIdx];
      const grid = buildGrid(level);
      const scoreResult = calculateScore(grid, level);
      return {
        ...state,
        screen: "game",
        currentLevel: nextIdx,
        grid,
        budget: buildBudget(level),
        selectedElement: null,
        beautyScore: scoreResult.total,
        bonuses: scoreResult.bonuses,
        message: null,
      };
    }

    case "BACK_TO_MENU":
      return {
        ...state,
        screen: "menu",
        selectedElement: null,
        message: null,
      };

    case "CLEAR_MESSAGE":
      return { ...state, message: null };

    default:
      return state;
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function SpelContent() {
  const [state, dispatch] = useReducer(reducer, initialState());
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = () => setFontsLoaded(true);
    const timeout = setTimeout(() => setFontsLoaded(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Load save from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tuinontwerper");
      if (saved) {
        const parsed = JSON.parse(saved);
        const starsMap = new Map<number, number>();
        if (parsed.stars) {
          for (const [k, v] of Object.entries(parsed.stars)) {
            starsMap.set(Number(k), v as number);
          }
        }
        dispatch({
          type: "LOAD_SAVE",
          stars: starsMap,
          highScore: parsed.highScore || 0,
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Clear messages after 3s
  useEffect(() => {
    if (state.message) {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(
        () => dispatch({ type: "CLEAR_MESSAGE" }),
        3000
      );
    }
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, [state.message]);

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (state.screen !== "game") return;
      const cell = state.grid[r][c];

      if (cell.elementType !== null) {
        // Remove element (returns to budget)
        dispatch({ type: "REMOVE_ELEMENT", row: r, col: c });
      } else {
        // Place selected element
        dispatch({ type: "PLACE_ELEMENT", row: r, col: c });
      }
    },
    [state.screen, state.grid]
  );

  if (!fontsLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center" style={{ fontFamily: "monospace" }}>
          <div className="text-2xl mb-4 animate-pulse">
            {"\uD83C\uDF31"} Laden...
          </div>
        </div>
      </div>
    );
  }

  // ── STYLE CONSTANTS ─────────────────────────────────────────────────────
  const pixelFont = "'Press Start 2P', monospace";
  const bodyFont = "'VT323', monospace";

  const colors = {
    bg: "#1a2e1a",
    bgLight: "#243524",
    bgDark: "#0f1e0f",
    border: "#3a5a3a",
    borderBright: "#5a8a5a",
    grassLight: "#4a8c3f",
    grassDark: "#3d7535",
    grassEmpty: "#3a7030",
    green: "#39FF14",
    darkGreen: "#228B22",
    gold: "#FFD700",
    amber: "#FFBF00",
    brown: "#8B6914",
    blue: "#4FC3F7",
    blueDeep: "#1E88E5",
    red: "#FF5252",
    pink: "#FF80AB",
    white: "#E8E8E8",
    dimWhite: "#8FAF8F",
    purple: "#BA68C8",
    entranceColor: "#FFD700",
    blockedColor: "#2a2a2a",
  };

  // ── LEVEL HELPERS ───────────────────────────────────────────────────────
  const totalStars = () => {
    let s = 0;
    state.stars.forEach((v) => {
      s += v;
    });
    return s;
  };

  const levelsCompleted = () => {
    let count = 0;
    state.stars.forEach((v) => {
      if (v > 0) count++;
    });
    return count;
  };

  // ── RENDER CELL ─────────────────────────────────────────────────────────
  const renderCell = (cell: PlacedElement, r: number, c: number) => {
    const level = LEVELS[state.currentLevel];
    const isEntrance = r === level?.entranceRow && c === level?.entranceCol;
    const isBlocked = level ? isBlockedCell(level, r, c) : false;
    const isFixed = level ? isFixedCell(level, r, c) : false;
    const hasElement = cell.elementType !== null;

    // Checkerboard grass pattern
    const isLightGrass = (r + c) % 2 === 0;

    let bg = isLightGrass ? colors.grassLight : colors.grassDark;
    let borderColor = "rgba(0,0,0,0.15)";
    let shadow = "none";
    let cursor = "pointer";

    if (isBlocked) {
      bg = colors.blockedColor;
      cursor = "not-allowed";
    }

    if (isEntrance && !hasElement) {
      borderColor = colors.entranceColor;
      shadow = `inset 0 0 8px ${colors.entranceColor}30`;
    }

    if (isFixed) {
      borderColor = colors.borderBright;
    }

    if (hasElement && state.selectedElement === null) {
      cursor = "pointer"; // can click to remove
    }

    const element = cell.elementType ? ELEMENTS[cell.elementType] : null;

    return (
      <button
        key={`${r}-${c}`}
        onClick={() => handleCellClick(r, c)}
        disabled={isBlocked || state.screen !== "game"}
        aria-label={`Cel ${r},${c}: ${element ? element.name : isEntrance ? "ingang" : "leeg gras"}`}
        style={{
          width: "100%",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          border: `2px solid ${borderColor}`,
          boxShadow: shadow,
          cursor: state.screen === "game" && !isBlocked ? cursor : "default",
          transition: "all 0.15s ease",
          imageRendering: "pixelated" as React.CSSProperties["imageRendering"],
          padding: 0,
          outline: "none",
          position: "relative",
          borderRadius: "2px",
          fontSize: "clamp(16px, 4vw, 22px)",
        }}
        onMouseEnter={(e) => {
          if (state.screen === "game" && !isBlocked) {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              colors.gold;
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              `0 0 6px ${colors.gold}40`;
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = shadow;
        }}
      >
        {hasElement ? (
          <span
            style={{
              filter: isFixed
                ? "drop-shadow(0 0 2px rgba(255,255,255,0.3))"
                : "none",
              transition: "transform 0.15s ease",
            }}
          >
            {element!.emoji}
          </span>
        ) : isEntrance ? (
          <span
            style={{
              fontSize: "clamp(12px, 3vw, 18px)",
              opacity: 0.7,
            }}
          >
            {"\uD83D\uDEAA"}
          </span>
        ) : isBlocked ? (
          <span style={{ fontSize: "clamp(12px, 3vw, 18px)", opacity: 0.3 }}>
            {"\uD83E\uDEA8"}
          </span>
        ) : (
          <span
            style={{
              fontSize: "6px",
              opacity: 0.2,
              color: "#2a5a2a",
            }}
          >
            {"\u00B7"}
          </span>
        )}
      </button>
    );
  };

  // ── PIXEL BUTTON ────────────────────────────────────────────────────────
  const PixelButton = ({
    children,
    onClick,
    color = colors.gold,
    disabled = false,
    small = false,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    color?: string;
    disabled?: boolean;
    small?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: pixelFont,
        fontSize: small ? "8px" : "10px",
        padding: small ? "8px 12px" : "12px 20px",
        background: disabled ? "#2a2a2a" : "transparent",
        color: disabled ? "#555" : color,
        border: `2px solid ${disabled ? "#444" : color}`,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        imageRendering: "pixelated" as React.CSSProperties["imageRendering"],
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
        boxShadow: disabled
          ? "none"
          : `0 0 8px ${color}20, inset 0 0 8px ${color}10`,
        borderRadius: "0px",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = `${color}15`;
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            `0 0 16px ${color}40, inset 0 0 12px ${color}20`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            `0 0 8px ${color}20, inset 0 0 8px ${color}10`;
        }
      }}
    >
      {children}
    </button>
  );

  // ── ELEMENT PALETTE BUTTON ──────────────────────────────────────────────
  const PaletteButton = ({
    elementType,
    remaining,
  }: {
    elementType: ElementType;
    remaining: number;
  }) => {
    const el = ELEMENTS[elementType];
    const isSelected = state.selectedElement === elementType;
    const isEmpty = remaining <= 0;

    return (
      <button
        onClick={() =>
          dispatch({
            type: "SELECT_ELEMENT",
            elementType: isSelected ? null : elementType,
          })
        }
        disabled={isEmpty}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 8px",
          background: isEmpty
            ? "#1a1a1a"
            : isSelected
              ? `${colors.gold}20`
              : colors.bgDark,
          border: `2px solid ${isEmpty ? "#333" : isSelected ? colors.gold : colors.border}`,
          borderRadius: "0px",
          cursor: isEmpty ? "not-allowed" : "pointer",
          transition: "all 0.15s ease",
          boxShadow: isSelected
            ? `0 0 10px ${colors.gold}40, inset 0 0 8px ${colors.gold}15`
            : "none",
          minWidth: "52px",
          opacity: isEmpty ? 0.4 : 1,
        }}
        title={`${el.name}: ${el.description}`}
      >
        <span style={{ fontSize: "20px" }}>{el.emoji}</span>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: "14px",
            color: isEmpty
              ? "#555"
              : isSelected
                ? colors.gold
                : colors.dimWhite,
          }}
        >
          {remaining}x
        </span>
        <span
          style={{
            fontFamily: pixelFont,
            fontSize: "5px",
            color: isEmpty
              ? "#444"
              : isSelected
                ? colors.gold
                : colors.dimWhite,
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap",
          }}
        >
          {el.name}
        </span>
      </button>
    );
  };

  // =====================================================================
  // SCREENS
  // =====================================================================

  // --- MENU SCREEN ---
  if (state.screen === "menu") {
    const completed = levelsCompleted();
    const ts = totalStars();

    return (
      <div
        style={{
          minHeight: "70vh",
          background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgDark} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
          imageRendering: "pixelated" as React.CSSProperties["imageRendering"],
        }}
      >
        <div
          style={{
            border: `3px solid ${colors.green}`,
            boxShadow: `0 0 20px ${colors.green}20, inset 0 0 40px ${colors.bgDark}`,
            padding: "40px",
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
            background: colors.bgDark,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: "clamp(14px, 4vw, 22px)",
              color: colors.green,
              marginBottom: "8px",
              textShadow: `0 0 10px ${colors.green}60`,
              lineHeight: "1.8",
            }}
          >
            {"\uD83C\uDF31"} TUINONTWERPER
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "22px",
              color: colors.dimWhite,
              marginBottom: "32px",
            }}
          >
            Het Tuinontwerp Puzzelspel
          </div>

          {/* Pixel separator */}
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "14px",
              color: colors.border,
              marginBottom: "32px",
              letterSpacing: "4px",
            }}
          >
            {"\u2500\u2500\u2500\uD83C\uDF3F\u2500\u2500\u2500\uD83C\uDF3F\u2500\u2500\u2500"}
          </div>

          {/* Stats */}
          {ts > 0 && (
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "18px",
                color: colors.gold,
                marginBottom: "8px",
              }}
            >
              {"\u2B50"} Sterren: {ts}/{LEVELS.length * 3}
            </div>
          )}
          {state.highScore > 0 && (
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "16px",
                color: colors.dimWhite,
                marginBottom: "8px",
              }}
            >
              Highscore: {state.highScore} schoonheidspunten
            </div>
          )}
          {completed > 0 && (
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "16px",
                color: colors.dimWhite,
                marginBottom: "24px",
              }}
            >
              Levels voltooid: {completed}/{LEVELS.length}
            </div>
          )}

          {/* Start button */}
          <div style={{ marginBottom: "16px" }}>
            <PixelButton
              onClick={() => dispatch({ type: "START_GAME" })}
              color={colors.green}
            >
              {completed > 0 ? "Nieuw Spel" : "Start Spel"}
            </PixelButton>
          </div>

          {/* Level select */}
          {completed > 0 && (
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  fontFamily: pixelFont,
                  fontSize: "8px",
                  color: colors.dimWhite,
                  marginBottom: "12px",
                  textTransform: "uppercase" as const,
                }}
              >
                Kies Level:
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {LEVELS.map((level, i) => {
                  const s = state.stars.get(level.id) ?? 0;
                  const unlocked = i === 0 || (state.stars.get(LEVELS[i - 1].id) ?? 0) > 0;
                  return (
                    <div key={level.id} style={{ textAlign: "center" }}>
                      <PixelButton
                        onClick={() =>
                          dispatch({ type: "SELECT_LEVEL", level: i })
                        }
                        color={
                          s >= 3
                            ? colors.gold
                            : s > 0
                              ? colors.green
                              : unlocked
                                ? colors.dimWhite
                                : "#444"
                        }
                        disabled={!unlocked}
                        small
                      >
                        {level.id}
                      </PixelButton>
                      {s > 0 && (
                        <div
                          style={{
                            fontSize: "10px",
                            marginTop: "2px",
                            letterSpacing: "1px",
                          }}
                        >
                          {Array.from({ length: 3 }, (_, si) => (
                            <span
                              key={si}
                              style={{
                                filter:
                                  si < s
                                    ? "none"
                                    : "grayscale(1) opacity(0.2)",
                              }}
                            >
                              {"\u2B50"}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* How to play */}
          <div
            style={{
              marginTop: "32px",
              border: `1px solid ${colors.border}`,
              padding: "16px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: "8px",
                color: colors.blue,
                marginBottom: "12px",
                textTransform: "uppercase" as const,
              }}
            >
              Hoe te spelen:
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "16px",
                color: colors.dimWhite,
                lineHeight: "1.6",
              }}
            >
              <p style={{ marginBottom: "6px" }}>
                {"\uD83C\uDF39"} Kies elementen uit de werkbalk en plaats ze in de tuin
              </p>
              <p style={{ marginBottom: "6px" }}>
                {"\uD83D\uDCA7"} Bloemen naast water = bonuspunten
              </p>
              <p style={{ marginBottom: "6px" }}>
                {"\uD83C\uDF3F"} Hagen op een rij (3+) = bonuspunten
              </p>
              <p style={{ marginBottom: "6px" }}>
                {"\uD83C\uDF33"} Bomen hebben ruimte nodig
              </p>
              <p style={{ marginBottom: "6px" }}>
                {"\uD83D\uDFEB"} Paden verbinden de ingang met elementen
              </p>
              <p>
                {"\u2728"} Symmetrie geeft extra punten!
              </p>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: "14px",
            color: colors.border,
            marginTop: "24px",
          }}
        >
          Een spel van HovenierAI.nl
        </div>
      </div>
    );
  }

  // --- LEVEL COMPLETE SCREEN ---
  if (state.screen === "level-complete") {
    const level = LEVELS[state.currentLevel];
    const earnedStars =
      state.beautyScore >= level.threeStarScore
        ? 3
        : state.beautyScore >= level.twoStarScore
          ? 2
          : 1;

    return (
      <div
        style={{
          minHeight: "70vh",
          background: `linear-gradient(180deg, ${colors.bg} 0%, #0a200a 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            border: `3px solid ${colors.green}`,
            boxShadow: `0 0 30px ${colors.green}30`,
            padding: "40px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            background: colors.bgDark,
          }}
        >
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: "clamp(12px, 3vw, 18px)",
              color: colors.green,
              marginBottom: "8px",
              textShadow: `0 0 10px ${colors.green}60`,
              lineHeight: "1.8",
            }}
          >
            Tuin Voltooid!
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "20px",
              color: colors.white,
              marginBottom: "24px",
            }}
          >
            {level.name}
          </div>

          {/* Stars */}
          <div
            style={{
              fontSize: "32px",
              marginBottom: "16px",
              letterSpacing: "8px",
            }}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <span
                key={i}
                style={{
                  filter:
                    i < earnedStars
                      ? "drop-shadow(0 0 4px #FFD700)"
                      : "grayscale(1) opacity(0.3)",
                  transition: "all 0.3s ease",
                  transitionDelay: `${i * 300 + 600}ms`,
                }}
              >
                {"\u2B50"}
              </span>
            ))}
          </div>

          {/* Score thresholds */}
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "14px",
              color: colors.dimWhite,
              marginBottom: "20px",
            }}
          >
            {"\u2B50"} {level.targetScore} | {"\u2B50\u2B50"}{" "}
            {level.twoStarScore} | {"\u2B50\u2B50\u2B50"}{" "}
            {level.threeStarScore}
          </div>

          {/* Score breakdown */}
          <div
            style={{
              border: `1px solid ${colors.border}`,
              padding: "12px",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: "7px",
                color: colors.gold,
                marginBottom: "8px",
                textTransform: "uppercase" as const,
              }}
            >
              Score Details:
            </div>
            {state.bonuses.map((b, i) => (
              <div
                key={i}
                style={{
                  fontFamily: bodyFont,
                  fontSize: "16px",
                  color: b.points >= 0 ? colors.green : colors.red,
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span>{b.description}</span>
                <span>
                  {b.points > 0 ? "+" : ""}
                  {b.points}
                </span>
              </div>
            ))}
            <div
              style={{
                borderTop: `1px solid ${colors.border}`,
                marginTop: "8px",
                paddingTop: "8px",
                fontFamily: bodyFont,
                fontSize: "20px",
                color: colors.gold,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Totaal</span>
              <span>{state.beautyScore}</span>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "18px",
              color: colors.dimWhite,
              lineHeight: "2",
              marginBottom: "24px",
            }}
          >
            <div>
              Totale schoonheidspunten:{" "}
              <span style={{ color: colors.gold }}>
                {state.totalBeautyScore}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <PixelButton
              onClick={() => dispatch({ type: "NEXT_LEVEL" })}
              color={colors.green}
            >
              Volgend Level {"\u25B6"}
            </PixelButton>
            <PixelButton
              onClick={() =>
                dispatch({
                  type: "SELECT_LEVEL",
                  level: state.currentLevel,
                })
              }
              color={colors.gold}
              small
            >
              Opnieuw
            </PixelButton>
            <PixelButton
              onClick={() => dispatch({ type: "BACK_TO_MENU" })}
              color={colors.dimWhite}
              small
            >
              Menu
            </PixelButton>
          </div>
        </div>
      </div>
    );
  }

  // --- ALL COMPLETE SCREEN ---
  if (state.screen === "all-complete") {
    const ts = totalStars();

    return (
      <div
        style={{
          minHeight: "70vh",
          background: `linear-gradient(180deg, ${colors.bg} 0%, #0a1a2a 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            border: `3px solid ${colors.gold}`,
            boxShadow: `0 0 40px ${colors.gold}30`,
            padding: "40px",
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
            background: colors.bgDark,
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>
            {"\uD83C\uDFC6"}
          </div>
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: "clamp(12px, 3vw, 18px)",
              color: colors.gold,
              marginBottom: "8px",
              textShadow: `0 0 10px ${colors.gold}60`,
              lineHeight: "1.8",
            }}
          >
            Meester Hovenier!
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "20px",
              color: colors.white,
              marginBottom: "24px",
            }}
          >
            Je hebt alle tuinen ontworpen!
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "22px",
              color: colors.gold,
              marginBottom: "8px",
            }}
          >
            Eindscore: {state.totalBeautyScore} schoonheidspunten
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "18px",
              color: colors.dimWhite,
              marginBottom: "8px",
            }}
          >
            Sterren: {ts}/{LEVELS.length * 3}
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "18px",
              color: colors.dimWhite,
              marginBottom: "32px",
            }}
          >
            Highscore: {state.highScore}
          </div>

          {/* CTA */}
          <div
            style={{
              border: `1px solid ${colors.border}`,
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "16px",
                color: colors.dimWhite,
                lineHeight: "1.6",
              }}
            >
              Je bent een echte tuinontwerper! Wil je ook jouw hoveniersbedrijf
              laten groeien met slimme AI-tools?
            </div>
            <a
              href="/gratis-scan"
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontFamily: pixelFont,
                fontSize: "9px",
                padding: "10px 16px",
                color: colors.green,
                border: `2px solid ${colors.green}`,
                textDecoration: "none",
                textTransform: "uppercase" as const,
              }}
            >
              Gratis Scan {"\u2192"}
            </a>
          </div>

          <PixelButton
            onClick={() => dispatch({ type: "BACK_TO_MENU" })}
            color={colors.gold}
          >
            Terug naar Menu
          </PixelButton>
        </div>
      </div>
    );
  }

  // =====================================================================
  // GAME SCREEN
  // =====================================================================

  const level = LEVELS[state.currentLevel];

  // Build palette items from budget
  const paletteItems: { elementType: ElementType; remaining: number }[] = [];
  level.budget.forEach((b) => {
    paletteItems.push({
      elementType: b.elementType,
      remaining: state.budget.get(b.elementType) ?? 0,
    });
  });

  // Count total elements placed
  let totalPlaced = 0;
  for (let r = 0; r < level.gridSize; r++) {
    for (let c = 0; c < level.gridSize; c++) {
      if (state.grid[r][c].elementType && !isFixedCell(level, r, c)) {
        totalPlaced++;
      }
    }
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgLight} 100%)`,
        padding: "20px 16px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <button
            onClick={() => dispatch({ type: "BACK_TO_MENU" })}
            style={{
              fontFamily: pixelFont,
              fontSize: "8px",
              color: colors.dimWhite,
              background: "none",
              border: `1px solid ${colors.border}`,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            {"\u25C0"} MENU
          </button>
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: "clamp(8px, 2vw, 11px)",
              color: colors.green,
              textShadow: `0 0 6px ${colors.green}40`,
            }}
          >
            Level {level.id}: {level.name}
          </div>
        </div>

        {/* Score bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          {[
            {
              label: "Schoonheid",
              value: `${state.beautyScore}`,
              color:
                state.beautyScore >= level.threeStarScore
                  ? colors.gold
                  : state.beautyScore >= level.targetScore
                    ? colors.green
                    : colors.white,
              sub: `/${level.targetScore}`,
            },
            {
              label: "Geplaatst",
              value: `${totalPlaced}`,
              color: colors.white,
              sub: "",
            },
            {
              label: "Sterren",
              value:
                state.beautyScore >= level.threeStarScore
                  ? "\u2B50\u2B50\u2B50"
                  : state.beautyScore >= level.twoStarScore
                    ? "\u2B50\u2B50"
                    : state.beautyScore >= level.targetScore
                      ? "\u2B50"
                      : "-",
              color: colors.gold,
              sub: "",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                border: `1px solid ${colors.border}`,
                padding: "8px 4px",
                textAlign: "center",
                background: colors.bgDark,
              }}
            >
              <div
                style={{
                  fontFamily: pixelFont,
                  fontSize: "6px",
                  color: colors.dimWhite,
                  marginBottom: "4px",
                  textTransform: "uppercase" as const,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: "22px",
                  color: stat.color,
                  lineHeight: "1",
                }}
              >
                {stat.value}
                <span style={{ fontSize: "14px", color: colors.dimWhite }}>
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Level description */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: "16px",
            color: colors.dimWhite,
            textAlign: "center",
            marginBottom: "12px",
            padding: "6px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {level.description}
        </div>

        {/* Message toast */}
        {state.message && (
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "16px",
              padding: "8px 16px",
              marginBottom: "12px",
              textAlign: "center",
              border: `1px solid ${
                state.messageType === "success"
                  ? colors.green
                  : state.messageType === "error"
                    ? colors.red
                    : colors.blue
              }`,
              color:
                state.messageType === "success"
                  ? colors.green
                  : state.messageType === "error"
                    ? colors.red
                    : colors.blue,
              background: colors.bgDark,
              animation: "fadeIn 0.2s ease",
            }}
          >
            {state.message}
          </div>
        )}

        {/* ELEMENT PALETTE / TOOLBAR */}
        <div
          style={{
            border: `2px solid ${colors.border}`,
            background: colors.bgDark,
            padding: "8px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontFamily: pixelFont,
              fontSize: "6px",
              color: colors.dimWhite,
              marginBottom: "8px",
              textTransform: "uppercase" as const,
              textAlign: "center",
            }}
          >
            {state.selectedElement
              ? `Geselecteerd: ${ELEMENTS[state.selectedElement].emoji} ${ELEMENTS[state.selectedElement].name}`
              : "Kies een element:"}
          </div>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {paletteItems.map((item) => (
              <PaletteButton
                key={item.elementType}
                elementType={item.elementType}
                remaining={item.remaining}
              />
            ))}
          </div>
          {state.selectedElement && (
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: "14px",
                color: colors.dimWhite,
                textAlign: "center",
                marginTop: "6px",
              }}
            >
              {ELEMENTS[state.selectedElement].description}
            </div>
          )}
        </div>

        {/* THE GARDEN GRID */}
        <div
          style={{
            border: `3px solid ${colors.borderBright}`,
            boxShadow: `0 0 20px ${colors.green}10, inset 0 0 30px ${colors.bgDark}`,
            padding: "4px",
            background: colors.bgDark,
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
              gap: "2px",
            }}
          >
            {state.grid.map((row, r) =>
              row.map((cell, c) => renderCell(cell, r, c))
            )}
          </div>
        </div>

        {/* Live bonus preview */}
        {state.bonuses.length > 0 && (
          <div
            style={{
              border: `1px solid ${colors.border}`,
              background: colors.bgDark,
              padding: "8px 12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontFamily: pixelFont,
                fontSize: "6px",
                color: colors.gold,
                marginBottom: "6px",
                textTransform: "uppercase" as const,
              }}
            >
              Live Score:
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {state.bonuses.map((b, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: bodyFont,
                    fontSize: "14px",
                    color: b.points >= 0 ? colors.green : colors.red,
                    background: `${b.points >= 0 ? colors.green : colors.red}10`,
                    padding: "2px 6px",
                    border: `1px solid ${b.points >= 0 ? colors.green : colors.red}30`,
                  }}
                >
                  {b.description}: {b.points > 0 ? "+" : ""}{b.points}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          {[
            { emoji: "\uD83D\uDEAA", label: "Ingang", color: colors.gold },
            {
              emoji: "\uD83D\uDCA7",
              label: "+bloemen",
              color: colors.blue,
            },
            {
              emoji: "\uD83C\uDF3F",
              label: "3+ rij",
              color: colors.green,
            },
            {
              emoji: "\u2728",
              label: "symmetrie",
              color: colors.gold,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                fontFamily: bodyFont,
                fontSize: "13px",
                color: colors.dimWhite,
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span style={{ color: item.color }}>{item.emoji}</span>{" "}
              {item.label}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <PixelButton
            onClick={() => {
              sfxBonus();
              dispatch({ type: "SUBMIT_GARDEN" });
            }}
            color={colors.green}
          >
            {"\u2705"} Beoordeel Tuin
          </PixelButton>
          <PixelButton
            onClick={() =>
              dispatch({
                type: "SELECT_LEVEL",
                level: state.currentLevel,
              })
            }
            color={colors.red}
            small
          >
            {"\uD83D\uDD04"} Herstart
          </PixelButton>
          {state.selectedElement && (
            <PixelButton
              onClick={() =>
                dispatch({ type: "SELECT_ELEMENT", elementType: null })
              }
              color={colors.dimWhite}
              small
            >
              Deselecteer
            </PixelButton>
          )}
        </div>

        {/* Score targets */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: "14px",
            color: colors.dimWhite,
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          Doelen: {"\u2B50"} {level.targetScore} | {"\u2B50\u2B50"}{" "}
          {level.twoStarScore} | {"\u2B50\u2B50\u2B50"}{" "}
          {level.threeStarScore}
        </div>

        {/* Mobile hint */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: "13px",
            color: colors.border,
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          Kies een element, tik op het gras om te plaatsen. Tik op een geplaatst
          element om te verwijderen.
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
