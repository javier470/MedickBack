export interface ICita {
    IdCita?: number;
    IdPaciente: number;
    IdUsuario: number;
    MotivoConsulta: string;
    Diagnostico: string;
    FechaConsulta: Date;
    Paciente_Asistio: Boolean;
}