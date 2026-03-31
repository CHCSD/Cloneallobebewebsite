import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from "lucide-react";
import chromeTrio2Img from "figma:asset/4dd7d161fa6d9680802dd8a4d65d3034ee3e71c4.png";

const bestSellers = [
  {
    id: "IA051844373",
    name: "Chaise haute lucie grise",
    brand: "NANIA",
    price: 39.90,
    originalPrice: 79.90,
    discount: -50,
    badge: "Outlet",
    badgeColor: "#6b7280",
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/i/a/400/ia051844373.jpg",
  },
  {
    id: "DP123456789",
    name: "Couches bébé taille 2 pack 1 mois 168 couches",
    brand: "PAMPERS",
    price: 45.90,
    originalPrice: 59.90,
    discount: -23,
    badge: "Abonnement",
    badgeColor: "#87A878",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1699877260026-8ecfdfc3ee86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZGlhcGVycyUyMHBhY2t8ZW58MXx8fHwxNzczNjcyNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "CY032669949",
    name: "Siège auto pliable i-size Solution G2 i-Fix Fog Grey",
    brand: "CYBEX",
    price: 158.00,
    originalPrice: 198.90,
    discount: -21,
    badge: "Promo",
    badgeColor: "#ef4444",
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/c/y/400/cy032669949.jpg",
  },
  {
    id: "JI041424600",
    name: "Poussette trio Chrome 2 + siège auto i-Snug 2 + nacelle Cashew",
    brand: "JOIE",
    price: 499.90,
    originalPrice: 569.90,
    discount: -12,
    isNew: true,
    badge: "Nouveau",
    badgeColor: "#374151",
    rating: 0,
    reviews: 0,
    image: chromeTrio2Img,
  },
  {
    id: "EU052105878",
    name: "Coffret biberons verre lin",
    brand: "MAM",
    price: 41.90,
    originalPrice: 47.90,
    discount: -13,
    rating: 4.9,
    reviews: 15,
    image: "https://www.centraledesmultiples.com/img_product/e/u/400/eu052105878.jpg",
  },
  {
    id: "JO081456409",
    name: "Tapis pouf avec arches Dia Teddy bouclette écru",
    brand: "NATTOU",
    price: 89.00,
    originalPrice: 109.90,
    discount: -19,
    isNew: true,
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/j/o/400/jo081456409.jpg",
  },
  {
    id: "KK041226794",
    name: "Siège auto xpedition3 i-size beige",
    brand: "KINDERKRAFT",
    price: 179.00,
    originalPrice: 199.00,
    discount: -10,
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/k/k/400/kk041226794.jpg",
  },
  {
    id: "CE068258219",
    name: "Matelas climatisé 100x70 cm pour lit contour Electra",
    brand: "COUPEY",
    price: 55.90,
    originalPrice: 69.90,
    discount: -20,
    rating: 5,
    reviews: 1,
    image: "https://www.centraledesmultiples.com/img_product/c/e/400/ce068258219.jpg",
  },
  {
    id: "BC041045304",
    name: "Poussette Soko Mineral Graphite",
    brand: "BEBECONFORT",
    price: 94.90,
    originalPrice: 109.90,
    discount: -14,
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/b/c/400/bc041045304.jpg",
  },
  {
    id: "ER046100005",
    name: "Porte-bébé Embrace noir intense",
    brand: "ERGOBABY",
    price: 79.00,
    originalPrice: 99.00,
    discount: -20,
    rating: 4.8,
    reviews: 5,
    image: "https://www.centraledesmultiples.com/img_product/e/r/400/er046100005.jpg",
  },
  {
    id: "HA051864049",
    name: "Chaise haute évolutive Beta+ naturelle",
    brand: "HAUCK",
    price: 119.90,
    originalPrice: 149.90,
    discount: -20,
    rating: 0,
    reviews: 0,
    image: "https://www.centraledesmultiples.com/img_product/h/a/400/ha051864049.jpg",
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  if (reviews === 0) return null;
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={10}
            className={s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
          />
        ))}
      </div>
      <span className="text-[10px] text-gray-400">({reviews})</span>
    </div>
  );
}



const PRODUCT_SLUGS: Record<string, string> = {
  "IA051844373": "/produit/chaise-haute-lucie",
  "JI041424600": "/produit/poussette-trio-chrome-2",
};

function ProductItem({ product }: { product: typeof bestSellers[0] }) {
  const [wished, setWished] = useState(false);
  const slug = PRODUCT_SLUGS[product.id];
  const navigate = useNavigate();

  const cardContent = (
    <div
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative cursor-pointer"
      onClick={() => slug && navigate(slug)}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className="absolute top-2 left-2 z-10 text-[10px] px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: product.badgeColor ?? "#87A878",
            color: product.badgeColor === "#87A878" ? "#2D3A2A" : "#fff",
            fontWeight: 700,
          }}
        >
          {product.badge}
        </span>
      )}
      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(!wished); }}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm hover:shadow-md transition-all"
      >
        <Heart size={13} className={wished ? "fill-rose-500 text-rose-500" : "text-gray-300"} />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1706459773588-20591994dca3?w=400&q=80";
          }}
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{product.brand}</p>
        <p className="text-xs text-gray-800 leading-snug line-clamp-2 flex-1" style={{ fontWeight: 700 }}>{product.name}</p>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>{product.price.toFixed(2)} €</span>
          {product.originalPrice && (
            <>
              <span className="text-gray-400 line-through text-xs">{product.originalPrice.toFixed(2)} €</span>
              <span className="text-red-400 text-[10px]" style={{ fontWeight: 600 }}>{product.discount}%</span>
            </>
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

  return cardContent;
}

export function FeaturedProducts() {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(bestSellers.length / itemsPerPage);
  const [page, setPage] = useState(0);
  const visible = bestSellers.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <section className="pt-6 pb-6 bg-white">
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl font-bold">
            Votre sélection personnalisée
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visible.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${page === i ? "bg-[#87A878] w-5" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}