import ChampSelect from '../components/ChampSelect.jsx';

// Étape 7 — Quelle est la situation de votre projet ? (tout est facultatif)
export default function Etape7Situation({ reponses, modifier }) {
  return (
    <div className="flex flex-col gap-4">
      <ChampSelect
        label="Avez-vous déjà un financement ?"
        valeur={reponses.financement}
        onChange={(v) => modifier('financement', v)}
        options={['Oui', 'Non', 'En cours']}
      />
      <ChampSelect
        label="Avez-vous déjà rencontré un professionnel ?"
        valeur={reponses.dejaRencontre}
        onChange={(v) => modifier('dejaRencontre', v)}
        options={['Oui', 'Non']}
      />
      <ChampSelect
        label="Avez-vous déjà identifié un bien ?"
        valeur={reponses.bienIdentifie}
        onChange={(v) => modifier('bienIdentifie', v)}
        options={['Oui', 'Non']}
      />
      <ChampSelect
        label="Êtes-vous déjà accompagné ?"
        valeur={reponses.dejaAccompagne}
        onChange={(v) => modifier('dejaAccompagne', v)}
        options={['Oui', 'Non']}
      />
    </div>
  );
}
