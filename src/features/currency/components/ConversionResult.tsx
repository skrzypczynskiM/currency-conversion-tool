import type { ConversionResult as ConversionResultType } from '../types'

type ConversionResultProps = {
  result: ConversionResultType
  toCurrency: string
  fromCurrency: string
}

export const ConversionResult = ({ result, toCurrency, fromCurrency }: ConversionResultProps) => {
  return (
    <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Converted Amount</p>
      <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {result.convertedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
        <span className="text-xl md:text-2xl text-gray-600">{toCurrency}</span>
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">1 {fromCurrency}</span> ={' '}
        <span className="font-medium">
          {result.rate.toFixed(6)} {toCurrency}
        </span>
      </p>
    </div>
  )
}

