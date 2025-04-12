import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { IRecetas } from "../interfaces/Recetas.interface.js";
import Medicamento from "./Medicamentos.model.js";
import Cita from "./Citas.model.js";


class Recetas extends Model<IRecetas> implements IRecetas {
    public IdReceta!: number;
    public IdCita!: number;
    public IdMedicamento!: number;
}

Recetas.init(
    {
        IdReceta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdCita: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cita,
                key: "IdCita"
            }

        },
        IdMedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medicamento,
                key: "IdMedicamento",
            },
        }
    },
    {
        sequelize,
        tableName: 'Recetas'
    }
)

Recetas.belongsTo(Cita, { foreignKey: "IdCita" })
Recetas.belongsTo(Medicamento, { foreignKey: "IdMedicamento" })

Cita.hasMany(Recetas, { foreignKey: "IdCita" })
Medicamento.hasMany(Recetas, { foreignKey: "IdMedicamento" })

export default Recetas;