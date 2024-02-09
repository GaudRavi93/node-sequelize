import { User } from "./user.model";
import { Product } from "./product.model";
import { DataTypes, Model, Sequelize } from "sequelize";


export class Category extends Model {
    static initModel(connection: Sequelize){
        Category.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: "categories",
                sequelize: connection,
                freezeTableName: true
            }
        )
    }

    static initAssociations(){
        Category.belongsTo(User, {foreignKey: "user_id", as: "user_details"});
        Category.hasMany(Product, {foreignKey: "category_id", as: "products"})
    }
}