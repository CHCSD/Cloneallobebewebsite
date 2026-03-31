import { useState } from "react";
import {
  FileText,
  Download,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck,
  Globe,
  CheckCircle,
  Lock,
  ExternalLink,
  Printer,
  File,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ProductDoc {
  id: string;
  type: "notice" | "securite" | "conformite" | "legal" | "fiche" | "certificat";
  label: string;
  description: string;
  filename: string;
  size: string;
  lang: string[];
  date: string;
  version?: string;
  restricted?: boolean;
  url?: string;
}

// ─── Config icônes & couleurs par type ───────────────────────────────────────
const DOC_TYPE_CONFIG: Record<
  ProductDoc["type"],
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  notice: {
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    label: "Notice",
  },
  securite: {
    icon: Shield,
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Sécurité",
  },
  conformite: {
    icon: FileCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
    label: "Conformité",
  },
  legal: {
    icon: Globe,
    color: "text-orange-600",
    bg: "bg-orange-50",
    label: "Légal",
  },
  fiche: {
    icon: FileText,
    color: "text-[#5A7A52]",
    bg: "bg-[#F0F4EE]",
    label: "Fiche produit",
  },
  certificat: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    label: "Certificat",
  },
};

// ─── Composant carte document ─────────────────────────────────────────────────
function DocCard({ doc }: { doc: ProductDoc }) {
  const [downloaded, setDownloaded] = useState(false);
  const cfg = DOC_TYPE_CONFIG[doc.type];
  const Icon = cfg.icon;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="group bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-[#87A878]/50 hover:shadow-sm transition-all duration-200 flex gap-3">
      {/* Icône type */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}
      >
        <Icon size={16} className={cfg.color} />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-gray-900 text-xs font-bold">{doc.label}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
          {doc.restricted && (
            <span className="flex items-center gap-0.5 text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
              <Lock size={8} /> Interne
            </span>
          )}
        </div>

        <p className="text-gray-400 text-[11px] leading-snug mb-2">
          {doc.description}
        </p>

        {/* Méta */}
        <div className="flex items-center gap-3 text-[10px] text-gray-400 flex-wrap mb-3">
          <span className="flex items-center gap-1">
            <File size={9} /> {doc.filename}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={9} /> {doc.date}
          </span>
          {doc.version && <span>v{doc.version}</span>}
          <span>{doc.size}</span>
          <span className="flex items-center gap-1">
            <Globe size={9} /> {doc.lang.join(", ")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownload}
            disabled={doc.restricted}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              downloaded
                ? "bg-green-500 text-white"
                : doc.restricted
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#87A878] hover:bg-[#6A9060] text-white"
            }`}
          >
            {downloaded ? (
              <><CheckCircle size={11} /> Téléchargé !</>
            ) : doc.restricted ? (
              <><Lock size={11} /> Accès restreint</>
            ) : (
              <><Download size={11} /> Télécharger</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bouton raccourci PDF fiche technique ─────────────────────────────────────
export function DownloadSpecSheetButton({
  productName,
  productRef,
}: {
  productName: string;
  productRef: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handlePrint = () => {
    setState("loading");
    setTimeout(() => {
      setState("done");
      window.print();
      setTimeout(() => setState("idle"), 3000);
    }, 600);
  };

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-2 border-t border-gray-100 pt-4">
      <button
        onClick={handlePrint}
        className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 ${
          state === "done"
            ? "bg-green-500 text-white"
            : "bg-[#87A878] hover:bg-[#6A9060] text-white"
        }`}
      >
        {state === "loading" ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Génération…
          </>
        ) : state === "done" ? (
          <><CheckCircle size={14} /> Fiche générée !</>
        ) : (
          <><Download size={14} /> Télécharger la fiche technique (PDF)</>
        )}
      </button>
      <button
        onClick={() => window.print()}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold border border-gray-200 text-gray-600 hover:border-[#87A878] hover:text-[#5A7A52] transition-all"
      >
        <Printer size={13} /> Imprimer
      </button>
      <span className="text-[10px] text-gray-400 self-center hidden sm:block">
        Réf. {productRef}
      </span>
    </div>
  );
}

// ─── Banque de documents (compacte, intégrée dans l'accordéon) ───────────────
export function ProductDocumentBank({
  docs,
  productName,
}: {
  docs: ProductDoc[];
  productName: string;
}) {
  return (
    <div className="mt-6 border-t border-gray-100 pt-5">
      {/* En-tête section */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#2D3A2A] flex items-center justify-center shrink-0">
            <FileText size={12} className="text-[#87A878]" />
          </div>
          <span className="text-gray-900 text-xs font-bold uppercase tracking-widest">
            Documents &amp; notices
          </span>
          <span className="bg-[#2D3A2A] text-[#87A878] text-[9px] font-black px-1.5 py-0.5 rounded-full">
            {docs.length}
          </span>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-[11px] text-[#5A7A52] font-semibold hover:underline"
        >
          <ExternalLink size={10} /> Demander un document
        </a>
      </div>

      {/* Alerte légale */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 mb-3">
        <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-amber-700 leading-snug">
          Documents fournis à titre informatif. Vérifiez toujours la version en
          vigueur auprès du fabricant.
        </p>
      </div>

      {/* Cartes documents */}
      <div className="space-y-2">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Footer discret */}
      <p className="text-[10px] text-gray-400 mt-3 text-right">
        Documents relatifs à{" "}
        <span className="font-semibold text-gray-500">{productName}</span> · mis à
        jour mars 2026
      </p>
    </div>
  );
}