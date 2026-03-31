import { useState } from "react";
import { Link } from "react-router";
import { X } from "lucide-react";

export function FutureMamanBubble() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed right-0 z-[51] flex items-center" style={{ top: "120px" }}>
      <Link
        to="/future-maman"
        className="flex items-center gap-2 pl-3 pr-4 py-2 lg:pl-4 lg:pr-5 lg:py-2.5 bg-[#87A878] hover:bg-[#6A9060] shadow-lg hover:shadow-xl transition-all duration-200 rounded-l-full border-y-2 border-l-2 border-white text-white whitespace-nowrap"
        style={{ fontSize: "12px", fontWeight: 700 }}
      >
        🌸 <span className="hidden sm:inline">Future maman ?</span><span className="sm:hidden">Future maman</span>
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 right-2 w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors shadow-sm"
        title="Fermer"
      >
        <X size={9} className="text-gray-700" />
      </button>
    </div>
  );
}