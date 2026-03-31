const categories = [
  {
    id: 1,
    name: "Poussettes",
    image: "https://images.unsplash.com/photo-1706459773588-20591994dca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc3Ryb2xsZXIlMjBwcmFtfGVufDF8fHx8MTc3MjAyNjc2MXww&ixlib=rb-4.1.0&q=80&w=400",
    count: "1 240 produits",
    color: "bg-gray-50 hover:bg-gray-100",
    accent: "text-gray-500",
  },
  {
    id: 2,
    name: "Siège auto",
    image: "https://images.unsplash.com/photo-1582601636383-5a37c4748791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyJTIwc2VhdCUyMHNhZmV0eXxlbnwxfHx8fDE3NzIwMjY3NjJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    count: "586 produits",
    color: "bg-slate-50 hover:bg-slate-100",
    accent: "text-slate-500",
  },
  {
    id: 3,
    name: "Chambre & Literie",
    image: "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwbnVyc2VyeSUyMHJvb218ZW58MXx8fHwxNzcyMDI2NzYxfDA&ixlib=rb-4.1.0&q=80&w=400",
    count: "932 produits",
    color: "bg-stone-50 hover:bg-stone-100",
    accent: "text-stone-500",
  },
  {
    id: 4,
    name: "Bain & Soin",
    image: "https://images.unsplash.com/photo-1623707430616-d9f956bcac2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZmVlZGluZyUyMGJvdHRsZSUyMG1pbGt8ZW58MXx8fHwxNzcyMDI2NzY0fDA&ixlib=rb-4.1.0&q=80&w=400",
    count: "720 produits",
    color: "bg-zinc-50 hover:bg-zinc-100",
    accent: "text-zinc-500",
  },
  {
    id: 5,
    name: "Éveil & Jeux",
    image: "https://images.unsplash.com/photo-1768198566756-c4395ca31b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJhYnklMjBwbGF5aW5nJTIwdG95c3xlbnwxfHx8fDE3NzIwMjY3NjJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    count: "1 580 produits",
    color: "bg-gray-50 hover:bg-gray-100",
    accent: "text-gray-500",
  },
  {
    id: 6,
    name: "Alimentation",
    image: "https://images.unsplash.com/photo-1765353225650-2280f21cb79e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3MjAyNjc2MXww&ixlib=rb-4.1.0&q=80&w=400",
    count: "440 produits",
    color: "bg-neutral-50 hover:bg-neutral-100",
    accent: "text-neutral-500",
  },
  {
    id: 7,
    name: "Vêtements",
    image: "https://images.unsplash.com/photo-1766918780914-e19d9de76d85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2xvdGhlcyUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MjAyNjc2NXww&ixlib=rb-4.1.0&q=80&w=400",
    count: "2 100 produits",
    color: "bg-slate-50 hover:bg-slate-100",
    accent: "text-slate-500",
  },
  {
    id: 8,
    name: "Maternité",
    image: "https://images.unsplash.com/photo-1643758320039-1957929059c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVnbmFudCUyMG1vdGhlciUyMG1hdGVybml0eXxlbnwxfHx8fDE3NzIwMjY3NjZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    count: "380 produits",
    color: "bg-stone-50 hover:bg-stone-100",
    accent: "text-stone-500",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Nos Univers
          </h2>
          <a href="#" className="text-gray-600 text-sm hover:underline">
            Voir tous les rayons →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className={`${cat.color} rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group border border-gray-100`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <div className="text-gray-900 text-sm font-semibold">{cat.name}</div>
                <div className={`text-xs ${cat.accent}`}>{cat.count}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}