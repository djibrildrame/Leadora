// ─────────────────────────────────────────────
// Interrupteur on/off avec son label (étape 5 : Extérieur, Parking…).
//
// label    → texte à gauche
// actif    → true / false
// onChange → appelée avec true ou false
// ─────────────────────────────────────────────
export default function Interrupteur({ label, actif, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!actif}
      onClick={() => onChange(!actif)} // inverse l'état actuel
      className="flex w-full items-center justify-between py-2 text-left text-sm text-ink"
    >
      <span>{label}</span>

      {/* Le rail */}
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${actif ? 'bg-gold' : 'bg-stone-line'}`}>
        {/* La pastille blanche qui glisse de gauche à droite */}
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${actif ? 'left-[18px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  );
}
