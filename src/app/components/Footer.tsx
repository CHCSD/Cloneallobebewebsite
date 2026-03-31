import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#3A5432] text-gray-200">
      {/* Main footer content */}
      <div className="w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#87A878] text-xl">🍼</span>
            <span className="text-white text-lg tracking-wide">allo<span className="text-[#87A878]">bébé</span></span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-5">
            Depuis 1993, allobébé accompagne les futurs parents et les familles avec une sélection de produits de puériculture de qualité.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-[#87A878] transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#87A878] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#87A878] transition-colors">
              <Youtube size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#87A878] transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Liens utiles */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Liens utiles</h4>
          <ul className="space-y-2">
            {[
              { label: "Accueil", to: "/home" },
              { label: "Nouveautés", to: "/home" },
              { label: "Bons plans", to: "/home" },
              { label: "Liste de naissance", to: "/future-maman#liste" },
              { label: "🌸 Future maman ?", to: "/future-maman" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-[#87A878] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Informations</h4>
          <ul className="space-y-2">
            {[
              "Mentions légales",
              "CGV",
              "Politique de confidentialité",
              "Cookies",
              "Plan du site",
              "Accessibilité",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-400 hover:text-[#87A878] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
            Contact
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3IzeDZkOTRuYzB0MXBkZWt3Z21sNW1wbDNhaTRkOHpzZ2dhbWhncCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/aOften89vRbG/giphy.gif"
              alt="contact animé"
              className="h-7 w-7 object-contain"
            />
          </h4>
          <ul className="space-y-3 mb-5">
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-white">01 80 82 53 00</div>
                <div className="text-xs text-gray-500">Lun-Ven : 9h-19h, Sam : 10h-18h</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-white">contact@allobebe.fr</div>
                <div className="text-xs text-gray-500">Réponse sous 24h</div>
              </div>
            </li>
          </ul>

          {/* Newsletter */}
          <div>
            <h5 className="text-white text-xs font-semibold mb-2 uppercase tracking-wider">Newsletter</h5>
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 py-2 text-xs outline-none"
                style={{
                  backgroundColor: "#1f2937",
                  color: "#ffffff",
                }}
              />
              <button className="bg-[#87A878] hover:bg-[#6A9060] px-3 py-2 text-white text-xs transition-colors whitespace-nowrap">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-gray-800 py-5">
        <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            © 2024 allobébé – Tous droits réservés
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-1">Paiement sécurisé :</span>
            {["VISA", "MC", "AMEX", "CB", "PAYPAL"].map((method) => (
              <div
                key={method}
                className="bg-white text-gray-700 px-2 py-1 rounded text-[10px] font-bold border border-gray-300"
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}