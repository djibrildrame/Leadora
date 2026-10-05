import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarteEtape from './components/CarteEtape.jsx';
import Etape1Projet from './etapes/Etape1Projet.jsx';
import Etape2TypeBien from './etapes/Etape2TypeBien.jsx';
import Etape3Localisation from './etapes/Etape3Localisation.jsx';
import Etape4Budget from './etapes/Etape4Budget.jsx';
import Etape5Criteres from './etapes/Etape5Criteres.jsx';
import Etape6Delai from './etapes/Etape6Delai.jsx';
import Etape7Situation from './etapes/Etape7Situation.jsx';
import Etape8Coordonnees from './etapes/Etape8Coordonnees.jsx';
import Etape9Consentements from './etapes/Etape9Consentements.jsx';

// Adresse du serveur (back). En ligne, on la changera dans un fichier .env du front.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Vérifie qu'un email a une forme correcte (texte@texte.texte)
const emailValide = (email) => {
  const e = (email || '').trim();
  const arobase = e.indexOf('@');
  const point = e.lastIndexOf('.');
  // un @ pas au début, un point après le @, au moins 2 lettres à la fin, pas d'espace
  return arobase > 0 && point > arobase + 1 && point < e.length - 2 && !e.includes(' ');
};

// ─────────────────────────────────────────────
// Les 9 étapes.
//   question  → titre de la carte
//   sousTitre → petit texte sous le titre (facultatif)
//   Composant → les champs de l'étape
//   estValide → renvoie true si on peut passer à la suite
//               (sert à bloquer le bouton tant que l'obligatoire n'est pas rempli)
// ─────────────────────────────────────────────
const ETAPES = [
  {
    question: 'Quel est votre projet ?',
    sousTitre: 'Choisissez l’option qui correspond le mieux à votre situation.',
    Composant: Etape1Projet,
    estValide: (r) => !!r.projet,
  },
  {
    question: 'Quel type de bien recherchez-vous ?',
    Composant: Etape2TypeBien,
    estValide: (r) => !!r.typeBien,
  },
  {
    question: 'Où souhaitez-vous être situé ?',
    Composant: Etape3Localisation,
    estValide: (r) => !!r.ville?.trim(),
  },
  {
    question: 'Quel est votre budget ?',
    Composant: Etape4Budget,
    // Budget max obligatoire, et le min ne doit pas dépasser le max
    estValide: (r) => !!r.budgetMax && (!r.budgetMin || Number(r.budgetMin) <= Number(r.budgetMax)),
  },
  {
    question: 'Quelles sont les caractéristiques importantes pour vous ?',
    Composant: Etape5Criteres,
    estValide: () => true, // tout est facultatif
  },
  {
    question: 'Quand souhaitez-vous concrétiser votre projet ?',
    Composant: Etape6Delai,
    estValide: (r) => !!r.delai,
  },
  {
    question: 'Quelle est la situation de votre projet ?',
    Composant: Etape7Situation,
    estValide: () => true, // tout est facultatif
  },
  {
    question: 'Vos coordonnées',
    Composant: Etape8Coordonnees,
    estValide: (r) =>
      !!r.prenom?.trim() && !!r.nom?.trim() && emailValide(r.email) && (r.telephone || '').replace(/\D/g, '').length >= 8,
  },
  {
    question: 'Consentements',
    Composant: Etape9Consentements,
    // Les consentements obligatoires (RGPD) doivent être cochés
    estValide: (r) => !!r.rgpd && !!r.contact && !!r.cgu,
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();

  // Numéro de l'étape affichée (1 à 9)
  const [etape, setEtape] = useState(1);

  // Toutes les réponses dans un seul objet.
  // Valeurs par défaut pour les listes déroulantes déjà pré-remplies.
  const [reponses, setReponses] = useState({
    pays: 'France',
    devise: 'EUR',
    paysResidence: 'France',
    moyenContact: 'Email',
    options: [], // critères cochés à l'étape 5 (Parking, Piscine…)
    autresZones: [], // zones ajoutées à l'étape 3
  });

  // Met à jour UNE réponse sans effacer les autres
  const modifier = (nom, valeur) => {
    setReponses((anciennes) => ({ ...anciennes, [nom]: valeur }));
  };

  // Pendant l'envoi au serveur : texte "Envoi en cours…" et les clics en plus sont ignorés
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  // Message affiché si l'envoi échoue
  const [erreur, setErreur] = useState('');

  const derniereEtape = etape === ETAPES.length;
  const { question, sousTitre, Composant, estValide } = ETAPES[etape - 1];
  const peutContinuer = estValide(reponses);

  // async : on doit "attendre" (await) la réponse du serveur
  const suivant = async () => {
    if (!peutContinuer || envoiEnCours) return; // sécurité : étape incomplète ou envoi déjà lancé

    if (!derniereEtape) {
      setEtape(etape + 1);
      window.scrollTo(0, 0);
      return;
    }

    // Dernière étape : on envoie toutes les réponses au serveur
    setEnvoiEnCours(true);
    setErreur('');

    try {
      const reponse = await fetch(`${API_URL}/api/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reponses), // l'objet des réponses transformé en texte JSON
      });
      const resultat = await reponse.json();

      if (!reponse.ok || !resultat.ok) {
        // Le serveur a refusé (champ manquant, erreur base...) : on affiche son message
        setErreur(resultat.message || 'Une erreur est survenue, veuillez réessayer.');
        return;
      }

      // Tout est bon : page de confirmation avec le prénom
      navigate('/confirmation', { state: { prenom: reponses.prenom } });
    } catch {
      // Le serveur ne répond pas du tout (éteint, pas de connexion...)
      setErreur('Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.');
    } finally {
      setEnvoiEnCours(false); // dans tous les cas, on débloque le bouton
    }
  };

  const precedent = () => {
    if (etape > 1) {
      setEtape(etape - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="flex min-h-screen items-start justify-center bg-cream px-5 py-12 md:py-16">
      <CarteEtape
        numero={etape}
        total={ETAPES.length}
        question={question}
        sousTitre={sousTitre}
        onSuivant={suivant}
        onPrecedent={etape > 1 ? precedent : null}
        texteBouton={envoiEnCours ? 'Envoi en cours…' : derniereEtape ? 'Valider mon projet' : 'Suivant'}
        boutonActif={peutContinuer}
      >
        <Composant reponses={reponses} modifier={modifier} />

        {/* Message d'erreur si l'envoi au serveur a échoué */}
        {erreur && (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{erreur}</p>
        )}
      </CarteEtape>
    </section>
  );
}