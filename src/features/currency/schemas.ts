import { z } from 'zod'

export const conversionSchema = z
  .object({
    amount: z
      .number({ message: 'Amount is required' })
      .positive('Amount must be positive')
      .min(0.01, 'Amount must be at least 0.01'),
    from: z.string().min(1, 'From currency is required'),
    to: z.string().min(1, 'To currency is required'),
  })
  .refine(data => data.from !== data.to, {
    message: 'Wybierz różne waluty',
    path: ['root'],
  })

export type ConversionFormData = z.infer<typeof conversionSchema>
