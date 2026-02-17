export type Status = "available" | "in_use" | "maintenance" | "disposed";

export type Category = "computer" | "notebook" | "monitor" | "network" | "furniture" | "peripheral" | "other";

export default interface Asset {
  id?: number;
  name: string;
  serialNumber: string;
  category: Category,
  status: Status;
  acquisitionDate?: string | null;
}