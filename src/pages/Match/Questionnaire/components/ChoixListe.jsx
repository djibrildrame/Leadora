import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// ─────────────────────────────────────────────
// Liste de choix cliquables (un seul choix possible).
// Étapes 1, 2 (avec icônes) et 6 (avec ronds, sans icônes).
//
// options  → [{ valeur: 'Acheter', icone: faHouse }, …]  (icone facultative)
// valeur   → le choix actuellement sélectionné
// onChange → appelée avec la valeur cliquée
// ─────────────────────────────────────────────
export default function ChoixListe({ options, valeur, onChange }) {
  return (
    <div className="flex flex-col gap-2.5" role="radiogroup">
      {options.map((option) => {
        const choisi = valeur === option.valeur;

        return (
          <button
            key={option.valeur}
            type="button"
            role="radio"
            aria-checked={choisi}
            onClick={() => onChange(option.valeur)}
            className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
              choisi
                ? 'border-gold bg-gold-pale/60 text-ink' // sélectionné : bordure dorée + fond beige
                : 'border-stone-line bg-white text-ink hover:border-gold/60'
            }`}
          >
            {/* Icône si fournie, sinon un petit rond (style bouton radio) */}
            {option.icone ? (
              <FontAwesomeIcon
                icon={option.icone}
                className={`w-4 shrink-0 text-[15px] ${choisi ? 'text-[#A6834F]' : 'text-stone'}`}
              />
            ) : (
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  choisi ? 'border-[#A6834F]' : 'border-stone-line'
                }`}
              >
                {choisi && <span className="h-2 w-2 rounded-full bg-[#A6834F]" />}
              </span>
            )}
            <span>{option.valeur}</span>
          </button>
        );
      })}
    </div>
  );
}
