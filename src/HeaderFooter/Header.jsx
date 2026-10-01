import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../img/logo1.webp';

// Liens du menu (ordre de la maquette)
const LIENS = [
  { to: '/', label: 'Accueil' },
  { to: '/realty', label: 'LEADORA Realty' },
  { to: '/match', label: 'LEADORA Match' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/realty/devenir-partenaire', label: 'Partenaires' },
  { to: '/contact', label: 'Contact' },
];

// Styles des boutons (partagés entre le menu ordinateur et le menu mobile)
const BTN = 'whitespace-nowrap rounded-full px-5 py-2.5 text-center font-serif text-[15px] font-semibold transition 2xl:px-6';
const BTN_GOLD = `${BTN} bg-gold text-ink hover:bg-gold-light`;
const BTN_BLANC = `${BTN} border border-white/60 text-white hover:bg-white hover:text-ink`;
const BTN_PARTENAIRE = `${BTN} border border-gold text-white hover:bg-gold hover:text-ink`;

// Boutons d'action (un seul sur les pages Realty)
function Boutons({ pageRealty, onClick }) {
  if (pageRealty) {
    return (
      <Link to="/realty/devenir-partenaire" onClick={onClick} className={BTN_PARTENAIRE}>
        Devenir partenaire
      </Link>
    );
  }
  return (
    <>
      <Link to="/match/questionnaire" onClick={onClick} className={BTN_GOLD}>
        Déposer mon projet
      </Link>
      <Link to="/realty" onClick={onClick} className={BTN_BLANC}>
        Je suis un professionnel
      </Link>
    </>
  );
}

export default function Header() {
  const { pathname } = useLocation();

  // Ombre sous le header quand on descend
  const [scrolle, setScrolle] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolle(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile (burger) ouvert / fermé
  const [menuOuvert, setMenuOuvert] = useState(false);
  const fermerMenu = () => setMenuOuvert(false);

  // Menu ouvert : on bloque le défilement de la page et Échap le ferme
  useEffect(() => {
    if (!menuOuvert) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOuvert(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOuvert]);

  // Pages Realty : un seul bouton « Devenir partenaire »
  const pageRealty = pathname.startsWith('/realty');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink transition-shadow duration-300 ${
        scrolle || menuOuvert ? 'shadow-[0_4px_20px_rgba(0,0,0,0.35)]' : ''
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6 xl:h-[84px] 2xl:gap-10">
        {/* Logo */}
        <Link to="/" onClick={fermerMenu} className="flex shrink-0 items-center">
          <img src={logo} alt="Logo LEADORA" className="h-10 w-auto xl:h-12" />
        </Link>

        {/* Menu ordinateur (à partir de 1280px) */}
        <nav className="hidden h-full items-center gap-6 xl:flex 2xl:gap-10">
          {LIENS.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end
              className={({ isActive }) =>
                `relative flex h-full items-center whitespace-nowrap font-serif text-[16px] font-medium transition-colors hover:text-gold 2xl:text-[17px] ${
                  isActive
                    ? 'text-gold after:absolute after:inset-x-0 after:bottom-[22px] after:h-0.5 after:rounded after:bg-gold'
                    : 'text-white'
                }`
              }
            >
              {lien.label}
            </NavLink>
          ))}
        </nav>

        {/* Boutons ordinateur */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Boutons pageRealty={pageRealty} />
        </div>

        {/* Bouton burger (mobile et tablette) */}
        <button
          type="button"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:text-gold xl:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-7 w-7">
            {menuOuvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Menu mobile : panneau sous le header, sur toute la hauteur restante */}
      {menuOuvert && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-white/10 bg-ink xl:hidden"
        >
          <nav className="container-page flex flex-col py-4">
            {LIENS.map((lien) => (
              <NavLink
                key={lien.to}
                to={lien.to}
                end
                onClick={fermerMenu}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 font-serif text-xl font-medium transition-colors hover:text-gold ${
                    isActive ? 'text-gold' : 'text-white'
                  }`
                }
              >
                {lien.label}
              </NavLink>
            ))}
          </nav>
          <div className="container-page flex flex-col gap-3 pb-10 pt-4 sm:flex-row">
            <Boutons pageRealty={pageRealty} onClick={fermerMenu} />
          </div>
        </div>
      )}
    </header>
  );
}