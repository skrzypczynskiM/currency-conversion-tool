export type Currency = {
  code: string
  name: string
  countries?: string[]
}

export type CurrencyResponse = {
  response: Currency[]
  meta: {
    code: number
    disclaimer: string
  }
}

export type ConvertResponse = {
  response: {
    from: string
    to: string
    amount: number
    value: number
  }
  meta: {
    code: number
    disclaimer: string
  }
}

export type ConvertParams = {
  from: string
  to: string
  amount: number
}
