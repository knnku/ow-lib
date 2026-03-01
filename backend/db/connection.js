const { Pool } = require('pg');

// 🚨 IMPORTANT FOR DOCKER: 
// If your backend is running INSIDE Docker, the host is the name of your database service 
// in docker-compose.yml (usually 'db' or 'postgres'). 
// If you were running Node locally on your Mac, it would be 'localhost'.


const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'owl_tf_db',
  password: process.env.DB_PW || 'password',
  port: process.env.DB_PORT || 5432,
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client, db seems not running', err.stack);
  }
  console.log('DB PSQL Connection Success!');
  release();
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};