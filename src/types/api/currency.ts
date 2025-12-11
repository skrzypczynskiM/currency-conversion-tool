export type CurrencyApiResponse = {
  id: number
  name: string
  short_code: string
  code: string
  precision: number
  subunit: number
  symbol: string
  symbol_first: boolean
  decimal_mark: string
  thousands_separator: string
}

export type CurrenciesResponse = {
  response: CurrencyApiResponse[]
  meta: {
    code: number
    disclaimer: string
  }
}

export type ConvertApiResponse = {
  response: {
    timestamp: number
    date: string
    from: string
    to: string
    amount: number
    value: number
  }
  meta: {
    code: number
    disclaimer: string
  }
  timestamp: number
  date: string
  from: string
  to: string
  amount: number
  value: number
}

export type ConvertApiParams = {
  from: string
  to: string
  amount: number
}
