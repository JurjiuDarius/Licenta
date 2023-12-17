export interface Image {
  id: string;
  fileName: string;
  patientId: number;
  isProcessed: boolean;
  image: string;
  originalImageId: string;
}
