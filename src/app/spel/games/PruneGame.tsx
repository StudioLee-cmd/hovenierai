'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PruneGameProps {
  onComplete: (result: { success: boolean; coins: number; stars: number }) => void;
  onExit: () => void;
}

type GameScreen = 'menu' | 'playing' | 'results';

type CutResult = 'perfect' | 'goed' | 'fout' | 'missed';

interface HedgeResult {
  hedgeIndex: number;
  targetPct: number;
  cutPct: number | null;
  result: CutResult;
  coins: number;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const TOTAL_HEDGES = 8;
const GAME_TIME = 30;
const PERFECT_THRESHOLD = 0.10;
const GOOD_THRESHOLD = 0.20;
const PERFECT_COINS = 15;
const GOOD_COINS = 5;
const MIN_CORRECT = 5;
const FLASH_DURATION = 800;

/** Growth duration per hedge: hedge 0 = 3 s, hedge 7 = 1.2 s (linear ramp) */
function getGrowthDuration(idx: number): number {
  return 3.0 + (1.2 - 3.0) * (idx / (TOTAL_HEDGES - 1));
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function PruneGame({ onComplete, onExit }: PruneGameProps) {
  /* ── screen ─────────────────────────────────────────────────────────────── */
  const [screen, setScreen] = useState<GameScreen>('menu');

  /* ── reactive state (drives UI) ─────────────────────────────────────────── */
  const [currentHedge, setCurrentHedge] = useState(0);
  const [targetPct, setTargetPct] = useState(0.6);
  const [growthPct, setGrowthPct] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [totalCoins, setTotalCoins] = useState(0);
  const [results, setResults] = useState<HedgeResult[]>([]);
  const [flashType, setFlashType] = useState<CutResult | null>(null);
  const [flashText, setFlashText] = useState('');
  const [isCutting, setIsCutting] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  /* ── imperative refs (used inside rAF / timers) ─────────────────────────── */
  const growthStartRef = useRef(0);
  const growthDurRef = useRef(3);
  const animRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTORef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetRef = useRef(0.6);
  const hedgeRef = useRef(0);
  const overRef = useRef(false);
  const cuttingRef = useRef(false);
  const resRef = useRef<HedgeResult[]>([]);
  const coinsRef = useRef(0);
  const pctRef = useRef(0);
  const screenRef = useRef<GameScreen>('menu');

  // Keep screenRef in sync
  useEffect(() => { screenRef.current = screen; }, [screen]);

  /* ── function refs to break circular deps ───────────────────────────────── */
  const startHedgeFnRef = useRef<(idx: number) => void>(() => {});
  const handleCutResultFnRef = useRef<(idx: number, cutPct: number | null) => void>(() => {});

  /* ── stop all async work ────────────────────────────────────────────────── */
  const stopAll = useCallback(() => {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = 0; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (flashTORef.current) { clearTimeout(flashTORef.current); flashTORef.current = null; }
  }, []);

  /* ── end game ───────────────────────────────────────────────────────────── */
  const endGame = useCallback((hedgeResults: HedgeResult[], coins: number) => {
    overRef.current = true;
    setGameOver(true);
    stopAll();
    setResults(hedgeResults);
    setTotalCoins(coins);
    setScreen('results');
  }, [stopAll]);

  /* ── wire up startHedge via ref ─────────────────────────────────────────── */
  useEffect(() => {
    startHedgeFnRef.current = (hedgeIdx: number) => {
      if (overRef.current) return;

      const target = 0.4 + Math.random() * 0.4;
      targetRef.current = target;
      hedgeRef.current = hedgeIdx;
      cuttingRef.current = false;
      pctRef.current = 0;

      setCurrentHedge(hedgeIdx);
      setTargetPct(target);
      setGrowthPct(0);
      setIsCutting(false);
      setFlashType(null);
      setFlashText('');

      const dur = getGrowthDuration(hedgeIdx);
      growthDurRef.current = dur;
      growthStartRef.current = performance.now();

      const animate = (now: number) => {
        if (overRef.current) return;
        const elapsed = (now - growthStartRef.current) / 1000;
        const p = Math.min(elapsed / growthDurRef.current, 1);
        pctRef.current = p;
        setGrowthPct(p);

        if (p >= 1 && !cuttingRef.current) {
          cuttingRef.current = true;
          setIsCutting(true);
          handleCutResultFnRef.current(hedgeIdx, null);
          return;
        }
        if (!cuttingRef.current) {
          animRef.current = requestAnimationFrame(animate);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    };
  });

  /* ── wire up handleCutResult via ref ────────────────────────────────────── */
  useEffect(() => {
    handleCutResultFnRef.current = (hedgeIdx: number, cutPct: number | null) => {
      const target = targetRef.current;
      let result: CutResult;
      let coins = 0;

      if (cutPct === null) {
        result = 'missed';
      } else {
        const diff = Math.abs(cutPct - target);
        if (diff <= PERFECT_THRESHOLD) { result = 'perfect'; coins = PERFECT_COINS; }
        else if (diff <= GOOD_THRESHOLD) { result = 'goed'; coins = GOOD_COINS; }
        else { result = 'fout'; }
      }

      const hr: HedgeResult = { hedgeIndex: hedgeIdx, targetPct: target, cutPct, result, coins };
      const newRes = [...resRef.current, hr];
      const newCoins = coinsRef.current + coins;
      resRef.current = newRes;
      coinsRef.current = newCoins;
      setResults(newRes);
      setTotalCoins(newCoins);

      const texts: Record<CutResult, string> = {
        perfect: 'PERFECT! +15',
        goed: 'GOED! +5',
        fout: 'FOUT!',
        missed: 'TE LAAT!',
      };
      setFlashType(result);
      setFlashText(texts[result]);

      flashTORef.current = setTimeout(() => {
        if (overRef.current) return;
        const next = hedgeIdx + 1;
        if (next >= TOTAL_HEDGES) { endGame(newRes, newCoins); }
        else { startHedgeFnRef.current(next); }
      }, FLASH_DURATION);
    };
  });

  /* ── cut action ─────────────────────────────────────────────────────────── */
  const handleCut = useCallback(() => {
    if (cuttingRef.current || overRef.current || screenRef.current !== 'playing') return;
    cuttingRef.current = true;
    setIsCutting(true);
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = 0; }
    handleCutResultFnRef.current(hedgeRef.current, pctRef.current);
  }, []);

  /* ── keyboard: spacebar ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && screenRef.current === 'playing') {
        e.preventDefault();
        handleCut();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleCut]);

  /* ── start game ─────────────────────────────────────────────────────────── */
  const startGame = useCallback(() => {
    overRef.current = false;
    cuttingRef.current = false;
    resRef.current = [];
    coinsRef.current = 0;
    pctRef.current = 0;

    setGameOver(false);
    setResults([]);
    setTotalCoins(0);
    setGrowthPct(0);
    setCurrentHedge(0);
    setTimeLeft(GAME_TIME);
    setFlashType(null);
    setFlashText('');
    setIsCutting(false);
    setScreen('playing');

    const t0 = Date.now();
    timerRef.current = setInterval(() => {
      const rem = GAME_TIME - Math.floor((Date.now() - t0) / 1000);
      if (rem <= 0) {
        if (!overRef.current) endGame(resRef.current, coinsRef.current);
      } else {
        setTimeLeft(rem);
      }
    }, 250);

    startHedgeFnRef.current(0);
  }, [endGame]);

  /* ── cleanup on unmount ─────────────────────────────────────────────────── */
  useEffect(() => () => stopAll(), [stopAll]);

  /* ── derived values ─────────────────────────────────────────────────────── */
  const correctCount = results.filter(r => r.result === 'perfect' || r.result === 'goed').length;
  const perfectCount = results.filter(r => r.result === 'perfect').length;
  const success = correctCount >= MIN_CORRECT;
  const stars = perfectCount >= 7 ? 3 : perfectCount >= 5 ? 2 : success ? 1 : 0;

  const flashBg = (t: CutResult | null) =>
    t === 'perfect' ? 'bg-emerald-500/30'
    : t === 'goed' ? 'bg-yellow-400/30'
    : t === 'fout' || t === 'missed' ? 'bg-red-500/30'
    : '';

  const flashColor = (t: CutResult | null) =>
    t === 'perfect' ? 'text-emerald-300'
    : t === 'goed' ? 'text-yellow-300'
    : t === 'fout' || t === 'missed' ? 'text-red-300'
    : 'text-white';

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER: MENU
  // ═══════════════════════════════════════════════════════════════════════════

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 flex flex-col items-center justify-center p-4">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pruneSnip { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(-15deg) scale(1.2)} }
          @keyframes pruneFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          .anim-snip{animation:pruneSnip 1.5s ease-in-out infinite}
          .anim-fadeUp{animation:pruneFadeUp .6s ease-out forwards}
        `}} />

        <div className="max-w-md w-full text-center anim-fadeUp">
          <div className="mb-6">
            <div className="text-6xl mb-3 anim-snip inline-block">{'\u2702\uFE0F'}</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Knip op Maat</h1>
            <p className="text-green-300 text-lg">Heg-snoei minigame</p>
          </div>

          <div className="bg-green-900/60 rounded-2xl p-5 mb-6 text-left border border-green-700/50">
            <h2 className="text-white font-bold text-lg mb-3 text-center">Hoe werkt het?</h2>
            <ul className="text-green-200 space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">{'\uD83C\uDF3F'}</span>
                <span>8 heggen groeien omhoog &mdash; knip ze op de juiste hoogte!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">- -</span>
                <span>De <strong className="text-red-300">rode stippellijn</strong> is je doelhoogte</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">{'\u2702\uFE0F'}</span>
                <span>Tik op <strong className="text-white">KNIP!</strong> (of spatiebalk) op het juiste moment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">{'\u2733\uFE0F'}</span>
                <span><strong className="text-emerald-300">PERFECT</strong> (&plusmn;10%) = 15 munten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">{'\u2705'}</span>
                <span><strong className="text-yellow-300">GOED</strong> (&plusmn;20%) = 5 munten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">{'\u274C'}</span>
                <span>Daarbuiten = <strong className="text-red-300">FOUT!</strong> De heg verwelkt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">{'\u23F1\uFE0F'}</span>
                <span>Je hebt <strong className="text-white">30 seconden</strong> en moet 5/8 goed knippen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">{'\u26A1'}</span>
                <span>Elke heg groeit <strong className="text-white">sneller</strong> dan de vorige!</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={startGame}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-150"
            >
              {'\uD83C\uDF3F'} Start!
            </button>
            <button
              onClick={onExit}
              className="w-full py-3 bg-green-900/60 hover:bg-green-900/80 text-green-300 rounded-2xl transition-all duration-150 border border-green-700/50"
            >
              {'\u2190'} Terug
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER: RESULTS
  // ═══════════════════════════════════════════════════════════════════════════

  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 flex flex-col items-center justify-center p-4">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes prunePopIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
          @keyframes pruneSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pruneStarPop{0%{transform:scale(0)}50%{transform:scale(1.4)}100%{transform:scale(1)}}
          .anim-pop{animation:prunePopIn .4s ease-out forwards}
          .anim-slide{animation:pruneSlideUp .5s ease-out forwards}
          .anim-star{animation:pruneStarPop .5s ease-out forwards}
        `}} />

        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4 anim-pop">{success ? '\uD83C\uDFC6' : '\uD83D\uDE2D'}</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 anim-slide">
            {success ? 'Geweldig geknipt!' : 'Helaas...'}
          </h1>
          <p className="text-green-300 mb-4 anim-slide" style={{ animationDelay: '0.1s' }}>
            {success
              ? 'Je hebt de heggen prachtig gesnoeid!'
              : `Je had ${correctCount} goed, maar ${MIN_CORRECT} nodig. Probeer het opnieuw!`}
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <span key={s} className="text-4xl anim-star" style={{ animationDelay: `${s * 0.2}s`, opacity: 0 }}>
                {s <= stars ? '\u2B50' : '\u2606'}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-green-900/60 rounded-2xl p-5 mb-6 border border-green-700/50 anim-slide" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-yellow-300">{totalCoins}</div>
                <div className="text-green-400 text-xs">Munten</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-300">{correctCount}/{TOTAL_HEDGES}</div>
                <div className="text-green-400 text-xs">Goed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">{perfectCount}</div>
                <div className="text-green-400 text-xs">Perfect</div>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1">
              {results.map((r, i) => (
                <div key={i} className={`rounded-lg p-1 text-center text-xs font-bold ${
                  r.result === 'perfect' ? 'bg-emerald-600/80 text-emerald-100' :
                  r.result === 'goed' ? 'bg-yellow-600/80 text-yellow-100' :
                  r.result === 'fout' ? 'bg-red-600/80 text-red-100' :
                  'bg-gray-600/80 text-gray-300'
                }`}>
                  <div className="text-sm">
                    {r.result === 'perfect' || r.result === 'goed' ? '\u2713' : r.result === 'fout' ? '\u2717' : '\u2014'}
                  </div>
                  <div className="text-[10px] opacity-80">{r.coins > 0 ? `+${r.coins}` : ''}</div>
                </div>
              ))}
              {Array.from({ length: TOTAL_HEDGES - results.length }).map((_, i) => (
                <div key={`e${i}`} className="rounded-lg p-1 text-center text-xs bg-green-800/40 text-green-600">
                  <div className="text-sm">-</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 anim-slide" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onComplete({ success, coins: totalCoins, stars })}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-150"
            >
              {success ? '\uD83C\uDFC6 Klaar!' : '\uD83D\uDD04 Opnieuw'}
            </button>
            <button
              onClick={onExit}
              className="w-full py-3 bg-green-900/60 hover:bg-green-900/80 text-green-300 rounded-2xl transition-all duration-150 border border-green-700/50"
            >
              {'\u2190'} Terug naar menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER: PLAYING
  // ═══════════════════════════════════════════════════════════════════════════

  const HEDGE_MAX_H = 320;
  const HEDGE_W = 180;
  const growH = growthPct * HEDGE_MAX_H;
  const targetY = targetPct * HEDGE_MAX_H;
  const dur = getGrowthDuration(currentHedge);
  const timeWarn = timeLeft <= 10;

  return (
    <div className={`min-h-screen bg-gradient-to-b from-green-800 to-green-950 flex flex-col transition-colors duration-200 ${flashBg(flashType)}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pruneFlash{0%{opacity:1;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}100%{opacity:0;transform:scale(1.3)}}
        @keyframes pruneShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes pruneCut{0%{opacity:1;transform:scaleX(0)}50%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(1)}}
        @keyframes pruneWilt{0%{transform:scaleY(1);opacity:1}100%{transform:scaleY(.3) scaleX(1.3);opacity:.4}}
        @keyframes pruneLeaf{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-40px) rotate(180deg);opacity:0}}
        @keyframes prunePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes pruneGlow{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}50%{box-shadow:0 0 20px 5px rgba(34,197,94,.2)}}
        .af-flash{animation:pruneFlash .8s ease-out forwards}
        .af-shake{animation:pruneShake .4s ease-in-out}
        .af-cut{animation:pruneCut .4s ease-out forwards}
        .af-wilt{animation:pruneWilt .6s ease-in forwards}
        .af-leaf{animation:pruneLeaf .8s ease-out forwards}
        .af-pulse{animation:prunePulse .5s ease-in-out infinite}
        .af-glow{animation:pruneGlow 1s ease-in-out infinite}
      `}} />

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="bg-green-900/70 rounded-xl px-3 py-1.5 border border-green-700/50">
          <span className="text-green-300 text-xs">Heg</span>
          <span className="text-white font-bold text-lg ml-1">{currentHedge + 1}/{TOTAL_HEDGES}</span>
        </div>

        <div className={`bg-green-900/70 rounded-xl px-3 py-1.5 border ${timeWarn ? 'border-red-500/70 af-pulse' : 'border-green-700/50'}`}>
          <span className={`font-bold text-lg ${timeWarn ? 'text-red-400' : 'text-white'}`}>
            {'\u23F1\uFE0F'} {timeLeft}s
          </span>
        </div>

        <div className="bg-green-900/70 rounded-xl px-3 py-1.5 border border-green-700/50">
          <span className="text-yellow-400 font-bold text-lg">{'\uD83E\uDE99'} {totalCoins}</span>
        </div>
      </div>

      {/* ── SPEED BAR ───────────────────────────────────────────────────────── */}
      <div className="px-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">{'\u26A1'} Snelheid</span>
          <div className="flex-1 h-1.5 bg-green-900/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((TOTAL_HEDGES - 1 - currentHedge) / (TOTAL_HEDGES - 1)) * 40 + 60}%`,
                background: dur < 1.8 ? '#ef4444' : dur < 2.4 ? '#f59e0b' : '#22c55e',
              }}
            />
          </div>
          <span className="text-green-400 text-xs">{dur.toFixed(1)}s</span>
        </div>
      </div>

      {/* ── PROGRESS DOTS ───────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-1.5 px-4 mb-3">
        {Array.from({ length: TOTAL_HEDGES }).map((_, i) => {
          const r = results[i];
          const dot =
            r ? (r.result === 'perfect' ? 'bg-emerald-500 border-emerald-400'
              : r.result === 'goed' ? 'bg-yellow-500 border-yellow-400'
              : 'bg-red-500 border-red-400')
            : i === currentHedge ? 'bg-white/80 border-white af-glow'
            : 'bg-green-800/50 border-green-700/30';
          return <div key={i} className={`w-3 h-3 rounded-full border transition-all duration-300 ${dot}`} />;
        })}
      </div>

      {/* ── HEDGE AREA ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Flash overlay text */}
        {flashType && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className={`text-5xl sm:text-6xl font-black af-flash ${flashColor(flashType)}`}
              style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              {flashText}
            </div>
          </div>
        )}

        <div className="relative flex flex-col items-center">
          {/* Hedge container */}
          <div
            className="relative border-2 border-white/15 rounded-lg overflow-visible"
            style={{ width: HEDGE_W + 24, height: HEDGE_MAX_H + 16, padding: 12, background: 'rgba(0,0,0,0.25)' }}
          >
            {/* Target line */}
            <div
              className="absolute z-10"
              style={{
                bottom: targetY + 12,
                left: -8,
                right: -8,
                borderTop: '3px dashed #ef4444',
              }}
            >
              <span className="absolute -right-1 -top-5 text-red-400 text-xs font-bold bg-red-900/60 px-1 rounded">
                DOEL
              </span>
            </div>

            {/* Growing hedge */}
            <div className="relative" style={{ width: HEDGE_W, height: HEDGE_MAX_H }}>
              <div
                className={`absolute bottom-0 left-0 right-0 rounded-t-md ${
                  flashType === 'fout' || flashType === 'missed' ? 'af-wilt' : ''
                }`}
                style={{
                  height: growH,
                  width: HEDGE_W,
                  background: 'linear-gradient(to top, #15803d, #22c55e, #4ade80)',
                  borderRadius: '6px 6px 2px 2px',
                }}
              >
                {/* Leaf row at top */}
                {growH > 20 && !flashType && (
                  <div className="absolute -top-2 left-0 right-0 text-center text-sm leading-none select-none"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {'\uD83C\uDF3F\uD83C\uDF43\uD83C\uDF3F\uD83C\uDF43\uD83C\uDF3F\uD83C\uDF43\uD83C\uDF3F'}
                  </div>
                )}

                {/* Subtle horizontal texture lines */}
                {growH > 40 && !flashType && (
                  <div className="absolute inset-0 opacity-20 overflow-hidden rounded-t-md">
                    {Array.from({ length: Math.floor(growH / 25) }).map((_, i) => (
                      <div key={i} className="absolute left-0 right-0 border-t border-green-300/30" style={{ bottom: i * 25 }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Cut slash effect */}
              {flashType && (flashType === 'perfect' || flashType === 'goed') && (
                <div
                  className="absolute left-0 right-0 af-cut"
                  style={{
                    bottom: growH - 2,
                    height: 4,
                    background: flashType === 'perfect' ? '#34d399' : '#fbbf24',
                    boxShadow: `0 0 15px ${flashType === 'perfect' ? '#34d399' : '#fbbf24'}`,
                    borderRadius: 2,
                  }}
                />
              )}

              {/* Leaf particles */}
              {(flashType === 'perfect' || flashType === 'goed') && (
                <div className="absolute" style={{ bottom: growH, left: 0, right: 0 }}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <span key={i} className="absolute af-leaf text-sm"
                      style={{ left: `${15 + i * 18}%`, animationDelay: `${i * 0.1}s`, animationDuration: `${0.6 + i * 0.15}s` }}>
                      {'\uD83C\uDF43'}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Ground strip */}
            <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-md"
              style={{ background: 'linear-gradient(to right, #92400e, #78350f, #92400e)' }} />
          </div>

          {/* Debug-like height readout */}
          <div className="mt-2 text-center">
            <span className="text-green-400/70 text-xs font-mono">
              {Math.round(growthPct * 100)}% | doel: {Math.round(targetPct * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* ── CUT BUTTON ──────────────────────────────────────────────────────── */}
      <div className="p-4 pb-6">
        <button
          onClick={handleCut}
          disabled={isCutting || gameOver}
          className={`w-full py-5 rounded-2xl text-2xl font-black shadow-2xl transition-all duration-100 select-none active:scale-95 ${
            isCutting || gameOver
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-yellow-400 to-orange-500 text-white hover:from-yellow-300 hover:to-orange-400 active:from-yellow-500 active:to-orange-600'
          }`}
          style={{ minHeight: 64 }}
        >
          {isCutting
            ? (flashType === 'perfect' ? '\u2728 PERFECT!'
              : flashType === 'goed' ? '\u2705 GOED!'
              : flashType === 'fout' ? '\u274C FOUT!'
              : '\u23F3 TE LAAT!')
            : '\u2702\uFE0F KNIP!'}
        </button>
        <p className="text-center text-green-500/50 text-xs mt-2">of druk op [spatiebalk]</p>
      </div>
    </div>
  );
}
