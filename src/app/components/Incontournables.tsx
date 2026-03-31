import { Baby, ShoppingBag, Heart, Car, BedSingle, Moon, Tent, Layout, Armchair, Utensils, Puzzle, Smile, Shapes, Bath, Grid, Radio } from "lucide-react";

const items = [
  { name: "Poussette", icon: Baby, href: "#" },
  { name: "Sac à langer", icon: ShoppingBag, href: "#" },
  { name: "Porte bébé", icon: Heart, href: "#" },
  { name: "Siège auto", icon: Car, href: "#" },
  { name: "Berceau bébé", icon: BedSingle, href: "#" },
  { name: "Veilleuse bébé", icon: Moon, href: "#" },
  { name: "Lit parapluie", icon: Tent, href: "#" },
  { name: "Matelas bébé", icon: Layout, href: "#" },
  { name: "Chaise haute", icon: Armchair, href: "#" },
  { name: "Robot cuisine", icon: Utensils, href: "#" },
  { name: "Tapis d'éveil", icon: Puzzle, href: "#" },
  { name: "Transat bébé", icon: Smile, href: "#" },
  { name: "Jouet bébé", icon: Shapes, href: "#" },
  { name: "Baignoire bébé", icon: Bath, href: "#" },
  { name: "Parc bébé", icon: Grid, href: "#" },
  { name: "Babyphone", icon: Radio, href: "#" },
];

export function Incontournables() {
  return (
    <section className="py-6 bg-white border-t border-gray-100">
      <div className="w-full px-2 sm:px-4">
        <h2 className="text-gray-900 mb-6 text-center text-2xl font-bold">
          Les incontournables
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-3 group hover:-translate-y-1 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 border border-gray-100 group-hover:border-[#87A878] group-hover:bg-[#F0F4EE] flex items-center justify-center text-[#5A7A52] transition-colors shadow-sm group-hover:shadow-md">
                <item.icon size={32} strokeWidth={1.2} />
              </div>
              <span className="text-xs md:text-sm font-medium text-center text-gray-600 group-hover:text-[#5A7A52] transition-colors leading-tight">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}