import ChoixListe from '../components/ChoixListe.jsx';

// Pas d'icône → ChoixListe affiche des petits ronds (style bouton radio)
const OPTIONS = [
  { valeur: 'Immédiatement' },
  { valeur: 'Dans les 3 mois' },
  { valeur: 'Dans les 6 mois' },
  { valeur: 'Dans les 12 mois' },
  { valeur: 'Plus tard' },
  { valeur: 'Je suis simplement en recherche' },
];

// Étape 6 — Quand souhaitez-vous concrétiser votre projet ?
export default function Etape6Delai({ reponses, modifier }) {
  return <ChoixListe options={OPTIONS} valeur={reponses.delai} onChange={(v) => modifier('delai', v)} />;
}
