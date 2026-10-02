import { Link } from 'react-router-dom';

const RealtyHero = () => {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-ink lg:min-h-[640px]">
      {/* Photo de la skyline à droite */}
      <img
        src="/src/img/realty-hero.webp"
        alt="Skyline de nuit"
        className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-[65%]"
      />
      {/* Dégradé noir à gauche pour que le texte reste lisible */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30 lg:via-ink/80 lg:via-40% lg:to-transparent" />

      {/* Contenu */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 xl:px-20">
        <div className="max-w-[620px]">
          <h1 className="text-[32px] font-medium leading-tight text-white md:text-[44px]">
            Transformez des projets immobiliers en opportunités commerciales.
          </h1>
          <p className="mt-6 max-w-[540px] text-base leading-relaxed text-white/80 md:text-[17px]">
            LEADORA Realty vous permet de recevoir des prospects qualifiés, avec des informations
            structurées et adaptées à votre activité.
          </p>

          {/* Boutons : empilés sur mobile, côte à côte à partir de 640px */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/realty/devenir-partenaire"
              className="rounded-full bg-gold px-8 py-3.5 text-center text-[15px] font-medium text-ink transition hover:bg-gold-light"
            >
              Demander une présentation
            </Link>
            <Link
              to="/realty/devenir-partenaire"
              className="rounded-full border border-gold px-8 py-3.5 text-center text-[15px] font-medium text-white transition hover:bg-gold hover:text-ink"
            >
              Devenir partenaire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealtyHero;