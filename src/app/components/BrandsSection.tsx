import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const featuredBrands = [
  { name: "Cybex", bg: "#f0f4f8", color: "#1a202c", image: "https://images.unsplash.com/photo-1582601636383-5a37c4748791?w=400&q=80&fit=crop" },
  { name: "Badabulle", bg: "#fff7ed", color: "#9a3412", image: "https://images.unsplash.com/photo-1623707430616-d9f956bcac2b?w=400&q=80&fit=crop" },
  { name: "Babymoov", bg: "#f0fdf4", color: "#14532d", image: "https://images.unsplash.com/photo-1768198566756-c4395ca31b29?w=400&q=80&fit=crop" },
  { name: "Chicco", bg: "#fef2f2", color: "#7f1d1d", image: "https://images.unsplash.com/photo-1542901689-8917f44e3541?w=400&q=80&fit=crop" },
];

const allBrands = [
  "Beaba", "Joie", "Jane", "Sauthon", "Candide", "Renolux",
  "Red Castle", "Philips Avent", "Done by Deer", "Babynat",
  "Bemini", "Tigex", "Maxi-Cosi", "Stokke", "Bugaboo", "Nuna",
];

export function BrandsSection() {
  return (
    <section className="py-8 md:py-10 bg-white border-t border-gray-100">
      <div className="w-full px-2 sm:px-4">
        
        {/* En-tête unifié */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-gray-900 mb-2 text-2xl font-bold">
              Vos marques préférées
            </h2>
            <p className="text-gray-500 text-sm max-w-lg">
              Découvrez nos marques à la une et explorez notre catalogue complet pour trouver l'équipement idéal pour bébé.
            </p>
          </div>
          <Link to="#" className="text-[#87A878] text-sm font-semibold hover:underline flex items-center gap-1 shrink-0">
            Voir toutes les marques <ArrowRight size={16} />
          </Link>
        </div>

        {/* Section Mixte : Grid asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Les 4 marques à la une prennent plus de place (ex: 8 colonnes sur 12) */}
          <div className="md:col-span-8 grid grid-cols-2 gap-4">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.name}
                to="#"
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-40 sm:h-48"
                style={{ backgroundColor: brand.bg }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 w-full flex items-center justify-between">
                  <span className="font-bold text-lg text-white tracking-wide">
                    {brand.name}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Découvrir
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Les autres marques (nuage de tags/boutons) dans le reste de l'espace (4 colonnes) */}
          <div className="md:col-span-4 bg-[#F0F4EE] rounded-2xl p-6 flex flex-col justify-center">
            <h3 className="text-[#5A7A52] font-bold mb-4 text-sm uppercase tracking-wider">
              Et bien plus encore...
            </h3>
            <div className="flex flex-wrap gap-2">
              {allBrands.map((brand) => (
                <Link
                  key={brand}
                  to="#"
                  className="bg-white border border-[#87A878]/30 rounded-full py-1.5 px-3 text-xs font-semibold text-gray-700 hover:border-[#87A878] hover:bg-[#87A878] hover:text-white transition-all shadow-sm"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
