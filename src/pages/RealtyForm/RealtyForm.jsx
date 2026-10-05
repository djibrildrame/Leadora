import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampTexte from '../Match/Questionnaire/components/ChampTexte.jsx';
import ChampSelect from '../Match/Questionnaire/components/ChampSelect.jsx';

// ─────────────────────────────────────────────
// Choix des listes déroulantes (à modifier ici si besoin)
// ─────────────────────────────────────────────
const TYPES_ACTIVITE = [
  'Agence immobilière',
  'Agent indépendant / mandataire',
  'Promoteur',
  'Chasseur immobilier',
  'Courtier',
  'Autre',
];

const TYPES_BIENS = ['Résidentiel', 'Commercial', 'Luxe / prestige', 'Neuf', 'Tous types'];

const BUDGETS = [
  'Moins de 200 000 €',
  '200 000 € à 500 000 €',
  '500 000 € à 1 000 000 €',
  'Plus de 1 000 000 €',
];

const COLLABORATEURS = ['Indépendant', '2 à 5', '6 à 20', '21 à 50', 'Plus de 50'];

const emailValide = (email) => {
  const e = (email || '').trim();
  const arobase = e.indexOf('@');
  const point = e.lastIndexOf('.');
  return arobase > 0 && point > arobase + 1 && point < e.length - 2 && !e.includes(' ');
};

export default function RealtyForm() {
  const navigate = useNavigate();

  // Toutes les réponses dans un seul objet (comme le questionnaire)
  const [reponses, setReponses] = useState({});

  // Met à jour UNE réponse sans effacer les autres
  const modifier = (nom, valeur) => {
    setReponses((anciennes) => ({ ...anciennes, [nom]: valeur }));
  };

  // Liste des champs obligatoires : tous ceux du formulaire
  const obligatoires = [
    'nom', 'prenom', 'entreprise', 'fonction', 'email', 'telephone', 'ville',
    'activite', 'zones', 'typesBiens', 'budget', 'collaborateurs', 'message',
  ];

  // Le bouton s'active seulement si tout est rempli + email et téléphone corrects
  const formulaireValide =
    obligatoires.every((champ) => (reponses[champ] || '').trim() !== '') &&
    emailValide(reponses.email) &&
    (reponses.telephone || '').replace(/\D/g, '').length >= 8;

  const envoyer = (e) => {
    e.preventDefault(); // empêche le navigateur de recharger la page
    if (!formulaireValide) return;

    // Pour l'instant on affiche dans la console.
    // Plus tard, c'est ici qu'on enverra les données au back (fetch).
    console.log('Demande de partenariat :', reponses);
    navigate('/confirmation', { state: { prenom: reponses.prenom } });
  };

  return (
    <section className="flex min-h-screen items-start justify-center bg-cream px-5 py-12 md:py-20">
      {/* Carte blanche, plus large que le questionnaire pour tenir 2 colonnes */}
      <form
        onSubmit={envoyer}
        className="w-full max-w-[880px] rounded-2xl border border-stone-line/70 bg-white p-6 shadow-[0_4px_24px_rgba(11,13,16,0.06)] md:p-12"
      >
        {/* ── Titre ── */}
        <h1 className="font-serif text-3xl font-semibold text-ink md:text-4xl">
          Demande de partenariat
        </h1>
        <p className="mb-10 mt-3 text-sm text-stone md:text-base">
          Rejoignez notre réseau de professionnels et accédez à des opportunités qualifiées.
        </p>

        {/* ── Champs : 1 colonne sur mobile, 2 colonnes à partir de md ── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <ChampTexte label="Nom" requis placeholder="Nom"
            valeur={reponses.nom} onChange={(v) => modifier('nom', v)} />
          <ChampTexte label="Prénom" requis placeholder="Prénom"
            valeur={reponses.prenom} onChange={(v) => modifier('prenom', v)} />

          <ChampTexte label="Entreprise / Agence" requis placeholder="Ex : Century 21"
            valeur={reponses.entreprise} onChange={(v) => modifier('entreprise', v)} />
          <ChampTexte label="Fonction" requis placeholder="Ex : Agent immobilier"
            valeur={reponses.fonction} onChange={(v) => modifier('fonction', v)} />

          <ChampTexte label="Email professionnel" requis type="email" placeholder="exemple@agence.com"
            valeur={reponses.email} onChange={(v) => modifier('email', v)} />
          <ChampTexte label="Téléphone" requis type="tel" placeholder="+33 6 12 34 56 78"
            valeur={reponses.telephone} onChange={(v) => modifier('telephone', v)} />

          <ChampTexte label="Ville / Pays" requis placeholder="Ex : Paris, France"
            valeur={reponses.ville} onChange={(v) => modifier('ville', v)} />
          <ChampSelect label="Type d'activité" requis options={TYPES_ACTIVITE}
            valeur={reponses.activite} onChange={(v) => modifier('activite', v)} />

          <ChampTexte label="Zones géographiques couvertes" requis placeholder="Ex : Île-de-France"
            valeur={reponses.zones} onChange={(v) => modifier('zones', v)} />
          <ChampSelect label="Types de biens traités" requis options={TYPES_BIENS}
            valeur={reponses.typesBiens} onChange={(v) => modifier('typesBiens', v)} />

          <ChampSelect label="Budget moyen des clients" requis options={BUDGETS}
            valeur={reponses.budget} onChange={(v) => modifier('budget', v)} />
          <ChampSelect label="Nombre de collaborateurs" requis options={COLLABORATEURS}
            valeur={reponses.collaborateurs} onChange={(v) => modifier('collaborateurs', v)} />

          {/* Le message prend toute la largeur (2 colonnes) */}
          <div className="md:col-span-2">
            <ChampTexte label="Besoins / Message" requis multiligne placeholder="Décrivez vos besoins..."
              valeur={reponses.message} onChange={(v) => modifier('message', v)} />
          </div>
        </div>

        {/* ── Bouton centré ── */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={!formulaireValide}
            className="w-full rounded-md bg-gold px-10 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Envoyer ma demande
          </button>
          {!formulaireValide && (
            <p className="text-xs text-stone">Complétez tous les champs obligatoires pour envoyer.</p>
          )}
        </div>
      </form>
    </section>
  );
}