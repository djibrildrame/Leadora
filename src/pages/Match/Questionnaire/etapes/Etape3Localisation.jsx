import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import ChampSelect from '../components/ChampSelect.jsx';
import ChampTexte from '../components/ChampTexte.jsx';

const PAYS = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Maroc', 'Sénégal', "Côte d'Ivoire", 'Autre'];

// Étape 3 — Où souhaitez-vous être situé ?
export default function Etape3Localisation({ reponses, modifier }) {
  const zones = reponses.autresZones || []; // zones supplémentaires (tableau de textes)

  // Ajoute une zone vide à la fin du tableau
  const ajouterZone = () => modifier('autresZones', [...zones, '']);

  // Modifie la zone n° index
  const changerZone = (index, texte) => {
    const copie = [...zones];
    copie[index] = texte;
    modifier('autresZones', copie);
  };

  // Supprime la zone n° index
  const supprimerZone = (index) => modifier('autresZones', zones.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-4">
      <ChampSelect label="Pays" valeur={reponses.pays} onChange={(v) => modifier('pays', v)} options={PAYS} />
      <ChampTexte label="Ville" requis valeur={reponses.ville} onChange={(v) => modifier('ville', v)} placeholder="Ex : Paris" />
      <ChampTexte label="Région / Zone" valeur={reponses.region} onChange={(v) => modifier('region', v)} placeholder="Ex : Île-de-France" />
      <ChampTexte label="Quartier (optionnel)" valeur={reponses.quartier} onChange={(v) => modifier('quartier', v)} placeholder="Ex : La Défense" />

      {/* Zones supplémentaires ajoutées par l'utilisateur */}
      {zones.map((zone, index) => (
        <div key={index} className="flex items-end gap-2">
          <div className="flex-1">
            <ChampTexte label={`Autre zone ${index + 1}`} valeur={zone} onChange={(v) => changerZone(index, v)} placeholder="Ex : Lyon" />
          </div>
          <button
            type="button"
            onClick={() => supprimerZone(index)}
            aria-label="Supprimer cette zone"
            className="mb-1 flex h-9 w-9 items-center justify-center rounded-md border border-stone-line text-stone transition hover:border-ink hover:text-ink"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={ajouterZone}
        className="flex items-center gap-2 self-start rounded-md border border-stone-line px-4 py-2.5 text-sm text-ink transition hover:border-gold"
      >
        <FontAwesomeIcon icon={faPlus} className="text-xs text-[#A6834F]" />
        Ajouter une autre zone
      </button>
    </div>
  );
}
