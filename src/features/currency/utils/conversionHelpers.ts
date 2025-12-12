import type { ConversionFormData } from '../schemas'

export const canConvert = (
  formData: Partial<ConversionFormData>,
  debouncedAmount: number | undefined,
  hasErrors: boolean
): boolean => {
  return (
    !!formData.from &&
    !!formData.to &&
    formData.from !== formData.to &&
    !!debouncedAmount &&
    debouncedAmount > 0 &&
    !hasErrors
  )
}
