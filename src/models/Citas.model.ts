import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { ICita } from "../interfaces/Citas.interface.js";
import Paciente from "./Pacientes.model.js";
import Usuario from "./Usuarios.model.js";


class Cita extends Model<ICita> implements ICita {
    public IdCita!: number;
    public IdPaciente!: number;
    public IdUsuario!: number;
    public MotivoConsulta!: string;
    public Diagnostico!: string;
    public FechaConsulta!: Date;
    public Paciente_Asistio!: Boolean;
}

Cita.init(
    {
        IdCita: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paciente,
                key: "IdPaciente"
            }
        },
        IdUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "IdUsuario"
            }
        },
        MotivoConsulta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Diagnostico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FechaConsulta: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Paciente_Asistio: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'Citas'
    }
)

Cita.belongsTo(Paciente, { foreignKey: "IdPaciente" });
Cita.belongsTo(Usuario, { foreignKey: "IdUsuario" });

Paciente.hasMany(Cita, { foreignKey: "IdPaciente" });
Usuario.hasMany(Cita, { foreignKey: "IdUsuario" })

export default Cita;