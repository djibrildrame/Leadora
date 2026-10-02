import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faHandshake } from '@fortawesome/free-solid-svg-icons';

// Les 3 publics à droite
const PUBLICS = [
  { icone: faBuilding, texte: 'Agences immobilières' },
  { icone: faUser, texte: 'Particuliers' },
  { icone: faHandshake, texte: 'Partenaires' },
];

const Vision = () => {
  return (
    <section className="bg-cream px-5 py-8 md:px-10 xl:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col overflow-hidden rounded-2xl border border-stone-line/60 bg-gradient-to-r from-[#F6F0E8] to-[#F3EBE1] shadow-[0_2px_16px_rgba(11,13,16,0.05)] lg:flex-row">

        {/* ── Photo (avec fondu vers le crème à droite) ── */}
        <div className="relative h-48 lg:h-auto lg:w-[34%] lg:shrink-0">
          <img src="/src/img/immeuble.webp" alt="Façade d'immeuble parisien" className="h-full w-full object-cover" />
          {/* Fondu : la photo se fond dans le fond crème */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F6F0E8] lg:bg-gradient-to-r lg:from-transparent lg:from-40% lg:to-[#F6F0E8]" />
        </div>

        {/* ── Texte central ── */}
        <div className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A6834F]">LEADORA</p>
          <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight text-ink md:text-[32px]">
            Une vision complète de l’immobilier
          </h2>
          <p className="mt-3 max-w-[540px] font-serif text-[16px] leading-relaxed text-stone">
            Pour les agences comme pour les particuliers, LEADORA réunit l’expertise humaine et la puissance
            de l’IA pour des projets plus simples, plus rapides et plus performants.
          </p>
        </div>

        {/* ── Liste à droite, séparée par un trait vertical ── */}
        <div className="flex flex-col justify-center gap-5 border-t border-stone-line/70 px-6 py-8 lg:my-6 lg:w-[26%] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-12 lg:py-0">
          {PUBLICS.map((p) => (
            <div key={p.texte} className="flex items-center gap-4">
              {/* Icône dans un cercle au contour doré */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#A6834F]">
                <FontAwesomeIcon icon={p.icone} className="text-[13px] text-[#A6834F]" />
              </span>
              <span className="font-serif text-[16px] text-ink">{p.texte}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;