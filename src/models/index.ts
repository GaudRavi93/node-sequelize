import { User } from "./user.model";
import { Sequelize } from "sequelize";
import { Category } from "./category.model";


export function initMySQLModels(connection: Sequelize){

    // Initialize models
    User.initModel(connection);
    Category.initModel(connection);

    // Initialize associations
    User.initAssociations();
    Category.initAssociations();

}