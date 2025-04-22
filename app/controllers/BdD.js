// BdD.js (usando ES Modules)
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MegaSystem',
  password: 'MegaSolar109',
  port: 5432,
});

export default pool;