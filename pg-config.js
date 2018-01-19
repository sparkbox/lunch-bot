let config;

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  // for local testing
  config = {
    host: process.env.pgHost,
    user: process.env.pgUser,
    database: process.env.pgDb,
  };
}

module.exports = config;
