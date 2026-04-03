"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SpelContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const appRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        // Dynamic imports to avoid SSR issues
        const PIXI = await import("pixi.js");
        const TRAVISO = await import("traviso.js");

        if (destroyed || !containerRef.current) return;

        TRAVISO.skipHello();

        const canvasW = Math.min(window.innerWidth, 1200);
        const canvasH = Math.min(window.innerHeight - 100, 700);

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
            "/game/grass.png",
            "/game/grass2.png",
            "/game/path.png",
            "/game/stone.png",
            "/game/water.png",
            "/game/hedge.png",
            "/game/road.png",
            "/game/flowers.png",
            "/game/flowers_yellow.png",
            "/game/tree.png",
            "/game/station_mow.png",
            "/game/station_prune.png",
            "/game/station_wash.png",
            "/game/station_plant.png",
            "/game/station_leaf.png",
            "/game/bench.png",
            "/game/fence.png",
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
            console.log("Character arrived");
          },
          tileSelectCallback: (r: number, c: number) => {
            console.log(`Tile: row=${r}, col=${c}`);
          },
        });

        app.stage.addChild(engine);

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
  }, []);

  return (
    <div className="flex flex-col items-center pt-24 pb-8 px-4 min-h-screen bg-gradient-to-b from-sky-200 to-green-100">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      <h1
        style={{ fontFamily: "'Press Start 2P', monospace" }}
        className="text-2xl text-green-800 mb-4 text-center"
      >
        🌿 TuinBaas
      </h1>
      <p className="text-sm text-green-700 mb-6 text-center">
        Hovenier Simulator — Klik om te lopen, bezoek stations voor mini-games
      </p>

      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-green-800/30">
        <div ref={containerRef} style={{ width: "100%", maxWidth: 1200 }} />

        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900 text-white z-10">
            <div
              style={{ fontFamily: "'Press Start 2P', monospace" }}
              className="text-xl mb-4 animate-pulse"
            >
              🌿 Laden...
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-red-400 z-10 p-8">
            <div className="text-lg mb-2">Fout bij laden</div>
            <div className="text-xs text-gray-400 text-center max-w-md mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 hover:bg-gray-700"
            >
              Opnieuw proberen
            </button>
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="mt-4 flex gap-4 items-center">
          <div
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="bg-white/90 rounded-xl px-4 py-2 text-sm text-green-800 shadow flex items-center gap-2"
          >
            <span className="text-lg">🪙</span> 0
          </div>
          <div className="text-xs text-green-700/60">
            Klik op het veld om te lopen naar stations
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-green-700/40 text-center">
        Een spel van{" "}
        <a href="https://www.hovenierai.nl" className="text-green-600 underline">
          HovenierAI.nl
        </a>
      </div>
    </div>
  );
}
