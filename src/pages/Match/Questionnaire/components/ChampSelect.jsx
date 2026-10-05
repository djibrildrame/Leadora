import { useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// ─────────────────────────────────────────────
// Liste déroulante avec son label (étapes 3, 4, 5, 7 et 8).
//
// label    → texte au-dessus
// valeur   → option sélectionnée
// onChange → appelée avec la nouvelle valeur
// options  → ['Oui', 'Non'] OU [{ valeur: '200000', label: '200 000 €' }, …]
// requis   → true = ajoute une *
// ─────────────────────────────────────────────
export default function ChampSelect({ label, valeur, onChange, options, requis = false }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ink">
        {label} {requis && <span className="text-[#A6834F]">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          value={valeur ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-md border border-stone-line bg-white px-3.5 py-2.5 pr-10 text-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
            valeur ? 'text-ink' : 'text-stone/60'
          }`}
        >
          <option value="">Sélectionner</option>
          {options.map((option) => {
            // Accepte un simple texte ou un objet { valeur, label }
            const v = typeof option === 'string' ? option : option.valeur;
            const l = typeof option === 'string' ? option : option.label;
            return (
              <option key={v} value={v}>
                {l}
              </option>
            );
          })}
        </select>

        {/* Petite flèche à droite (remplace celle du navigateur, masquée par appearance-none) */}
        <FontAwesomeIcon
          icon={faChevronDown}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-stone"
        />
      </div>
    </div>
  );
}
