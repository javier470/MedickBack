import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { IRol } from "../interfaces/Roles.interface.js";


class Role extends Model<IRol> implements IRol {
    public IdRole!: number;
    public Nombre_Rol!: string;
    public Status_rol!: boolean;
}

Role.init(
    {
        IdRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre_Rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Status_rol: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'Roles'
    }
)

export default Role;