-- ─────────────────────────────────────────────
-- Table des demandes du questionnaire LEADORA Match
-- Une ligne = un client qui a rempli les 9 étapes.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS demandes_match (
  id               SERIAL PRIMARY KEY,         -- numéro unique, ajouté tout seul

  -- Étape 1 et 2 : projet et type de bien
  projet           TEXT NOT NULL,              -- Acheter, Louer, Investir...
  type_bien        TEXT NOT NULL,              -- Appartement, Maison...

  -- Étape 3 : localisation
  pays             TEXT,
  ville            TEXT NOT NULL,
  region           TEXT,
  quartier         TEXT,
  autres_zones     TEXT[] DEFAULT '{}',        -- liste de zones en plus

  -- Étape 4 : budget (en nombre, pour pouvoir trier plus tard)
  budget_min       INTEGER,
  budget_max       INTEGER NOT NULL,
  devise           TEXT DEFAULT 'EUR',

  -- Étape 5 : critères
  pieces           TEXT,
  chambres         TEXT,
  surface          TEXT,
  options          TEXT[] DEFAULT '{}',        -- Parking, Piscine...
  autres_criteres  TEXT,

  -- Étape 6 : délai
  delai            TEXT NOT NULL,

  -- Étape 7 : situation (Oui / Non)
  financement      TEXT,
  deja_rencontre   TEXT,
  bien_identifie   TEXT,
  deja_accompagne  TEXT,

  -- Étape 8 : coordonnées
  prenom           TEXT NOT NULL,
  nom              TEXT NOT NULL,
  email            TEXT NOT NULL,
  telephone        TEXT NOT NULL,
  pays_residence   TEXT,
  moyen_contact    TEXT,

  -- Étape 9 : consentements (vrai / faux)
  rgpd             BOOLEAN NOT NULL DEFAULT false,
  contact          BOOLEAN NOT NULL DEFAULT false,
  transmission     BOOLEAN NOT NULL DEFAULT false,
  cgu              BOOLEAN NOT NULL DEFAULT false,

  -- Suivi par l'administrateur
  statut           TEXT NOT NULL DEFAULT 'nouveau',   -- nouveau, contacté, traité
  cree_le          TIMESTAMPTZ NOT NULL DEFAULT NOW() -- date et heure de la demande
);
