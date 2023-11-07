import { Time } from '@angular/common';

interface Appointment {
  id: number;
  title: string;
  requirements: string;
  startTime: Date;
  endTime: Date;
  dateCreated: Date;
  doctorId: number;
  requiresUpload: boolean;
}
