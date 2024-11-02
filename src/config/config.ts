import dotenv from 'dotenv';
dotenv.config();

export const config = {
  app: {
    name: process.env.NAME || 'SHOPCO_BACKEND',
    port: process.env.SERVER_PORT || '5000',
  },
  database: getActiveDatabase(process.env.ACTIVE_DB || 'mysql2'),
};

function getActiveDatabase(db: string) {
  if (db === 'mysql2') {
    return {
      client: db,
      connection: {
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT!) || 3306,
      },
    };
  }

  if (db === 'pg') {
    return {
      client: db,
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'shopco',
        port: 5432,
      },
      migrations: {
        directory: `${__dirname}/../migrations`,
      },
    };
  }

  if (db === 'remotepg') {
    return {
      client: 'pg',
      connection: {
        connectionString: process.env.POSTGRES_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      migrations: {
        directory: `${__dirname}/../migrations`,
      },
    };
  }
}
