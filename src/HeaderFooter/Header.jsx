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

  // Pages Realty : un seul bouton « Devenir partenaire »
  const pageRealty = pathname.startsWith('/realty');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink transition-shadow duration-300 ${
        scrolle ? 'shadow-[0_4px_20px_rgba(0,0,0,0.35)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between gap-10 px-20">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logo} alt="Logo LEADORA" className="h-12 w-auto" />
        </Link>

        {/* Menu */}
        <nav className="flex h-full items-center gap-10">
          {LIENS.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end
              className={({ isActive }) =>
                `relative flex h-full items-center whitespace-nowrap font-serif text-[17px] font-medium transition-colors hover:text-gold ${
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

        {/* Boutons */}
        <div className="flex shrink-0 items-center gap-3">
          {pageRealty ? (
            <Link
              to="/realty/devenir-partenaire"
              className="whitespace-nowrap rounded-full border border-gold px-6 py-2.5 font-serif text-[15px] font-semibold text-white transition hover:bg-gold hover:text-ink"
            >
              Devenir partenaire
            </Link>
          ) : (
            <>
              <Link
                to="/match/questionnaire"
                className="whitespace-nowrap rounded-full bg-gold px-6 py-2.5 font-serif text-[15px] font-semibold text-ink transition hover:bg-gold-light"
              >
                Déposer mon projet
              </Link>
              <Link
                to="/realty"
                className="whitespace-nowrap rounded-full border border-white/60 px-6 py-2.5 font-serif text-[15px] font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                Je suis un professionnel
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}