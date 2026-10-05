import ChampTexte from '../components/ChampTexte.jsx';
import ChampSelect from '../components/ChampSelect.jsx';

const PAYS = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Maroc', 'Sénégal', "Côte d'Ivoire", 'Autre'];
const MOYENS = ['Email', 'Téléphone', 'WhatsApp', 'SMS'];

// Étape 8 — Vos coordonnées
export default function Etape8Coordonnees({ reponses, modifier }) {
  return (
    <div className="flex flex-col gap-4">
      <ChampTexte label="Prénom" requis valeur={reponses.prenom} onChange={(v) => modifier('prenom', v)} placeholder="Jean" />
      <ChampTexte label="Nom" requis valeur={reponses.nom} onChange={(v) => modifier('nom', v)} placeholder="Dupont" />
      <ChampTexte label="Email" requis type="email" valeur={reponses.email} onChange={(v) => modifier('email', v)} placeholder="jean@exemple.com" />
      <ChampTexte label="Téléphone" requis type="tel" valeur={reponses.telephone} onChange={(v) => modifier('telephone', v)} placeholder="+33 6 12 34 56 78" />
      <ChampSelect label="Pays de résidence" requis valeur={reponses.paysResidence} onChange={(v) => modifier('paysResidence', v)} options={PAYS} />
      <ChampSelect label="Moyen de contact préféré" valeur={reponses.moyenContact} onChange={(v) => modifier('moyenContact', v)} options={MOYENS} />
    </div>
  );
}
