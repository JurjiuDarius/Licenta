export interface Appointment {
  id: number;
  title: string;
  requirements: string;
  address: string;
  startTime: Date;
  endTime: Date;
  dateCreated: Date;
  doctorId: number;
  requiresUpload: boolean;
}
