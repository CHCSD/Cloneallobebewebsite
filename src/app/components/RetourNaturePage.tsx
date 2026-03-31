import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronRight, Heart, Star, ShoppingCart, ChevronDown, SlidersHorizontal, X } from "lucide-react";

const ALL_BRANDS = ["JOIE", "ERGOBABY", "NANIA", "BÉBÉCONFORT", "NATTOU", "HAUCK", "CYBEX", "MACLAREN", "BABYBJÖRN"];
const ALL_TAGS = ["Sortie nature", "Tout-terrain", "Portage outdoor", "Légère & maniable", "Éveil naturel", "Bois & nature", "Sommeil outdoor", "Repas en extérieur", "Confort extérieur", "Randonnée famille", "Sécurité route", "Waterproof", "Confort UV"];
const PRICE_MAX_GLOBAL = 1250;

const heroImg = "https://cdn.wbtourisme.be/sites/default/files/00032905-WBT---Christophe-Vandercam-Balade-en-poussette-au-lac-de-Bambois.jpg";

const PAGE_SIZE = 15;

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  badge: string | null;
  badgeColor: string;
  rating: number;
  reviews: number;
  tag: string;
  slug: string | null;
  image: string;
  category: string;
};

const allProducts: Product[] = [
  { id: "JI041424600", name: "Poussette trio Chrome 2 Cashew", brand: "JOIE", price: 499.90, originalPrice: 569.90, discount: -12, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.8, reviews: 124, tag: "Sortie nature", slug: "/produit/poussette-trio-chrome-2", image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424600.jpg", category: "Poussettes" },
  { id: "ER046100005", name: "Porte-bébé Embrace Noir Intense", brand: "ERGOBABY", price: 79.00, originalPrice: 99.00, discount: -20, badge: "Promo", badgeColor: "#ef4444", rating: 4.9, reviews: 87, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100005.jpg", category: "Portage" },
  { id: "IA051844373", name: "Chaise haute Lucie Grise", brand: "NANIA", price: 39.90, originalPrice: 79.90, discount: -50, badge: "Outlet", badgeColor: "#6b7280", rating: 4.6, reviews: 43, tag: "Repas en extérieur", slug: "/produit/chaise-haute-lucie", image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844373.jpg", category: "Chaises hautes" },
  { id: "BC041045304", name: "Poussette Soko Mineral Graphite", brand: "BÉBÉCONFORT", price: 94.90, originalPrice: 109.90, discount: -14, badge: null, badgeColor: "", rating: 4.5, reviews: 31, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045304.jpg", category: "Poussettes" },
  { id: "JO081456409", name: "Tapis pouf avec arches Dia Teddy bouclette écru", brand: "NATTOU", price: 89.00, originalPrice: 109.90, discount: -19, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 18, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/o/400/jo081456409.jpg", category: "Éveil" },
  { id: "HA051864049", name: "Chaise haute évolutive Beta+ naturelle", brand: "HAUCK", price: 119.90, originalPrice: 149.90, discount: -20, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 56, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864049.jpg", category: "Chaises hautes" },
  { id: "BC041045312", name: "Poussette Lara2 Nomad Grey", brand: "BÉBÉCONFORT", price: 249.90, originalPrice: 299.90, discount: -17, badge: null, badgeColor: "", rating: 4.4, reviews: 62, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045312.jpg", category: "Poussettes" },
  { id: "JI041424610", name: "Poussette Aire80 Almond", brand: "JOIE", price: 179.90, originalPrice: 199.90, discount: -10, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 38, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424610.jpg", category: "Poussettes" },
  { id: "ER046100010", name: "Porte-bébé 360 Cool Air Mesh", brand: "ERGOBABY", price: 149.00, originalPrice: 179.00, discount: -17, badge: null, badgeColor: "", rating: 4.9, reviews: 211, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100010.jpg", category: "Portage" },
  { id: "BA051864020", name: "Porte-bébé physiologique Yema Tie", brand: "BABYBJÖRN", price: 189.00, originalPrice: 219.00, discount: -14, badge: null, badgeColor: "", rating: 4.8, reviews: 97, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864020.jpg", category: "Portage" },
  { id: "NA081456410", name: "Tapis d'éveil Jungle Coton Bio", brand: "NATTOU", price: 49.90, originalPrice: 64.90, discount: -23, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 29, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456410.jpg", category: "Éveil" },
  { id: "CI051864030", name: "Poussette Melio 3 Sage Green", brand: "CYBEX", price: 549.00, originalPrice: 629.00, discount: -13, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 183, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864030.jpg", category: "Poussettes" },
  { id: "MA041045320", name: "Poussette Stella Ts Gris Chine", brand: "MACLAREN", price: 299.00, originalPrice: 369.00, discount: -19, badge: null, badgeColor: "", rating: 4.5, reviews: 44, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045320.jpg", category: "Poussettes" },
  { id: "HA051864050", name: "Lit parapluie Clip Fold Plus Forest", brand: "HAUCK", price: 79.90, originalPrice: 99.90, discount: -20, badge: "Nouveau", badgeColor: "#374151", rating: 4.4, reviews: 21, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864050.jpg", category: "Éco & Bio" },
  { id: "JI041424620", name: "Siège auto Gemm 2 Rosewood", brand: "JOIE", price: 219.90, originalPrice: 259.90, discount: -15, badge: null, badgeColor: "", rating: 4.7, reviews: 76, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424620.jpg", category: "Éco & Bio" },
  { id: "ER046100015", name: "Porte-bébé Omni Breeze Silver", brand: "ERGOBABY", price: 179.00, originalPrice: 209.00, discount: -14, badge: null, badgeColor: "", rating: 4.8, reviews: 142, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100015.jpg", category: "Portage" },
  { id: "BC041045322", name: "Poussette Agile+ Soho Grey", brand: "BÉBÉCONFORT", price: 339.90, originalPrice: 399.90, discount: -15, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 58, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045322.jpg", category: "Poussettes" },
  { id: "NA081456415", name: "Mobile musical forêt enchantée", brand: "NATTOU", price: 34.90, originalPrice: 44.90, discount: -22, badge: null, badgeColor: "", rating: 4.6, reviews: 33, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456415.jpg", category: "Éveil" },
  { id: "HA051864055", name: "Chaise haute Sit N Relax 3en1 Wood", brand: "HAUCK", price: 159.90, originalPrice: 189.90, discount: -16, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 84, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864055.jpg", category: "Chaises hautes" },
  { id: "CI051864035", name: "Porte-bébé Coya Seashell Beige", brand: "CYBEX", price: 119.00, originalPrice: 139.00, discount: -14, badge: null, badgeColor: "", rating: 4.5, reviews: 27, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864035.jpg", category: "Portage" },
  { id: "JI041424625", name: "Poussette Lite Trax 4 Terrain", brand: "JOIE", price: 449.90, originalPrice: 519.90, discount: -13, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.9, reviews: 207, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424625.jpg", category: "Poussettes" },
  { id: "MA041045325", name: "Sac à langer Nomad Khaki", brand: "MACLAREN", price: 89.00, originalPrice: 109.00, discount: -18, badge: null, badgeColor: "", rating: 4.6, reviews: 19, tag: "Randonnée famille", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045325.jpg", category: "Éco & Bio" },
  { id: "BA051864025", name: "Transat Bouncer Bliss Pebble Grey", brand: "BABYBJÖRN", price: 249.00, originalPrice: 279.00, discount: -11, badge: null, badgeColor: "", rating: 4.8, reviews: 163, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864025.jpg", category: "Éveil" },
  { id: "IA051844380", name: "Chaise haute Bali+ Forest Green", brand: "NANIA", price: 44.90, originalPrice: 89.90, discount: -50, badge: "Outlet", badgeColor: "#6b7280", rating: 4.4, reviews: 36, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844380.jpg", category: "Chaises hautes" },
  { id: "CI051864040", name: "Siège auto Cloud T i-Size Soho Grey", brand: "CYBEX", price: 399.00, originalPrice: 459.00, discount: -13, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 312, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864040.jpg", category: "Éco & Bio" },
  { id: "NA081456420", name: "Peluche Geo Ours brun coton bio", brand: "NATTOU", price: 24.90, originalPrice: 29.90, discount: -17, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 41, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456420.jpg", category: "Éco & Bio" },
  { id: "JI041424630", name: "Lit de voyage Every Stage Suite Sandy", brand: "JOIE", price: 279.90, originalPrice: 339.90, discount: -18, badge: null, badgeColor: "", rating: 4.7, reviews: 52, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424630.jpg", category: "Éco & Bio" },
  { id: "ER046100020", name: "Porte-bébé Hip Seat Carrier Adapt", brand: "ERGOBABY", price: 159.00, originalPrice: 189.00, discount: -16, badge: null, badgeColor: "", rating: 4.6, reviews: 88, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100020.jpg", category: "Portage" },
  { id: "BC041045330", name: "Poussette Mya Spring Midnight Blue", brand: "BÉBÉCONFORT", price: 149.90, originalPrice: 179.90, discount: -17, badge: "Promo", badgeColor: "#ef4444", rating: 4.3, reviews: 27, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045330.jpg", category: "Poussettes" },
  { id: "HA051864060", name: "Trotteur Vivo Plus Forest", brand: "HAUCK", price: 49.90, originalPrice: 64.90, discount: -23, badge: null, badgeColor: "", rating: 4.4, reviews: 48, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864060.jpg", category: "Éveil" },
  { id: "MA041045330", name: "Poussette Quest Arc Forest Warrior", brand: "MACLAREN", price: 199.00, originalPrice: 239.00, discount: -17, badge: null, badgeColor: "", rating: 4.5, reviews: 34, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045330.jpg", category: "Poussettes" },
  { id: "CI051864045", name: "Poussette Mios 3 Sage Green", brand: "CYBEX", price: 699.00, originalPrice: 799.00, discount: -13, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 276, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864045.jpg", category: "Poussettes" },
  { id: "JI041424635", name: "Nacelle Ramble XL Terrain", brand: "JOIE", price: 129.90, originalPrice: 149.90, discount: -13, badge: null, badgeColor: "", rating: 4.7, reviews: 61, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424635.jpg", category: "Éco & Bio" },
  { id: "IA051844385", name: "Chaise haute Omega+ Beige Bois", brand: "NANIA", price: 54.90, originalPrice: 99.90, discount: -45, badge: "Outlet", badgeColor: "#6b7280", rating: 4.5, reviews: 22, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844385.jpg", category: "Chaises hautes" },
  { id: "NA081456425", name: "Lot 3 hochets bois nature", brand: "NATTOU", price: 19.90, originalPrice: 27.90, discount: -29, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 73, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456425.jpg", category: "Éco & Bio" },
  { id: "ER046100025", name: "Porte-bébé Metro+ Baby Carrier", brand: "ERGOBABY", price: 99.00, originalPrice: 129.00, discount: -23, badge: "Promo", badgeColor: "#ef4444", rating: 4.7, reviews: 116, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100025.jpg", category: "Portage" },
  { id: "BC041045335", name: "Poussette Koos iSize R Exclusive", brand: "BÉBÉCONFORT", price: 549.90, originalPrice: 629.90, discount: -13, badge: null, badgeColor: "", rating: 4.8, reviews: 91, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045335.jpg", category: "Poussettes" },
  { id: "BA051864030", name: "Trotteur Steps Black", brand: "BABYBJÖRN", price: 139.00, originalPrice: 159.00, discount: -13, badge: null, badgeColor: "", rating: 4.6, reviews: 187, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864030.jpg", category: "Éveil" },
  { id: "HA051864065", name: "Chaise haute Gamma+ Wood Natural", brand: "HAUCK", price: 199.90, originalPrice: 239.90, discount: -17, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 134, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864065.jpg", category: "Chaises hautes" },
  { id: "CI051864050", name: "Balancelle Lemo Bouncer Almond Beige", brand: "CYBEX", price: 319.00, originalPrice: 369.00, discount: -14, badge: null, badgeColor: "", rating: 4.7, reviews: 49, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864050.jpg", category: "Éveil" },
  { id: "MA041045335", name: "Sac à langer Vogue Oxford Navypine", brand: "MACLAREN", price: 119.00, originalPrice: 139.00, discount: -14, badge: null, badgeColor: "", rating: 4.4, reviews: 16, tag: "Randonnée famille", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045335.jpg", category: "Éco & Bio" },
  { id: "JI041424640", name: "Poussette Pushchair Versatrax Rosewood", brand: "JOIE", price: 569.90, originalPrice: 649.90, discount: -12, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.8, reviews: 158, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424640.jpg", category: "Poussettes" },
  { id: "NA081456430", name: "Tapis d'éveil Biche Beige Coton", brand: "NATTOU", price: 59.90, originalPrice: 79.90, discount: -25, badge: null, badgeColor: "", rating: 4.6, reviews: 37, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456430.jpg", category: "Éveil" },
  { id: "IA051844390", name: "Rehausseur Toto 2 Dark Forest", brand: "NANIA", price: 29.90, originalPrice: 49.90, discount: -40, badge: "Outlet", badgeColor: "#6b7280", rating: 4.3, reviews: 18, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844390.jpg", category: "Chaises hautes" },
  { id: "ER046100030", name: "Porte-bébé All-in-One Cool Air", brand: "ERGOBABY", price: 189.00, originalPrice: 219.00, discount: -14, badge: null, badgeColor: "", rating: 4.9, reviews: 264, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100030.jpg", category: "Portage" },
  { id: "BC041045340", name: "Poussette Windoo Plus Forest Green", brand: "BÉBÉCONFORT", price: 199.90, originalPrice: 239.90, discount: -17, badge: "Promo", badgeColor: "#ef4444", rating: 4.5, reviews: 43, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045340.jpg", category: "Poussettes" },
  { id: "BA051864035", name: "Siège auto One+ All Black", brand: "BABYBJÖRN", price: 419.00, originalPrice: 479.00, discount: -13, badge: null, badgeColor: "", rating: 4.9, reviews: 398, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864035.jpg", category: "Éco & Bio" },
  { id: "HA051864070", name: "Lit cododo FleXi Sleep Natural", brand: "HAUCK", price: 89.90, originalPrice: 109.90, discount: -18, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 62, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864070.jpg", category: "Éco & Bio" },
  { id: "CI051864055", name: "Siège auto Sirona T i-Size Plus", brand: "CYBEX", price: 499.00, originalPrice: 569.00, discount: -12, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 221, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864055.jpg", category: "Éco & Bio" },
  { id: "JI041424645", name: "Chaise haute mimzy 360 Explore Nature", brand: "JOIE", price: 139.90, originalPrice: 169.90, discount: -18, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 29, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424645.jpg", category: "Chaises hautes" },
  { id: "NA081456435", name: "Peluche tortue lumineuse coton bio", brand: "NATTOU", price: 39.90, originalPrice: 49.90, discount: -20, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 55, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456435.jpg", category: "Éco & Bio" },
  { id: "MA041045340", name: "Parasol universel poussette Sage", brand: "MACLAREN", price: 49.00, originalPrice: 59.00, discount: -17, badge: null, badgeColor: "", rating: 4.5, reviews: 14, tag: "Confort UV", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045340.jpg", category: "Éco & Bio" },
  { id: "ER046100035", name: "Écharpe de portage Organic Cotton", brand: "ERGOBABY", price: 69.00, originalPrice: 89.00, discount: -22, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 78, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100035.jpg", category: "Portage" },
  { id: "HA051864075", name: "Baignoire pliable Aqua Fold Stone", brand: "HAUCK", price: 59.90, originalPrice: 74.90, discount: -20, badge: null, badgeColor: "", rating: 4.5, reviews: 33, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864075.jpg", category: "Éco & Bio" },
  { id: "BC041045345", name: "Poussette Leona2 Essential Black", brand: "BÉBÉCONFORT", price: 449.90, originalPrice: 519.90, discount: -13, badge: null, badgeColor: "", rating: 4.6, reviews: 87, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045345.jpg", category: "Poussettes" },
  { id: "CI051864060", name: "Poussette Gazelle S Seashell Beige", brand: "CYBEX", price: 849.00, originalPrice: 949.00, discount: -11, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 342, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864060.jpg", category: "Poussettes" },
  { id: "JI041424650", name: "Porte-bébé Savvy Sandy", brand: "JOIE", price: 69.90, originalPrice: 89.90, discount: -22, badge: "Promo", badgeColor: "#ef4444", rating: 4.5, reviews: 41, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424650.jpg", category: "Portage" },
  { id: "NA081456440", name: "Veilleuse musicale Sleepy Sheep Bio", brand: "NATTOU", price: 44.90, originalPrice: 54.90, discount: -18, badge: "Éco", badgeColor: "#16a34a", rating: 4.9, reviews: 117, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456440.jpg", category: "Éco & Bio" },
  { id: "IA051844395", name: "Transat inclinable Amaze+ Forest", brand: "NANIA", price: 64.90, originalPrice: 99.90, discount: -35, badge: "Outlet", badgeColor: "#6b7280", rating: 4.4, reviews: 25, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844395.jpg", category: "Éveil" },
  { id: "BA051864040", name: "Bouncer Balance Soft Bliss Cotton", brand: "BABYBJÖRN", price: 289.00, originalPrice: 329.00, discount: -12, badge: null, badgeColor: "", rating: 4.8, reviews: 209, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864040.jpg", category: "Éveil" },
  { id: "HA051864080", name: "Pack duo Rapid Plus 15 Natural", brand: "HAUCK", price: 329.90, originalPrice: 399.90, discount: -18, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 68, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864080.jpg", category: "Poussettes" },
  { id: "CI051864065", name: "Siège auto Aton 5 Plus Seashell", brand: "CYBEX", price: 229.00, originalPrice: 269.00, discount: -15, badge: null, badgeColor: "", rating: 4.7, reviews: 94, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864065.jpg", category: "Éco & Bio" },
  { id: "MA041045345", name: "Protection pluie universelle Clear", brand: "MACLAREN", price: 29.00, originalPrice: 35.00, discount: -17, badge: null, badgeColor: "", rating: 4.4, reviews: 22, tag: "Waterproof", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045345.jpg", category: "Éco & Bio" },
  { id: "JI041424655", name: "Chaise haute Snacker2 Harvest", brand: "JOIE", price: 99.90, originalPrice: 129.90, discount: -23, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 47, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424655.jpg", category: "Chaises hautes" },
  { id: "ER046100040", name: "Porte-bébé Carrier Original Natural", brand: "ERGOBABY", price: 119.00, originalPrice: 149.00, discount: -20, badge: null, badgeColor: "", rating: 4.8, reviews: 331, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100040.jpg", category: "Portage" },
  { id: "BC041045350", name: "Poussette Streety Plus Nomad Blue", brand: "BÉBÉCONFORT", price: 279.90, originalPrice: 329.90, discount: -15, badge: null, badgeColor: "", rating: 4.5, reviews: 53, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045350.jpg", category: "Poussettes" },
  { id: "NA081456445", name: "Arche d'éveil Luxe Lune Coton", brand: "NATTOU", price: 69.90, originalPrice: 89.90, discount: -22, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 44, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456445.jpg", category: "Éveil" },
  { id: "HA051864085", name: "Chaise de table FleXi Fold Natural", brand: "HAUCK", price: 49.90, originalPrice: 69.90, discount: -29, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 71, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864085.jpg", category: "Chaises hautes" },
  { id: "CI051864070", name: "Poussette Talos S Lux Seashell", brand: "CYBEX", price: 1099.00, originalPrice: 1249.00, discount: -12, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 148, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864070.jpg", category: "Poussettes" },
  { id: "JI041424660", name: "Poussette Pact Pro Terrain", brand: "JOIE", price: 319.90, originalPrice: 379.90, discount: -16, badge: null, badgeColor: "", rating: 4.7, reviews: 83, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424660.jpg", category: "Poussettes" },
  { id: "BA051864045", name: "Lit bébé pliant Easy Go Natural", brand: "BABYBJÖRN", price: 229.00, originalPrice: 269.00, discount: -15, badge: null, badgeColor: "", rating: 4.7, reviews: 124, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864045.jpg", category: "Éco & Bio" },
  { id: "IA051844400", name: "Chaise haute booster Bébé Forest", brand: "NANIA", price: 34.90, originalPrice: 59.90, discount: -42, badge: "Outlet", badgeColor: "#6b7280", rating: 4.3, reviews: 19, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844400.jpg", category: "Chaises hautes" },
  { id: "NA081456450", name: "Coussin d'allaitement Milky Organic", brand: "NATTOU", price: 54.90, originalPrice: 69.90, discount: -21, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 88, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456450.jpg", category: "Éco & Bio" },
  { id: "ER046100045", name: "Wrap élastique Easy Stretch Sauge", brand: "ERGOBABY", price: 59.00, originalPrice: 79.00, discount: -25, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 56, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100045.jpg", category: "Portage" },
  { id: "BC041045355", name: "Coque auto Shell i-Size Mineral Black", brand: "BÉBÉCONFORT", price: 199.90, originalPrice: 249.90, discount: -20, badge: null, badgeColor: "", rating: 4.7, reviews: 76, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045355.jpg", category: "Éco & Bio" },
  { id: "HA051864090", name: "Barrière sécurité Squeeze Handle Natural", brand: "HAUCK", price: 39.90, originalPrice: 54.90, discount: -27, badge: null, badgeColor: "", rating: 4.5, reviews: 38, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864090.jpg", category: "Éco & Bio" },
  { id: "CI051864075", name: "Nacelle Cot S Seashell Beige", brand: "CYBEX", price: 299.00, originalPrice: 349.00, discount: -14, badge: null, badgeColor: "", rating: 4.8, reviews: 67, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864075.jpg", category: "Éco & Bio" },
  { id: "MA041045350", name: "Moustiquaire universelle poussette", brand: "MACLAREN", price: 19.00, originalPrice: 25.00, discount: -24, badge: null, badgeColor: "", rating: 4.4, reviews: 11, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045350.jpg", category: "Éco & Bio" },
  { id: "JI041424665", name: "Poussette Litetrax E Terrain Cashew", brand: "JOIE", price: 649.90, originalPrice: 749.90, discount: -13, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.9, reviews: 176, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424665.jpg", category: "Poussettes" },
  { id: "NA081456455", name: "Tapis de parc Teddy Beige Cotton", brand: "NATTOU", price: 44.90, originalPrice: 59.90, discount: -25, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 31, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456455.jpg", category: "Éveil" },
  { id: "ER046100050", name: "Porte-bébé Embrace Plus Carbon", brand: "ERGOBABY", price: 129.00, originalPrice: 159.00, discount: -19, badge: null, badgeColor: "", rating: 4.8, reviews: 142, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100050.jpg", category: "Portage" },
  { id: "HA051864095", name: "Chaise haute Alpha+ Natural", brand: "HAUCK", price: 139.90, originalPrice: 169.90, discount: -18, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 198, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864095.jpg", category: "Chaises hautes" },
  { id: "BC041045360", name: "Poussette Melio Terracotta", brand: "BÉBÉCONFORT", price: 379.90, originalPrice: 449.90, discount: -16, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 65, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045360.jpg", category: "Poussettes" },
  { id: "CI051864080", name: "Sac à langer Priam Changing Bag", brand: "CYBEX", price: 189.00, originalPrice: 219.00, discount: -14, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.7, reviews: 39, tag: "Randonnée famille", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864080.jpg", category: "Éco & Bio" },
  { id: "BA051864050", name: "Couffin Soft Light Natural", brand: "BABYBJÖRN", price: 169.00, originalPrice: 199.00, discount: -15, badge: null, badgeColor: "", rating: 4.6, reviews: 57, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864050.jpg", category: "Éco & Bio" },
  { id: "JI041424670", name: "Couffin Terrain Sandy Beige", brand: "JOIE", price: 89.90, originalPrice: 109.90, discount: -18, badge: null, badgeColor: "", rating: 4.5, reviews: 33, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424670.jpg", category: "Éco & Bio" },
  { id: "NA081456460", name: "Hochet sensoriel coton bio jungle", brand: "NATTOU", price: 14.90, originalPrice: 19.90, discount: -25, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 82, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456460.jpg", category: "Éco & Bio" },
  { id: "HA051864100", name: "Parc pliant Traveller Mesh Olive", brand: "HAUCK", price: 99.90, originalPrice: 129.90, discount: -23, badge: null, badgeColor: "", rating: 4.5, reviews: 44, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864100.jpg", category: "Éco & Bio" },
  { id: "ER046100055", name: "Porte-bébé Aura Newborn Carrier", brand: "ERGOBABY", price: 89.00, originalPrice: 119.00, discount: -25, badge: "Promo", badgeColor: "#ef4444", rating: 4.8, reviews: 96, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100055.jpg", category: "Portage" },
  { id: "BC041045365", name: "Nacelle Massage Mineral Black", brand: "BÉBÉCONFORT", price: 149.90, originalPrice: 179.90, discount: -17, badge: null, badgeColor: "", rating: 4.6, reviews: 28, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045365.jpg", category: "Éco & Bio" },
  { id: "CI051864085", name: "Poussette Eezy S Twist+ 2 Leaf Green", brand: "CYBEX", price: 449.00, originalPrice: 519.00, discount: -13, badge: null, badgeColor: "", rating: 4.7, reviews: 111, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864085.jpg", category: "Poussettes" },
  { id: "MA041045355", name: "Tablette repas Quest Transparent", brand: "MACLAREN", price: 35.00, originalPrice: 45.00, discount: -22, badge: null, badgeColor: "", rating: 4.3, reviews: 9, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045355.jpg", category: "Chaises hautes" },
  { id: "JI041424675", name: "Siège auto Spin 360 GTi Ember", brand: "JOIE", price: 399.90, originalPrice: 459.90, discount: -13, badge: "Nouveau", badgeColor: "#374151", rating: 4.9, reviews: 128, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424675.jpg", category: "Éco & Bio" },
  { id: "IA051844405", name: "Chaise haute Cosmo+ Rose Gold", brand: "NANIA", price: 49.90, originalPrice: 89.90, discount: -44, badge: "Outlet", badgeColor: "#6b7280", rating: 4.4, reviews: 14, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844405.jpg", category: "Chaises hautes" },
  { id: "NA081456465", name: "Chaise longue plage bébé Sun & Sand", brand: "NATTOU", price: 74.90, originalPrice: 94.90, discount: -21, badge: null, badgeColor: "", rating: 4.5, reviews: 26, tag: "Confort UV", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456465.jpg", category: "Éveil" },
  { id: "HA051864105", name: "Lit parapluie Dream'n Play Plus Forest", brand: "HAUCK", price: 109.90, originalPrice: 134.90, discount: -19, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 73, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864105.jpg", category: "Éco & Bio" },
  { id: "BC041045370", name: "Pack duo Elaris PureCosi Terracotta", brand: "BÉBÉCONFORT", price: 699.90, originalPrice: 799.90, discount: -13, badge: null, badgeColor: "", rating: 4.7, reviews: 54, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045370.jpg", category: "Poussettes" },
  { id: "CI051864090", name: "Poussette Balios S Lux Autumn Gold", brand: "CYBEX", price: 749.00, originalPrice: 849.00, discount: -12, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.8, reviews: 189, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864090.jpg", category: "Poussettes" },
  { id: "ER046100060", name: "Porte-bébé Evolve3 Stretchy Wrap Sage", brand: "ERGOBABY", price: 74.00, originalPrice: 94.00, discount: -21, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 63, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100060.jpg", category: "Portage" },
  { id: "BA051864055", name: "Protection solaire poussette SPF50", brand: "BABYBJÖRN", price: 49.00, originalPrice: 59.00, discount: -17, badge: null, badgeColor: "", rating: 4.5, reviews: 34, tag: "Confort UV", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864055.jpg", category: "Éco & Bio" },
  { id: "JI041424680", name: "Poussette Mytrax Flex Signature", brand: "JOIE", price: 529.90, originalPrice: 599.90, discount: -12, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.8, reviews: 144, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424680.jpg", category: "Poussettes" },
  { id: "NA081456470", name: "Doudou plat forêt coton bio", brand: "NATTOU", price: 17.90, originalPrice: 22.90, discount: -22, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 106, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456470.jpg", category: "Éco & Bio" },
  { id: "HA051864110", name: "Table à langer Boxy Fold Natural", brand: "HAUCK", price: 129.90, originalPrice: 159.90, discount: -19, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 41, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864110.jpg", category: "Éco & Bio" },
  { id: "BC041045375", name: "Coque Pebble 360 Pro i-Size Soho Grey", brand: "BÉBÉCONFORT", price: 349.90, originalPrice: 399.90, discount: -13, badge: null, badgeColor: "", rating: 4.8, reviews: 167, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045375.jpg", category: "Éco & Bio" },
  { id: "CI051864095", name: "Porte-bébé Go Hipster Plus Kiwi", brand: "CYBEX", price: 99.00, originalPrice: 129.00, discount: -23, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 72, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864095.jpg", category: "Portage" },
  { id: "MA041045360", name: "Housse de siège auto Sac Confort", brand: "MACLAREN", price: 29.00, originalPrice: 39.00, discount: -26, badge: null, badgeColor: "", rating: 4.3, reviews: 8, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045360.jpg", category: "Éco & Bio" },
  { id: "JI041424685", name: "Chaise haute Snacker Plus Leaf", brand: "JOIE", price: 119.90, originalPrice: 149.90, discount: -20, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 35, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424685.jpg", category: "Chaises hautes" },
  { id: "NA081456475", name: "Couverture bébé sherpa nature", brand: "NATTOU", price: 34.90, originalPrice: 44.90, discount: -22, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 49, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456475.jpg", category: "Éco & Bio" },
  { id: "ER046100065", name: "Sacoche de transport carrier OMNI", brand: "ERGOBABY", price: 49.00, originalPrice: 59.00, discount: -17, badge: null, badgeColor: "", rating: 4.5, reviews: 21, tag: "Randonnée famille", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100065.jpg", category: "Portage" },
  { id: "HA051864115", name: "Chaise haute Ingenuity Booster 3en1", brand: "HAUCK", price: 79.90, originalPrice: 99.90, discount: -20, badge: null, badgeColor: "", rating: 4.5, reviews: 56, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864115.jpg", category: "Chaises hautes" },
  { id: "BC041045380", name: "Poussette Buggy Noa+ Mineral Green", brand: "BÉBÉCONFORT", price: 199.90, originalPrice: 249.90, discount: -20, badge: "Promo", badgeColor: "#ef4444", rating: 4.4, reviews: 32, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045380.jpg", category: "Poussettes" },
  { id: "CI051864100", name: "Siège auto Pallas B4 Fix Plus Lux", brand: "CYBEX", price: 319.00, originalPrice: 369.00, discount: -14, badge: null, badgeColor: "", rating: 4.8, reviews: 118, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864100.jpg", category: "Éco & Bio" },
  { id: "BA051864060", name: "Transat Bliss Organic Dusty Green", brand: "BABYBJÖRN", price: 299.00, originalPrice: 349.00, discount: -14, badge: "Éco", badgeColor: "#16a34a", rating: 4.9, reviews: 234, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864060.jpg", category: "Éveil" },
  { id: "JI041424690", name: "Poussette Aire City Buggy Ember", brand: "JOIE", price: 129.90, originalPrice: 159.90, discount: -19, badge: null, badgeColor: "", rating: 4.5, reviews: 41, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424690.jpg", category: "Poussettes" },
  { id: "IA051844410", name: "Chaise haute Joie Mimzy NXT Wilderness", brand: "NANIA", price: 59.90, originalPrice: 109.90, discount: -45, badge: "Outlet", badgeColor: "#6b7280", rating: 4.4, reviews: 17, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844410.jpg", category: "Chaises hautes" },
  { id: "NA081456480", name: "Kit puericulture starter pack bio", brand: "NATTOU", price: 89.90, originalPrice: 119.90, discount: -25, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 63, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456480.jpg", category: "Éco & Bio" },
  { id: "ER046100070", name: "Porte-bébé 360 Carrier Performance", brand: "ERGOBABY", price: 199.00, originalPrice: 239.00, discount: -17, badge: null, badgeColor: "", rating: 4.9, reviews: 189, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100070.jpg", category: "Portage" },
  { id: "HA051864120", name: "Hamac de voyage Luxe Natural Cotton", brand: "HAUCK", price: 39.90, originalPrice: 54.90, discount: -27, badge: "Éco", badgeColor: "#16a34a", rating: 4.5, reviews: 28, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864120.jpg", category: "Éco & Bio" },
  { id: "BC041045385", name: "Poussette Steelie Fix+ Soho Black", brand: "BÉBÉCONFORT", price: 479.90, originalPrice: 549.90, discount: -13, badge: null, badgeColor: "", rating: 4.7, reviews: 79, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045385.jpg", category: "Poussettes" },
  { id: "CI051864105", name: "Siège auto Solution T i-Fix Autumn", brand: "CYBEX", price: 559.00, originalPrice: 639.00, discount: -13, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 97, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864105.jpg", category: "Éco & Bio" },
  { id: "MA041045365", name: "Couvre-pieds universel Thermic Forest", brand: "MACLAREN", price: 59.00, originalPrice: 72.00, discount: -18, badge: null, badgeColor: "", rating: 4.6, reviews: 23, tag: "Waterproof", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045365.jpg", category: "Éco & Bio" },
  { id: "JI041424695", name: "Moniteur vidéo Halo Grove Bamboo", brand: "JOIE", price: 159.90, originalPrice: 199.90, discount: -20, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 47, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424695.jpg", category: "Éco & Bio" },
  { id: "NA081456485", name: "Set vaisselle bambou bébé nature", brand: "NATTOU", price: 22.90, originalPrice: 29.90, discount: -23, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 74, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456485.jpg", category: "Éco & Bio" },
  { id: "ER046100075", name: "Porte-bébé Hip Seat Solo Sage", brand: "ERGOBABY", price: 109.00, originalPrice: 139.00, discount: -22, badge: "Promo", badgeColor: "#ef4444", rating: 4.6, reviews: 58, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100075.jpg", category: "Portage" },
  { id: "HA051864125", name: "Chaise haute Grow Up Eco Natural", brand: "HAUCK", price: 179.90, originalPrice: 214.90, discount: -16, badge: "Éco", badgeColor: "#16a34a", rating: 4.8, reviews: 93, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864125.jpg", category: "Chaises hautes" },
  { id: "BC041045390", name: "Pack trio Carbon Nomad Grey", brand: "BÉBÉCONFORT", price: 549.90, originalPrice: 629.90, discount: -13, badge: null, badgeColor: "", rating: 4.7, reviews: 88, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045390.jpg", category: "Poussettes" },
  { id: "CI051864110", name: "Habillage pluie Priam Transparent", brand: "CYBEX", price: 59.00, originalPrice: 72.00, discount: -18, badge: null, badgeColor: "", rating: 4.5, reviews: 17, tag: "Waterproof", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864110.jpg", category: "Éco & Bio" },
  { id: "BA051864065", name: "Filet de jeu extérieur Cotton Knot", brand: "BABYBJÖRN", price: 79.00, originalPrice: 99.00, discount: -20, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 37, tag: "Éveil naturel", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864065.jpg", category: "Éveil" },
  { id: "JI041424700", name: "Thermomètre de bain numérique", brand: "JOIE", price: 19.90, originalPrice: 27.90, discount: -29, badge: null, badgeColor: "", rating: 4.5, reviews: 88, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424700.jpg", category: "Éco & Bio" },
  { id: "IA051844415", name: "Chaise haute Felix+ Light Wood", brand: "NANIA", price: 69.90, originalPrice: 119.90, discount: -42, badge: "Outlet", badgeColor: "#6b7280", rating: 4.3, reviews: 13, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844415.jpg", category: "Chaises hautes" },
  { id: "NA081456490", name: "Bain de siège bébé bio herbal", brand: "NATTOU", price: 12.90, originalPrice: 17.90, discount: -28, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 51, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456490.jpg", category: "Éco & Bio" },
  { id: "ER046100080", name: "Extension écharpe Duo Dip Dye Forest", brand: "ERGOBABY", price: 59.00, originalPrice: 74.00, discount: -20, badge: null, badgeColor: "", rating: 4.6, reviews: 31, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100080.jpg", category: "Portage" },
  { id: "HA051864130", name: "Siège de bain Aqua Seat Forest", brand: "HAUCK", price: 34.90, originalPrice: 44.90, discount: -22, badge: null, badgeColor: "", rating: 4.4, reviews: 39, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864130.jpg", category: "Éco & Bio" },
  { id: "BC041045395", name: "Siège auto Pebble 360 Essential Black", brand: "BÉBÉCONFORT", price: 429.90, originalPrice: 499.90, discount: -14, badge: null, badgeColor: "", rating: 4.8, reviews: 142, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045395.jpg", category: "Éco & Bio" },
  { id: "CI051864115", name: "Poussette Libelle Tropical Blue", brand: "CYBEX", price: 399.00, originalPrice: 459.00, discount: -13, badge: "Nouveau", badgeColor: "#374151", rating: 4.7, reviews: 83, tag: "Légère & maniable", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864115.jpg", category: "Poussettes" },
  { id: "MA041045370", name: "Sac de couchage poussette All Seasons", brand: "MACLAREN", price: 75.00, originalPrice: 95.00, discount: -21, badge: null, badgeColor: "", rating: 4.5, reviews: 19, tag: "Waterproof", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045370.jpg", category: "Éco & Bio" },
  { id: "JI041424705", name: "Transat Serina2 Rotate Rosewood", brand: "JOIE", price: 219.90, originalPrice: 259.90, discount: -15, badge: "Bestseller", badgeColor: "#2D3A2A", rating: 4.8, reviews: 167, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424705.jpg", category: "Éveil" },
  { id: "NA081456495", name: "Lit bébé évolutif en bois naturel", brand: "NATTOU", price: 299.90, originalPrice: 369.90, discount: -19, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 48, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456495.jpg", category: "Éco & Bio" },
  { id: "ER046100085", name: "Porte-bébé All-In-One Adapt SoftFlex", brand: "ERGOBABY", price: 219.00, originalPrice: 259.00, discount: -15, badge: null, badgeColor: "", rating: 4.9, reviews: 274, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100085.jpg", category: "Portage" },
  { id: "HA051864135", name: "Balancelle électrique Rock N Relax Auto", brand: "HAUCK", price: 149.90, originalPrice: 179.90, discount: -17, badge: null, badgeColor: "", rating: 4.6, reviews: 82, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864135.jpg", category: "Éveil" },
  { id: "BC041045400", name: "Poussette Buggy Adorra2 Mineral Blue", brand: "BÉBÉCONFORT", price: 499.90, originalPrice: 569.90, discount: -12, badge: "Promo", badgeColor: "#ef4444", rating: 4.7, reviews: 74, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045400.jpg", category: "Poussettes" },
  { id: "CI051864120", name: "Pack duo Balios S Lux + Aton 5", brand: "CYBEX", price: 999.00, originalPrice: 1149.00, discount: -13, badge: "Premium", badgeColor: "#2D3A2A", rating: 4.9, reviews: 203, tag: "Sortie nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864120.jpg", category: "Poussettes" },
  { id: "BA051864070", name: "Siège de douche pliable Natural", brand: "BABYBJÖRN", price: 59.00, originalPrice: 74.00, discount: -20, badge: null, badgeColor: "", rating: 4.5, reviews: 46, tag: "Confort extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/a/400/ba051864070.jpg", category: "Éco & Bio" },
  { id: "JI041424710", name: "Coque auto i-Snug 2 Oyster", brand: "JOIE", price: 179.90, originalPrice: 219.90, discount: -18, badge: null, badgeColor: "", rating: 4.7, reviews: 59, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/j/i/400/ji041424710.jpg", category: "Éco & Bio" },
  { id: "IA051844420", name: "Chaise haute Minla 6en1 Natural", brand: "NANIA", price: 89.90, originalPrice: 149.90, discount: -40, badge: "Outlet", badgeColor: "#6b7280", rating: 4.5, reviews: 24, tag: "Bois & nature", slug: null, image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844420.jpg", category: "Chaises hautes" },
  { id: "NA081456500", name: "Sac de rangement bambou toilette bébé", brand: "NATTOU", price: 27.90, originalPrice: 36.90, discount: -24, badge: "Éco", badgeColor: "#16a34a", rating: 4.6, reviews: 35, tag: "Randonnée famille", slug: null, image: "https://www.centraledesmultiples.com/img_product/n/a/400/na081456500.jpg", category: "Éco & Bio" },
  { id: "ER046100090", name: "Ceinture de portage Carrier Belt Extension", brand: "ERGOBABY", price: 29.00, originalPrice: 39.00, discount: -26, badge: null, badgeColor: "", rating: 4.6, reviews: 22, tag: "Portage outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100090.jpg", category: "Portage" },
  { id: "HA051864140", name: "Poussette Rapid Plus 3en1 Dusty Green", brand: "HAUCK", price: 279.90, originalPrice: 339.90, discount: -18, badge: "Éco", badgeColor: "#16a34a", rating: 4.7, reviews: 91, tag: "Tout-terrain", slug: null, image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864140.jpg", category: "Poussettes" },
  { id: "BC041045405", name: "Nacelle Windoo+ Essential Graphite", brand: "BÉBÉCONFORT", price: 129.90, originalPrice: 159.90, discount: -19, badge: null, badgeColor: "", rating: 4.5, reviews: 26, tag: "Sommeil outdoor", slug: null, image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045405.jpg", category: "Éco & Bio" },
  { id: "CI051864125", name: "Siège auto Pallas G i-Size Lux Black", brand: "CYBEX", price: 449.00, originalPrice: 519.00, discount: -13, badge: null, badgeColor: "", rating: 4.8, reviews: 136, tag: "Sécurité route", slug: null, image: "https://www.centraledesmultiples.com/img_product/c/i/400/ci051864125.jpg", category: "Éco & Bio" },
  { id: "MA041045375", name: "Plateau repas éco-conçu bambou", brand: "MACLAREN", price: 39.00, originalPrice: 49.00, discount: -20, badge: "Éco", badgeColor: "#16a34a", rating: 4.5, reviews: 14, tag: "Repas en extérieur", slug: null, image: "https://www.centraledesmultiples.com/img_product/m/a/400/ma041045375.jpg", category: "Éco & Bio" },
];

const filters = ["Tous", "Poussettes", "Portage", "Chaises hautes", "Éveil", "Éco & Bio"];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={10} className={s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
        ))}
      </div>
      <span className="text-[10px] text-gray-400">({reviews})</span>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [wished, setWished] = useState(false);

  const inner = (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col h-full relative">
      {/* Badge */}
      {p.badge && (
        <span
          className="absolute top-2 left-2 z-10 text-[10px] px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: p.badgeColor,
            color: p.badgeColor === "#87A878" ? "#2D3A2A" : "white",
            fontWeight: 700,
          }}
        >
          {p.badge}
        </span>
      )}
      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished((w) => !w); }}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm hover:shadow transition-all"
      >
        <Heart size={13} className={wished ? "fill-rose-500 text-rose-500" : "text-gray-300"} />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1706459773588-20591994dca3?w=400&q=80";
          }}
        />
      </div>

      {/* Infos */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{p.brand}</p>
        <p className="text-xs text-gray-800 leading-snug line-clamp-2 flex-1" style={{ fontWeight: 700 }}>{p.name}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={10} className={s <= Math.round(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>{p.price.toFixed(2)} €</span>
          {p.originalPrice && (
            <span className="text-gray-400 line-through text-xs">{p.originalPrice.toFixed(2)} €</span>
          )}
          {p.discount && (
            <span className="text-red-400 text-[10px]" style={{ fontWeight: 600 }}>{p.discount}%</span>
          )}
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-white bg-[#87A878] hover:bg-[#6A9060] transition-colors"
          style={{ fontWeight: 600 }}
        >
          <ShoppingCart size={11} />
          Ajouter
        </button>
      </div>
    </div>
  );

  if (p.slug) return <Link to={p.slug} className="block h-full">{inner}</Link>;
  return <div className="h-full">{inner}</div>;
}

function FilterChip({ label, onActivate }: { label: string; onActivate: () => void }) {
  return (
    <button
      onClick={onActivate}
      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full border border-[#87A878] bg-[#F0F4EE] text-[#5A7A52] hover:bg-[#87A878] hover:text-white transition-all text-xs align-baseline"
      style={{ fontWeight: 500 }}
      title={`Filtrer par "${label}"`}
    >
      {label}
    </button>
  );
}

export function RetourNaturePage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(PRICE_MAX_GLOBAL);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeAdvancedCount =
    (priceMin > 0 || priceMax < PRICE_MAX_GLOBAL ? 1 : 0) +
    selectedBrands.length +
    selectedTags.length +
    (promoOnly ? 1 : 0);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const toggleTag = (t: string) =>
    setSelectedTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const resetAdvanced = () => {
    setPriceMin(0);
    setPriceMax(PRICE_MAX_GLOBAL);
    setSelectedBrands([]);
    setSelectedTags([]);
    setPromoOnly(false);
  };

  const filtered = allProducts.filter((p) => {
    if (activeFilter !== "Tous" && p.category !== activeFilter) return false;
    if (p.price < priceMin || p.price > priceMax) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedTags.length > 0 && !selectedTags.includes(p.tag)) return false;
    if (promoOnly && !p.discount) return false;
    return true;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero sobre ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
        <img src={heroImg} alt="Retour à la nature" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col justify-end w-full mx-auto px-6 md:px-10 pb-10">
          <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
            <Link to="/home" className="hover:text-white/80 transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Retour à la nature</span>
          </div>
          <h1 className="text-white mb-1" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.15 }}>
            Retour à la nature
          </h1>
          <p className="text-white/60 text-sm max-w-md">
            Une sélection d'équipements pour les familles qui aiment sortir.
          </p>
        </div>
      </div>

      {/* ── Corps ── */}
      <div className="w-full mx-auto px-6 md:px-10 py-8">

        {/* ── Bloc éditorial texte ── */}
        <div className="mb-10">
          <h2 className="text-gray-900 mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Vivez l'aventure avec bébé
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Forêt, plage, montagne ou simple balade en ville — les familles qui bougent méritent un équipement à la hauteur de leur style de vie. Notre sélection <span className="text-gray-700 font-semibold">« Retour à la nature »</span> rassemble les produits les plus adaptés aux sorties en plein air :{" "}
            <FilterChip label="poussettes tout-terrain" onActivate={() => { handleFilterChange("Poussettes"); toggleTag("Tout-terrain"); }} />,{" "}
            <FilterChip label="porte-bébés physiologiques" onActivate={() => { handleFilterChange("Portage"); toggleTag("Portage outdoor"); }} />,{" "}
            <FilterChip label="chaises hautes légères" onActivate={() => { handleFilterChange("Repas"); toggleTag("Repas en extérieur"); }} />{" "}
            et <FilterChip label="accessoires éco-conçus" onActivate={() => handleFilterChange("Accessoires")} />.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            Chaque article a été choisi pour sa robustesse, son respect de l'environnement et sa praticité au quotidien. Des grandes marques comme{" "}
            <FilterChip label="Ergobaby" onActivate={() => toggleBrand("ERGOBABY")} />,{" "}
            <FilterChip label="Cybex" onActivate={() => toggleBrand("CYBEX")} />,{" "}
            <FilterChip label="Hauck" onActivate={() => toggleBrand("HAUCK")} />{" "}
            ou <FilterChip label="Joie" onActivate={() => toggleBrand("JOIE")} />{" "}
            proposent des solutions pensées pour les parents actifs, sans jamais sacrifier le confort de bébé.
          </p>
        </div>

        {/* En-tête section produits */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-gray-900 text-base" style={{ fontWeight: 700 }}>Notre sélection</h2>
            <p className="text-gray-400 text-xs mt-0.5">{filtered.length} produits</p>
          </div>
          {/* Filtres inline */}
          <div className="flex gap-1.5 flex-wrap items-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-[#2D3A2A] border-[#2D3A2A] text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                showAdvanced || activeAdvancedCount > 0
                  ? "bg-[#87A878] border-[#6A9060] text-[#2D3A2A]"
                  : "border-dashed border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600"
              }`}
            >
              <SlidersHorizontal size={11} />
              Plus de filtres
              {activeAdvancedCount > 0 && (
                <span className="ml-0.5 bg-[#2D3A2A] text-white rounded-full w-4 h-4 flex items-center justify-center" style={{ fontSize: 9 }}>
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Panneau filtres avancés ── */}
        {showAdvanced && (
          <div ref={panelRef} className="mb-5 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Prix */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Prix</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 mb-1 block">Min</label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5 gap-1">
                      <input
                        type="number"
                        min={0}
                        max={priceMax}
                        value={priceMin}
                        onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                        className="w-full text-xs text-gray-700 outline-none bg-transparent"
                      />
                      <span className="text-xs text-gray-300">€</span>
                    </div>
                  </div>
                  <span className="text-gray-300 text-xs mt-4">—</span>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 mb-1 block">Max</label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5 gap-1">
                      <input
                        type="number"
                        min={priceMin}
                        max={PRICE_MAX_GLOBAL}
                        value={priceMax}
                        onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                        className="w-full text-xs text-gray-700 outline-none bg-transparent"
                      />
                      <span className="text-xs text-gray-300">€</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={PRICE_MAX_GLOBAL}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                  className="w-full accent-[#87A878] h-1"
                />
                <div className="flex justify-between text-[10px] text-gray-300 mt-0.5">
                  <span>0 €</span>
                  <span>{PRICE_MAX_GLOBAL} €</span>
                </div>
                {/* Promo toggle */}
                <button
                  onClick={() => setPromoOnly((v) => !v)}
                  className={`mt-3 w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border transition-all ${
                    promoOnly ? "bg-[#F0F4EE] border-[#87A878] text-[#5A7A52]" : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span>Promotions uniquement</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${promoOnly ? "bg-[#87A878] border-[#87A878]" : "border-gray-300"}`}>
                    {promoOnly && <div className="w-2 h-2 rounded-full bg-[#5A7A52]" />}
                  </div>
                </button>
              </div>

              {/* Marques */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Marque</p>
                <div className="flex flex-col gap-1.5">
                  {ALL_BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => toggleBrand(b)}
                      className={`flex items-center gap-2 text-xs text-left px-2 py-1.5 rounded-lg transition-all ${
                        selectedBrands.includes(b)
                          ? "bg-[#F0F4EE] text-[#5A7A52]"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        selectedBrands.includes(b) ? "bg-[#87A878] border-[#87A878]" : "border-gray-300"
                      }`}>
                        {selectedBrands.includes(b) && (
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#2D3A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </div>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="sm:col-span-2 lg:col-span-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Type de sortie</p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_TAGS.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedTags.includes(t)
                          ? "bg-[#87A878] border-[#6A9060] text-[#2D3A2A]"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer du panneau */}
            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/60">
              <button
                onClick={resetAdvanced}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <X size={11} />
                Réinitialiser
              </button>
              <button
                onClick={() => setShowAdvanced(false)}
                className="text-xs px-4 py-1.5 rounded-full bg-[#2D3A2A] text-white hover:bg-[#3A5432] transition-colors"
              >
                Voir {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}

        {/* Grille */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visible.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* Voir plus */}
        {hasMore && (
          <div className="flex flex-col items-center gap-2 mt-10 pb-6">
            <p className="text-gray-400 text-xs">{visible.length} / {filtered.length} produits affichés</p>
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm px-6 py-2.5 rounded-full hover:border-gray-500 hover:text-gray-900 transition-colors"
            >
              Voir plus
              <ChevronDown size={14} />
            </button>
          </div>
        )}

        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="text-center text-gray-300 text-xs mt-8 pb-6">
            Tous les {filtered.length} produits affichés
          </p>
        )}
      </div>
    </div>
  );
}
