import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faArrowRight, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo-leadora.webp';

const OFFRES = [
  {
    badge: 'POUR LES AGENCES',
    titre: 'Leadora Realty',
    sousTitre: "L'IA au service de vos prospects.",
    avantages: [
      'Qualification automatique des demandes',
      'Scoring intelligent des prospects',
      'Relances multicanales (email, WhatsApp, SMS)',
      'Tableau de bord et suivi en temps réel',
    ],
    bouton: 'Découvrir Leadora Realty',
    lien: '/realty',
    image: '/src/img/realty-laptop.webp',
    cadrage: 'object-left', // garde l'ordinateur entier (cadré à gauche)
    stat: true,
  },
  {
    badge: 'POUR LES PARTICULIERS',
    titre: 'Leadora Match',
    sousTitre: "L'intelligence au service de votre recherche.",
    avantages: [
      'Recherche personnalisée selon vos critères',
      'Sélection de biens correspondant à votre profil',
      'Accompagnement tout au long de votre projet',
      'Accès direct aux agences partenaires',
    ],
    bouton: 'Découvrir Leadora Match',
    lien: '/match',
    image: '/src/img/match-phone.webp',
    cadrage: 'object-center',
    stat: false,
  },
];

const RealtyMatch = () => {
  return (
    <section className="bg-cream px-5 py-12 md:px-10 xl:px-20">
      <div className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-2">
        {OFFRES.map((offre) => (
          <article
            key={offre.titre}
            className="flex flex-col overflow-hidden rounded-2xl border border-stone-line/60 bg-cream-light shadow-[0_2px_16px_rgba(11,13,16,0.05)] md:flex-row"
          >
            {/* ── Texte ── */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <span className="self-start rounded-full bg-gold-pale px-3.5 py-1 text-[11px] font-semibold tracking-[0.15em] text-[#A6834F]">
                {offre.badge}
              </span>

              <div className="mt-5 flex items-center gap-4">
                <img src={logo} alt="" className="h-14 w-14 shrink-0" />
                <div>
                  <h3 className="font-serif text-[28px] font-medium leading-tight text-ink">{offre.titre}</h3>
                  <p className="font-serif text-base leading-snug text-stone">{offre.sousTitre}</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5">
                {offre.avantages.map((texte) => (
                  <li key={texte} className="flex items-start gap-2.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-[3px] shrink-0 text-[17px] text-[#A6834F]" />
                    <span className="font-serif text-[15.5px] leading-snug text-ink">{texte}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={offre.lien}
                className="mt-7 inline-flex items-center gap-2.5 self-start rounded-full bg-[#A6834F] px-6 py-3 font-serif text-[15px] font-semibold text-white transition hover:bg-[#8F7043]"
              >
                {offre.bouton}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            {/* ── Visuel ── */}
            <div className="relative h-80 bg-cream-dark md:h-auto md:w-[46%] md:shrink-0">
              <img src={offre.image} alt={offre.titre} className={`h-full w-full object-cover ${offre.cadrage}`} />

              {offre.stat && (
                <div className="absolute bottom-8 left-4 rounded-xl bg-white px-4 py-3 shadow-lg md:-left-8">
                  <p className="text-xs font-medium text-ink">Prospects qualifiés</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xl font-semibold text-ink">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-base text-[#A6834F]" />
                    + 68%
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RealtyMatch;