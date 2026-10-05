import ChampSelect from '../components/ChampSelect.jsx';
import ChampTexte from '../components/ChampTexte.jsx';
import Interrupteur from '../components/Interrupteur.jsx';

const NOMBRES = ['Indifférent', '1', '2', '3', '4', '5 et plus'];
const SURFACES = ['Indifférent', '20 m²', '30 m²', '50 m²', '70 m²', '100 m²', '150 m²', '200 m² et plus'];
const OPTIONS = ['Extérieur', 'Parking', 'Ascenseur', 'Terrasse / Balcon', 'Piscine'];

// Étape 5 — Caractéristiques importantes
export default function Etape5Criteres({ reponses, modifier }) {
  const choisies = reponses.options || []; // ex : ['Parking', 'Piscine']

  // Ajoute l'option si elle n'y est pas, la retire sinon
  const basculer = (option) => {
    const nouvelles = choisies.includes(option) ? choisies.filter((o) => o !== option) : [...choisies, option];
    modifier('options', nouvelles);
  };

  return (
    <div className="flex flex-col gap-4">
      <ChampSelect label="Nombre de pièces" valeur={reponses.pieces} onChange={(v) => modifier('pieces', v)} options={NOMBRES} />
      <ChampSelect label="Nombre de chambres" valeur={reponses.chambres} onChange={(v) => modifier('chambres', v)} options={NOMBRES} />
      <ChampSelect label="Surface minimale" valeur={reponses.surface} onChange={(v) => modifier('surface', v)} options={SURFACES} />

      {/* Interrupteurs on/off */}
      <div className="mt-1 divide-y divide-stone-line/50">
        {OPTIONS.map((option) => (
          <Interrupteur key={option} label={option} actif={choisies.includes(option)} onChange={() => basculer(option)} />
        ))}
      </div>

      <ChampTexte
        label="Autres critères"
        multiligne
        valeur={reponses.autresCriteres}
        onChange={(v) => modifier('autresCriteres', v)}
        placeholder="Luminosité, étage élevé, proche des écoles…"
      />
    </div>
  );
}
