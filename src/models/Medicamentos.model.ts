import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Medicamento extends Model {
  public IdMedicamento!: number;
  public Nombre_Medicamento!: string;
  public Fecha_Ingreso!: Date;
  public Fecha_Exp!: Date;
  public Stock!: number;
  public Precio!: number;
  public Marca!: string;
  public Status_Medicamento!: boolean;
}

Medicamento.init(
  {
    IdMedicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre_Medicamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fecha_Ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Fecha_Exp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status_Medicamento: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "Medicamentos",
    timestamps: false,
  }
);

export default Medicamento;
