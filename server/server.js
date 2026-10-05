import 'dotenv/config'; // lit le fichier .env (doit rester la 1re ligne)
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import routeMatch from './routes/match.js';

const app = express();

// ─────────────────────────────────────────────
// Réglages généraux
// ─────────────────────────────────────────────
// Autorise le site React (localhost:5173) à appeler ce serveur
app.use(cors({ origin: process.env.FRONT_URL }));
// Permet de lire le JSON envoyé par le formulaire
app.use(express.json());

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
// Petite route de test : http://localhost:5000/api/sante
app.get('/api/sante', async (req, res) => {
  try {
    await pool.query('SELECT 1'); // vérifie que la base répond
    res.json({ serveur: 'ok', base: 'ok' });
  } catch (erreur) {
    res.status(500).json({ serveur: 'ok', base: 'erreur', detail: erreur.message });
  }
});

// Questionnaire Match : POST http://localhost:5000/api/match
app.use('/api/match', routeMatch);

// ─────────────────────────────────────────────
// Démarrage
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur LEADORA lancé sur http://localhost:${PORT}`);
});
