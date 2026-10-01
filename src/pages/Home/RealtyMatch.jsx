import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faArrowRight, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo-leadora.webp';

// Contenu des deux cartes
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
    image: '/images/realty-laptop.jpg', // photo de l'ordinateur (dans public/images)
    stat: true,                         // affiche la carte « Prospects qualifiés + 68% »
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
    image: '/images/match-phone.jpg', // photo du téléphone (dans public/images)
    stat: false,
  },
];

const RealtyMatch = () => {
  return (
    <section className="bg-cream px-5 py-12 md:px-10 xl:px-20">
      {/* 1 colonne sur mobile, 2 cartes côte à côte à partir de 1280px */}
      <div className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-2">
        {OFFRES.map((offre) => (
          <article
            key={offre.titre}
            className="flex flex-col overflow-hidden rounded-2xl border border-stone-line/60 bg-cream-light shadow-[0_2px_16px_rgba(11,13,16,0.05)] md:flex-row"
          >
            {/* ── Partie gauche : texte ── */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              {/* Badge */}
              <span className="self-start rounded-full bg-gold-pale px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[#A6834F]">
                {offre.badge}
              </span>

              {/* Logo + titre */}
              <div className="mt-5 flex items-center gap-4">
                <img src={logo} alt="" className="h-16 w-16 shrink-0 md:h-[72px] md:w-[72px]" />
                <div>
                  <h3 className="font-serif text-3xl font-medium text-ink md:text-[34px]">{offre.titre}</h3>
                  <p className="mt-1 font-serif text-lg text-stone">{offre.sousTitre}</p>
                </div>
              </div>

              {/* Liste des avantages */}
              <ul className="mt-7 flex flex-col gap-3">
                {offre.avantages.map((texte) => (
                  <li key={texte} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="shrink-0 text-[20px] text-[#A6834F]" />
                    <span className="font-serif text-[17px] text-ink">{texte}</span>
                  </li>
                ))}
              </ul>

              {/* Bouton */}
              <Link
                to={offre.lien}
                className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-[#A6834F] px-7 py-3.5 font-serif text-[16px] font-semibold text-white transition hover:bg-[#8F7043]"
              >
                {offre.bouton}
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>

            {/* ── Partie droite : image ── */}
            <div className="relative h-64 bg-cream-dark bg-cover bg-center md:h-auto md:w-[42%]" style={{ backgroundImage: `url(${offre.image})` }}>
              {/* Carte « Prospects qualifiés » (uniquement pour Realty) */}
              {offre.stat && (
                <div className="absolute bottom-6 left-4 rounded-xl bg-white px-5 py-4 shadow-lg md:-left-10">
                  <p className="text-sm font-medium text-ink">Prospects qualifiés</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-semibold text-ink">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-lg text-[#A6834F]" />
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