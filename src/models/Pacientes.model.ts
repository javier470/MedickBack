import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { IPaciente } from "../interfaces/Pacientes.interface.js";


class Paciente extends Model<IPaciente> implements IPaciente {
    public IdPaciente!: number;
    public Nombre_Paciente!: string;
    public Apellido_Paciente!: string;
    public DocumentoIdentificacion_Paciente!: string;
    public FechaNacimiento_Paciente!: Date;
    public Direccion_Paciente!: string;
    public Telefono_Paciente!: string;
    public Email_Paciente!: string;
    public Password_Paciente!: string;
    public Genero_Paciente!: string;
    public Status_Paciente!: boolean;
}

Paciente.init(
    {
        IdPaciente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Apellido_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DocumentoIdentificacion_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FechaNacimiento_Paciente: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Direccion_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Telefono_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Genero_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Status_Paciente: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'Pacientes'
    }
)

export default Paciente;