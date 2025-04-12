import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { IHistorialMedicamentos } from "../interfaces/RegistroMedicamentos.interface.js";
import Medicamento from "./Medicamentos.model.js";


class HistorialMed extends Model<IHistorialMedicamentos> implements IHistorialMedicamentos {
    public IdHistorialMdc!: number;
    public IdMedicamento!: number;
    public Cantidad!: number;
    public Total!: number;
}

HistorialMed.init(
    {
        IdHistorialMdc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdMedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medicamento,
                key: "IdMedicamento"
            }
        },
        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'HistorialMed'
    }
)

HistorialMed.belongsTo(Medicamento, { foreignKey: "IdMedicamento" });

Medicamento.hasMany(HistorialMed, { foreignKey: "IdMedicamento" });

export default HistorialMed;