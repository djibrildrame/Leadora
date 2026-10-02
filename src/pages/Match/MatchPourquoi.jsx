import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTag, faAward, faLock } from '@fortawesome/free-solid-svg-icons';

const RAISONS = [
  { icone: faPenToSquare, titre: 'Simple', texte: 'Un questionnaire rapide et intuitif' },
  { icone: faTag, titre: 'Gratuit', texte: 'Sans engagement' },
  { icone: faAward, titre: 'Pertinent', texte: 'Des professionnels adaptés à votre projet' },
  { icone: faLock, titre: 'Sécurisé', texte: 'Vos données sont protégées' },
];

const MatchPourquoi = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20 xl:px-20">
      <h2 className="text-center text-[26px] font-medium text-ink md:text-[30px]">
        Pourquoi choisir LEADORA Match ?
      </h2>

      {/* 1 colonne → 2 → 4, séparées par des traits verticaux sur grand écran */}
      <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-stone-line/70">
        {RAISONS.map((r) => (
          <div key={r.titre} className="flex flex-col items-center gap-3 px-6 text-center">
            <FontAwesomeIcon icon={r.icone} className="text-[30px] text-[#A6834F]" />
            <h3 className="mt-1 text-base font-semibold text-ink">{r.titre}</h3>
            <p className="max-w-[210px] text-sm leading-relaxed text-stone">{r.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchPourquoi;