import CaseACocher from '../components/CaseACocher.jsx';

// Étape 9 — Consentements (rgpd, contact et cgu sont obligatoires, voir Questionnaire.jsx)
export default function Etape9Consentements({ reponses, modifier }) {
  return (
    <div className="flex flex-col gap-5">
      <CaseACocher
        requis
        coche={reponses.rgpd}
        onChange={(v) => modifier('rgpd', v)}
        texte="J’accepte le traitement de mes données personnelles conformément à la politique de confidentialité."
      />
      <CaseACocher
        requis
        coche={reponses.contact}
        onChange={(v) => modifier('contact', v)}
        texte="J’accepte d’être contacté(e) par LEADORA (email, téléphone, SMS)."
      />
      <CaseACocher
        coche={reponses.transmission}
        onChange={(v) => modifier('transmission', v)}
        texte="J’accepte que mes informations soient transmises à un professionnel partenaire si mon projet est pertinent."
      />
      <CaseACocher
        requis
        coche={reponses.cgu}
        onChange={(v) => modifier('cgu', v)}
        texte="J’ai lu et j’accepte les conditions générales d’utilisation et la politique de confidentialité."
      />
    </div>
  );
}
