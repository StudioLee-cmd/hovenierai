'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const PruneGame = dynamic(() => import('./spel/games/PruneGame'), { ssr: false });
const WashGame = dynamic(() => import('./spel/games/WashGame'), { ssr: false });
const PlantGame = dynamic(() => import('./spel/games/PlantGame'), { ssr: false });
const LeafGame = dynamic(() => import('./spel/games/LeafGame'), { ssr: false });

const GAMES = [
  { key: 'prune', name: 'Snoeien', emoji: '✂️', Component: PruneGame },
  { key: 'wash', name: 'Hogedruk Reinigen', emoji: '💦', Component: WashGame },
  { key: 'plant', name: 'Planten', emoji: '🌱', Component: PlantGame },
  { key: 'leaf', name: 'Bladblazen', emoji: '🍂', Component: LeafGame },
] as const;

export default function NotFound() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [randomGame] = useState(() => GAMES[Math.floor(Math.random() * GAMES.length)]);

  const game = GAMES.find((g) => g.key === activeGame);

  if (game) {
    const GameComponent = game.Component;
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <button
          onClick={() => setActiveGame(null)}
          className="fixed top-3 right-3 z-[200] bg-red-600/90 hover:bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-lg font-bold"
        >
          ✕
        </button>
        <GameComponent
          onComplete={() => setActiveGame(null)}
          onExit={() => setActiveGame(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 flex flex-col items-center justify-center px-4 text-center">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
        .float { animation: float 3s ease-in-out infinite; }
        .wiggle { animation: wiggle 2s ease-in-out infinite; }
      `}</style>

      <div className="float text-7xl sm:text-8xl mb-6">🌿</div>

      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl text-green-200 mb-3">
        Oeps! Je bent verdwaald in de tuin...
      </h2>

      <p className="text-green-300/80 max-w-md mb-8 text-sm sm:text-base">
        Deze pagina bestaat niet (meer). Maar geen zorgen — speel een spelletje terwijl je hier bent!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => setActiveGame(randomGame.key)}
          className="wiggle bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-colors active:scale-95"
        >
          <span className="text-2xl mr-2">{randomGame.emoji}</span>
          Speel {randomGame.name}!
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        {GAMES.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveGame(g.key)}
            className="bg-green-900/50 hover:bg-green-700/50 text-white rounded-xl px-4 py-3 transition-colors text-sm active:scale-95"
            title={g.name}
          >
            <span className="text-xl">{g.emoji}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        <a
          href="/"
          className="text-green-300 hover:text-white underline transition-colors"
        >
          Terug naar Home
        </a>
        <a
          href="/spel"
          className="text-green-300 hover:text-white underline transition-colors"
        >
          Naar TuinBaas Spel
        </a>
      </div>

      <p className="mt-12 text-green-600/40 text-xs">
        HovenierAI.nl — AI-gestuurde hoveniersdiensten
      </p>
    </div>
  );
}
