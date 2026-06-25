import { createBrowserRouter, redirect, useRouteError } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./components/HomePage";
import { BebeSommeilPage } from "./components/BebeSommeilPage";
import { FutureMamanPage } from "./components/FutureMamanPage";
import { ChaisehauteLuciePage } from "./components/ChaisehauteLuciePage";
import { CouchesBebePage } from "./components/CouchesBebePage";
import { PoussetteTrio2Page } from "./components/PoussetteTrio2Page";
import { RetourNaturePage } from "./components/RetourNaturePage";
import { GainPage } from "./components/GainPage";
import { PoussettesPage } from "./components/PoussettesPage";
import { GuidePoussettDoublePage } from "./components/GuidePoussettDoublePage";
import { PersonasPage } from "./components/PersonasPage";
import { LeCerclePage } from "./components/LeCerclePage";
import { ProfileDashboard } from "./components/ProfileDashboard";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oups, une erreur s'est produite</h1>
        <p className="text-gray-600 mb-6">Nous n'avons pas pu trouver la page que vous cherchez.</p>
        <a href="/home" className="inline-block bg-[#87A878] text-white px-6 py-2 rounded-full font-medium hover:bg-[#6A9060] transition-colors">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/home"),
    errorElement: <ErrorBoundary />,
  },
  {
    Component: Root,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/mon-espace", Component: ProfileDashboard },
      { path: "/conseil/bebe-ne-dort-pas", Component: BebeSommeilPage },
      { path: "/future-maman", Component: FutureMamanPage },
      { path: "/produit/chaise-haute-lucie", Component: ChaisehauteLuciePage },
      { path: "/produit/couches-bebe-taille-2", Component: CouchesBebePage },
      { path: "/produit/poussette-trio-chrome-2", Component: PoussetteTrio2Page },
      { path: "/retour-a-la-nature", Component: RetourNaturePage },
      { path: "/poussettes", Component: PoussettesPage },
      { path: "/conseil/guide-poussette-double", Component: GuidePoussettDoublePage },
      { path: "/personas", Component: PersonasPage },
      { path: "/le-cercle", Component: LeCerclePage },
      { path: "/gain", Component: GainPage },
      { path: "*", Component: () => <div className="p-8 text-center">Page introuvable</div> },
    ],
  },
]);