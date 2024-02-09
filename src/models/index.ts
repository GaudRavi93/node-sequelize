import { User } from "./user.model";
import { Sequelize } from "sequelize";
import { Product } from "./product.model";
import { Category } from "./category.model";


export function initMySQLModels(connection: Sequelize){

    // Initialize models
    User.initModel(connection);
    Product.initModel(connection);
    Category.initModel(connection);

    // Initialize associations
    User.initAssociations();
    Product.initAssociations();
    Category.initAssociations();

}