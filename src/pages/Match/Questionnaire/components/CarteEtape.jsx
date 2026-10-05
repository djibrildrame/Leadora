import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// ─────────────────────────────────────────────
// Le cadre commun à toutes les étapes (maquette 3 et 4) :
// LEADORA + étoile, barre de progression, « X/9 », question, contenu, bouton.
// ─────────────────────────────────────────────
export default function CarteEtape({
  numero,       // étape actuelle (1 à 9)
  total,        // nombre d'étapes (9)
  question,     // titre de l'étape
  sousTitre,    // petit texte sous le titre (facultatif)
  onSuivant,    // fonction appelée par le bouton principal
  onPrecedent,  // fonction « retour » (null à l'étape 1)
  texteBouton,  // « Suivant » ou « Valider mon projet »
  boutonActif,  // false = champs obligatoires pas encore remplis
  children,     // les champs de l'étape
}) {
  // Largeur de la barre dorée en % (étape 3/9 → 33 %)
  const progression = (numero / total) * 100;

  return (
    <div className="flex w-full max-w-[460px] flex-col rounded-2xl border border-stone-line/70 bg-white p-6 shadow-[0_4px_24px_rgba(11,13,16,0.06)] md:p-8">
      {/* ── En-tête : LEADORA + étoile ── */}
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl font-medium tracking-[0.12em] text-ink">LEADORA</p>
        <FontAwesomeIcon icon={faStar} className="text-[15px] text-ink" />
      </div>

      {/* ── Barre de progression ── */}
      <div className="mt-4 h-[3px] w-full rounded-full bg-stone-line/50">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${progression}%` }}
        />
      </div>

      {/* ── Compteur + bouton retour ── */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold text-ink">
          {numero}/{total}
        </p>
        {onPrecedent && (
          <button
            type="button"
            onClick={onPrecedent}
            className="flex items-center gap-1.5 text-xs text-stone transition hover:text-ink"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" />
            Retour
          </button>
        )}
      </div>

      {/* ── Question ── */}
      <h1 className="mt-3 text-lg font-semibold leading-snug text-ink">{question}</h1>
      {sousTitre && <p className="mt-2 text-sm leading-relaxed text-stone">{sousTitre}</p>}

      {/* ── Contenu de l'étape ── */}
      <div className="mt-6">{children}</div>

      {/* ── Bouton principal ── */}
      <button
        type="button"
        onClick={onSuivant}
        disabled={!boutonActif}
        className="mt-8 w-full rounded-md bg-gold py-3 text-sm font-medium text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gold"
      >
        {texteBouton}
      </button>

      {/* Petit message tant que l'étape est incomplète */}
      {!boutonActif && (
        <p className="mt-3 text-center text-xs text-stone">Complétez les champs obligatoires pour continuer.</p>
      )}
    </div>
  );
}
