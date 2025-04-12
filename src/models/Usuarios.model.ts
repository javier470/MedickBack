import { DataTypes, Model } from "sequelize";
import { IUsuario } from "../interfaces/Usuarios.interface.js";
import sequelize from "../config/db.js"
import Role from "./Roles.model.js";
import Especialidad from "./Especialidad.model.js";


class Usuario extends Model<IUsuario> implements IUsuario {
    public IdUsuario!: number;
    public Nombre_Usuario!: string;
    public Apellido_Usuario!: string;
    public Email_Usuario!: string;
    public Password_Usuario!: string;
    public IdEspecialidad!: number;
    public IdRole!: number;
    public Status_usuario!: boolean;
}

Usuario.init(
    {
        IdUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre_Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Apellido_Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email_Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password_Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IdEspecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Especialidad,
                key: "IdEspecialidad",
            },
        },
        IdRole: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: "IdRole",
            },
        },
        Status_usuario: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: "Usuarios",
        timestamps: false,
    }
);

Usuario.belongsTo(Especialidad, {foreignKey: "IdEspecialidad"});
Usuario.belongsTo(Role, {foreignKey: "IdRole"});

Especialidad.hasMany(Usuario, {foreignKey: "IdEspecialidad"});
Role.hasMany(Usuario, {foreignKey: "IdRole"});

export default Usuario;