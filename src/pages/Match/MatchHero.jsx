import { Link } from 'react-router-dom';

const MatchHero = () => {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-ink-soft text-center lg:min-h-[640px]">
      {/* Photo de fond : salon avec vue mer */}
      <img
        src="/src/img/polina-kuzovkova-zLCTdR6W8N4-unsplash.webp"
        alt="Salon lumineux avec vue sur la mer"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Voile sombre pour que le texte reste lisible */}
      <div className="absolute inset-0 bg-ink/50" />

      {/* Contenu centré */}
      <div className="relative mx-auto max-w-[820px] px-5 py-20">
        <h1>
          <span className="block font-serif text-[48px] font-medium leading-none tracking-[0.06em] text-gold-light md:text-[72px]">
            LEADORA Match
          </span>
          <span className="mt-5 block text-[24px] font-normal leading-tight text-white md:text-[34px]">
            Votre projet immobilier entre de bonnes mains
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-[640px] text-base leading-relaxed text-white/90 md:text-lg">
          Déposez votre projet en quelques minutes. Notre technologie analyse vos besoins et vous met en relation
          avec des professionnels qualifiés.
        </p>

        <Link
          to="/match/questionnaire"
          className="mt-10 inline-block rounded-full bg-gold px-8 py-4 text-[15px] font-medium text-ink transition hover:bg-gold-light md:px-11"
        >
          Trouver l’opportunité qui correspond à mon projet
        </Link>
      </div>
    </section>
  );
};

export default MatchHero;