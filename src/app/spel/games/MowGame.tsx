'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CellType = 'grass' | 'mowed' | 'rock' | 'flower' | 'gem' | 'snail' | 'start' | 'empty' | 'thick';

type TemplateChar = string;

interface Cell {
  type: CellType;
  revealed?: boolean; // for gems: true once stepped on
  toughness?: number; // hits remaining to mow (thick grass: 3-10, regular: 1)
  maxToughness?: number; // original toughness for display
}

interface Position {
  row: number;
  col: number;
}

interface SnailState {
  pos: Position;
  turnsSinceMove: number;
  alive: boolean; // false = ran away after being stepped on
}

interface LevelDef {
  name: string;
  grid: CellType[][];
  moveLimit: number;
  timer: number;
  startPos: Position;
}

interface MowGameProps {
  onComplete: (result: { success: boolean; coins: number; stars: number }) => void;
  onExit: () => void;
}

// ─── HELPER: Build grid from string template ──────────────────────────────────
// Legend:  G=grass  R=rock  F=flower  D=gem(diamond)  S=start  .=empty  N=snail
//          T=thick(3hits)  U=ultra(5hits)  V=very(10hits)
function parseGrid(template: string[]): { grid: CellType[][]; startPos: Position } {
  let startPos: Position = { row: 0, col: 0 };
  const grid: CellType[][] = template.map((rowStr, r) =>
    rowStr.split('').map((ch, c) => {
      switch (ch) {
        case 'G': return 'grass';
        case 'R': return 'rock';
        case 'F': return 'flower';
        case 'D': return 'gem';
        case 'S': { startPos = { row: r, col: c }; return 'start'; }
        case 'N': return 'snail';
        case 'T': return 'thick'; // 3 hits
        case 'U': return 'thick'; // 5 hits
        case 'V': return 'thick'; // 10 hits
        case 'W': return 'thick'; // 100 hits
        case '.': return 'empty';
        default: return 'empty';
      }
    })
  );
  return { grid, startPos };
}

// Map template chars to toughness values
function getToughness(ch: string): number {
  switch (ch) {
    case 'T': return 3;
    case 'U': return 5;
    case 'V': return 10;
    case 'W': return 100;
    default: return 1;
  }
}

// ─── 16 HAND-DESIGNED LEVELS (verified solvable via Hamiltonian path solver) ──
// Each level uses a snake-path pattern → guaranteed solvable.
// Features (D/N/T/U/V/W) sit ON the path; Flowers (F) sit OFF the path as traps.
// Difficulty curve: Tutorial → Apprentice → Expert → Master

const LEVEL_DEFS: { name: string; template: string[]; moveLimit: number; timer: number }[] = [
    // ── Level 1: Het Voortuintje ──
    // Simple snake path. Learn the basics!
    // 5x5 | 17 tiles | min 16 moves | 120s
    {
      name: 'Het Voortuintje',
      template: [
        'SGGGG',
        'RRRRG',
        'GGGGG',
        'GRRRR',
        'GGGGG',
      ],
      moveLimit: 24,
      timer: 120,
    },
    // ── Level 2: Het Achtertuintje ──
    // First gem! Collect it for bonus coins.
    // 5x5 | 17 tiles | min 16 moves | 100s
    {
      name: 'Het Achtertuintje',
      template: [
        'SGGGG',
        'RRRRG',
        'GGDGG',
        'GRRRR',
        'GGGGG',
      ],
      moveLimit: 23,
      timer: 100,
    },
    // ── Level 3: De Bloemenborder ──
    // First flowers! Don't step on them.
    // 5x5 | 17 tiles | min 16 moves | 90s
    {
      name: 'De Bloemenborder',
      template: [
        'SGGGG',
        'FRRRG',
        'GGGGG',
        'GRRRF',
        'GGDGG',
      ],
      moveLimit: 22,
      timer: 90,
    },
    // ── Level 4: De Eerste Uitdaging ──
    // Bigger garden, more to mow!
    // 5x6 | 20 tiles | min 19 moves | 80s
    {
      name: 'De Eerste Uitdaging',
      template: [
        'SGGGGG',
        'FFRRRG',
        'GGGDGG',
        'GRRRRR',
        'GGGGGG',
      ],
      moveLimit: 24,
      timer: 80,
    },
    // ── Level 5: De Slakkentuin ──
    // First snail! They move and freeze you.
    // 5x6 | 20 tiles | min 19 moves | 75s
    {
      name: 'De Slakkentuin',
      template: [
        'SGGGGG',
        'RRFRRG',
        'GGNGGG',
        'GRRRRR',
        'GGGGDG',
      ],
      moveLimit: 24,
      timer: 75,
    },
    // ── Level 6: Het Doolhof ──
    // Bigger maze, tighter moves.
    // 7x6 | 27 tiles | min 26 moves | 70s
    {
      name: 'Het Doolhof',
      template: [
        'SGGGGG',
        'FRRRRG',
        'GGGGGG',
        'GRRRRF',
        'GGGDGG',
        'FRRRRG',
        'GGGGGG',
      ],
      moveLimit: 30,
      timer: 70,
    },
    // ── Level 7: De Rozentuin ──
    // Flowers everywhere — find the safe path!
    // 7x6 | 27 tiles | min 26 moves | 75s
    {
      name: 'De Rozentuin',
      template: [
        'SGGGGG',
        'FFFRRG',
        'GGDGGG',
        'GRRFFF',
        'GGGGGG',
        'FFRRRG',
        'GGGDGG',
      ],
      moveLimit: 31,
      timer: 75,
    },
    // ── Level 8: De Tuinfeest ──
    // Snails, flowers, gems — all at once!
    // 7x7 | 31 tiles | min 30 moves | 70s
    {
      name: 'De Tuinfeest',
      template: [
        'SGGGGGG',
        'FFRRRRG',
        'GGGNGGG',
        'GRRRRFF',
        'GGGGGDG',
        'FRRRRRG',
        'GNGGGGG',
      ],
      moveLimit: 34,
      timer: 70,
    },
    // ── Level 9: Het Dikke Gras ──
    // Thick grass needs 3 hits to mow!
    // 7x7 | 31 tiles | min 32 moves | 75s
    {
      name: 'Het Dikke Gras',
      template: [
        'SGGGGGG',
        'FRRRRRG',
        'GGGGGGG',
        'GRRRRRF',
        'GGGTGGG',
        'FRRRRRG',
        'GGGGDGG',
      ],
      moveLimit: 37,
      timer: 75,
    },
    // ── Level 10: De Vijvertuin ──
    // Multiple thick patches — plan your route!
    // 7x8 | 35 tiles | min 38 moves | 70s
    {
      name: 'De Vijvertuin',
      template: [
        'SGGGGGGG',
        'FFRRRRRG',
        'GGGGTGGG',
        'GRRRRRFF',
        'GGTGGGGG',
        'FFRRRRRG',
        'GGGGGDGG',
      ],
      moveLimit: 42,
      timer: 70,
    },
    // ── Level 11: De Slakkenplaag ──
    // Snails AND thick grass — timing is everything!
    // 7x8 | 35 tiles | min 38 moves | 80s
    {
      name: 'De Slakkenplaag',
      template: [
        'SGGGGGGG',
        'FRRRRRRG',
        'GGNGGGTG',
        'GRRRRRRF',
        'GGGGGNGG',
        'FRRRRRRG',
        'GGGTGGDG',
      ],
      moveLimit: 43,
      timer: 80,
    },
    // ── Level 12: De Engelse Tuin ──
    // A proper English garden — precision required!
    // 9x7 | 39 tiles | min 42 moves | 70s
    {
      name: 'De Engelse Tuin',
      template: [
        'SGGGGGG',
        'FFFRRRG',
        'GGGTGGG',
        'GRRRFFF',
        'GGDGGGG',
        'FFFRRRG',
        'GGGGTGG',
        'GRRRFFF',
        'GGGDGGG',
      ],
      moveLimit: 46,
      timer: 70,
    },
    // ── Level 13: De Nachtshift ──
    // Ultra thick grass needs 5 hits! Hurry!
    // 9x8 | 44 tiles | min 51 moves | 80s
    {
      name: 'De Nachtshift',
      template: [
        'SGGGGGDG',
        'FFRRRRRG',
        'GGGTGGGG',
        'GRRRRRFF',
        'GGGGUGGG',
        'FFRRRRRG',
        'GGGGGTGG',
        'GRRRRRFF',
        'GGDGGGGG',
      ],
      moveLimit: 55,
      timer: 80,
    },
    // ── Level 14: De Kasteel Tuin ──
    // Castle garden — thick, ultra, snails, flowers!
    // 9x8 | 44 tiles | min 55 moves | 90s
    {
      name: 'De Kasteel Tuin',
      template: [
        'SGGGGGGG',
        'FFFRRRRG',
        'GNGGUGGG',
        'GRRRRFFF',
        'GGTGGGDG',
        'FFFRRRRG',
        'GGGUGGNG',
        'GRRRRFFF',
        'GDGGGTGG',
      ],
      moveLimit: 60,
      timer: 90,
    },
    // ── Level 15: De Meester Uitdaging ──
    // 10-hit mega grass! Can you handle it?
    // 9x9 | 49 tiles | min 69 moves | 100s
    {
      name: 'De Meester Uitdaging',
      template: [
        'SGGGGNGGG',
        'FFFFRRRRG',
        'GGGUGGGTG',
        'GRRRRFFFF',
        'GGGGVGGDG',
        'FFFFRRRRG',
        'GGNGGUGGG',
        'GRRRRFFFF',
        'GGTGGGDGG',
      ],
      moveLimit: 73,
      timer: 100,
    },
    // ── Level 16: De Perfecte Tuin ──
    // 100-click tile + ultra + thick — near impossible!
    // 11x9 | 59 tiles | min 187 moves | 150s
    {
      name: 'De Perfecte Tuin',
      template: [
        'SGGGNGGGD',
        'FFFFFRRRG',
        'GGGVGGGTG',
        'GRRRFFFFF',
        'GGGGWGGGN',
        'FFFFFRRRG',
        'GGUGDGTGG',
        'GRRRFFFFF',
        'GNGGGVGGG',
        'FFFFFRRRG',
        'GGGUGGDGG',
      ],
      moveLimit: 192,
      timer: 150,
    },
];

function buildLevels(): LevelDef[] {
  return LEVEL_DEFS.map((d) => {
    const { grid, startPos } = parseGrid(d.template);
    return { name: d.name, grid, moveLimit: d.moveLimit, timer: d.timer, startPos };
  });
}

const ALL_LEVELS = buildLevels();

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function MowGame({ onComplete, onExit }: MowGameProps) {
  // ── State ───────────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<'menu' | 'playing' | 'levelComplete' | 'gameOver'>('menu');
  const [levelIndex, setLevelIndex] = useState(0);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ row: 0, col: 0 });
  const [snails, setSnails] = useState<SnailState[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [coins, setCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [frozenMessage, setFrozenMessage] = useState('');
  const [shaking, setShaking] = useState(false);
  const [sparklePos, setSparklePos] = useState<Position | null>(null);
  const [floatingText, setFloatingText] = useState<{ pos: Position; text: string; key: number } | null>(null);
  const [completedLevels, setCompletedLevels] = useState<{ [key: number]: number }>({});
  const [grassTotal, setGrassTotal] = useState(0);
  const [grassMowed, setGrassMowed] = useState(0);
  const [gemsTotal, setGemsTotal] = useState(0);
  const [gemsFound, setGemsFound] = useState(0);
  const [levelResult, setLevelResult] = useState<{ stars: number; coins: number } | null>(null);
  const [mowedAnimating, setMowedAnimating] = useState<string | null>(null); // "row-col"

  const floatingKeyRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frozenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const currentLevel = ALL_LEVELS[levelIndex];

  // ── Initialize level ────────────────────────────────────────────────────────
  const initLevel = useCallback((lvlIdx: number) => {
    const lvl = ALL_LEVELS[lvlIdx];
    // Build grid with toughness for thick grass tiles
    const template = LEVEL_DEFS[lvlIdx].template;
    const newGrid: Cell[][] = lvl.grid.map((row, r) =>
      row.map((cellType, c) => {
        const ch = template[r]?.[c] || '.';
        const tough = (cellType === 'thick') ? getToughness(ch) : (cellType === 'grass' ? 1 : 0);
        return {
          type: cellType === 'thick' ? 'grass' : cellType, // thick renders as grass with toughness
          revealed: false,
          toughness: tough > 1 ? tough : undefined,
          maxToughness: tough > 1 ? tough : undefined,
        };
      })
    );

    // Find snails
    const snailList: SnailState[] = [];
    let gTotal = 0;
    let gemTotal = 0;
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        if (newGrid[r][c].type === 'snail') {
          snailList.push({ pos: { row: r, col: c }, turnsSinceMove: 0, alive: true });
          // Snail sits on grass effectively
          gTotal++;
        }
        if (newGrid[r][c].type === 'grass') gTotal++;
        if (newGrid[r][c].type === 'gem') { gTotal++; gemTotal++; }
        // flowers are NOT counted — they're optional (penalty if mowed)
        if (newGrid[r][c].type === 'start') gTotal++; // start counts as "mowed" from the beginning
      }
    }

    // Mark start as mowed
    newGrid[lvl.startPos.row][lvl.startPos.col] = { type: 'mowed', revealed: false };

    setGrid(newGrid);
    setPlayerPos({ ...lvl.startPos });
    setSnails(snailList);
    setMoveCount(0);
    setTimeLeft(lvl.timer);
    setCoins(0);
    setFrozen(false);
    setFrozenMessage('');
    setShaking(false);
    setSparklePos(null);
    setFloatingText(null);
    setGrassTotal(gTotal - 1); // subtract start tile
    setGrassMowed(0);
    setGemsTotal(gemTotal);
    setGemsFound(0);
    setLevelResult(null);
    setMowedAnimating(null);
    setScreen('playing');
  }, []);

  // ── Timer ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          if (timerRef.current) clearInterval(timerRef.current);
          setScreen('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  // ── Check win condition ─────────────────────────────────────────────────────
  const checkWin = useCallback((g: Cell[][], mowed: number, total: number, moves: number, gemsF: number, gemsT: number, coinsSoFar: number) => {
    if (mowed >= total) {
      // Level complete!
      const lvl = ALL_LEVELS[levelIndex];
      let stars = 1; // completed
      if (moves <= lvl.moveLimit) stars = 2; // under move limit
      if (moves <= lvl.moveLimit && gemsF >= gemsT) stars = 3; // + all gems

      const levelCoins = coinsSoFar + 50 + (stars - 1) * 25; // base 50 + bonus per star
      setCoins(levelCoins);

      setLevelResult({ stars, coins: levelCoins });
      setCompletedLevels((prev) => ({
        ...prev,
        [levelIndex]: Math.max(prev[levelIndex] || 0, stars),
      }));

      if (timerRef.current) clearInterval(timerRef.current);
      setScreen('levelComplete');
    }
  }, [levelIndex]);

  // ── Check if stuck (no valid moves) ─────────────────────────────────────────
  const isStuck = useCallback((g: Cell[][], pos: Position): boolean => {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = pos.row + dr;
      const nc = pos.col + dc;
      if (nr >= 0 && nr < g.length && nc >= 0 && nc < g[0].length) {
        const t = g[nr][nc].type;
        if (t === 'grass' || t === 'gem' || t === 'flower' || t === 'snail') {
          return false;
        }
      }
    }
    return true;
  }, []);

  // ── Move snails ─────────────────────────────────────────────────────────────
  const moveSnails = useCallback((currentGrid: Cell[][], playerPosition: Position, currentSnails: SnailState[]): { newGrid: Cell[][]; newSnails: SnailState[] } => {
    const g = currentGrid.map((row) => row.map((cell) => ({ ...cell })));
    const updatedSnails = currentSnails.map((s) => ({ ...s }));

    for (let i = 0; i < updatedSnails.length; i++) {
      const snail = updatedSnails[i];
      if (!snail.alive) continue;

      snail.turnsSinceMove++;
      if (snail.turnsSinceMove < 3) continue; // Move every 3 turns
      snail.turnsSinceMove = 0;

      // Find adjacent grass tiles (not where player is, not where other snails are)
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      const validMoves: Position[] = [];
      for (const [dr, dc] of dirs) {
        const nr = snail.pos.row + dr;
        const nc = snail.pos.col + dc;
        if (nr >= 0 && nr < g.length && nc >= 0 && nc < g[0].length) {
          if (g[nr][nc].type === 'grass' && !(nr === playerPosition.row && nc === playerPosition.col)) {
            // Check no other alive snail is there
            const occupied = updatedSnails.some((os, oi) => oi !== i && os.alive && os.pos.row === nr && os.pos.col === nc);
            if (!occupied) validMoves.push({ row: nr, col: nc });
          }
        }
      }

      if (validMoves.length > 0) {
        const target = validMoves[Math.floor(Math.random() * validMoves.length)];
        // Old position becomes grass again
        g[snail.pos.row][snail.pos.col] = { type: 'grass', revealed: false };
        snail.pos = target;
        g[target.row][target.col] = { type: 'snail', revealed: false };
      }
    }

    return { newGrid: g, newSnails: updatedSnails };
  }, []);

  // ── Move player ─────────────────────────────────────────────────────────────
  const movePlayer = useCallback((dr: number, dc: number) => {
    if (screen !== 'playing' || frozen) return;

    const newRow = playerPos.row + dr;
    const newCol = playerPos.col + dc;

    // Bounds check
    if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) return;

    const targetCell = grid[newRow][newCol];

    // Can't walk on rocks, mowed tiles, or empty tiles
    if (targetCell.type === 'rock' || targetCell.type === 'mowed' || targetCell.type === 'empty') return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    let newCoins = coins;
    let newGrassMowed = grassMowed;
    let newGemsFound = gemsFound;
    const newMoveCount = moveCount + 1;

    // Handle cell type
    if (targetCell.type === 'grass' || targetCell.type === 'start') {
      const remaining = (targetCell.toughness || 1) - 1;
      if (remaining > 0) {
        // Thick grass: reduce toughness, don't mow yet
        newGrid[newRow][newCol] = { ...targetCell, toughness: remaining };
        // Pulse animation on the tile being hit
        setMowedAnimating(`${newRow}-${newCol}`);
        setTimeout(() => setMowedAnimating(null), 200);
        // Don't count as mowed, don't move TO this tile — stay in place
        // But still count the move
        setMoveCount(newMoveCount);
        setGrid(newGrid);
        setCoins(newCoins);
        return; // Stay on current tile, just clicked to chop
      }
      newGrid[newRow][newCol] = { type: 'mowed', revealed: false };
      newGrassMowed++;
      setMowedAnimating(`${newRow}-${newCol}`);
      setTimeout(() => setMowedAnimating(null), 400);
    } else if (targetCell.type === 'gem') {
      newGrid[newRow][newCol] = { type: 'mowed', revealed: true };
      newCoins += 30;
      newGrassMowed++;
      newGemsFound++;
      // Sparkle effect
      setSparklePos({ row: newRow, col: newCol });
      setTimeout(() => setSparklePos(null), 800);
      // Floating text
      floatingKeyRef.current++;
      setFloatingText({ pos: { row: newRow, col: newCol }, text: '+30', key: floatingKeyRef.current });
      setTimeout(() => setFloatingText(null), 1000);
    } else if (targetCell.type === 'flower') {
      // Oops! Flower hit
      newGrid[newRow][newCol] = { type: 'mowed', revealed: false };
      newCoins = Math.max(0, newCoins - 20);
      // Flowers don't count toward grass total — they're a penalty, not required
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setFrozen(true);
      setFrozenMessage('OEPS! Bloemen! 🌺');
      if (frozenTimeoutRef.current) clearTimeout(frozenTimeoutRef.current);
      frozenTimeoutRef.current = setTimeout(() => {
        setFrozen(false);
        setFrozenMessage('');
      }, 5000);
      // Floating text
      floatingKeyRef.current++;
      setFloatingText({ pos: { row: newRow, col: newCol }, text: '-20', key: floatingKeyRef.current });
      setTimeout(() => setFloatingText(null), 1000);
    } else if (targetCell.type === 'snail') {
      // Stepped on a snail
      newGrid[newRow][newCol] = { type: 'mowed', revealed: false };
      newGrassMowed++;
      setFrozen(true);
      setFrozenMessage('SLAK! 🐌');
      if (frozenTimeoutRef.current) clearTimeout(frozenTimeoutRef.current);
      frozenTimeoutRef.current = setTimeout(() => {
        setFrozen(false);
        setFrozenMessage('');
      }, 3000);
    }

    // Build current snails state (mark stepped-on snail as dead)
    let currentSnails = snails.map((s) =>
      (targetCell.type === 'snail' && s.pos.row === newRow && s.pos.col === newCol)
        ? { ...s, alive: false }
        : { ...s }
    );

    // Move snails
    const { newGrid: gridAfterSnails, newSnails } = moveSnails(newGrid, { row: newRow, col: newCol }, currentSnails);

    setGrid(gridAfterSnails);
    setPlayerPos({ row: newRow, col: newCol });
    setMoveCount(newMoveCount);
    setCoins(newCoins);
    setGrassMowed(newGrassMowed);
    setGemsFound(newGemsFound);
    setSnails(newSnails);

    // Check win
    checkWin(gridAfterSnails, newGrassMowed, grassTotal, newMoveCount, newGemsFound, gemsTotal, newCoins);

    // Check if stuck (after a short delay to let state settle)
    if (newGrassMowed < grassTotal && isStuck(gridAfterSnails, { row: newRow, col: newCol })) {
      setTimeout(() => {
        setScreen('gameOver');
        if (timerRef.current) clearInterval(timerRef.current);
      }, 300);
    }
  }, [screen, frozen, playerPos, grid, coins, grassMowed, gemsFound, moveCount, grassTotal, gemsTotal, checkWin, moveSnails, isStuck]);

  // ── Keyboard controls ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (screen !== 'playing') return;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': e.preventDefault(); movePlayer(-1, 0); break;
        case 'ArrowDown': case 's': case 'S': e.preventDefault(); movePlayer(1, 0); break;
        case 'ArrowLeft': case 'a': case 'A': e.preventDefault(); movePlayer(0, -1); break;
        case 'ArrowRight': case 'd': case 'D': e.preventDefault(); movePlayer(0, 1); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, movePlayer]);

  // ── Click on adjacent tile ─────────────────────────────────────────────────
  const handleTileClick = (row: number, col: number) => {
    if (screen !== 'playing' || frozen) return;
    const dr = row - playerPos.row;
    const dc = col - playerPos.col;
    // Adjacent: move directly
    if (Math.abs(dr) + Math.abs(dc) === 1) {
      movePlayer(dr, dc);
    }
    // Not adjacent: move in the direction of the clicked tile (one step)
    else if (Math.abs(dr) + Math.abs(dc) > 1) {
      if (Math.abs(dr) >= Math.abs(dc)) {
        movePlayer(dr > 0 ? 1 : -1, 0);
      } else {
        movePlayer(0, dc > 0 ? 1 : -1);
      }
    }
  };

  // ── Focus game container for keyboard ──────────────────────────────────────
  useEffect(() => {
    if (screen === 'playing' && gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [screen]);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (frozenTimeoutRef.current) clearTimeout(frozenTimeoutRef.current);
    };
  }, []);

  // ── Render helpers ─────────────────────────────────────────────────────────

  const timerPercent = currentLevel ? (timeLeft / currentLevel.timer) * 100 : 100;
  const timerColor = timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500';
  const timerPulse = timerPercent <= 25 ? 'animate-pulse' : '';

  const getCellContent = (cell: Cell, row: number, col: number) => {
    // Player position
    if (row === playerPos.row && col === playerPos.col && screen === 'playing') {
      return (
        <span className="text-xl sm:text-2xl z-10 relative drop-shadow-md select-none" role="img" aria-label="grasmaaier">
          🚜
        </span>
      );
    }

    switch (cell.type) {
      case 'rock': return <span className="text-lg sm:text-xl select-none opacity-90">🪨</span>;
      case 'flower': return <span className="text-lg sm:text-xl select-none animate-sway">🌺</span>;
      case 'gem': return null; // Hidden — looks like grass
      case 'snail': return <span className="text-lg sm:text-xl select-none animate-bob">🐌</span>;
      case 'mowed':
        if (cell.revealed) return <span className="text-lg sm:text-xl select-none">💎</span>;
        return null;
      case 'grass':
      case 'start':
        // Show small hit counter for thick grass
        if (cell.toughness && cell.toughness > 1) {
          return (
            <span className="text-[9px] sm:text-[10px] font-bold text-white/70 bg-green-900/40 rounded px-0.5 select-none z-10">
              {cell.toughness}
            </span>
          );
        }
        return null;
      default: return null;
    }
  };

  const getCellBg = (cell: Cell, row: number, col: number) => {
    const isAnimating = mowedAnimating === `${row}-${col}`;
    switch (cell.type) {
      case 'grass':
      case 'gem': // gems look like grass
      case 'snail': // snails sit on grass
      case 'start': {
        // Thick grass gets darker green based on remaining toughness
        if (cell.toughness && cell.maxToughness && cell.toughness > 1) {
          const ratio = cell.toughness / cell.maxToughness;
          if (ratio > 0.7) return 'bg-green-700 hover:bg-green-600 border-green-800';
          if (ratio > 0.4) return 'bg-green-600 hover:bg-green-500 border-green-700';
          return 'bg-green-500 hover:bg-green-400 border-green-600';
        }
        return 'bg-green-400 hover:bg-green-300 border-green-500';
      }
      case 'mowed':
        return `${isAnimating ? 'bg-yellow-300 scale-95' : 'bg-amber-200'} border-amber-300`;
      case 'rock':
        return 'bg-stone-400 border-stone-500';
      case 'flower':
        return 'bg-green-300 border-green-400';
      case 'empty':
        return 'bg-stone-200 border-stone-300';
      default:
        return 'bg-stone-200 border-stone-300';
    }
  };

  const isAdjacent = (row: number, col: number) => {
    return Math.abs(row - playerPos.row) + Math.abs(col - playerPos.col) === 1;
  };

  // ── RENDER: Level Select Menu ──────────────────────────────────────────────
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 p-4 flex flex-col items-center">
        {/* CSS Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes sway { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
          @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
          .animate-sway { animation: sway 2s ease-in-out infinite; }
          .animate-bob { animation: bob 1.5s ease-in-out infinite; }
        `}} />

        <div className="max-w-lg w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              🚜 De Gazonmeester
            </h1>
            <p className="text-green-200 text-sm sm:text-base">
              Maai alle grasvelden zonder vast te lopen!
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
            {ALL_LEVELS.map((lvl, i) => {
              const stars = completedLevels[i] || 0;
              const unlocked = i === 0 || (completedLevels[i - 1] && completedLevels[i - 1] >= 1);
              return (
                <button
                  key={i}
                  onClick={() => { if (unlocked) { setLevelIndex(i); initLevel(i); } }}
                  disabled={!unlocked}
                  className={`
                    relative rounded-xl p-2 sm:p-3 text-center transition-all duration-200
                    ${unlocked
                      ? 'bg-green-600 hover:bg-green-500 text-white cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                      : 'bg-stone-700 text-stone-500 cursor-not-allowed opacity-60'
                    }
                  `}
                >
                  <div className="text-lg sm:text-xl font-bold">{i + 1}</div>
                  <div className="text-xs mt-1">
                    {unlocked ? (
                      <span>
                        {stars >= 1 ? '⭐' : '☆'}
                        {stars >= 2 ? '⭐' : '☆'}
                        {stars >= 3 ? '⭐' : '☆'}
                      </span>
                    ) : (
                      <span>🔒</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-green-900/50 rounded-xl p-4 text-green-200 text-sm space-y-2">
            <h3 className="font-bold text-white text-base">Hoe te spelen:</h3>
            <ul className="space-y-1">
              <li>🎮 Pijltjestoetsen / WASD of tik op een aangrenzend veld</li>
              <li>🟢 Maai alle groene grasvelden</li>
              <li>🚫 Je kunt niet over gemaaid gras teruglopen</li>
              <li>🪨 Stenen blokkeren de weg</li>
              <li>🌺 Bloemen raken = 5 sec. bevroren + -20 munten</li>
              <li>🐌 Slakken raken = 3 sec. bevroren</li>
              <li>💎 Verborgen juwelen geven +30 munten</li>
              <li>🌿 Dik gras heeft meerdere klikken nodig (3x, 5x, 10x, of 100x!)</li>
            </ul>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={onExit}
              className="px-6 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors"
            >
              Terug
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RENDER: Level Complete ─────────────────────────────────────────────────
  if (screen === 'levelComplete' && levelResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 p-4 flex flex-col items-center justify-center">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes celebrateBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .celebrate { animation: celebrateBounce 0.6s ease-in-out infinite; }
        `}} />

        <div className="bg-green-900/80 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-green-600">
          <div className="celebrate text-5xl mb-4">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Level Voltooid!
          </h2>
          <p className="text-green-200 mb-4">{currentLevel.name}</p>

          <div className="text-4xl mb-4 space-x-1">
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= levelResult.stars ? '' : 'opacity-30'}>
                {s <= levelResult.stars ? '⭐' : '☆'}
              </span>
            ))}
          </div>

          <div className="bg-green-800/50 rounded-xl p-3 mb-4 space-y-1">
            <p className="text-green-200">
              Zetten: <span className="text-white font-bold">{moveCount}</span>
              {moveCount <= currentLevel.moveLimit && <span className="text-green-400 ml-1">(onder limiet!)</span>}
            </p>
            <p className="text-green-200">
              Juwelen: <span className="text-white font-bold">{gemsFound}/{gemsTotal}</span>
            </p>
            <p className="text-yellow-300 text-lg font-bold">
              🪙 {levelResult.coins} munten
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { initLevel(levelIndex); }}
              className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-500 transition-colors"
            >
              Opnieuw
            </button>
            {levelIndex < ALL_LEVELS.length - 1 ? (
              <button
                onClick={() => {
                  setTotalCoins((prev) => prev + levelResult.coins);
                  const next = levelIndex + 1;
                  setLevelIndex(next);
                  initLevel(next);
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors font-bold shadow-lg"
              >
                Volgend Level →
              </button>
            ) : (
              <button
                onClick={() => {
                  onComplete({ success: true, coins: totalCoins + levelResult.coins, stars: levelResult.stars });
                }}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-colors font-bold shadow-lg"
              >
                Spel Voltooid! 🏆
              </button>
            )}
          </div>

          <button
            onClick={() => setScreen('menu')}
            className="mt-3 text-green-300 hover:text-white text-sm underline"
          >
            Terug naar overzicht
          </button>
        </div>
      </div>
    );
  }

  // ── RENDER: Game Over ──────────────────────────────────────────────────────
  if (screen === 'gameOver') {
    const ranOutOfTime = timeLeft <= 0;
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-stone-950 p-4 flex flex-col items-center justify-center">
        <div className="bg-red-950/80 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-red-700">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {ranOutOfTime ? 'Tijd is op!' : 'Vastgelopen!'}
          </h2>
          <p className="text-red-200 mb-4">
            {ranOutOfTime
              ? 'Je had niet genoeg tijd om alles te maaien.'
              : 'Je kunt geen kant meer op. Probeer een andere route!'
            }
          </p>

          <div className="bg-red-900/50 rounded-xl p-3 mb-4">
            <p className="text-red-200">
              Gemaaid: <span className="text-white font-bold">{grassMowed}/{grassTotal}</span>
            </p>
            <p className="text-red-200">
              Zetten: <span className="text-white font-bold">{moveCount}</span>
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setScreen('menu')}
              className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-500 transition-colors"
            >
              Overzicht
            </button>
            <button
              onClick={() => initLevel(levelIndex)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors font-bold shadow-lg"
            >
              Opnieuw Proberen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RENDER: Playing ────────────────────────────────────────────────────────
  return (
    <div
      ref={gameContainerRef}
      tabIndex={0}
      className={`
        min-h-screen bg-gradient-to-b from-green-800 to-green-950 p-2 sm:p-4 flex flex-col items-center outline-none
        ${shaking ? 'animate-shake' : ''}
      `}
    >
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }
        @keyframes mowPulse {
          0% { transform: scale(1); background-color: rgb(74, 222, 128); }
          50% { transform: scale(0.9); background-color: rgb(253, 224, 71); }
          100% { transform: scale(1); background-color: rgb(253, 230, 138); }
        }
        @keyframes grassWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.95); }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-sway { animation: sway 2s ease-in-out infinite; }
        .animate-bob { animation: bob 1.5s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 0.8s ease-out forwards; }
        .animate-float-up { animation: floatUp 1s ease-out forwards; }
        .animate-mow { animation: mowPulse 0.4s ease-out forwards; }
        .animate-grass-wave { animation: grassWave 3s ease-in-out infinite; }
        .celebrate { animation: celebrateBounce 0.6s ease-in-out infinite; }
        .tile-transition { transition: all 0.2s ease-out; }
      `}} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="max-w-lg w-full mb-2 sm:mb-3">
        <div className="bg-green-900/70 rounded-xl p-2 sm:p-3 shadow-lg border border-green-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-bold text-sm sm:text-base truncate mr-2">
              Level {levelIndex + 1}: {currentLevel.name}
            </h2>
            <button
              onClick={() => setScreen('menu')}
              className="text-green-300 hover:text-white text-xs sm:text-sm shrink-0"
            >
              ✕ Stoppen
            </button>
          </div>

          {/* Timer bar */}
          <div className="h-3 bg-green-950 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timerColor} ${timerPulse}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className={`font-mono font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-200'}`}>
              ⏱ {timeLeft}s
            </span>
            <span className="text-green-200">
              🦶 {moveCount}/{currentLevel.moveLimit}
              {moveCount > currentLevel.moveLimit && <span className="text-red-400 ml-1">(over!)</span>}
            </span>
            <span className="text-yellow-300 font-bold">
              🪙 {coins}
            </span>
            <span className="text-green-200">
              🟢 {grassMowed}/{grassTotal}
            </span>
          </div>
        </div>
      </div>

      {/* ── Frozen message overlay ─────────────────────────────────────────── */}
      {frozen && frozenMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className={`
            text-3xl sm:text-4xl font-bold px-6 py-4 rounded-2xl shadow-2xl
            ${frozenMessage.includes('Bloemen') ? 'bg-red-600/90 text-white' : 'bg-yellow-500/90 text-white'}
            animate-bounce
          `}>
            {frozenMessage}
          </div>
        </div>
      )}

      {/* ── Game Grid ──────────────────────────────────────────────────────── */}
      <div className="relative max-w-lg w-full flex-1 flex items-start justify-center">
        <div
          className="inline-grid gap-0 p-2 bg-stone-800/50 rounded-xl shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const adj = isAdjacent(r, c);
              const isPlayer = r === playerPos.row && c === playerPos.col;
              const isSparkle = sparklePos && sparklePos.row === r && sparklePos.col === c;
              const isFloating = floatingText && floatingText.pos.row === r && floatingText.pos.col === c;
              const isMowAnim = mowedAnimating === `${r}-${c}`;
              const canStep = cell.type !== 'rock' && cell.type !== 'mowed' && cell.type !== 'empty';

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleTileClick(r, c)}
                  className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                    rounded-sm border border-stone-700/30 flex items-center justify-center
                    tile-transition select-none
                    ${getCellBg(cell, r, c)}
                    ${isMowAnim ? 'animate-mow' : ''}
                    ${adj && canStep && !frozen ? 'cursor-pointer ring-2 ring-white/30 hover:ring-white/60' : ''}
                    ${isPlayer ? 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/30' : ''}
                    ${cell.type === 'grass' || cell.type === 'gem' ? 'animate-grass-wave' : ''}
                  `}
                >
                  {/* Grass texture lines */}
                  {(cell.type === 'grass' || cell.type === 'gem' || cell.type === 'snail') && !isPlayer && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none">
                      <div className="w-3 h-px bg-green-700 mb-1 rotate-12" />
                      <div className="w-2 h-px bg-green-700 -rotate-6" />
                      <div className="w-3 h-px bg-green-700 mt-1 rotate-3" />
                    </div>
                  )}

                  {/* Mowed texture */}
                  {cell.type === 'mowed' && !cell.revealed && !isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                      <div className="w-full h-full bg-gradient-to-br from-amber-300/30 to-amber-100/10 rounded-md" />
                    </div>
                  )}

                  {getCellContent(cell, r, c)}

                  {/* Sparkle overlay */}
                  {isSparkle && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="animate-sparkle text-2xl">✨</div>
                    </div>
                  )}

                  {/* Floating text */}
                  {isFloating && floatingText && (
                    <div
                      key={floatingText.key}
                      className={`
                        absolute -top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none
                        font-bold text-sm animate-float-up
                        ${floatingText.text.startsWith('+') ? 'text-yellow-300' : 'text-red-400'}
                      `}
                    >
                      {floatingText.text}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Mobile D-pad ──────────────────────────────────────────────────── */}
      <div className="mt-3 sm:mt-4 mb-2">
        <div className="grid grid-cols-3 gap-1 w-36 sm:w-40 mx-auto">
          <div /> {/* empty top-left */}
          <button
            onClick={() => movePlayer(-1, 0)}
            disabled={frozen}
            className="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:opacity-50 text-white text-xl sm:text-2xl rounded-lg p-2 sm:p-3 shadow-lg transition-all active:scale-90"
            aria-label="Omhoog"
          >
            ▲
          </button>
          <div /> {/* empty top-right */}

          <button
            onClick={() => movePlayer(0, -1)}
            disabled={frozen}
            className="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:opacity-50 text-white text-xl sm:text-2xl rounded-lg p-2 sm:p-3 shadow-lg transition-all active:scale-90"
            aria-label="Links"
          >
            ◀
          </button>
          <div className="bg-green-800/30 rounded-lg flex items-center justify-center text-green-400 text-xs">
            {frozen ? '⏸' : '🚜'}
          </div>
          <button
            onClick={() => movePlayer(0, 1)}
            disabled={frozen}
            className="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:opacity-50 text-white text-xl sm:text-2xl rounded-lg p-2 sm:p-3 shadow-lg transition-all active:scale-90"
            aria-label="Rechts"
          >
            ▶
          </button>

          <div /> {/* empty bottom-left */}
          <button
            onClick={() => movePlayer(1, 0)}
            disabled={frozen}
            className="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:opacity-50 text-white text-xl sm:text-2xl rounded-lg p-2 sm:p-3 shadow-lg transition-all active:scale-90"
            aria-label="Omlaag"
          >
            ▼
          </button>
          <div /> {/* empty bottom-right */}
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="max-w-lg w-full mt-1">
        <div className="flex items-center justify-between text-xs text-green-300/60 px-2">
          <span>Pijltjestoetsen / WASD om te bewegen</span>
          <span>💎 {gemsFound}/{gemsTotal}</span>
        </div>
      </div>
    </div>
  );
}
