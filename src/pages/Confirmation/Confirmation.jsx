import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faUserTie, faHandshake } from '@fortawesome/free-solid-svg-icons';

// ─────────────────────────────────────────────
// Les 3 prochaines étapes affichées sous le message de remerciement.
// Pour changer un texte, il suffit de le modifier ici.
// ─────────────────────────────────────────────
const PROCHAINES_ETAPES = [
  {
    icone: faEnvelope,
    titre: 'Email de confirmation',
    texte: 'Vous allez recevoir un récapitulatif de votre demande par email.',
  },
  {
    icone: faUserTie,
    titre: 'Analyse de votre projet',
    texte: 'Nous sélectionnons le professionnel le plus adapté à vos critères.',
  },
  {
    icone: faHandshake,
    titre: 'Mise en relation',
    texte: 'Un expert vous contacte sous 48 h pour échanger sur votre projet.',
  },
];

export default function Confirmation() {
  // Le questionnaire peut envoyer le prénom en arrivant ici.
  // S'il n'y a rien (page ouverte directement), on affiche juste "Merci".
  const location = useLocation();
  const prenom = location.state?.prenom;

  return (
    <section className="flex min-h-screen items-start justify-center bg-cream px-5 py-12 md:py-20">
      {/* Carte blanche centrale (même style que le questionnaire) */}
      <div className="w-full max-w-[560px] rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
        {/* Rond doré avec la coche */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-pale">
          <FontAwesomeIcon icon={faCheck} className="text-2xl text-gold-dark" />
        </div>

        {/* Petit titre au-dessus */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Demande envoyée
        </p>

        {/* Titre principal */}
        <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
          Merci{prenom ? ` ${prenom}` : ''} !
        </h1>

        <p className="mx-auto mb-10 max-w-[420px] text-sm leading-relaxed text-stone">
          Votre projet a bien été transmis à LEADORA. Notre équipe l’étudie et vous recontacte
          très rapidement.
        </p>

        {/* Ligne de séparation */}
        <div className="mb-8 h-px w-full bg-stone-line" />

        {/* Les 3 prochaines étapes */}
        <h2 className="mb-6 font-serif text-xl font-semibold text-ink">Et maintenant ?</h2>

        <ul className="mb-10 space-y-5 text-left">
          {PROCHAINES_ETAPES.map((etape, index) => (
            <li key={etape.titre} className="flex items-start gap-4">
              {/* Icône dans un rond */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-dark">
                <FontAwesomeIcon icon={etape.icone} className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {index + 1}. {etape.titre}
                </p>
                <p className="text-sm text-stone">{etape.texte}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Boutons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
          >
            Retour à l’accueil
          </Link>
          <Link
            to="/match"
            className="rounded-md border border-stone-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold"
          >
            Découvrir LEADORA Match
          </Link>
        </div>
      </div>
    </section>
  );
}