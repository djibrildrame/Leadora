import pg from 'pg';

// ─────────────────────────────────────────────
// Connexion à la base PostgreSQL.
// L'adresse de la base est dans le fichier .env (DATABASE_URL).
// "pool" garde quelques connexions ouvertes et les réutilise :
// c'est plus rapide que d'ouvrir une connexion à chaque demande.
// ─────────────────────────────────────────────
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
