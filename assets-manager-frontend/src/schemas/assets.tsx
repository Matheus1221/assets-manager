import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').regex(/^[^0-9]*$/, "O campo não pode conter números"),

  serialNumber: z.string().trim().min(1, 'Serial é obrigatório'),

  category: z.string().trim().min(1, 'Categoria é obrigatória'),

  status: z.string().trim().min(1, 'Status é obrigatório'),

  acquisitionDate: z.string().nullable().optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;
