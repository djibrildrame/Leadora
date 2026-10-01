import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles, // Comprendre
  faBullseye,          // Qualifier
  faLayerGroup,        // Accompagner
  faSignal,            // Optimiser
  faShieldHalved,      // Sécuriser
} from '@fortawesome/free-solid-svg-icons';

const VALEURS = [
  { icone: faWandMagicSparkles, texte: 'Comprendre', explication: "L'IA analyse les demandes et extrait l'essentiel, même dans un langage naturel." },
  { icone: faBullseye, texte: 'Qualifier', explication: 'Chaque prospect est évalué selon des critères sur mesure pour votre agence.' },
  { icone: faLayerGroup, texte: 'Accompagner', explication: 'Des relances automatiques et personnalisées pour ne plus laisser passer une opportunité.' },
  { icone: faSignal, texte: 'Optimiser', explication: 'Un suivi en temps réel des performances et des opportunités générées.' },
  { icone: faShieldHalved, texte: 'Sécuriser', explication: 'Vos données sont protégées et hébergées en Europe, conformément au RGPD.' },
];

const Techno = () => {
  return (
    <section className="bg-cream pb-12 md:pb-16">
      {/* Titre encadré par deux mini-traits */}
      <div className="flex items-center justify-center gap-3 px-5 py-10 md:gap-4 md:py-12">
        <span className="h-px w-5 shrink-0 bg-gold md:w-6" />
        <p className="text-center font-serif text-base font-semibold tracking-[0.12em] text-ink md:text-xl md:tracking-[0.2em]">
          UNE SOLUTION, DEUX UNIVERS
        </p>
        <span className="h-px w-5 shrink-0 bg-gold md:w-6" />
      </div>

      {/* Catégories : 1 colonne sur mobile → 2 → 3 → 5 sur ordinateur */}
      <div className="mx-auto flex max-w-[1320px] flex-wrap justify-center gap-y-12 px-5 md:px-10 xl:px-20">
        {VALEURS.map((v) => (
          <div
            key={v.texte}
            className="flex w-full flex-col items-center gap-4 px-4 text-center sm:w-1/2 lg:w-1/3 xl:w-1/5"
          >
            {/* Cercle beige + icône dorée (plus petit sur mobile) */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-pale md:h-24 md:w-24">
              <FontAwesomeIcon icon={v.icone} className="text-[26px] text-[#A6834F] md:text-[32px]" />
            </div>

            {/* Titre */}
            <p className="font-serif text-lg font-semibold text-ink md:text-xl">{v.texte}</p>

            {/* Explication centrée */}
            <p className="max-w-[260px] text-sm leading-relaxed text-stone">{v.explication}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Techno;