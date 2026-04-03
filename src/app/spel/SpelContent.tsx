"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import MowGame from "./games/MowGame";

// Station definitions
const STATIONS: Record<string, { name: string; emoji: string; gameType: string; col: number; row: number }> = {
  "2": { name: "Grasmaaien", emoji: "🌿", gameType: "mow", col: 2, row: 4 },
  "3": { name: "Snoeien", emoji: "✂️", gameType: "prune", col: 17, row: 4 },
  "4": { name: "Hogedruk", emoji: "💦", gameType: "wash", col: 2, row: 10 },
  "5": { name: "Planten", emoji: "🌱", gameType: "plant", col: 17, row: 10 },
  "6": { name: "Bladblazer", emoji: "🍂", gameType: "leaf", col: 10, row: 12 },
};

export default function SpelContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const appRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nearStation, setNearStation] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [coins, setCoins] = useState(0);
  const [gameResult, setGameResult] = useState<"success" | "fail" | null>(null);

  // Check if character is near a station
  const checkStationProximity = useCallback((row: number, col: number) => {
    for (const [objType, station] of Object.entries(STATIONS)) {
      const dist = Math.abs(col - station.col) + Math.abs(row - station.row);
      if (dist <= 1) {
        setNearStation(objType);
        return;
      }
    }
    setNearStation(null);
  }, []);

  // Enter station mini-game
  const enterStation = useCallback(() => {
    if (!nearStation) return;
    const station = STATIONS[nearStation];
    setActiveGame(station.gameType);
    setGameResult(null);
  }, [nearStation]);

  // Exit mini-game
  const exitGame = useCallback((result: "success" | "fail") => {
    setGameResult(result);
    if (result === "success") {
      setCoins(c => c + 50);
    }
    setTimeout(() => {
      setActiveGame(null);
      setGameResult(null);
    }, 1500);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (activeGame) return;
        if (nearStation) enterStation();
      }
      if (e.key === "Escape" && activeGame) {
        exitGame("fail");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearStation, activeGame, enterStation, exitGame]);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        const PIXI = await import("pixi.js");
        const TRAVISO = await import("traviso.js");
        if (destroyed || !containerRef.current) return;

        TRAVISO.skipHello();

        const canvasW = Math.min(window.innerWidth, 1200);
        const canvasH = Math.min(window.innerHeight - 120, 650);

        const app = new PIXI.Application({
          width: canvasW,
          height: canvasH,
          backgroundColor: 0x87ceeb,
          antialias: false,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
        });

        containerRef.current.appendChild(app.view as HTMLCanvasElement);
        appRef.current = app;

        const engine = TRAVISO.getEngineInstance({
          mapDataPath: "/game/mapData.json",
          assetsToLoad: [
            "/game/grass.png", "/game/grass2.png", "/game/path.png",
            "/game/stone.png", "/game/water.png", "/game/hedge.png",
            "/game/road.png", "/game/flowers.png", "/game/flowers_yellow.png",
            "/game/tree.png", "/game/station_mow.png", "/game/station_prune.png",
            "/game/station_wash.png", "/game/station_plant.png",
            "/game/station_leaf.png", "/game/bench.png", "/game/fence.png",
            "/game/character.png",
          ],
          tileHeight: 64,
          isoAngle: 30,
          initialPositionFrame: { x: 0, y: 0, w: canvasW, h: canvasH },
          pathFindingType: TRAVISO.PF_ALGORITHMS.ASTAR_ORTHOGONAL,
          followCharacter: true,
          instantCameraRelocation: false,
          highlightPath: true,
          highlightTargetTile: true,
          tileHighlightAnimated: true,
          dontAutoMoveToTile: false,
          checkPathOnEachTile: true,
          mapDraggable: true,
          engineInstanceReadyCallback: () => {
            if (destroyed) return;
            setLoading(false);
            engineRef.current = engine;
          },
          objectReachedDestinationCallback: (obj: any) => {
            // Check if character arrived near a station
            if (obj.mapPos) {
              checkStationProximity(obj.mapPos.r, obj.mapPos.c);
            }
          },
          objectUpdateCallback: (obj: any) => {
            // Called when character moves to a new tile
            if (obj.mapPos) {
              checkStationProximity(obj.mapPos.r, obj.mapPos.c);
            }
          },
          tileSelectCallback: (r: number, c: number) => {
            // Check if clicking on a station directly
            for (const [objType, station] of Object.entries(STATIONS)) {
              if (station.col === c && station.row === r) {
                // Move to adjacent tile, then interact
                break;
              }
            }
          },
        });

        app.stage.addChild(engine);

        // Ambient animation ticker
        let time = 0;
        app.ticker.add((delta: number) => {
          time += delta;
          // Future: ambient animations here
        });

      } catch (err: any) {
        console.error("Game init error:", err);
        setError(err.message || "Failed to load game");
      }
    }

    init();
    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [checkStationProximity]);

  const currentStation = nearStation ? STATIONS[nearStation] : null;

  return (
    <div className="flex flex-col items-center pt-24 pb-8 px-4 min-h-screen bg-gradient-to-b from-sky-200 to-green-100">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pixel-font { font-family: 'Press Start 2P', monospace; }
        @keyframes bounce-in { 0% { transform: scale(0) translateY(20px); opacity: 0; } 60% { transform: scale(1.1) translateY(-5px); } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px rgba(34,139,34,0.3); } 50% { box-shadow: 0 0 25px rgba(34,139,34,0.6); } }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      <h1 className="pixel-font text-xl md:text-2xl text-green-800 mb-2 text-center">
        🌿 TuinBaas
      </h1>
      <p className="text-xs text-green-700 mb-4 text-center">
        Hovenier Simulator — Klik om te lopen, bezoek stations voor tuinklussen
      </p>

      {/* Game container */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-green-800/30">
        <div ref={containerRef} style={{ width: "100%", maxWidth: 1200 }} />

        {/* Loading */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900 text-white z-20">
            <div className="pixel-font text-xl mb-4 animate-pulse">🌿 Laden...</div>
            <div className="text-xs text-green-300">Tuin wordt voorbereid</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-red-400 z-20 p-8">
            <div className="text-lg mb-2">Fout bij laden</div>
            <div className="text-xs text-gray-400 text-center max-w-md mb-4">{error}</div>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600">
              Opnieuw proberen
            </button>
          </div>
        )}

        {/* Station proximity prompt */}
        {nearStation && currentStation && !activeGame && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce-in">
            <button
              onClick={enterStation}
              className="bg-white/95 rounded-xl px-6 py-3 shadow-lg border-2 border-green-600 animate-pulse-glow flex items-center gap-3 cursor-pointer hover:bg-green-50 transition-colors active:scale-95"
            >
              <span className="text-2xl">{currentStation.emoji}</span>
              <div className="text-left">
                <div className="pixel-font text-xs text-green-800">{currentStation.name}</div>
                <div className="text-xs text-green-600 mt-1 font-bold">▶ Klik om te starten</div>
              </div>
            </button>
          </div>
        )}

        {/* Mini-game overlay */}
        {activeGame && (
          <div className="absolute inset-0 z-30 animate-slide-up" style={{ background: "rgba(0,0,0,0.6)" }}>
            {activeGame === "mow" ? (
              <MowGame
                onComplete={(result) => {
                  setCoins(c => c + result.coins);
                  setTimeout(() => setActiveGame(null), 500);
                }}
                onExit={() => setActiveGame(null)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border-4 border-green-600 text-center">
                  <span className="text-4xl block mb-2">
                    {nearStation ? STATIONS[nearStation]?.emoji : "🌿"}
                  </span>
                  <h2 className="pixel-font text-lg text-green-800 mb-2">
                    {nearStation ? STATIONS[nearStation]?.name : "Mini-game"}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">Binnenkort beschikbaar!</p>
                  <button
                    onClick={() => setActiveGame(null)}
                    className="pixel-font text-xs px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Terug naar tuin
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HUD below game */}
      {!loading && !error && (
        <div className="mt-4 flex gap-4 items-center flex-wrap justify-center">
          <div className="pixel-font bg-white/90 rounded-xl px-4 py-2 text-sm text-green-800 shadow flex items-center gap-2">
            <span className="text-lg">🪙</span> {coins}
          </div>

          {/* Station progress */}
          <div className="flex gap-2">
            {Object.entries(STATIONS).map(([key, station]) => (
              <div
                key={key}
                className="bg-white/80 rounded-lg px-2 py-1 text-center shadow-sm"
                title={station.name}
              >
                <span className="text-sm">{station.emoji}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-green-700/60">
            Klik op het veld om te lopen
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-green-700/40 text-center">
        Een spel van{" "}
        <a href="https://www.hovenierai.nl" className="text-green-600 underline">HovenierAI.nl</a>
      </div>
    </div>
  );
}
