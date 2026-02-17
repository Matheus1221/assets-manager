import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').regex(/^[^0-9]*$/, "O campo não pode conter números"),
  serialNumber: z.string().min(1, 'Serial é obrigatório'),
  category: z.string().optional(),
  status: z.string().optional(),
  acquisitionDate: z.string().nullable().optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;
