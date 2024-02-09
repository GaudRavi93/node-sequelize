import { User } from "./user.model";
import { Category } from "./category.model";
import { DataTypes, Model, Sequelize } from "sequelize";


export class Product extends Model{
    static initModel(connection: Sequelize){
        Product.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                price: {
                    type: DataTypes.DECIMAL(10,2),
                    allowNull: false
                },
                actualCost: {
                    type: DataTypes.DECIMAL(10,2),
                    allowNull: false
                },
                image: {
                    type: DataTypes.STRING
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }, {
                sequelize: connection,
                tableName: "products",
                freezeTableName: true
            }
        )
    }

    static initAssociations(){
        Product.belongsTo(User, {foreignKey: "user_id", as: "user_details"});
        Product.belongsTo(Category, {foreignKey: "category_id", as: "category"});
    }
}