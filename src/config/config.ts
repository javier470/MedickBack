export default {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DB: {
      database: process.env.DB_NAME || "MedicDb",
      username: process.env.DB_USER || "usrDB",
      password: process.env.DB_PASSWORD || "a1234",
      host: process.env.DB_HOST || "localhost",
      dialect: (process.env.DB_DIALECT as "mysql") || "mysql",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    },
  };
  