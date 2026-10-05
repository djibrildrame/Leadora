import { faBuilding, faHouse, faHouseChimney, faTree, faStore, faCity, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ChoixListe from '../components/ChoixListe.jsx';

const OPTIONS = [
  { valeur: 'Appartement', icone: faBuilding },
  { valeur: 'Maison', icone: faHouse },
  { valeur: 'Villa', icone: faHouseChimney },
  { valeur: 'Terrain', icone: faTree },
  { valeur: 'Local professionnel', icone: faStore },
  { valeur: 'Immeuble', icone: faCity },
  { valeur: 'Autre', icone: faEllipsis },
];

// Étape 2 — Quel type de bien recherchez-vous ?
export default function Etape2TypeBien({ reponses, modifier }) {
  return <ChoixListe options={OPTIONS} valeur={reponses.typeBien} onChange={(v) => modifier('typeBien', v)} />;
}
