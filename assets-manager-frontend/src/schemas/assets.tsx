import { z } from 'zod';

const categories = [
  "computer",
  "notebook",
  "monitor",
  "network",
  "furniture",
  "peripheral",
  "other"
] as const;

const status = [
  "available",
  "in_use",
  "maintenance",
  "disposed"
] as const;

export const assetSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').regex(/^[^0-9]*$/, "O campo não pode conter números"),

  serialNumber: z.string().trim().min(1, 'Serial é obrigatório'),

  category: z.enum(categories, {
    error: "Categoria é obrigatória"
  }),

  status: z.enum(status, {
    error: "Status é obrigatório"
  }),

  acquisitionDate: z.string().nullable().optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;
