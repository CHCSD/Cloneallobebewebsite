import { useEffect } from "react";
import { Outlet, useNavigate, ScrollRestoration } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FutureMamanBubble } from "./FutureMamanBubble";
import { UspsBar } from "./UspsBar";

export function Root() {
  const navigate = useNavigate();

  // Garde de session : si le cadenas n'a pas été déverrouillé, retour à "/"
  useEffect(() => {
    if (sessionStorage.getItem("unlocked") !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Ne pas rendre le layout tant que le verrou n'est pas validé
  if (sessionStorage.getItem("unlocked") !== "true") return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollRestoration />
      <Header />
      <UspsBar />
      <FutureMamanBubble />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
