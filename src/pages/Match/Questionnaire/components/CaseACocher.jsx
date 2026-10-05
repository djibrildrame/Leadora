import { useId } from 'react';

// ─────────────────────────────────────────────
// Case à cocher avec son texte (étape 9 : consentements).
//
// coche    → true / false
// onChange → appelée avec true ou false
// texte    → le texte à côté de la case
// requis   → true = ajoute une *
// ─────────────────────────────────────────────
export default function CaseACocher({ coche, onChange, texte, requis = false }) {
  const id = useId(); // cliquer sur le texte coche aussi la case

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={!!coche}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded accent-[#D4AD6E]"
      />
      <span className="text-sm leading-relaxed text-stone">
        {texte} {requis && <span className="text-[#A6834F]">*</span>}
      </span>
    </label>
  );
}
