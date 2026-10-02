import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faFileLines, faStopwatch, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const AVANTAGES = [
  { icone: faUserCheck, texte: 'Des prospects qualifiés' },
  { icone: faFileLines, texte: 'Des informations structurées' },
  { icone: faStopwatch, texte: 'Un gain de temps commercial' },
  { icone: faShieldHalved, texte: 'Un accompagnement personnalisé' },
];

const RealtyAvantages = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20 xl:px-20">
      <h2 className="text-center text-[26px] font-medium text-ink md:text-[30px]">
        Pourquoi devenir partenaire ?
      </h2>

      {/* 1 colonne → 2 → 4, avec trait vertical entre les colonnes sur grand écran */}
      <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-stone-line/70">
        {AVANTAGES.map((a) => (
          <div key={a.texte} className="flex flex-col items-center gap-4 px-6 text-center">
            <FontAwesomeIcon icon={a.icone} className="text-[34px] text-[#A6834F]" />
            <p className="max-w-[200px] text-[15px] font-medium leading-snug text-ink">{a.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RealtyAvantages;