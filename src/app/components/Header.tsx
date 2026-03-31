import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X, Gift, Repeat2, Star, Sparkles, Tag, Trophy, Flower2, RefreshCw, Recycle } from "lucide-react";
import { Link } from "react-router";
import logoImg from "figma:asset/7a1681fa13b0fa07681651b49ea1535849c92121.png";

const bannerMessages = [
  { bold: "Livraison OFFERTE", normal: " dès 59,90 € d'achat" },
  { bold: "Paiement en plusieurs fois", normal: " dès 35€ d'achat" },
  { bold: "10 € offerts", normal: " sur votre première commande" },
];

const navCategories = [
  {
    name: "Sortie",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1767807376017-53ca6626835e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Promenades & trajets",
      sub: "Poussettes, sièges auto et tout pour vos sorties",
      cta: "Voir la sélection",
      badge: "Nouveautés",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1706953855939-22e0de78f73a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Accessoires de sortie",
      sub: "Sac à langer, chancelières et protection solaire",
      cta: "Découvrir",
      badge: "Pratique",
    },
    cols: [
      { items: [{ name: "Poussettes" }, { name: "Sièges auto" }, { name: "Porte-bébé & portage" }] },
      { items: [{ name: "Sac à langer" }, { name: "Accessoires auto" }, { name: "Chancelière poussette" }, { name: "Remorque de vélo" }] },
      { items: [], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Comment choisir sa poussette ?", tag: "Guide", img: "https://images.unsplash.com/photo-1600563093202-337471bde37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
      { title: "Siège auto : quel groupe pour quel âge ?", tag: "Conseil", img: "https://images.unsplash.com/photo-1629991820816-2a3e53538028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
      { title: "Le portage, pour qui, pourquoi ?", tag: "Tendance", img: "https://images.unsplash.com/photo-1759173791710-659069f6184f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "3 min" },
    ],
  },
  {
    name: "Chambre & Sommeil",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1763478958800-3a2a6321f645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Un cocon pour bébé",
      sub: "Lits, berceaux, déco et accessoires de sommeil",
      cta: "Voir les chambres",
      badge: "Coup de cœur",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1749703827003-8e5046941847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Créez un vrai cocon",
      sub: "Décoration, veilleuses et mobiles pour la chambre",
      cta: "S'inspirer",
      badge: "Inspiration",
    },
    cols: [
      { items: [{ name: "Lits & berceaux" }, { name: "Matelas bébé" }, { name: "Literie & confort" }] },
      { items: [{ name: "Babyphone" }, { name: "Humidificateur" }, { name: "Mobile bébé" }, { name: "Veilleuse bébé" }] },
      { items: [{ name: "Chambre complète" }, { name: "Décoration murale" }, { name: "Rangement" }, { name: "Armoire & commode" }], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Aménager la chambre de bébé", tag: "Inspiration", img: "https://images.unsplash.com/photo-1770831208117-c0dd9469e95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "6 min" },
      { title: "Choisir le bon matelas bébé", tag: "Guide", img: "https://images.unsplash.com/photo-1600563093202-337471bde37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
      { title: "Veilleuse et routine du soir", tag: "Conseil", img: "https://images.unsplash.com/photo-1641913337604-7b040a87fc88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "3 min" },
    ],
  },
  {
    name: "Alimentation",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1619702235400-390dd2544861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Repas en toute sérénité",
      sub: "Chaises hautes, biberons, tire-lait et diversification",
      cta: "Voir les produits",
      badge: "Best-sellers",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1769774013961-a6049570ebd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "L'heure du repas",
      sub: "Chaises hautes évolutives et accessoires repas",
      cta: "Explorer",
      badge: "Nouveauté",
    },
    cols: [
      { items: [{ name: "Chaise haute bébé" }, { name: "Réhausseur de chaise" }, { name: "Robot de cuisine bébé" }, { name: "Vaisselle bébé" }, { name: "Bavoir" }] },
      { items: [{ name: "Biberon" }, { name: "Tétine" }, { name: "Sucette" }, { name: "Chauffe biberon" }, { name: "Stérilisateur biberon" }] },
      { items: [{ name: "Tire-lait" }, { name: "Coussin d'allaitement" }, { name: "Accessoires allaitement" }, { name: "Repas bébé" }], links: ["Promotions", "Outlet", "Nouveautés"], counsel: "Le tableau de la diversification alimentaire" },
    ],
    articles: [
      { title: "La diversification alimentaire pas à pas", tag: "Guide", img: "https://images.unsplash.com/photo-1759173791710-659069f6184f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "7 min" },
      { title: "Allaitement : nos conseils pratiques", tag: "Conseil", img: "https://images.unsplash.com/photo-1770831208117-c0dd9469e95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
      { title: "Quel biberon choisir pour bébé ?", tag: "Comparatif", img: "https://images.unsplash.com/photo-1763013259112-15f293b6d481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
    ],
  },
  {
    name: "Éveil & Jeux",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1655087751252-8d29e1bb6b32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Stimuler la curiosité",
      sub: "Jouets d'éveil, jeux extérieurs et porteurs",
      cta: "Voir les jouets",
      badge: "Coup de cœur",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Jouer & apprendre",
      sub: "Une sélection de jouets adaptés à chaque âge",
      cta: "Voir la sélection",
      badge: "Sélection",
    },
    cols: [
      { items: [{ name: "Tapis d'éveil" }, { name: "Arche d'éveil" }, { name: "Transat bébé" }, { name: "Balancelle bébé" }, { name: "Parc bébé" }] },
      { items: [{ name: "Jouets & peluches" }, { name: "Doudou" }, { name: "Hochet" }, { name: "Livres, CD, DVD" }] },
      { items: [{ name: "Jeux extérieurs" }, { name: "Trotteur bébé" }, { name: "Porteur bébé" }, { name: "Draisienne" }, { name: "Tricycle" }], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Stimuler l'éveil de bébé mois par mois", tag: "Guide", img: "https://images.unsplash.com/photo-1763013259112-15f293b6d481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "6 min" },
      { title: "Les meilleurs jouets 0–6 mois", tag: "Sélection", img: "https://images.unsplash.com/photo-1656634064343-39ff5269d651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
      { title: "Tapis d'éveil : lequel choisir ?", tag: "Comparatif", img: "https://images.unsplash.com/photo-1600563093202-337471bde37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
    ],
  },
  {
    name: "Bain & Hygiène",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1594729851651-46b17161f773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Soin & bien-être",
      sub: "Bain, change, hygiène et soins quotidiens",
      cta: "Voir les produits",
      badge: "Essentiels",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1706953855939-22e0de78f73a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Rituel du bain",
      sub: "Baignoires, transats et cosmétiques doux pour bébé",
      cta: "Découvrir",
      badge: "Douceur",
    },
    cols: [
      { items: [{ name: "Table à langer" }, { name: "Matelas à langer" }, { name: "Couches" }, { name: "Poubelle couches" }, { name: "Pot bébé & réducteur" }] },
      { items: [{ name: "Baignoire bébé" }, { name: "Transat de bain" }, { name: "Tapis de bain" }, { name: "Sortie de bain" }] },
      { items: [{ name: "Thermomètre bébé" }, { name: "Mouche bébé" }, { name: "Soins & hygiène" }, { name: "Hygiène de maman" }], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Le bain de bébé : guide complet", tag: "Guide", img: "https://images.unsplash.com/photo-1641913337604-7b040a87fc88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
      { title: "Soins pour la peau sensible de bébé", tag: "Conseil", img: "https://images.unsplash.com/photo-1759173791710-659069f6184f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "3 min" },
      { title: "Table à langer : fixe ou mobile ?", tag: "Comparatif", img: "https://images.unsplash.com/photo-1770831208117-c0dd9469e95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
    ],
  },
  {
    name: "Sécurité",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1584464319281-f1f7ec650059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Protéger bébé",
      sub: "Barrières, babyphones et sécurisation de la maison",
      cta: "Voir les produits",
      badge: "Indispensable",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1620875638370-8957e4dbd830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Maison sécurisée",
      sub: "Angles, prises, escaliers : tout pour prévenir les chutes",
      cta: "Explorer",
      badge: "Essentiel",
    },
    cols: [
      { items: [{ name: "Parc bébé" }, { name: "Tapis de parc" }, { name: "Tour de parc" }, { name: "Barrière de sécurité" }] },
      { items: [{ name: "Babyphone" }, { name: "Tour d'observation" }, { name: "Sécurité maison" }] },
      { items: [{ name: "Sécurité extérieure" }, { name: "Sécurité baignade" }], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Sécuriser sa maison avant bébé", tag: "Guide", img: "https://images.unsplash.com/photo-1629991820816-2a3e53538028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "6 min" },
      { title: "Babyphone : audio ou vidéo ?", tag: "Comparatif", img: "https://images.unsplash.com/photo-1763013259112-15f293b6d481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
      { title: "Les barrières de sécurité : guide d'achat", tag: "Conseil", img: "https://images.unsplash.com/photo-1600563093202-337471bde37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
    ],
  },
  {
    name: "Vêtements",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1622290291165-d341f1938b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Mode & confort",
      sub: "Layette, pyjamas et vêtements de grossesse",
      cta: "Voir la collection",
      badge: "Nouveautés",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1604298044934-183b970aa1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "La layette idéale",
      sub: "Bodys, pyjamas et gigoteuses pour les premiers mois",
      cta: "Voir la layette",
      badge: "Naissance",
    },
    cols: [
      { items: [{ name: "Layette & naissance" }, { name: "Pyjama bébé" }, { name: "Habit bébé" }, { name: "Gigoteuse" }] },
      { items: [{ name: "Chausson bébé" }, { name: "Maillot de bain bébé" }, { name: "Accessoires bébé" }] },
      { items: [{ name: "Vêtements de grossesse" }, { name: "Sous-vêtements grossesse" }], links: ["Promotions", "Outlet", "Nouveautés"] },
    ],
    articles: [
      { title: "Layette : la liste idéale pour la naissance", tag: "Guide", img: "https://images.unsplash.com/photo-1656634064343-39ff5269d651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "5 min" },
      { title: "Gigoteuse : taille et TOG selon la saison", tag: "Conseil", img: "https://images.unsplash.com/photo-1770831208117-c0dd9469e95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
      { title: "S'habiller pendant la grossesse", tag: "Tendance", img: "https://images.unsplash.com/photo-1759173791710-659069f6184f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "3 min" },
    ],
  },
  {
    name: "Marques",
    href: "#",
    isBrands: true,
    visual: {
      img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Nos marques partenaires",
      sub: "Les plus grandes marques de puériculture réunies",
      cta: "Toutes les marques",
      badge: "Partenaires",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1734599397715-f030c6d206a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Collections exclusives",
      sub: "Packs et offres spéciales réservés à nos marques premium",
      cta: "Voir les offres",
      badge: "Premium",
    },
    cols: [],
    articles: [],
    brandGroups: [
      { letter: "A – B", brands: ["Babybjörn", "Babymoov", "BABYZEN", "Beaba", "Bébé Confort", "Bugaboo"] },
      { letter: "C – D", brands: ["Chicco", "Cybex", "Doona"] },
      { letter: "E – J", brands: ["Elvie", "Fisher-Price", "Graco", "Hauck", "Jane", "Joie"] },
      { letter: "M – N", brands: ["Maxi-Cosi", "Nuna"] },
      { letter: "S – Z", brands: ["Stokke", "Tommee Tippee", "Tribu"] },
    ],
    featuredBrands: [
      { name: "Cybex", img: "https://images.unsplash.com/photo-1755379858572-790c899811b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", tag: "Premium" },
      { name: "Stokke", img: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", tag: "Design" },
      { name: "Bébé Confort", img: "https://images.unsplash.com/photo-1544829832-c8047d6b9d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", tag: "Confiance" },
    ],
  },
  {
    name: "Nouveautés",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Nouvelle collection",
      sub: "Découvrez les dernières tendances pour bébé",
      cta: "Voir les nouveautés",
      badge: "NEW",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1610404313264-1621e25776ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Avant-première",
      sub: "Soyez les premiers à découvrir nos exclusivités",
      cta: "Découvrir",
      badge: "Exclu",
    },
    cols: [
      { items: [{ name: "Toutes les nouveautés" }, { name: "Poussettes nouveautés" }, { name: "Sièges auto nouveautés" }, { name: "Vêtements nouveautés" }] },
      { items: [{ name: "Chambre & Déco" }, { name: "Jouets d'éveil" }, { name: "Nouvelles marques" }] },
      { items: [], links: ["Nos coups de cœur", "Top tendances"] },
    ],
    articles: [
      { title: "Les 10 innovations puériculture de l'année", tag: "Tendance", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "3 min" },
    ],
  },
  {
    name: "Bons plans",
    href: "#",
    visual: {
      img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Nos meilleures offres",
      sub: "Jusqu'à -50% sur une sélection d'articles",
      cta: "Profiter des offres",
      badge: "PROMO",
    },
    visual2: {
      img: "https://images.unsplash.com/photo-1555529771-46bb6ec678a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      label: "Outlet & Déstockage",
      sub: "Fins de série à petits prix",
      cta: "Voir l'outlet",
      badge: "Déstockage",
    },
    cols: [
      { items: [{ name: "Tous les bons plans" }, { name: "Promotions puériculture" }, { name: "Outlet vêtements" }, { name: "Déstockage jouets" }] },
      { items: [{ name: "Packs naissance à prix réduit" }, { name: "Offres du mois" }, { name: "Fins de série" }] },
      { items: [], links: ["Ventes flash", "Offres marques"] },
    ],
    articles: [
      { title: "Comment s'équiper pour bébé sans se ruiner ?", tag: "Conseil", img: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", time: "4 min" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [cartCount] = useState(2);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(52);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    };
    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((i) => (i + 1) % bannerMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Bandeau promo — défilement automatique, non sticky */}
      <div className="w-full bg-[#87A878] text-white text-xs py-1 overflow-hidden">
        <div className="text-center">
          {bannerMessages.map((msg, i) => (
            <div key={i} className="transition-all duration-500" style={{ display: i === bannerIndex ? "block" : "none" }}>
              <span className="font-bold">{msg.bold}</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{msg.normal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header sticky — ligne unique ~52 px */}
      <header ref={headerRef} className="w-full sticky top-0 z-50 shadow-sm bg-white border-b border-gray-200 relative">
        <div className="w-full px-4 py-2 flex items-center gap-2">

          {/* ── GAUCHE : burger mobile + nav desktop ── */}
          <div className="flex items-center gap-0.5 flex-shrink-0">

            {/* Burger mobile uniquement */}
            <button
              className="lg:hidden text-gray-600 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Nav desktop */}
            <div className="hidden lg:flex items-center">

              {/* Catégories */}
              <div
                className="relative"
                onMouseEnter={() => { setCatalogOpen(true); setActiveDropdown(navCategories[0].name); }}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#87A878] hover:bg-[#6A9060] transition-colors whitespace-nowrap h-full"
                >
                  <Menu size={13} />
                  <span>Catégories</span>
                </button>
                {/* Pont invisible pour combler le gap entre le bouton et le mega menu */}
                {catalogOpen && (
                  <div className="absolute top-full left-0 right-0 h-3 bg-transparent" />
                )}
              </div>

              {/* Séparateur */}
              <span className="w-px h-4 bg-gray-200 mx-2" />

              {/* Le Cercle */}
              <Link
                to="/le-cercle"
                className="flex items-center gap-1 mx-1 px-2.5 py-1 text-xs text-[#5A7A52] bg-[#F0F4EE] hover:bg-[#E2EBE0] rounded-full whitespace-nowrap transition-all"
              >
                <Star size={13} fill="currentColor" /> Le Cercle
              </Link>

              {/* @gain */}
              <Link
                to="/gain"
                className="flex items-center gap-1 mx-1 px-2.5 py-1 text-xs text-[#5A7A52] bg-[#F0F4EE] hover:bg-[#E2EBE0] rounded-full whitespace-nowrap transition-all"
              >
                <Recycle size={13} /> @gain
              </Link>

              {/* Future maman — supprimé, devient bulle flottante */}
            </div>
          </div>

          {/* ── CENTRE : Logo ── */}
          <div className="flex-1 flex justify-center">
            <a href="/home">
              <img src={logoImg} alt="allobébé" className="h-9 w-auto" />
            </a>
          </div>

          {/* ── DROITE : Search + Wishlist + Cart + Compte ── */}
          <div className="flex items-center gap-1.5 flex-shrink-0">

            {/* Search bar */}
            <div className="hidden lg:flex border border-gray-300 rounded overflow-hidden w-44 xl:w-64 hover:border-gray-400 transition-colors">
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 px-2.5 py-1.5 text-xs outline-none bg-white text-gray-700"
              />
              <button className="text-gray-400 px-2 py-1.5 flex items-center hover:text-gray-600 transition-colors bg-white">
                <Search size={15} />
              </button>
            </div>

            {/* Wishlist */}
            <Link to="/future-maman#liste" className="hidden lg:flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-[#5A7A52] transition-colors">
              <Heart size={18} />
              <span className="text-xs whitespace-nowrap hidden xl:block">Liste de naissance</span>
            </Link>

            {/* Cart */}
            <a href="#" className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-[#5A7A52] transition-colors relative">
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#87A878] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs hidden lg:block">Panier</span>
            </a>

            {/* Compte — désormais à droite */}
            <a href="#" className="hidden lg:flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-[#5A7A52] transition-colors">
              <User size={18} />
              <span className="text-xs">Compte</span>
            </a>
          </div>
        </div>

        {/* ── Mega menu (positionné sur <header>) ── */}
        {catalogOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 flex"
            style={{ height: 660 }}
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => { setCatalogOpen(false); setActiveDropdown(null); }}
          >
            <div className="w-full flex h-full">

              {/* Col 1 — Univers */}
              <div className="w-52 flex-shrink-0 border-r border-gray-100 py-1 bg-gray-50 h-full">
                {navCategories.map((cat) => {
                  const isSpecial = ["Marques", "Nouveautés", "Bons plans"].includes(cat.name);
                  const isPromo = cat.name === "Bons plans";
                  return (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        cat.name === "Marques" ? "mt-2 border-t border-gray-200 pt-3" : ""
                      } ${
                        activeDropdown === cat.name
                          ? "bg-white text-[#5A7A52] border-r-2 border-[#87A878]"
                          : isPromo 
                            ? "text-red-600 hover:bg-white" 
                            : "text-gray-700 hover:bg-white hover:text-gray-900"
                      }`}
                      onMouseEnter={() => setActiveDropdown(cat.name)}
                    >
                      <span className={`flex items-center gap-1.5 ${isSpecial ? "font-bold" : ""}`}>
                        {cat.name === "Marques" && <Star size={14} fill="currentColor" />}
                        {cat.name === "Nouveautés" && <Sparkles size={14} />}
                        {cat.name === "Bons plans" && <Tag size={14} />}
                        {cat.name}
                      </span>
                      <ChevronDown size={11} className="-rotate-90 text-gray-300" />
                    </a>
                  );
                })}
              </div>

              {/* Col 2 — Sous-catégories / Marques */}
              <div className="w-52 flex-shrink-0 border-r border-gray-100 py-6 px-5 bg-white h-full overflow-y-auto">
                {navCategories.map((cat) =>
                  activeDropdown === cat.name ? (
                    (cat as any).isBrands ? (
                      /* ── Marques : liste par lettre ── */
                      <div key={cat.name}>
                        <p className="text-[10px] font-bold text-[#5A7A52] uppercase tracking-widest mb-3">Toutes les marques</p>
                        {((cat as any).brandGroups as { letter: string; brands: string[] }[]).map((group) => (
                          <div key={group.letter} className="mb-3">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{group.letter}</p>
                            <ul className="space-y-0">
                              {group.brands.map((brand) => (
                                <li key={brand}>
                                  <a href="#" className="flex items-center gap-2 py-1 text-sm text-gray-700 hover:text-[#5A7A52] transition-colors group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#87A878] flex-shrink-0 transition-colors" />
                                    {brand}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <a href="#" className="block text-xs font-bold text-[#5A7A52] hover:underline">Toutes les marques →</a>
                        </div>
                      </div>
                    ) : (
                      /* ── Catégorie standard ── */
                      <div key={cat.name}>
                        <p className="text-[10px] font-bold text-[#5A7A52] uppercase tracking-widest mb-3">{cat.name}</p>
                        <ul className="space-y-0.5">
                          {cat.cols.flatMap((col) => col.items).map((item) => (
                            <li key={item.name}>
                              <a
                                href="#"
                                className="flex items-center gap-2 py-1.5 text-sm text-gray-700 hover:text-[#5A7A52] transition-colors group"
                              >
                                <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#87A878] flex-shrink-0 transition-colors" />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                          {["Promotions", "Outlet", "Nouveautés"].map((l) => (
                            <a key={l} href="#" className={`block text-xs font-semibold ${l === "Promotions" ? "text-red-500" : l === "Outlet" ? "text-orange-500" : "text-[#5A7A52]"} hover:underline`}>
                              {l}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  ) : null
                )}
              </div>

              {/* Col 3 — Articles de blog / Marques vedettes */}
              <div className="flex-1 border-r border-gray-100 py-6 px-6 bg-white h-full overflow-y-auto">
                {navCategories.map((cat) =>
                  activeDropdown === cat.name ? (
                    (cat as any).isBrands ? (
                      /* ── Marques : brands vedettes ── */
                      <div key={cat.name}>
                        <div className="flex items-center mb-4">
                          <p className="text-[10px] font-bold text-[#5A7A52] uppercase tracking-widest">Marques à la une</p>
                          <a href="#" className="ml-auto text-[10px] text-gray-400 hover:text-[#5A7A52] transition-colors">Tout voir →</a>
                        </div>
                        <div className="space-y-3">
                          {((cat as any).featuredBrands as { name: string; img: string; tag: string }[]).map((brand) => (
                            <a
                              key={brand.name}
                              href="#"
                              className="group flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg hover:bg-[#F0F4EE] transition-colors"
                            >
                              <div className="w-14 h-11 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                <img src={brand.img} alt={brand.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="inline-block text-[9px] font-bold text-[#5A7A52] uppercase tracking-wide bg-[#F0F4EE] group-hover:bg-white px-1.5 py-0.5 rounded mb-0.5 transition-colors">
                                  {brand.tag}
                                </span>
                                <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#5A7A52] transition-colors">{brand.name}</p>
                                <span className="text-[9px] text-gray-400">Voir les produits →</span>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="mt-6 p-3 rounded-xl" style={{ backgroundColor: "#F0F4EE", border: "1px solid #87A878" }}>
                          <p className="flex items-center gap-1.5 text-xs font-bold text-[#5A7A52] mb-1">
                            <Trophy size={14} /> Marque de l'année
                          </p>
                          <p className="text-[10px] text-gray-600">Cybex — Design primé, sécurité maximale</p>
                          <a href="#" className="inline-block mt-2 text-[10px] font-bold text-white bg-[#87A878] px-3 py-1 rounded-full hover:bg-[#6A9060] transition-colors">
                            Découvrir →
                          </a>
                        </div>
                      </div>
                    ) : cat.articles && cat.articles.length > 0 ? (
                      /* ── Catégorie standard : articles ── */
                      <div key={cat.name}>
                        <div className="flex items-center mb-4">
                          <p className="text-[10px] font-bold text-[#5A7A52] uppercase tracking-widest">Articles & conseils</p>
                          <a href="#" className="ml-auto text-[10px] text-gray-400 hover:text-[#5A7A52] transition-colors">Tout voir →</a>
                        </div>
                        <ul className="space-y-1">
                          {cat.articles.map((article) => (
                            <li key={article.title}>
                              <a
                                href="#"
                                className="group flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg hover:bg-[#F0F4EE] transition-colors"
                              >
                                <div className="w-14 h-11 flex-shrink-0 overflow-hidden rounded">
                                  <img
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="inline-block text-[9px] font-bold text-[#5A7A52] uppercase tracking-wide bg-[#F0F4EE] group-hover:bg-white px-1.5 py-0.5 rounded mb-0.5 transition-colors">
                                    {article.tag}
                                  </span>
                                  <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#5A7A52] transition-colors truncate">
                                    {article.title}
                                  </p>
                                  <span className="text-[9px] text-gray-400">{article.time} de lecture</span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  ) : null
                )}
              </div>

              {/* Col 4 — Visuels éditoriaux (2 images côte à côte) */}
              <div className="w-[540px] flex-shrink-0 flex h-full">
                {navCategories.map((cat) =>
                  activeDropdown === cat.name && cat.visual ? (
                    <div key={cat.name} className="flex w-full h-full">

                      {/* Image principale (visual) */}
                      <div className="relative overflow-hidden flex-1 border-l border-white/10 group/v1">
                        <img
                          src={cat.visual.img}
                          alt={cat.visual.label}
                          className="w-full h-full object-cover group-hover/v1:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient plus dense pour lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                        {cat.visual.badge && (
                          <span className="absolute top-4 left-4 bg-[#87A878] text-white text-xs px-3 py-1.5 font-bold tracking-widest uppercase">
                            {cat.visual.badge}
                          </span>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          {/* Marque / produit mis en avant */}
                          {(cat.visual as any).brand && (
                            <p className="text-[#87A878] text-xs font-black uppercase tracking-[0.2em] mb-1 drop-shadow">
                              {(cat.visual as any).brand}
                            </p>
                          )}
                          <p className="text-white text-xl font-black leading-tight drop-shadow-lg mb-1">
                            {cat.visual.label}
                          </p>
                          <p className="text-white/80 text-sm leading-snug mb-4 line-clamp-2">
                            {cat.visual.sub}
                          </p>
                          <a
                            href="#"
                            className="inline-block text-sm font-bold text-[#2D3A2A] bg-white hover:bg-[#87A878] hover:text-white transition-all duration-200 px-5 py-2 rounded-full shadow-lg"
                          >
                            {cat.visual.cta} →
                          </a>
                        </div>
                      </div>

                      {/* Image secondaire (visual2) */}
                      {(cat as any).visual2 && (
                        <div className="relative overflow-hidden flex-1 border-l border-white/20 group/v2">
                          <img
                            src={(cat as any).visual2.img}
                            alt={(cat as any).visual2.label}
                            className="w-full h-full object-cover group-hover/v2:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                          {(cat as any).visual2.badge && (
                            <span className="absolute top-4 left-4 bg-[#2D3A2A] text-white text-xs px-3 py-1.5 font-bold tracking-widest uppercase">
                              {(cat as any).visual2.badge}
                            </span>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            {(cat as any).visual2.brand && (
                              <p className="text-[#C8D9C2] text-xs font-black uppercase tracking-[0.2em] mb-1 drop-shadow">
                                {(cat as any).visual2.brand}
                              </p>
                            )}
                            <p className="text-white text-xl font-black leading-tight drop-shadow-lg mb-1">
                              {(cat as any).visual2.label}
                            </p>
                            <p className="text-white/80 text-sm leading-snug mb-4 line-clamp-2">
                              {(cat as any).visual2.sub}
                            </p>
                            <a
                              href="#"
                              className="inline-block text-sm font-bold text-[#2D3A2A] bg-white hover:bg-[#87A878] hover:text-white transition-all duration-200 px-5 py-2 rounded-full shadow-lg"
                            >
                              {(cat as any).visual2.cta} →
                            </a>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : null
                )}
              </div>

            </div>
          </div>
        )}

        {/* ── Menu mobile — overlay sous le header ── */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-0 bottom-0 z-[100] flex flex-col bg-white shadow-xl"
            style={{ top: headerBottom }}
          >
            {/* Barre de recherche */}
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="flex-1 px-3 py-2 text-sm outline-none bg-white text-gray-700"
                />
                <button className="bg-[#87A878] px-3 flex items-center hover:bg-[#6A9060] transition-colors">
                  <Search size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Liste accordéon — scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-2">
                {navCategories.map((cat) => {
                  const isSpecial = ["Marques", "Nouveautés", "Bons plans"].includes(cat.name);
                  const isPromo = cat.name === "Bons plans";
                  return (
                    <div key={cat.name}>
                      <button
                        className={`flex items-center justify-between w-full py-3.5 text-sm border-b border-gray-100 ${
                          isSpecial ? "font-bold" : "text-gray-800"
                        } ${isPromo ? "text-red-500" : ""}`}
                        onClick={() => setActiveDropdown(activeDropdown === cat.name ? null : cat.name)}
                      >
                        <span className="flex items-center gap-1.5">
                          {cat.name === "Marques" && <Star size={15} fill="currentColor" />}
                          {cat.name === "Nouveautés" && <Sparkles size={15} />}
                          {cat.name === "Bons plans" && <Tag size={15} />}
                          {cat.name}
                        </span>
                        <ChevronDown size={15} className={`transition-transform text-gray-400 ${activeDropdown === cat.name ? "rotate-180" : ""}`} />
                      </button>
                      {activeDropdown === cat.name && (
                      <div className="pl-4 pb-2 bg-gray-50 -mx-4 px-8">
                        {(cat as any).isBrands
                          ? ((cat as any).brandGroups as { letter: string; brands: string[] }[]).flatMap((g) => g.brands).map((brand: string) => (
                              <a key={brand} href="#" className="flex items-center gap-2 py-2.5 text-sm text-gray-600 hover:text-[#5A7A52] border-b border-gray-100 last:border-0 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#87A878] flex-shrink-0" />
                                {brand}
                              </a>
                            ))
                          : cat.cols.flatMap((col) => col.items).map((item) => (
                              <a key={item.name} href="#" className="flex items-center gap-2 py-2.5 text-sm text-gray-600 hover:text-[#5A7A52] border-b border-gray-100 last:border-0 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#87A878] flex-shrink-0" />
                                {item.name}
                              </a>
                            ))
                        }
                      </div>
                    )}
                  </div>
                );
              })}

                {/* Liens spéciaux */}
                <Link
                  to="/future-maman"
                  className="flex items-center gap-2 w-full py-3.5 text-sm font-bold text-gray-700 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Flower2 size={15} /> Future maman ?
                </Link>
              </div>
            </div>

            {/* Pied — Compte & Liste */}
            <div className="flex border-t-2 border-gray-100 flex-shrink-0">
              <a href="#" className="flex-1 flex items-center justify-center gap-2 py-4 text-sm text-gray-700 hover:text-[#5A7A52] border-r border-gray-100 transition-colors">
                <User size={18} />
                <span>Mon compte</span>
              </a>
              <Link to="/future-maman#liste" className="flex-1 flex items-center justify-center gap-2 py-4 text-sm text-gray-700 hover:text-[#5A7A52] transition-colors">
                <Heart size={18} />
                <span>Liste de naissance</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}