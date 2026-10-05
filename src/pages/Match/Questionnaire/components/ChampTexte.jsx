import { useId } from 'react';

// ─────────────────────────────────────────────
// Champ texte avec son label (étapes 3, 5 et 8).
//
// label       → texte au-dessus du champ
// valeur      → contenu actuel
// onChange    → appelée avec le nouveau texte
// placeholder → texte gris d'exemple (facultatif)
// type        → 'text' (défaut), 'email', 'tel'…
// requis      → true = ajoute une * après le label
// multiligne  → true = grande zone de texte (textarea)
// ─────────────────────────────────────────────
export default function ChampTexte({ label, valeur, onChange, placeholder, type = 'text', requis = false, multiligne = false }) {
  const id = useId(); // relie le label et le champ (cliquer sur le label met le curseur dans le champ)

  // Style commun à l'input et au textarea
  const style =
    'w-full rounded-md border border-stone-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-stone/50 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20';

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ink">
        {label} {requis && <span className="text-[#A6834F]">*</span>}
      </label>

      {multiligne ? (
        <textarea
          id={id}
          rows={3}
          value={valeur ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${style} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={valeur ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={style}
        />
      )}
    </div>
  );
}
