import { Heart, Gift, Truck, Star, Users, Copy, Check } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function LeCerclePage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://allobebe.fr/cercle/marie-84";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F4EE] pb-20">
      {/* Hero Section */}
      <section className="bg-white pt-12 pb-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-[#E2EBE0] rounded-full mb-6">
            <Star className="text-[#87A878]" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue dans Le Cercle</h1>
          <p className="text-lg text-gray-600 mb-8">
            Notre programme de fidélité pensé pour vous accompagner à chaque étape. 
            Rejoignez notre communauté et profitez d'avantages exclusifs dès aujourd'hui !
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/home" 
              className="px-8 py-3 bg-[#87A878] text-white rounded-full font-semibold hover:bg-[#6A9060] transition-colors shadow-sm"
            >
              Créer mon compte
            </Link>
            <Link 
              to="/home" 
              className="px-8 py-3 bg-white text-[#87A878] border-2 border-[#87A878] rounded-full font-semibold hover:bg-[#F0F4EE] transition-colors"
            >
              Je suis déjà membre
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
          Vos avantages membres
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🌟",
              title: "Devenez Ambassadeur",
              desc: "Votre voix compte ! Cumulez des points exclusifs en partageant votre expérience @llobébé avec notre communauté."
            },
            {
              icon: "🎁",
              title: "Points fidélité",
              desc: "Avec chaque commande, cumulez des points de fidélité à utiliser sur vos prochains achats."
            },
            {
              icon: "🛍️",
              title: "Shopper VIP",
              desc: "Ligne directe et rendez-vous prioritaires avec nos experts."
            },
            {
              icon: "🧸",
              title: "Tests de produits",
              desc: "Rejoignez notre panel de parents testeurs et découvrez gratuitement les nouveautés en avant-première."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-50 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Parrainage (Bouche à oreille) */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-[#87A878] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Users size={160} />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Users size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Le bouche à oreille paie !</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Faites découvrir Le Cercle à vos proches. Pour chaque amie qui nous rejoint via votre lien, 
              vous recevez <strong>15€ en bon d'achat</strong> et elle bénéficie de <strong>-10% supplémentaires</strong> sur sa première commande.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <div className="flex items-center w-full bg-white rounded-full px-5 py-3 shadow-inner text-gray-700">
                <span className="truncate flex-1 text-left font-medium">{referralLink}</span>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2D3A2A] text-white rounded-full font-semibold hover:bg-gray-900 transition-colors w-full md:w-auto flex-shrink-0"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copié !" : "Copier le lien"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}