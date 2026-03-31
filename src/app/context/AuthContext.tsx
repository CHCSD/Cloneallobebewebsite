import { createContext, useContext, useState, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ListeNaissance {
  id: string;
  nom: string;
  dateAccouchement: string;
  active: boolean;
}

export interface User {
  id: string;
  prenom: string;
  email: string;
  listeNaissance: ListeNaissance | null;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  hasListeNaissance: boolean;
  login: () => void;
  logout: () => void;
}

// ─── Mock user avec liste de naissance active ────────────────────────────────
const MOCK_USER: User = {
  id: "usr_001",
  prenom: "Camille",
  email: "camille@example.com",
  listeNaissance: {
    id: "lst_001",
    nom: "Liste de Camille & Hugo",
    dateAccouchement: "2026-07-15",
    active: true,
  },
};

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Par défaut : non connecté (mettre MOCK_USER pour simuler un utilisateur connecté)
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = user !== null;
  const hasListeNaissance =
    isLoggedIn && user.listeNaissance !== null && user.listeNaissance.active;

  const login = () => setUser(MOCK_USER);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, hasListeNaissance, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
