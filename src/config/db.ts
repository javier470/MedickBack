import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(
  config.DB.database,
  config.DB.username,
  config.DB.password,
  {
    host: config.DB.host,
    port: config.DB.port,
    dialect: config.DB.dialect,
    logging: false, // console.log permite logs para debbug / false evita los logs debug
  }
);

export default sequelize;
