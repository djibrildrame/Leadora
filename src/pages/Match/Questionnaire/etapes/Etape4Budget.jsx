import ChampSelect from '../components/ChampSelect.jsx';

// Montants proposés (valeur = nombre, label = affichage)
const MONTANTS = [50000, 100000, 150000, 200000, 300000, 400000, 500000, 600000, 800000, 1000000, 1500000, 2000000, 3000000].map(
  (m) => ({ valeur: String(m), label: m.toLocaleString('fr-FR') })
);

const DEVISES = [
  { valeur: 'EUR', label: 'EUR (€)' },
  { valeur: 'USD', label: 'USD ($)' },
  { valeur: 'GBP', label: 'GBP (£)' },
  { valeur: 'CHF', label: 'CHF' },
  { valeur: 'XOF', label: 'XOF (FCFA)' },
  { valeur: 'MAD', label: 'MAD' },
];

// Étape 4 — Quel est votre budget ?
export default function Etape4Budget({ reponses, modifier }) {
  // Message d'erreur si le minimum dépasse le maximum
  const incoherent = reponses.budgetMin && reponses.budgetMax && Number(reponses.budgetMin) > Number(reponses.budgetMax);

  return (
    <div className="flex flex-col gap-4">
      <ChampSelect label="Budget minimum" valeur={reponses.budgetMin} onChange={(v) => modifier('budgetMin', v)} options={MONTANTS} />
      <ChampSelect label="Budget maximum" requis valeur={reponses.budgetMax} onChange={(v) => modifier('budgetMax', v)} options={MONTANTS} />
      {incoherent && <p className="text-xs text-red-700">Le budget minimum doit être inférieur au budget maximum.</p>}
      <ChampSelect label="Devise" valeur={reponses.devise} onChange={(v) => modifier('devise', v)} options={DEVISES} />
      {reponses.projet === 'Louer' && <p className="text-xs text-stone">Pour une location, indiquez le loyer mensuel.</p>}
    </div>
  );
}
