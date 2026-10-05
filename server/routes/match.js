import { Router } from 'express';
import pool from '../db.js';
import { envoyerMailMatch, envoyerMailConfirmationClient } from '../mail.js';

const router = Router();

// Vérifie qu'un email a une forme correcte (même fonction que le front)
const emailValide = (email) => {
  const e = (email || '').trim();
  const arobase = e.indexOf('@');
  const point = e.lastIndexOf('.');
  return arobase > 0 && point > arobase + 1 && point < e.length - 2 && !e.includes(' ');
};

// Transforme '200000' en 200000, et un champ vide en null
const enNombre = (valeur) => (valeur ? Number(valeur) : null);

// ─────────────────────────────────────────────
// POST /api/match
// Reçoit les réponses du questionnaire, les enregistre dans la base
// et envoie un mail récapitulatif à l'administrateur.
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  const r = req.body; // les réponses envoyées par le front

  // 1. On revérifie les champs obligatoires côté serveur.
  //    (le front vérifie déjà, mais on ne fait jamais confiance au navigateur)
  const manquants = ['projet', 'typeBien', 'ville', 'budgetMax', 'delai', 'prenom', 'nom', 'telephone']
    .filter((champ) => !String(r[champ] || '').trim());

  if (manquants.length > 0) {
    return res.status(400).json({ ok: false, message: `Champs manquants : ${manquants.join(', ')}` });
  }
  if (!emailValide(r.email)) {
    return res.status(400).json({ ok: false, message: 'Email invalide' });
  }
  if (!r.rgpd || !r.contact || !r.cgu) {
    return res.status(400).json({ ok: false, message: 'Consentements obligatoires non cochés' });
  }

  // 2. On fait correspondre les noms du front (typeBien)
  //    avec les colonnes de la table (type_bien).
  const donnees = {
    projet: r.projet,
    type_bien: r.typeBien,
    pays: r.pays,
    ville: r.ville.trim(),
    region: r.region,
    quartier: r.quartier,
    autres_zones: r.autresZones || [],
    budget_min: enNombre(r.budgetMin),
    budget_max: enNombre(r.budgetMax),
    devise: r.devise,
    pieces: r.pieces,
    chambres: r.chambres,
    surface: r.surface,
    options: r.options || [],
    autres_criteres: r.autresCriteres,
    delai: r.delai,
    financement: r.financement,
    deja_rencontre: r.dejaRencontre,
    bien_identifie: r.bienIdentifie,
    deja_accompagne: r.dejaAccompagne,
    prenom: r.prenom.trim(),
    nom: r.nom.trim(),
    email: r.email.trim(),
    telephone: r.telephone.trim(),
    pays_residence: r.paysResidence,
    moyen_contact: r.moyenContact,
    rgpd: !!r.rgpd,
    contact: !!r.contact,
    transmission: !!r.transmission,
    cgu: !!r.cgu,
  };

  // 3. On construit la requête SQL automatiquement à partir de l'objet :
  //    INSERT INTO demandes_match (projet, type_bien, ...) VALUES ($1, $2, ...)
  //    Les $1, $2... protègent contre les injections SQL (les valeurs sont envoyées à part).
  const colonnes = Object.keys(donnees);
  const valeurs = Object.values(donnees);
  const emplacements = colonnes.map((_, i) => `$${i + 1}`);

  const sql = `INSERT INTO demandes_match (${colonnes.join(', ')})
               VALUES (${emplacements.join(', ')})
               RETURNING id, cree_le`;

  try {
    const resultat = await pool.query(sql, valeurs);
    const demande = resultat.rows[0];

    console.log(`📩 Nouvelle demande Match n°${demande.id} de ${donnees.prenom} ${donnees.nom}`);

    // 4. On envoie le récapitulatif par mail à l'administrateur.
    //    Si le mail échoue, la demande est quand même enregistrée dans la base :
    //    on l'écrit dans la console mais on ne bloque pas le client.
    try {
      await envoyerMailMatch(donnees, demande.id);
      console.log(`✉️  Mail envoyé à ${process.env.MAIL_ADMIN}`);
    } catch (erreurMail) {
      console.error('Erreur envoi mail :', erreurMail.message);
    }


    // 5. On envoie au client un mail de confirmation avec le résumé de sa demande.
    try {
      await envoyerMailConfirmationClient(donnees, demande.id);
      console.log(`✉️  Confirmation envoyée au client (${donnees.email})`);
    } catch (erreurMail) {
      console.error('Erreur mail client :', erreurMail.message);
    }

    res.status(201).json({ ok: true, id: demande.id });
  } catch (erreur) {
    console.error('Erreur base de données :', erreur.message);
    res.status(500).json({ ok: false, message: 'Erreur serveur, réessayez plus tard.' });
  }
});

export default router;