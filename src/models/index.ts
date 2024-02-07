import { Sequelize } from "sequelize";
import { User } from "./user.model";


export function initMySQLModels(connection: Sequelize){
    User.initModel(connection);
}