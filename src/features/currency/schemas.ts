import { z } from 'zod'

export const conversionSchema = z
  .object({
    amount: z
      .union([z.number(), z.nan()])
      .refine(
        val => {
          // Allow NaN/undefined (empty field - no error)
          if (typeof val === 'number' && isNaN(val)) {
            return true
          }
          return typeof val === 'number' && !isNaN(val) && isFinite(val) && val > 0 && val >= 0.01
        },
        {
          message: 'Amount must be a positive number (at least 0.01)',
        }
      )
      .optional(),
    from: z.string().min(1, 'From currency is required'),
    to: z.string().min(1, 'To currency is required'),
  })
  .refine(data => data.from !== data.to, {
    message: 'Please select different currencies',
    path: ['root'],
  })

export type ConversionFormData = z.infer<typeof conversionSchema>
