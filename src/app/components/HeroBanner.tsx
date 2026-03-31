import { Link } from "react-router";

export function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden h-[400px] md:h-[550px]">
      <img
        src="https://images.unsplash.com/photo-1773049322617-73bdc38b0d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjB3YWxraW5nJTIwYmFieSUyMGluJTIwbmF0dXJlJTIwZm9yZXN0JTIwZ3JlZW4lMjBsZWF2ZXN8ZW58MXx8fHwxNzczODQ2NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Hero banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 items-start w-full">
        <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/50 text-[#4A6B41] text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
          🌿 Sélection éditoriale
        </div>
        <h1
          className="text-white mb-4 drop-shadow-lg text-4xl md:text-6xl"
          style={{ fontWeight: 800, lineHeight: 1.1, fontFamily: "'Nunito', sans-serif" }}
        >
          Retour à la nature
        </h1>
        <p className="text-gray-100 text-sm md:text-lg mb-8 max-w-md drop-shadow-md">
          Préparez vos balades printanières avec notre sélection de poussettes tout-terrain et accessoires.
        </p>
        <Link
          to="/retour-a-la-nature"
          className="inline-block text-white px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base font-semibold transition-all rounded-full hover:bg-[#6A9060] active:scale-95 shadow-lg"
          style={{ backgroundColor: "#87A878" }}
        >
          J'en profite
        </Link>
      </div>
    </div>
  );
}
