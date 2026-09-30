import { Link } from 'react-router-dom';
import logo from '../img/logo1.webp';

// Liens de navigation (à gauche)
const LIENS = [
  { to: '/', label: 'Accueil' },
  { to: '/realty', label: 'LEADORA Realty' },
  { to: '/match', label: 'LEADORA Match' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

// Liens légaux (à droite)
const LEGAL = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/confidentialite', label: 'Politique de confidentialité' },
  { to: '/cgu', label: 'CGU' },
  { to: '/cookies', label: 'Gestion des cookies' },
];

// Réseaux sociaux (TODO : mettre les vrais liens)
const RESEAUX = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icone: 'M6.5 9v9M6.5 6v.01M10.5 18v-5a3 3 0 0 1 6 0v5M10.5 9v9' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icone: 'M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm8 7.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16.5 7.5v.01' },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icone: 'M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c0 2.5 2 4.5 4.5 4.5' },
];

// Ligne de liens séparés par un petit trait vertical
function Liens({ liens, clair }) {
  return (
    <nav className="flex flex-wrap items-center">
      {liens.map((lien, i) => (
        <Link
          key={lien.to}
          to={lien.to}
          className={`px-3 text-[13px] transition-colors hover:text-gold first:pl-0 last:pr-0 ${
            i > 0 ? 'border-l border-white/25' : ''
          } ${clair ? 'text-white/80' : 'text-white/65'}`}
        >
          {lien.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-10 px-20 py-14">
        {/* Gauche : logo, phrase, navigation */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo LEADORA" className="h-10 w-auto" />
          </Link>
          <p className="mt-3.5 text-sm text-white/65">L’intelligence qui transforme vos projets en opportunités</p>
          <div className="mt-8">
            <Liens liens={LIENS} clair />
          </div>
        </div>

        {/* Droite : réseaux sociaux, liens légaux */}
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-[18px]">
            {RESEAUX.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                aria-label={r.label}
                className="text-white/80 transition-colors hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d={r.icone} />
                </svg>
              </a>
            ))}
          </div>
          <Liens liens={LEGAL} />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1440px] px-20 py-5 text-xs text-white/40">
          © {new Date().getFullYear()} LEADORA. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}