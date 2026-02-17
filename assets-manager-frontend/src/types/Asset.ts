export default interface Asset {
  id?: number;
  name: string;
  serialNumber: string;
  category?: string;
  status?: string;
  acquisitionDate?: string | null;
}