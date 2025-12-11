import { currencyBeaconApi } from './api/currencyBeacon'
import type { Currency, ConversionParams, ConversionResult } from '../types/domain/currency'
import type { CurrencyApiResponse } from '../types/api/currency'

export const currencyService = {
  transformCurrency: (apiCurrency: CurrencyApiResponse): Currency => {
    return {
      code: apiCurrency.short_code,
      name: apiCurrency.name,
    }
  },

  getCurrencies: async (): Promise<Currency[]> => {
    const response = await currencyBeaconApi.getCurrencies()
    return response.response.map(currency => currencyService.transformCurrency(currency))
  },

  convert: async (params: ConversionParams): Promise<ConversionResult> => {
    const response = await currencyBeaconApi.convert({
      from: params.from,
      to: params.to,
      amount: params.amount,
    })

    const convertedAmount = response.response.value
    const rate = convertedAmount / params.amount

    return {
      from: response.response.from,
      to: response.response.to,
      amount: response.response.amount,
      convertedAmount,
      rate,
    }
  },
} as const
