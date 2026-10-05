import { Routes, Route } from 'react-router-dom';
import Header from './HeaderFooter/Header.jsx';
import Footer from './HeaderFooter/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Match from './pages/Match/Match.jsx';
import Questionnaire from './pages/Match/Questionnaire/Questionnaire.jsx';
import Confirmation from './pages/Confirmation/Confirmation.jsx';
import Realty from './pages/Realty/Realty.jsx';
import RealtyForm from './pages/RealtyForm/RealtyForm.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Legal from './pages/Legal/Legal.jsx';

// Structure de toutes les pages : Header → page → Footer
export default function App() {
  return (
    <>
      <Header />

      {/* Décale le contenu sous le header fixe : 72px sur mobile/tablette, 84px à partir de 1280px */}
      <main className="min-h-screen pt-[72px] xl:pt-[84px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/match/questionnaire" element={<Questionnaire />} />
          <Route path="/realty" element={<Realty />} />
          <Route path="/realty/devenir-partenaire" element={<RealtyForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal page="mentions" />} />
          <Route path="/confidentialite" element={<Legal page="confidentialite" />} />
          <Route path="/cgu" element={<Legal page="cgu" />} />
          <Route path="/cookies" element={<Legal page="cookies" />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}