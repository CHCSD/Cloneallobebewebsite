const problemCards = [
  {
    id: 1,
    problem: "Bébé ne dort pas ?",
    solution: "Nos solutions sommeil testées et approuvées par les parents",
    cta: "Voir les solutions",
    image: "https://images.unsplash.com/photo-1662368355359-830b331349ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXAlMjBuaWdodCUyMHRpcmVkJTIwcGFyZW50fGVufDF8fHx8MTc3MjEyMDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Sommeil",
    tagColor: "#7d9e7e",
  },
  {
    id: 2,
    problem: "Diversification : par où commencer ?",
    solution: "Ustensiles, chaises hautes et conseils pour passer le cap sereinement",
    cta: "Découvrir",
    image: "https://images.unsplash.com/photo-1544829832-c8047d6b9d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZm9vZCUyMGZpcnN0JTIwbWVhbCUyMHB1ciVDMyVBOWUlMjBzcG9vbnxlbnwxfHx8fDE3NzIxMjAxODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Alimentation",
    tagColor: "#e07b52",
  },
  {
    id: 3,
    problem: "Se déplacer avec bébé",
    solution: "Poussette, porte-bébé ou écharpe : trouvez votre duo idéal",
    cta: "Je choisis",
    image: "https://images.unsplash.com/photo-1718259146406-767054318347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBiYWJ5JTIwY2FycmllciUyMHdyYXAlMjBvdXRkb29yc3xlbnwxfHx8fDE3NzIxMjAxODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Mobilité",
    tagColor: "#5b8fa8",
  },
  {
    id: 4,
    problem: "Sécuriser la maison",
    solution: "Barrières, coins de table, babyphones : protégez chaque recoin",
    cta: "Sécuriser",
    image: "https://images.unsplash.com/photo-1618675634386-dff9e1c552c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMGNhcmUlMjBiYXRoJTIwc2FmZXR5fGVufDF8fHx8MTc3MjEyMDE5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Sécurité",
    tagColor: "#9b7dc8",
  },
];

export function PromoBanners() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="w-full px-4">
        {/* 4 square problem-solution cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {problemCards.map((card) => (
            <a
              key={card.id}
              href="#"
              className="group relative overflow-hidden rounded-xl cursor-pointer block"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.problem}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Tag */}
              <span
                className="absolute top-3 left-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: card.tagColor }}
              >
                {card.tag}
              </span>

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-bold leading-snug mb-1">
                  {card.problem}
                </p>
                <p className="text-white/75 text-xs leading-snug mb-3 line-clamp-2">
                  {card.solution}
                </p>
                <span className="inline-block text-white text-xs border border-white/60 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors">
                  {card.cta} →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Big promo banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1f2937] to-[#374151] group">
          <div className="relative flex flex-col md:flex-row items-center p-6 md:p-10 gap-6 min-h-[180px]">
            <div className="flex-1 text-white text-center md:text-left">
              <div className="text-white/60 text-sm mb-1 uppercase tracking-wider">Offre limitée</div>
              <h3 className="text-white mb-2" style={{ fontSize: "1.75rem", fontWeight: 800 }}>
                Soldes jusqu'à -50%
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Profitez de nos meilleures offres sur les poussettes, sièges auto et équipements bébé
              </p>
              <a
                href="#"
                className="bg-white text-gray-900 px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Voir toutes les promos
              </a>
            </div>
            <div className="flex gap-4">
              {[
                { label: "Poussettes", discount: "-40%" },
                { label: "Sièges auto", discount: "-30%" },
                { label: "Puériculture", discount: "-50%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="text-white font-black" style={{ fontSize: "1.5rem" }}>{item.discount}</div>
                  <div className="text-white/80 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}