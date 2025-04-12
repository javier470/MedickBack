import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js"
import { IEspecialidad } from "../interfaces/Especialidad.interface.js";

class Especialidad extends Model<IEspecialidad> implements IEspecialidad {
    public IdEspecialidad!: number;
    public Nombre_Especialidad!: string;
    public Descripcion_Especialidad!: string;
    public Status_especialidad!: boolean;
}

Especialidad.init(
    {
        IdEspecialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre_Especialidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Descripcion_Especialidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Status_especialidad: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "Especialidades",
        timestamps: false,
    }
);

export default Especialidad