export interface Image {
  id: number;
  fileName: string;
  patientId: number;
  isProcessed: boolean;
  image: string;
  originalImageId: number;
}
