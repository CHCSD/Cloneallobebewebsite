import { Link } from "react-router";
import { Recycle, Euro, Truck, ShieldCheck, ArrowRight, Leaf, Sparkles, Check, PackageOpen, HeartHandshake, BoxSelect, ArrowDownCircle, RefreshCw } from "lucide-react";

export function GainPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-hidden">
      
      {/* ── Hero Section (Global Vision) ─────────────────────────── */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-36 bg-[#F4F7F2] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#87A878]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#87A878]/15 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 bg-white border border-[#87A878]/30 text-[#5A7A52] shadow-sm">
            <Recycle size={16} className="text-[#87A878]" />
            Le programme circulaire d'Allobébé
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            La puériculture responsable a désormais un nom : <span className="text-[#5A7A52]">@gain</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-14 leading-relaxed font-light max-w-3xl mx-auto">
            L'arrivée d'un enfant bouleverse nos vies et notre consommation. Avec <strong className="text-gray-900 font-semibold">@gain</strong>, nous rassemblons 3 programmes concrets pour donner une seconde vie aux produits, lutter contre le gaspillage et préserver votre budget.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Nav Card 1 */}
            <button onClick={() => scrollToSection('reprise')} className="bg-white p-6 rounded-3xl shadow-xl shadow-[#87A878]/10 border border-gray-100 hover:border-[#87A878]/50 hover:-translate-y-1 transition-all text-left group">
              <div className="w-12 h-12 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] mb-4 group-hover:bg-[#5A7A52] group-hover:text-white transition-colors">
                <Euro size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">La Reprise</h3>
              <p className="text-sm text-gray-600">Revendez vos articles devenus trop petits et récupérez du pouvoir d'achat.</p>
            </button>

            {/* Nav Card 2 */}
            <button onClick={() => scrollToSection('imparfaits')} className="bg-white p-6 rounded-3xl shadow-xl shadow-[#87A878]/10 border border-gray-100 hover:border-[#87A878]/50 hover:-translate-y-1 transition-all text-left group">
              <div className="w-12 h-12 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] mb-4 group-hover:bg-[#5A7A52] group-hover:text-white transition-colors">
                <PackageOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Les Imparfaits</h3>
              <p className="text-sm text-gray-600">Produits neufs dont l'emballage est abîmé, proposés à prix réduits. Zéro gâchis.</p>
            </button>

            {/* Nav Card 3 */}
            <button onClick={() => scrollToSection('location')} className="bg-white p-6 rounded-3xl shadow-xl shadow-[#87A878]/10 border border-gray-100 hover:border-[#87A878]/50 hover:-translate-y-1 transition-all text-left group">
              <div className="w-12 h-12 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] mb-4 group-hover:bg-[#5A7A52] group-hover:text-white transition-colors">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">La Location</h3>
              <p className="text-sm text-gray-600">Louez vos équipements, adaptez-les à la croissance de bébé et préservez votre budget.</p>
            </button>
          </div>
          
          <div className="mt-16 animate-bounce flex justify-center text-gray-400">
            <ArrowDownCircle size={32} strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* ── Pillar 1: La Reprise ────────────────────────────────────────────── */}
      <section id="reprise" className="py-24 bg-white scroll-mt-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYWJ5JTIwY2xvdGhlcyUyMGVjb3xlbnwxfHx8fDE3MjU1MzQ3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Seconde main Reprise"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-6 -right-6 bg-[#2D3A2A] text-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles size={20} className="text-[#87A878]" />
                  <span className="font-bold">Bonus de reprise</span>
                </div>
                <p className="text-sm text-gray-300">Choisissez un paiement en bon d'achat et profitez d'un abondement de +15% sur la valeur estimée.</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#5A7A52] mb-3 flex items-center gap-2">
                <Euro size={16} /> Programme 01
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                La Reprise Seconde Main
              </h3>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Les enfants grandissent trop vite. Libérez de l'espace dans vos placards en nous revendant les articles de puériculture qui ne vous servent plus. Nous les rachetons directement, sans attente d'un acheteur.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] font-black text-xl">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Estimez la valeur</h4>
                    <p className="text-gray-600">Recherchez le modèle exact ou scannez son code-barres pour obtenir une offre ferme.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] font-black text-xl">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Envoyez gratuitement</h4>
                    <p className="text-gray-600">Imprimez l'étiquette prépayée et déposez votre colis en point relais. Aucun frais pour vous.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#F4F7F2] flex items-center justify-center text-[#5A7A52] font-black text-xl">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Recevez vos fonds</h4>
                    <p className="text-gray-600">Paiement garanti sous 48h après contrôle qualité, par virement bancaire ou bon d'achat.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button className="bg-[#5A7A52] text-white px-8 py-4 rounded-full font-bold hover:bg-[#486341] transition-all flex items-center gap-2">
                  Estimer un article <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar 2: Les Imparfaits ────────────────────────────────────────────── */}
      <section id="imparfaits" className="py-24 bg-[#FAF9F6] border-y border-gray-100 scroll-mt-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#A08875] mb-3 flex items-center gap-2">
                <PackageOpen size={16} /> Programme 02
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                L'Outlet : Les Imparfaits
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Saviez-vous que des milliers de produits parfaitement neufs sont détruits chaque année simplement parce que leur carton a été endommagé pendant le transport ?
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Chez Allobébé, nous avons dit <strong>STOP au gaspillage</strong>. Notre rayon "Les Imparfaits" vous propose ces articles à des prix imbattables. Le produit est 100% neuf, contrôlé par nos experts, seul son emballage porte les marques de son voyage.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <Check size={20} className="text-[#A08875]" /> Réductions allant de -15% à -40%
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <Check size={20} className="text-[#A08875]" /> Produits neufs et intacts garantis
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <Check size={20} className="text-[#A08875]" /> Même garantie constructeur qu'un produit classique
                </li>
              </ul>

              <button className="bg-white text-[#A08875] border-2 border-[#A08875] px-8 py-4 rounded-full font-bold hover:bg-[#A08875] hover:text-white transition-all flex items-center gap-2">
                Voir la sélection Outlet <ArrowRight size={18} />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-full bg-[#EFECE8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] -z-10 blur-3xl" />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1631010231888-777b6285ef84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYm9hcmQlMjBib3glMjBwYWNrYWdlJTIwYmFieXxlbnwxfHx8fDE3NzM4MjU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Carton endommagé"
                  className="rounded-[2rem] w-full h-full object-cover shadow-lg translate-y-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1769867626781-c6144768b945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc3Ryb2xsZXIlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzczODI1Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Produit neuf intérieur"
                  className="rounded-[2rem] w-full h-full object-cover shadow-lg -translate-y-8"
                />
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-2xl z-10 border-4 border-[#FAF9F6]">
                <div className="w-16 h-16 rounded-full bg-[#A08875] flex items-center justify-center text-white">
                  <BoxSelect size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar 3: La Location ────────────────────────────────────────────── */}
      <section id="location" className="py-24 bg-[#2D3A2A] text-white scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5A7A52]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative rounded-[2rem] overflow-hidden aspect-[4/3] border-4 border-[#3D4C3A]">
              <img 
                src="https://images.unsplash.com/photo-1658046157342-ae13ce3a22c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwaGlnaCUyMGNoYWlyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3MzgyNjM0NXww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Bébé joyeux équipement location"
                className="w-full h-full object-cover opacity-90 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A2A] via-[#2D3A2A]/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-[#87A878] items-center justify-center text-[#2D3A2A] mb-4 shadow-lg">
                  <RefreshCw size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-2">Louez, changez, souriez</h4>
                <p className="text-gray-300">Des formules sans engagement dès 3 mois.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#87A878] mb-3 flex items-center gap-2">
                <RefreshCw size={16} /> Programme 03
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black mb-6">
                La Location Évolutive
              </h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
                Pourquoi acheter un équipement qui ne servira que quelques mois ? Avec notre service de location, vous profitez des meilleurs produits (poussettes, chaises hautes, sièges auto) pendant la durée exacte où vous en avez besoin.
              </p>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light">
                Dès que votre enfant grandit, renvoyez l'article gratuitement et passez à la taille supérieure. Les mensualités s'arrêtent, l'article est remis à neuf pour une autre famille.
              </p>
              
              <div className="bg-[#3D4C3A] rounded-2xl p-6 mb-10 border border-[#5A7A52]/50">
                <h4 className="font-bold text-xl mb-2 text-white flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#87A878]" /> Assurance 100% incluse
                </h4>
                <p className="text-gray-300 text-sm">
                  Taches rebelles, rayures ou petits incidents du quotidien : notre assurance couvre toutes les détériorations accidentelles. Vous pouvez utiliser le produit l'esprit léger.
                </p>
              </div>

              <button className="bg-[#87A878] text-[#2D3A2A] px-8 py-4 rounded-full font-bold hover:bg-white transition-colors flex items-center gap-2">
                Voir nos offres de location <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ────────────────────────────────────────────── */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Leaf size={48} className="text-[#5A7A52] mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl font-black text-gray-900 mb-6">Participez à la boucle @gain</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Rejoignez les milliers de parents qui ont déjà fait le choix d'une consommation plus maligne, plus économique et plus respectueuse de notre planète.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/home" className="bg-[#5A7A52] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#486341] transition-all shadow-xl shadow-[#5A7A52]/20">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
