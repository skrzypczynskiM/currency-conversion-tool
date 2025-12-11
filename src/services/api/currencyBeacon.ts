import { apiClient } from './client'
import type { CurrenciesResponse, ConvertApiResponse, ConvertApiParams } from '../../types/api/currency'
import { env } from '../../config/env'

export const currencyBeaconApi = {
  getCurrencies: async (): Promise<CurrenciesResponse> => {
    const response = await apiClient.get<CurrenciesResponse>('/currencies', {
      params: {
        api_key: env.currencyBeaconApiKey,
        type: 'fiat',
      },
    })
    return response.data
  },

  convert: async (params: ConvertApiParams): Promise<ConvertApiResponse> => {
    const response = await apiClient.get<ConvertApiResponse>('/convert', {
      params: {
        api_key: env.currencyBeaconApiKey,
        from: params.from,
        to: params.to,
        amount: params.amount,
      },
    })
    return response.data
  },
} as const
