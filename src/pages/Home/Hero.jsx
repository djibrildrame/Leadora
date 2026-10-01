// Photo du hero (la phrase « Des projets bien plus que des biens. » est incluse dans l'image)
import photoHero from '../../img/hero.webp';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Photo : en fond sur mobile/tablette, à droite (≈ 55 % de la largeur) sur grand écran */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full bg-ink-soft bg-cover bg-right lg:w-[55%]"
        style={{
          backgroundImage: `url(${photoHero})`,
        }}
      />

      {/* Voile sombre pour que le texte reste lisible sur la photo :
          uniforme sur mobile/tablette, fondu noir → transparent sur grand écran */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/90 to-ink/60 lg:from-ink lg:from-45% lg:via-ink/60 lg:via-55% lg:to-transparent lg:to-70%"
      />

      <div className="container-page relative flex min-h-[520px] items-center py-14 sm:py-16 lg:min-h-[480px]">
        <div className="max-w-[640px] animate-fade-up">
          {/* Sur-titre */}
          <p className="text-[13px] font-medium uppercase tracking-brand text-gold">LEADORA</p>

          {/* Titre */}
          <h1 className="mt-4 font-serif text-[36px] font-medium leading-[1.08] tracking-tight sm:mt-5 sm:text-[46px] xl:text-[56px] xl:leading-[1.05]">
            L’intelligence qui transforme{' '}
            <br className="hidden sm:block" />
            <em className="italic text-gold">vos projets en opportunités.</em>
          </h1>

          {/* Texte */}
          <p className="mt-6 max-w-[470px] font-serif text-[16px] leading-relaxed sm:mt-7 sm:text-[18px] text-white/85">
            LEADORA connecte les agences immobilières et les particuliers grâce à l’IA. Une solution
            complète, intuitive et performante, pour donner vie à chaque projet immobilier.
          </p>

          {/* Boutons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            {/* TODO : pointer vers la section « solution » quand elle existera */}
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-light px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-gold"
            >
              Découvrir la solution
              <span aria-hidden="true">→</span>
            </a>

            {/* TODO : ouvrir la vidéo de présentation */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M10 8.5v7l5.5-3.5L10 8.5Z" fill="currentColor" stroke="none" />
              </svg>
              Voir la vidéo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}