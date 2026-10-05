import nodemailer from 'nodemailer';

// ─────────────────────────────────────────────
// Connexion à la boîte mail qui ENVOIE les mails.
// Les identifiants sont dans le fichier .env :
//   MAIL_USER  → l'adresse Gmail qui envoie
//   MAIL_PASS  → le "mot de passe d'application" Google (pas ton vrai mot de passe)
//   MAIL_ADMIN → l'adresse qui REÇOIT les demandes
// Pour changer d'adresse plus tard, on modifie seulement le .env.
// ─────────────────────────────────────────────
const transporteur = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Empêche un client d'injecter du HTML dans le mail (ex : <script>)
const proteger = (texte) =>
  String(texte ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Affiche une valeur proprement (liste, oui/non, vide…)
const afficher = (valeur) => {
  if (Array.isArray(valeur)) return valeur.length ? valeur.join(', ') : '—';
  if (valeur === true) return 'Oui';
  if (valeur === false) return 'Non';
  if (valeur === null || valeur === undefined || valeur === '') return '—';
  return valeur;
};

// 500000 → "500 000 €"
const prix = (montant, devise) =>
  montant ? `${Number(montant).toLocaleString('fr-FR')} ${devise === 'EUR' ? '€' : devise || ''}` : '—';

// ─────────────────────────────────────────────
// Envoie à l'administrateur le récapitulatif d'une demande Match.
// d  → les données enregistrées (mêmes noms que les colonnes de la table)
// id → le numéro de la demande dans la base
// ─────────────────────────────────────────────
export async function envoyerMailMatch(d, id) {
  // Les réponses rangées par étape : [titre de la section, [[libellé, valeur], ...]]
  const sections = [
    ['Projet', [
      ['Projet', d.projet],
      ['Type de bien', d.type_bien],
      ['Délai', d.delai],
    ]],
    ['Localisation', [
      ['Pays', d.pays],
      ['Ville', d.ville],
      ['Région', d.region],
      ['Quartier', d.quartier],
      ['Autres zones', d.autres_zones],
    ]],
    ['Budget', [
      ['Budget minimum', prix(d.budget_min, d.devise)],
      ['Budget maximum', prix(d.budget_max, d.devise)],
    ]],
    ['Critères', [
      ['Pièces', d.pieces],
      ['Chambres', d.chambres],
      ['Surface', d.surface],
      ['Options', d.options],
      ['Autres critères', d.autres_criteres],
    ]],
    ['Situation', [
      ['Financement obtenu', d.financement],
      ['Déjà rencontré un professionnel', d.deja_rencontre],
      ['Bien déjà identifié', d.bien_identifie],
      ['Déjà accompagné', d.deja_accompagne],
    ]],
    ['Coordonnées du client', [
      ['Prénom', d.prenom],
      ['Nom', d.nom],
      ['Email', d.email],
      ['Téléphone', d.telephone],
      ['Pays de résidence', d.pays_residence],
      ['Moyen de contact préféré', d.moyen_contact],
    ]],
    ['Consentements', [
      ['RGPD', d.rgpd],
      ['Accepte d’être contacté', d.contact],
      ['Accepte la transmission à un partenaire', d.transmission],
      ['CGU', d.cgu],
    ]],
  ];

  // ── Version HTML (jolie, avec un tableau par section) ──
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0B0D10">
      <h2 style="font-family:Georgia,serif;margin-bottom:4px">Nouvelle demande LEADORA Match n°${id}</h2>
      <p style="color:#6B6A66;margin-top:0">
        ${proteger(d.prenom)} ${proteger(d.nom)} · ${proteger(d.email)} · ${proteger(d.telephone)}
      </p>
      ${sections
        .map(
          ([titre, lignes]) => `
        <h3 style="background:#F1E6D3;padding:8px 12px;margin:24px 0 0;font-size:14px">${titre}</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${lignes
            .map(
              ([libelle, valeur]) => `
            <tr>
              <td style="padding:6px 12px;border-bottom:1px solid #D9D6D0;color:#6B6A66;width:45%">${libelle}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #D9D6D0">${proteger(afficher(valeur))}</td>
            </tr>`
            )
            .join('')}
        </table>`
        )
        .join('')}
      <p style="margin-top:24px;font-size:13px;color:#6B6A66">
        Astuce : cliquez sur « Répondre » pour écrire directement au client.
      </p>
    </div>`;

  // ── Version texte (pour les messageries qui n'affichent pas le HTML) ──
  const texte = sections
    .map(([titre, lignes]) => `${titre.toUpperCase()}\n${lignes.map(([l, v]) => `- ${l} : ${afficher(v)}`).join('\n')}`)
    .join('\n\n');

  await transporteur.sendMail({
    from: `"LEADORA" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_ADMIN,
    replyTo: d.email, // "Répondre" écrit directement au client
    subject: `Nouvelle demande Match n°${id} – ${d.prenom} ${d.nom} – ${d.projet} ${d.type_bien} à ${d.ville}`,
    text: texte,
    html,
  });
}


// ─────────────────────────────────────────────
// Envoie au CLIENT un mail de confirmation avec le résumé de sa demande.
// d  → les données enregistrées
// id → le numéro de la demande
// ─────────────────────────────────────────────
export async function envoyerMailConfirmationClient(d, id) {
  // Le résumé : seulement l'essentiel du projet
  const resume = [
    ['Projet', `${d.projet} · ${d.type_bien}`],
    ['Localisation', [d.ville, d.region, d.pays].filter(Boolean).join(', ')],
    ['Budget', d.budget_min ? `${prix(d.budget_min, d.devise)} à ${prix(d.budget_max, d.devise)}` : `Jusqu’à ${prix(d.budget_max, d.devise)}`],
    ['Délai', d.delai],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0B0D10">
      <p style="font-family:Georgia,serif;font-size:22px;letter-spacing:3px;margin-bottom:24px">LEADORA</p>
      <h2 style="font-family:Georgia,serif;font-weight:normal">Merci ${proteger(d.prenom)}, votre demande est bien reçue.</h2>
      <p style="color:#6B6A66;line-height:1.6">
        Notre équipe étudie votre projet et vous recontacte dans les plus brefs délais
        pour vous mettre en relation avec le professionnel le plus adapté.
      </p>

      <h3 style="background:#F1E6D3;padding:8px 12px;margin:28px 0 0;font-size:14px">Récapitulatif de votre demande n°${id}</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${resume
          .map(
            ([libelle, valeur]) => `
          <tr>
            <td style="padding:6px 12px;border-bottom:1px solid #D9D6D0;color:#6B6A66;width:35%">${libelle}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #D9D6D0">${proteger(afficher(valeur))}</td>
          </tr>`
          )
          .join('')}
      </table>

      <p style="color:#6B6A66;line-height:1.6;margin-top:24px">
        Une question ou une précision à ajouter ? Répondez simplement à cet email.
      </p>
      <p style="margin-top:32px">À très bientôt,<br><strong>L’équipe LEADORA</strong></p>
    </div>`;

  const texte = `Merci ${d.prenom}, votre demande est bien reçue.

Notre équipe étudie votre projet et vous recontacte dans les plus brefs délais.

RÉCAPITULATIF DE VOTRE DEMANDE N°${id}
${resume.map(([l, v]) => `- ${l} : ${afficher(v)}`).join('\n')}

Une question ? Répondez simplement à cet email.

L’équipe LEADORA`;

  await transporteur.sendMail({
    from: `"LEADORA" <${process.env.MAIL_USER}>`,
    to: d.email, // le client
    replyTo: process.env.MAIL_ADMIN, // s'il répond, ça arrive chez l'administrateur
    subject: `Votre demande LEADORA n°${id} est bien reçue`,
    text: texte,
    html,
  });
}