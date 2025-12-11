import { useQuery } from '@tanstack/react-query'
import { currencyService } from '../services/currencyService'
import type { ConversionParams } from '../types/domain/currency'

export const currencyQueryKeys = {
  currencies: ['currencies'] as const,
  conversion: (params: ConversionParams) => ['conversion', params] as const,
} as const

export const useCurrencies = () => {
  return useQuery({
    queryKey: currencyQueryKeys.currencies,
    queryFn: () => currencyService.getCurrencies(),
    staleTime: 10 * 60 * 1000, // 10 minutes - currencies don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useCurrencyConversion = (params: ConversionParams | null) => {
  return useQuery({
    queryKey: params ? currencyQueryKeys.conversion(params) : ['conversion', null],
    queryFn: () => {
      if (!params) {
        throw new Error('Conversion params are required')
      }
      return currencyService.convert(params)
    },
    enabled: params !== null,
    staleTime: 1 * 60 * 1000, // 1 minute - exchange rates change frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
