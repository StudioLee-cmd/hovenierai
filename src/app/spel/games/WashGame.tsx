'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface WashGameProps {
  onComplete: (result: { success: boolean; coins: number; stars: number }) => void;
  onExit: () => void;
}

type GameState = 'menu' | 'playing' | 'results';

interface Tile {
  id: number;
  dirt: number; // 0-100
  cracked: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function WashGame({ onComplete, onExit }: WashGameProps) {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [crackedCount, setCrackedCount] = useState(0);
  const [cleanedCount, setCleanedCount] = useState(0);
  const [sprayingTile, setSprayingTile] = useState<number | null>(null);
  const [gaugeValue, setGaugeValue] = useState(50);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const sprayingTileRef = useRef<number | null>(null);
  const gaugeRef = useRef(50);
  const tilesRef = useRef<Tile[]>([]);
  const crackedCountRef = useRef(0);
  const gameOverRef = useRef(false);
  const particleIdRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const lastSprayTimeRef = useRef(0);
  const gaugeStartTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const initTiles = useCallback(() => {
    const newTiles: Tile[] = [];
    for (let i = 0; i < 36; i++) {
      newTiles.push({
        id: i,
        dirt: 80 + Math.random() * 20,
        cracked: false,
      });
    }
    return newTiles;
  }, []);

  const getGaugeZone = useCallback((value: number): 'green' | 'yellow' | 'red' => {
    // Value 0-100: red(0-10), yellow(10-30), green(30-70), yellow(70-90), red(90-100)
    if (value < 10 || value > 90) return 'red';
    if (value < 30 || value > 70) return 'yellow';
    return 'green';
  }, []);

  const startGame = useCallback(() => {
    const newTiles = initTiles();
    setTiles(newTiles);
    tilesRef.current = newTiles;
    setTimeLeft(45);
    setCrackedCount(0);
    crackedCountRef.current = 0;
    setCleanedCount(0);
    setSprayingTile(null);
    sprayingTileRef.current = null;
    setParticles([]);
    setGameOver(false);
    gameOverRef.current = false;
    setSuccess(false);
    gaugeStartTimeRef.current = Date.now();
    setGameState('playing');
  }, [initTiles]);

  // Gauge animation — driven by CSS, ref updated for gameplay logic only
  const gaugeIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameState !== 'playing') return;

    // Update ref for spray zone checks (no setState = no re-renders)
    const updateRef = () => {
      if (gameOverRef.current) return;
      const elapsed = (Date.now() - gaugeStartTimeRef.current) / 1000;
      gaugeRef.current = 50 + 50 * Math.sin(elapsed * Math.PI);
      animFrameRef.current = requestAnimationFrame(updateRef);
    };
    animFrameRef.current = requestAnimationFrame(updateRef);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          gameOverRef.current = true;
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Spray logic interval
  useEffect(() => {
    if (gameState !== 'playing') return;

    const sprayInterval = setInterval(() => {
      if (gameOverRef.current) return;
      const tileIdx = sprayingTileRef.current;
      if (tileIdx === null) return;

      const now = Date.now();
      if (now - lastSprayTimeRef.current < 200) return;
      lastSprayTimeRef.current = now;

      const currentTiles = tilesRef.current;
      const tile = currentTiles[tileIdx];
      if (!tile || tile.cracked || tile.dirt < 10) return;

      const zone = getGaugeZone(gaugeRef.current);

      if (zone === 'red') {
        // Crack the tile
        const updated = currentTiles.map((t, i) =>
          i === tileIdx ? { ...t, cracked: true } : t
        );
        tilesRef.current = updated;
        setTiles([...updated]);
        const newCracked = crackedCountRef.current + 1;
        crackedCountRef.current = newCracked;
        setCrackedCount(newCracked);
        setSprayingTile(null);
        sprayingTileRef.current = null;

        if (newCracked >= 3) {
          gameOverRef.current = true;
          setGameOver(true);
        }
      } else {
        // Clean the tile
        const cleanAmount = zone === 'green' ? 15 : 5;
        const newDirt = Math.max(0, tile.dirt - cleanAmount);
        const updated = currentTiles.map((t, i) =>
          i === tileIdx ? { ...t, dirt: newDirt } : t
        );
        tilesRef.current = updated;
        setTiles([...updated]);

        // Spawn particles
        if (gridRef.current) {
          const tileElements = gridRef.current.querySelectorAll('[data-tile]');
          const tileEl = tileElements[tileIdx];
          if (tileEl) {
            const rect = tileEl.getBoundingClientRect();
            const gridRect = gridRef.current.getBoundingClientRect();
            const cx = rect.left - gridRect.left + rect.width / 2;
            const cy = rect.top - gridRect.top + rect.height / 2;
            const newParticles: Particle[] = [];
            for (let p = 0; p < 3; p++) {
              newParticles.push({
                id: particleIdRef.current++,
                x: cx + (Math.random() - 0.5) * 20,
                y: cy + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3 - 1,
                life: 1,
                maxLife: 0.6 + Math.random() * 0.4,
              });
            }
            setParticles((prev) => [...prev.slice(-20), ...newParticles]);
          }
        }
      }
    }, 50);

    return () => clearInterval(sprayInterval);
  }, [gameState, getGaugeZone]);

  // Particle decay
  useEffect(() => {
    if (gameState !== 'playing') return;
    const particleInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 0.05,
          }))
          .filter((p) => p.life > 0)
      );
    }, 30);
    return () => clearInterval(particleInterval);
  }, [gameState]);

  // Count cleaned tiles
  useEffect(() => {
    const cleaned = tiles.filter((t) => t.dirt < 10 && !t.cracked).length;
    setCleanedCount(cleaned);
  }, [tiles]);

  // Handle game over / success transitions
  useEffect(() => {
    if (!gameOver || gameState !== 'playing') return;

    const cleaned = tilesRef.current.filter((t) => t.dirt < 10 && !t.cracked).length;
    const isSuccess = cleaned >= 29 && crackedCountRef.current < 3;
    setSuccess(isSuccess);

    const timeout = setTimeout(() => {
      setGameState('results');
    }, 800);

    return () => clearTimeout(timeout);
  }, [gameOver, gameState]);

  const handlePointerDown = useCallback(
    (tileIdx: number) => {
      if (gameOverRef.current) return;
      const tile = tilesRef.current[tileIdx];
      if (!tile || tile.cracked || tile.dirt < 10) return;
      sprayingTileRef.current = tileIdx;
      setSprayingTile(tileIdx);
      lastSprayTimeRef.current = 0; // Allow immediate first spray
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    sprayingTileRef.current = null;
    setSprayingTile(null);
  }, []);

  const handlePointerEnter = useCallback(
    (tileIdx: number) => {
      // Only track if pointer is already down (dragging)
      if (sprayingTileRef.current === null) return;
      const tile = tilesRef.current[tileIdx];
      if (!tile || tile.cracked || tile.dirt < 10) return;
      sprayingTileRef.current = tileIdx;
      setSprayingTile(tileIdx);
      lastSprayTimeRef.current = 0;
    },
    []
  );

  const getDirtColor = (dirt: number): string => {
    if (dirt < 10) return 'bg-gray-200';
    if (dirt < 30) return 'bg-amber-200';
    if (dirt < 60) return 'bg-amber-400';
    if (dirt < 80) return 'bg-amber-600';
    return 'bg-amber-800';
  };

  const getResultData = useCallback(() => {
    if (success) {
      const timeBonus = timeLeft * 2;
      const cleanBonus = cleanedCount * 3;
      const coins = 50 + timeBonus + cleanBonus;
      let stars = 1;
      if (cleanedCount >= 34) stars = 3;
      else if (cleanedCount >= 31) stars = 2;
      return { success: true, coins, stars };
    }
    return { success: false, coins: 5, stars: 0 };
  }, [success, timeLeft, cleanedCount]);

  // --- MENU SCREEN ---
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-gray-600 flex flex-col items-center justify-center p-4">
        <style>{`
          @keyframes drip {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.6; }
          }
          .drip-anim { animation: drip 2s ease-in-out infinite; }
        `}</style>
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="text-6xl mb-4 drip-anim">&#x1F4A6;</div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">Schoon Spuiten</h1>
          <p className="text-gray-500 text-sm mb-6">Hogedrukreiniger Mini-Game</p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left text-sm text-gray-700 space-y-2">
            <p>
              <span className="font-bold text-blue-600">Doel:</span> Maak minstens 29 van de 36 tegels schoon binnen 45 seconden.
            </p>
            <p>
              <span className="font-bold text-green-600">Druk:</span> Houd ingedrukt op een tegel om te sproeien. Let op de drukmeter rechts!
            </p>
            <p>
              <span className="font-bold text-green-500">Groene zone</span> = snel schoonmaken
            </p>
            <p>
              <span className="font-bold text-yellow-500">Gele zone</span> = langzaam schoonmaken
            </p>
            <p>
              <span className="font-bold text-red-500">Rode zone</span> = KRAK! Tegel barst. 3 gebarsten tegels = game over!
            </p>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors shadow-lg"
          >
            Start
          </button>
          <button
            onClick={onExit}
            className="mt-3 w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors"
          >
            Terug
          </button>
        </div>
      </div>
    );
  }

  // --- RESULTS SCREEN ---
  if (gameState === 'results') {
    const result = getResultData();
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-gray-600 flex flex-col items-center justify-center p-4">
        <style>{`
          @keyframes pop-in {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          .pop-in { animation: pop-in 0.5s ease-out forwards; }
          @keyframes star-pop {
            0% { transform: scale(0) rotate(-30deg); opacity: 0; }
            70% { transform: scale(1.3) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .star-pop-1 { animation: star-pop 0.4s ease-out 0.2s forwards; opacity: 0; }
          .star-pop-2 { animation: star-pop 0.4s ease-out 0.4s forwards; opacity: 0; }
          .star-pop-3 { animation: star-pop 0.4s ease-out 0.6s forwards; opacity: 0; }
        `}</style>
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl pop-in">
          <div className="text-5xl mb-3">{result.success ? '\u2728' : '\uD83D\uDCA5'}</div>
          <h2 className="text-2xl font-extrabold mb-1 text-gray-800">
            {result.success ? 'Netjes schoon!' : 'Helaas!'}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {result.success
              ? `Je hebt ${cleanedCount} tegels schoongemaakt!`
              : crackedCount >= 3
              ? 'Te veel tegels gebarsten!'
              : 'Niet genoeg tegels schoongemaakt op tijd.'}
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-4xl ${
                  s <= result.stars ? `star-pop-${s}` : 'opacity-20'
                }`}
              >
                &#x2B50;
              </span>
            ))}
          </div>

          <div className="bg-yellow-50 rounded-xl py-3 px-4 mb-6 inline-flex items-center gap-2">
            <span className="text-2xl">&#x1FA99;</span>
            <span className="text-xl font-bold text-yellow-700">+{result.coins}</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onComplete(result)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors shadow-lg"
            >
              Verder
            </button>
            <button
              onClick={startGame}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-xl transition-colors"
            >
              Opnieuw
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PLAYING SCREEN ---
  const zone = getGaugeZone(gaugeRef.current);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-gray-600 flex flex-col items-center select-none"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <style>{`
        @keyframes spray-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .spray-active { animation: spray-pulse 0.3s ease-in-out infinite; }
        @keyframes crack-appear {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .crack-appear { animation: crack-appear 0.3s ease-out forwards; }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        @keyframes gauge-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 12px rgba(255,255,255,0.6); }
        }
        .gauge-glow { animation: gauge-glow 1s ease-in-out infinite; }
        @keyframes gauge-bounce {
          0% { top: 100%; }
          50% { top: 0%; }
          100% { top: 100%; }
        }
        .gauge-indicator { animation: gauge-bounce 2s ease-in-out infinite; transform: translateY(-50%); }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .shake { animation: shake 0.15s ease-in-out 3; }
        .tile-btn {
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>

      {/* HUD */}
      <div className="w-full max-w-md px-4 pt-3 pb-2">
        <div className="flex justify-between items-center bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-white text-sm font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">&#x23F1;&#xFE0F;</span>
            <span className={`text-lg tabular-nums ${timeLeft <= 10 ? 'text-red-300' : ''}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">&#x2728;</span>
            <span className="text-lg tabular-nums">{cleanedCount}/29</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">&#x1F4A5;</span>
            <span className={`text-lg tabular-nums ${crackedCount >= 2 ? 'text-red-300' : ''}`}>
              {crackedCount}/3
            </span>
          </div>
        </div>
      </div>

      {/* Main area: Grid + Gauge */}
      <div className="flex-1 flex items-center justify-center gap-3 px-4 w-full max-w-md">
        {/* Grid */}
        <div className="relative" ref={gridRef}>
          <div
            className="grid grid-cols-6 gap-1 p-2 bg-gray-800/30 rounded-xl"
            style={{ touchAction: 'none' }}
          >
            {tiles.map((tile, idx) => (
              <button
                key={tile.id}
                data-tile={idx}
                className={`tile-btn relative rounded-md transition-colors duration-150 ${
                  tile.cracked
                    ? 'bg-gray-400 cursor-not-allowed'
                    : getDirtColor(tile.dirt)
                } ${sprayingTile === idx && !tile.cracked ? 'ring-2 ring-blue-300 ring-offset-1' : ''}`}
                style={{
                  width: 'clamp(40px, 12vw, 56px)',
                  height: 'clamp(40px, 12vw, 56px)',
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handlePointerDown(idx);
                }}
                onPointerEnter={() => handlePointerEnter(idx)}
              >
                {/* Dirt speckle texture */}
                {!tile.cracked && tile.dirt >= 10 && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(0,0,0,${tile.dirt * 0.002}) 1px, transparent 2px),
                                   radial-gradient(circle at 70% 60%, rgba(0,0,0,${tile.dirt * 0.002}) 1px, transparent 2px),
                                   radial-gradient(circle at 50% 80%, rgba(0,0,0,${tile.dirt * 0.002}) 1px, transparent 2px),
                                   radial-gradient(circle at 20% 70%, rgba(0,0,0,${tile.dirt * 0.0015}) 1px, transparent 2px),
                                   radial-gradient(circle at 80% 20%, rgba(0,0,0,${tile.dirt * 0.0015}) 1px, transparent 2px)`,
                    }}
                  />
                )}

                {/* Clean sparkle */}
                {!tile.cracked && tile.dirt < 10 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none sparkle">
                    <span className="text-xs">&#x2728;</span>
                  </div>
                )}

                {/* Crack overlay */}
                {tile.cracked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none crack-appear">
                    <svg
                      viewBox="0 0 40 40"
                      className="w-full h-full"
                      style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))' }}
                    >
                      <path
                        d="M10 5 L18 15 L12 18 L22 28 L16 30 L25 38"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 15 L28 12 L24 22"
                        stroke="#dc2626"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Spray effect */}
                {sprayingTile === idx && !tile.cracked && tile.dirt >= 10 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none spray-active">
                    <span className="text-lg">&#x1F4A6;</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: `rgba(147, 197, 253, ${p.life})`,
                transform: `scale(${p.life})`,
                transition: 'none',
              }}
            />
          ))}
        </div>

        {/* Pressure Gauge */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-white/70 font-bold">DRUK</span>
          <div
            className="relative w-8 rounded-full overflow-hidden gauge-glow"
            style={{ height: 'clamp(200px, 50vh, 320px)' }}
          >
            {/* Background zones */}
            <div className="absolute inset-0 flex flex-col">
              {/* Top red (0-10% of value range = top 10% visually) */}
              <div className="bg-red-500/80" style={{ flex: '10 0 0' }} />
              {/* Top yellow */}
              <div className="bg-yellow-400/80" style={{ flex: '20 0 0' }} />
              {/* Green */}
              <div className="bg-green-500/80" style={{ flex: '40 0 0' }} />
              {/* Bottom yellow */}
              <div className="bg-yellow-400/80" style={{ flex: '20 0 0' }} />
              {/* Bottom red */}
              <div className="bg-red-500/80" style={{ flex: '10 0 0' }} />
            </div>

            {/* Zone labels */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-2 pointer-events-none">
              <span className="text-[8px] font-bold text-red-900/60">MAX</span>
              <span className="text-[8px] font-bold text-green-900/60">OK</span>
              <span className="text-[8px] font-bold text-red-900/60">MIN</span>
            </div>

            {/* Gauge indicator — pure CSS animation, no React re-renders */}
            <div
              ref={gaugeIndicatorRef}
              className="gauge-indicator absolute left-0 right-0 h-2 bg-white"
              style={{
                boxShadow: '0 0 10px rgba(255,255,255,0.8)',
              }}
            >
              {/* Arrow left */}
              <div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderLeft: '6px solid white',
                }}
              />
              {/* Arrow right */}
              <div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderRight: '6px solid white',
                }}
              />
            </div>
          </div>
          <span
            className={`text-xs font-bold mt-1 ${
              zone === 'red'
                ? 'text-red-300'
                : zone === 'yellow'
                ? 'text-yellow-300'
                : 'text-green-300'
            }`}
          >
            {zone === 'red' ? 'GEVAAR!' : zone === 'yellow' ? 'Voorzichtig' : 'Goed!'}
          </span>
        </div>
      </div>

      {/* Bottom instruction */}
      <div className="pb-4 pt-2 px-4 text-center">
        <p className="text-white/70 text-sm font-medium">
          {sprayingTile !== null
            ? zone === 'red'
              ? '\u26A0\uFE0F Pas op! Te veel druk!'
              : '\uD83D\uDCA6 Bezig met sproeien...'
            : 'Houd ingedrukt om te sproeien'}
        </p>
      </div>

      {/* Game over overlay */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`text-4xl font-extrabold text-white ${crackedCount >= 3 ? 'shake' : ''}`}>
            {crackedCount >= 3 ? '\uD83D\uDCA5 KRAK!' : cleanedCount >= 29 ? '\u2728 Klaar!' : '\u23F0 Tijd op!'}
          </div>
        </div>
      )}
    </div>
  );
}
