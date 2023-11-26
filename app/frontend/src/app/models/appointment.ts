export interface Appointment {
  id: number;
  requirements: string;
  address: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  doctorId: number;
  patientId: number | null;
  requiresUpload: boolean;
}
