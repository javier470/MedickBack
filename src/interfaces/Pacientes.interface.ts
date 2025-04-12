export interface IPaciente {
    IdPaciente?: number;
    Nombre_Paciente: string;
    Apellido_Paciente: string;
    DocumentoIdentificacion_Paciente: string;
    FechaNacimiento_Paciente: Date;
    Direccion_Paciente: string;
    Telefono_Paciente: string;
    Email_Paciente: string;
    Password_Paciente: string;
    Genero_Paciente: string;
    Status_Paciente: boolean;
}