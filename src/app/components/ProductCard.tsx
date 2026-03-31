import { useState } from "react";
import { Link } from "react-router";
import { Heart, Star, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
  slug?: string;
}

interface ProductCardProps {
  product: Product;
  href?: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false);
  const to = href ?? product.slug;
  const discount =
    product.discount ??
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) * -1
      : null);

  const inner = (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative">

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
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlist(!wishlist); }}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm hover:shadow-md transition-all"
      >
        <Heart size={13} className={wishlist ? "fill-rose-500 text-rose-500" : "text-gray-300"} />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1706459773588-20591994dca3?w=400&q=80";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{product.brand}</p>
        <p className="text-xs text-gray-800 leading-snug line-clamp-2 flex-1" style={{ fontWeight: 700 }}>
          {product.name}
        </p>

        {/* Stars */}
        {product.reviews > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={10}
                  className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>
            {product.price.toFixed(2)} €
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
          {discount && (
            <span className="text-red-400 text-[10px]" style={{ fontWeight: 600 }}>
              {discount}%
            </span>
          )}
        </div>

        {/* CTA */}
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

  if (to) return <Link to={to} className="block h-full">{inner}</Link>;
  return <div className="h-full">{inner}</div>;
}
