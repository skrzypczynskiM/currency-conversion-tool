export type Currency = {
  code: string
  name: string
  countries?: string[]
}

export type ConversionParams = {
  from: string
  to: string
  amount: number
}

export type ConversionResult = {
  from: string
  to: string
  amount: number
  convertedAmount: number
  rate: number
}
