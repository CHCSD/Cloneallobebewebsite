import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";

const SECRET_CODE = "allobebe";

export function LockPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("unlocked") === "true") {
      navigate("/home", { replace: true });
    }
    inputRef.current?.focus();
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === SECRET_CODE) {
      setUnlocking(true);
      sessionStorage.setItem("unlocked", "true");
      setTimeout(() => navigate("/home", { replace: true }), 900);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
      setInput("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2D3A2A 0%, #1F2E1C 50%, #3A5432 100%)" }}
    >
      {/* Cercles décoratifs */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: 600,
          height: 600,
          border: "1px solid #87A878",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: 400,
          height: 400,
          border: "2px solid #87A878",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Étoiles / points */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#87A878] opacity-20"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Card centrale */}
      <div
        className="relative z-10 flex flex-col items-center px-10 py-12 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(135,168,120,0.25)",
          boxShadow: "0 0 80px rgba(135,168,120,0.08), 0 30px 60px rgba(0,0,0,0.4)",
          minWidth: 340,
          maxWidth: 400,
        }}
      >
        {/* Logo texte */}
        <div className="mb-8 text-center">
          <span
            className="text-white tracking-wider"
            style={{ fontSize: "1.6rem", fontWeight: 800 }}
          >
            allo<span style={{ color: "#87A878" }}>bébé</span>
          </span>
          <p className="text-gray-400 mt-1" style={{ fontSize: "12px" }}>
            Accès privé — Site en préparation
          </p>
        </div>

        {/* Icône cadenas */}
        <div
          className="flex items-center justify-center rounded-full mb-8 transition-all duration-700"
          style={{
            width: 88,
            height: 88,
            background: unlocking
              ? "linear-gradient(135deg, #87A878, #6A9060)"
              : "rgba(135,168,120,0.12)",
            border: `2px solid ${unlocking ? "#87A878" : "rgba(135,168,120,0.35)"}`,
            boxShadow: unlocking ? "0 0 40px rgba(135,168,120,0.5)" : "none",
            transform: unlocking ? "scale(1.1)" : "scale(1)",
          }}
        >
          {unlocking ? (
            <Unlock size={38} color="#2D3A2A" />
          ) : (
            <Lock size={38} color="#87A878" />
          )}
        </div>

        {/* Titre */}
        <h1
          className="text-white text-center mb-1"
          style={{ fontSize: "1.15rem", fontWeight: 700 }}
        >
          {unlocking ? "Accès accordé ✨" : "Site protégé"}
        </h1>
        <p className="text-gray-400 text-center mb-7" style={{ fontSize: "13px" }}>
          {unlocking ? "Redirection en cours…" : "Entrez le mot de passe pour continuer"}
        </p>

        {/* Formulaire */}
        {!unlocking && (
          <form onSubmit={handleSubmit} className="w-full">
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 mb-3 transition-all duration-200 ${
                shake ? "animate-[shake_0.4s_ease]" : ""
              }`}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1.5px solid ${error ? "#ef4444" : "rgba(135,168,120,0.3)"}`,
                boxShadow: error ? "0 0 0 3px rgba(239,68,68,0.15)" : "none",
              }}
            >
              <Lock size={15} className="text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Mot de passe…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                style={{ fontSize: "14px" }}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-center mb-3" style={{ fontSize: "12px" }}>
                Mot de passe incorrect, réessayez.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #87A878, #6A9060)",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "0 4px 20px rgba(135,168,120,0.3)",
              }}
            >
              Déverrouiller
            </button>
          </form>
        )}
      </div>

      {/* Footer discret */}
      <p className="absolute bottom-6 text-gray-600" style={{ fontSize: "11px" }}>
        © 2026 Allobébé — Tous droits réservés
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}