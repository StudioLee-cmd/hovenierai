import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl sm:text-8xl mb-6" style={{ animation: 'float 3s ease-in-out infinite' }}>🌿</div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
      `}</style>

      <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">404</h1>

      <h2 className="text-xl sm:text-2xl text-green-200 mb-3">
        Oeps! Je bent verdwaald in de tuin...
      </h2>

      <p className="text-green-300/80 max-w-md mb-8 text-sm sm:text-base">
        Deze pagina bestaat niet (meer). Maar geen zorgen — speel een spelletje terwijl je hier bent!
      </p>

      <Link
        href="/spel"
        className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-colors active:scale-95 mb-6"
        style={{ animation: 'wiggle 2s ease-in-out infinite' }}
      >
        🎮 Speel TuinBaas!
      </Link>

      <Link
        href="/"
        className="text-green-300 hover:text-white underline transition-colors text-sm"
      >
        Terug naar Home
      </Link>

      <p className="mt-12 text-green-600/40 text-xs">
        HovenierAI.nl — AI-gestuurde hoveniersdiensten
      </p>
    </div>
  );
}
