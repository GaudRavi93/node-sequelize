import "dotenv/config";
import { App } from "./app";
import { Sequelize } from "sequelize";
import { initMySQLModels } from "./models";

const app = new App();

export let sequelize: Sequelize;

const MYSQL_USER = process.env.MYSQL_USER || "";
const DATABASE_NAME = process.env.DATABASE_NAME || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";

sequelize = new Sequelize(DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

try {
  (async () => {
    // connect database
    await sequelize.authenticate();

    // initialize tables
    initMySQLModels(sequelize);
    
    // update table if any column changed
    await sequelize.sync({ alter: false });
    
    console.log("Connection has been established successfully.");
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
