'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface LeafGameProps {
  onComplete: (result: { success: boolean; coins: number; stars: number }) => void;
  onExit: () => void;
}

type GameState = 'menu' | 'playing' | 'results';

interface WindDirection {
  angle: number;
  label: string;
  dx: number;
  dy: number;
}

const WIND_DIRECTIONS: WindDirection[] = [
  { angle: 0, label: '\u2192', dx: 1, dy: 0 },
  { angle: 45, label: '\u2198', dx: 0.7, dy: 0.7 },
  { angle: 90, label: '\u2193', dx: 0, dy: 1 },
  { angle: 135, label: '\u2199', dx: -0.7, dy: 0.7 },
  { angle: 180, label: '\u2190', dx: -1, dy: 0 },
  { angle: 225, label: '\u2196', dx: -0.7, dy: -0.7 },
  { angle: 270, label: '\u2191', dx: 0, dy: -1 },
  { angle: 315, label: '\u2197', dx: 0.7, dy: -0.7 },
];

interface LeafEntity {
  id: number;
  x: number;
  y: number;
  emoji: string;
  isHeavy: boolean;
  tapsNeeded: number;
  tapsReceived: number;
  collected: boolean;
  animating: boolean;
  driftOffsetX: number;
  driftOffsetY: number;
  driftSpeed: number;
  driftPhase: number;
  rotation: number;
}

interface ButterflyEntity {
  id: number;
  x: number;
  y: number;
  tapped: boolean;
  flyingAway: boolean;
  driftOffsetX: number;
  driftOffsetY: number;
  driftSpeed: number;
  driftPhase: number;
}

const LEAF_EMOJIS_NORMAL = ['\uD83C\uDF43', '\uD83C\uDF41'];
const LEAF_EMOJI_HEAVY = '\uD83C\uDF42';
const BUTTERFLY_EMOJI = '\uD83E\uDD8B';

const PILE_ZONE = { x: 75, y: 80, width: 22, height: 16 };
const TOTAL_LEAVES = 25;
const TOTAL_BUTTERFLIES = 5;
const MAX_LIVES = 3;
const GAME_DURATION = 40;
const GOAL_LEAVES = 20;
const WIND_CHANGE_INTERVAL = 8000;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateLeaves(): LeafEntity[] {
  const leaves: LeafEntity[] = [];
  const heavyCount = 7;

  for (let i = 0; i < TOTAL_LEAVES; i++) {
    const isHeavy = i < heavyCount;
    leaves.push({
      id: i,
      x: randomBetween(5, 85),
      y: randomBetween(8, 70),
      emoji: isHeavy ? LEAF_EMOJI_HEAVY : LEAF_EMOJIS_NORMAL[Math.floor(Math.random() * LEAF_EMOJIS_NORMAL.length)],
      isHeavy,
      tapsNeeded: isHeavy ? 3 : Math.random() < 0.5 ? 1 : 2,
      tapsReceived: 0,
      collected: false,
      animating: false,
      driftOffsetX: 0,
      driftOffsetY: 0,
      driftSpeed: randomBetween(0.3, 0.8),
      driftPhase: randomBetween(0, Math.PI * 2),
      rotation: randomBetween(-30, 30),
    });
  }
  return leaves;
}

function generateButterflies(): ButterflyEntity[] {
  const butterflies: ButterflyEntity[] = [];
  for (let i = 0; i < TOTAL_BUTTERFLIES; i++) {
    butterflies.push({
      id: i + 100,
      x: randomBetween(10, 80),
      y: randomBetween(10, 65),
      tapped: false,
      flyingAway: false,
      driftOffsetX: 0,
      driftOffsetY: 0,
      driftSpeed: randomBetween(0.5, 1.2),
      driftPhase: randomBetween(0, Math.PI * 2),
    });
  }
  return butterflies;
}

export default function LeafGame({ onComplete, onExit }: LeafGameProps) {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [leaves, setLeaves] = useState<LeafEntity[]>([]);
  const [butterflies, setButterflies] = useState<ButterflyEntity[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [collected, setCollected] = useState(0);
  const [wind, setWind] = useState<WindDirection>(WIND_DIRECTIONS[0]);
  const [oepsText, setOepsText] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
  const [pileCount, setPileCount] = useState(0);
  const [gameOverReason, setGameOverReason] = useState<'time' | 'lives' | null>(null);

  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const windTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameActiveRef = useRef(false);
  const timeRef = useRef(Date.now());

  const startGame = useCallback(() => {
    setLeaves(generateLeaves());
    setButterflies(generateButterflies());
    setLives(MAX_LIVES);
    setTimeLeft(GAME_DURATION);
    setCollected(0);
    setPileCount(0);
    setGameOverReason(null);
    setWind(WIND_DIRECTIONS[Math.floor(Math.random() * WIND_DIRECTIONS.length)]);
    setGameState('playing');
    gameActiveRef.current = true;
    timeRef.current = Date.now();
  }, []);

  const endGame = useCallback((reason: 'time' | 'lives') => {
    gameActiveRef.current = false;
    setGameOverReason(reason);
    setGameState('results');
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame('time');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, endGame]);

  // Wind change
  useEffect(() => {
    if (gameState !== 'playing') return;

    windTimerRef.current = setInterval(() => {
      setWind(WIND_DIRECTIONS[Math.floor(Math.random() * WIND_DIRECTIONS.length)]);
    }, WIND_CHANGE_INTERVAL);

    return () => {
      if (windTimerRef.current) clearInterval(windTimerRef.current);
    };
  }, [gameState]);

  // Drift animation loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setLeaves((prev) =>
        prev.map((leaf) => {
          if (leaf.collected || leaf.animating) return leaf;
          const phase = leaf.driftPhase + dt * leaf.driftSpeed;
          return {
            ...leaf,
            driftPhase: phase,
            driftOffsetX: Math.sin(phase) * 1.5,
            driftOffsetY: Math.cos(phase * 0.7) * 1,
            rotation: leaf.rotation + Math.sin(phase) * 0.5,
          };
        })
      );

      setButterflies((prev) =>
        prev.map((b) => {
          if (b.tapped) return b;
          const phase = b.driftPhase + dt * b.driftSpeed;
          return {
            ...b,
            driftPhase: phase,
            driftOffsetX: Math.sin(phase * 1.3) * 3,
            driftOffsetY: Math.cos(phase) * 2,
          };
        })
      );

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState]);

  // Check lives for game over
  useEffect(() => {
    if (gameState === 'playing' && lives <= 0) {
      endGame('lives');
    }
  }, [lives, gameState, endGame]);

  const handleLeafTap = useCallback(
    (leafId: number) => {
      if (gameState !== 'playing') return;

      setLeaves((prev) =>
        prev.map((leaf) => {
          if (leaf.id !== leafId || leaf.collected || leaf.animating) return leaf;

          const newTaps = leaf.tapsReceived + 1;

          if (newTaps >= leaf.tapsNeeded) {
            // Move to pile - start animation
            setTimeout(() => {
              setLeaves((curr) =>
                curr.map((l) =>
                  l.id === leafId ? { ...l, collected: true, animating: false } : l
                )
              );
              setCollected((c) => c + 1);
              setPileCount((p) => p + 1);
            }, 500);

            return {
              ...leaf,
              tapsReceived: newTaps,
              animating: true,
              x: PILE_ZONE.x + randomBetween(2, PILE_ZONE.width - 4),
              y: PILE_ZONE.y + randomBetween(2, PILE_ZONE.height - 4),
            };
          } else {
            // Move toward pile with wind offset
            const pileTargetX = PILE_ZONE.x + PILE_ZONE.width / 2;
            const pileTargetY = PILE_ZONE.y + PILE_ZONE.height / 2;
            const dx = pileTargetX - leaf.x;
            const dy = pileTargetY - leaf.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const movePercent = 80 / Math.max(dist, 1);
            const moveX = dx * movePercent * 0.3 + wind.dx * 3;
            const moveY = dy * movePercent * 0.3 + wind.dy * 3;

            return {
              ...leaf,
              tapsReceived: newTaps,
              x: Math.max(2, Math.min(92, leaf.x + moveX)),
              y: Math.max(2, Math.min(85, leaf.y + moveY)),
              rotation: leaf.rotation + (Math.random() > 0.5 ? 25 : -25),
            };
          }
        })
      );
    },
    [gameState, wind]
  );

  const handleButterflyTap = useCallback(
    (butterflyId: number) => {
      if (gameState !== 'playing') return;

      setButterflies((prev) => {
        const butterfly = prev.find((b) => b.id === butterflyId);
        if (!butterfly || butterfly.tapped) return prev;

        setOepsText({ x: butterfly.x, y: butterfly.y, visible: true });
        setTimeout(() => setOepsText((o) => ({ ...o, visible: false })), 800);

        setLives((l) => l - 1);

        return prev.map((b) =>
          b.id === butterflyId ? { ...b, tapped: true, flyingAway: true } : b
        );
      });
    },
    [gameState]
  );

  const success = collected >= GOAL_LEAVES;
  const coins = success ? Math.min(collected * 3, 75) : Math.floor(collected * 1.5);
  const stars = collected >= GOAL_LEAVES + 4 ? 3 : collected >= GOAL_LEAVES ? 2 : collected >= 15 ? 1 : 0;

  // -- MENU SCREEN --
  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-600 via-orange-500 to-amber-800 p-4 text-white">
        <style>{gameStyles}</style>
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4 leaf-fall-anim">{'\uD83C\uDF42'}</div>
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Blaas ze Weg!</h1>
          <p className="text-lg opacity-90 mb-6">Tik op bladeren om ze naar de bladhoop te blazen</p>

          <div className="bg-black/30 rounded-2xl p-5 mb-6 text-left space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-xl">{'\uD83C\uDF43'}</span>
              <span>Tik op bladeren om ze richting de hoop te blazen. Sommige bladeren zijn zwaar en hebben meerdere tikken nodig!</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">{'\uD83E\uDD8B'}</span>
              <span className="text-red-200 font-semibold">Pas op voor vlinders! Tik je er een aan? Dan verlies je een leven. Drie levens kwijt = game over!</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">{'\uD83C\uDF2C\uFE0F'}</span>
              <span>De wind verandert om de paar seconden van richting en beinvloedt waar bladeren naartoe waaien.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">{'\uD83C\uDFAF'}</span>
              <span>Verzamel minstens {GOAL_LEAVES} van de {TOTAL_LEAVES} bladeren in {GAME_DURATION} seconden!</span>
            </p>
          </div>

          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-150"
          >
            Start!
          </button>

          <button
            onClick={onExit}
            className="block mx-auto mt-4 text-white/70 hover:text-white underline text-sm transition-colors"
          >
            Terug naar overzicht
          </button>
        </div>
      </div>
    );
  }

  // -- RESULTS SCREEN --
  if (gameState === 'results') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-600 via-orange-500 to-amber-800 p-4 text-white">
        <style>{gameStyles}</style>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-3">{success ? '\uD83C\uDF89' : '\uD83C\uDF42'}</div>
          <h2 className="text-3xl font-extrabold mb-2">
            {success ? 'Goed gedaan!' : 'Helaas!'}
          </h2>
          <p className="text-lg opacity-90 mb-4">
            {gameOverReason === 'lives'
              ? 'Je hebt te veel vlinders aangetikt!'
              : success
              ? 'Je hebt de tuin schoongeblazen!'
              : 'De tijd is op! Probeer het nog eens.'}
          </p>

          <div className="bg-black/30 rounded-2xl p-5 mb-6 space-y-2 text-lg">
            <p>
              {'\uD83C\uDF43'} Bladeren: <span className="font-bold">{collected}/{TOTAL_LEAVES}</span>
            </p>
            <p>
              {'\uD83D\uDCB0'} Munten: <span className="font-bold text-yellow-300">{coins}</span>
            </p>
            <p>
              {collected >= GOAL_LEAVES + 4
                ? '\u2B50\u2B50\u2B50'
                : collected >= GOAL_LEAVES
                ? '\u2B50\u2B50'
                : collected >= 15
                ? '\u2B50'
                : '\u2606'}{' '}
              Sterren: <span className="font-bold">{stars}/3</span>
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-150"
            >
              Opnieuw
            </button>
            <button
              onClick={() => onComplete({ success, coins, stars })}
              className="bg-white/20 hover:bg-white/30 active:scale-95 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-150"
            >
              Klaar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -- PLAYING SCREEN --
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-600 via-orange-500 to-amber-800 select-none overflow-hidden">
      <style>{gameStyles}</style>

      {/* HUD */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/30 text-white text-sm font-bold z-10">
        <div className="flex items-center gap-1">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`text-lg transition-all duration-300 ${i < lives ? '' : 'opacity-20 grayscale'}`}>
              {'\u2764\uFE0F'}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
          <span className="text-base">{'\u23F1\uFE0F'}</span>
          <span className={`text-lg tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : ''}`}>
            {timeLeft}s
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-base">{'\uD83C\uDF43'}</span>
          <span className="text-lg">
            {collected}/{TOTAL_LEAVES}
          </span>
        </div>
      </div>

      {/* Wind indicator */}
      <div className="absolute top-14 left-3 bg-black/40 text-white px-2 py-1 rounded-lg text-xs font-bold z-10 flex items-center gap-1">
        <span>{'\uD83C\uDF2C\uFE0F'}</span>
        <span className="text-lg">{wind.label}</span>
      </div>

      {/* Play area */}
      <div className="relative flex-1 mx-1 mb-1 overflow-hidden">
        {/* Pile zone */}
        <div
          className="absolute border-2 border-dashed border-amber-300/60 rounded-xl bg-amber-900/30 flex flex-col items-center justify-center z-0"
          style={{
            left: `${PILE_ZONE.x}%`,
            top: `${PILE_ZONE.y}%`,
            width: `${PILE_ZONE.width}%`,
            height: `${PILE_ZONE.height}%`,
          }}
        >
          <span className="text-2xl">{'\uD83D\uDCE5'}</span>
          <span className="text-[10px] text-amber-200 font-bold">Bladhoop</span>
          {pileCount > 0 && (
            <span className="text-[10px] text-amber-100 font-bold mt-[-2px]">
              {pileCount}x {'\uD83C\uDF42'}
            </span>
          )}
        </div>

        {/* OEPS text */}
        {oepsText.visible && (
          <div
            className="absolute z-50 pointer-events-none oeps-anim"
            style={{ left: `${oepsText.x}%`, top: `${oepsText.y}%` }}
          >
            <span className="text-red-500 font-extrabold text-2xl drop-shadow-lg">OEPS!</span>
          </div>
        )}

        {/* Leaves */}
        {leaves.map((leaf) => {
          if (leaf.collected) return null;

          const displayX = leaf.x + leaf.driftOffsetX;
          const displayY = leaf.y + leaf.driftOffsetY;

          return (
            <button
              key={leaf.id}
              onClick={() => handleLeafTap(leaf.id)}
              className={`absolute z-10 cursor-pointer transition-all select-none focus:outline-none
                ${leaf.animating ? 'leaf-swoosh-anim' : 'leaf-idle-anim'}
                ${leaf.isHeavy ? 'drop-shadow-[0_2px_3px_rgba(80,40,0,0.6)]' : ''}`}
              style={{
                left: `${displayX}%`,
                top: `${displayY}%`,
                fontSize: leaf.isHeavy ? '32px' : '28px',
                transform: `rotate(${leaf.rotation}deg)`,
                transition: leaf.animating ? 'left 0.5s cubic-bezier(.17,.67,.35,1.2), top 0.5s cubic-bezier(.17,.67,.35,1.2)' : 'left 0.3s ease, top 0.3s ease',
              }}
              aria-label={`Blad ${leaf.isHeavy ? '(zwaar)' : ''}`}
            >
              {leaf.emoji}
              {leaf.isHeavy && leaf.tapsReceived > 0 && !leaf.animating && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-[1px]">
                  {Array.from({ length: leaf.tapsNeeded }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[5px] h-[5px] rounded-full ${
                        i < leaf.tapsReceived ? 'bg-green-400' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* Butterflies */}
        {butterflies.map((b) => {
          if (b.tapped && !b.flyingAway) return null;

          const displayX = b.x + b.driftOffsetX;
          const displayY = b.y + b.driftOffsetY;

          return (
            <button
              key={b.id}
              onClick={() => handleButterflyTap(b.id)}
              className={`absolute z-20 cursor-pointer select-none focus:outline-none
                ${b.flyingAway ? 'butterfly-flyaway-anim' : 'butterfly-flutter-anim'}`}
              style={{
                left: `${displayX}%`,
                top: `${displayY}%`,
                fontSize: '24px',
                transition: 'left 0.3s ease, top 0.3s ease',
              }}
              disabled={b.tapped}
              aria-label="Vlinder - niet aantikken!"
            >
              {BUTTERFLY_EMOJI}
            </button>
          );
        })}

        {/* Goal progress bar (bottom) */}
        <div className="absolute bottom-1 left-2 right-2 z-30">
          <div className="bg-black/30 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((collected / GOAL_LEAVES) * 100, 100)}%`,
                background: collected >= GOAL_LEAVES
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, #f59e0b, #d97706)',
              }}
            />
          </div>
          <div className="text-center text-[10px] text-white/80 font-bold mt-[1px]">
            Doel: {GOAL_LEAVES} bladeren
          </div>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="absolute top-14 right-3 bg-black/40 hover:bg-black/60 text-white/80 text-xs px-2 py-1 rounded-lg z-20 transition-colors"
      >
        Stoppen
      </button>
    </div>
  );
}

const gameStyles = `
  @keyframes leafFall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(10px) rotate(15deg); opacity: 1; }
  }

  @keyframes leafIdle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }

  @keyframes leafSwoosh {
    0% { transform: scale(1) rotate(0deg); opacity: 1; }
    30% { transform: scale(1.3) rotate(-20deg) translateY(-15px); opacity: 1; }
    70% { transform: scale(0.9) rotate(15deg); opacity: 0.8; }
    100% { transform: scale(0.6) rotate(30deg); opacity: 0.4; }
  }

  @keyframes butterflyFlutter {
    0%, 100% { transform: scaleX(1) translateY(0px); }
    25% { transform: scaleX(0.7) translateY(-3px); }
    50% { transform: scaleX(1) translateY(-5px); }
    75% { transform: scaleX(0.7) translateY(-2px); }
  }

  @keyframes butterflyFlyaway {
    0% { transform: scale(1) translateY(0); opacity: 1; }
    20% { transform: scale(1.3) translateY(5px); opacity: 1; filter: brightness(0.5) sepia(1) hue-rotate(-30deg); }
    100% { transform: scale(0.3) translateY(-200px) translateX(50px) rotate(40deg); opacity: 0; }
  }

  @keyframes oepsFloat {
    0% { transform: scale(0.5) translateY(0); opacity: 0; }
    20% { transform: scale(1.3) translateY(-5px); opacity: 1; }
    60% { transform: scale(1) translateY(-20px); opacity: 1; }
    100% { transform: scale(0.8) translateY(-40px); opacity: 0; }
  }

  .leaf-fall-anim {
    animation: leafFall 1.5s ease-out forwards;
  }

  .leaf-idle-anim {
    animation: leafIdle 2s ease-in-out infinite;
  }

  .leaf-swoosh-anim {
    animation: leafSwoosh 0.5s ease-out forwards;
  }

  .butterfly-flutter-anim {
    animation: butterflyFlutter 0.6s ease-in-out infinite;
  }

  .butterfly-flyaway-anim {
    animation: butterflyFlyaway 0.8s ease-out forwards;
    pointer-events: none;
  }

  .oeps-anim {
    animation: oepsFloat 0.8s ease-out forwards;
  }
`;
