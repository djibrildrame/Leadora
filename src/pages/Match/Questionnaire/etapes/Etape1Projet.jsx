import { faHouse, faKey, faChartLine, faTag, faHandshake } from '@fortawesome/free-solid-svg-icons';
import ChoixListe from '../components/ChoixListe.jsx';

// Les choix possibles (texte + icône)
const OPTIONS = [
  { valeur: 'Acheter', icone: faHouse },
  { valeur: 'Louer', icone: faKey },
  { valeur: 'Investir', icone: faChartLine },
  { valeur: 'Vendre', icone: faTag },
  { valeur: 'Être accompagné dans un projet immobilier', icone: faHandshake },
];

// Étape 1 — Quel est votre projet ?
export default function Etape1Projet({ reponses, modifier }) {
  return <ChoixListe options={OPTIONS} valeur={reponses.projet} onChange={(v) => modifier('projet', v)} />;
}
