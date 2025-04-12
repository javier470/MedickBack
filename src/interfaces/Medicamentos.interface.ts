export interface IMedicamento {
    IdMedicamento?: number;
    Nombre_Medicamento: string;
    Fecha_Ingreso: Date;
    Fecha_Exp: Date;
    Stock: number;
    Precio: number;
    Marca: string;
    Status_Medicamento: Boolean;
}