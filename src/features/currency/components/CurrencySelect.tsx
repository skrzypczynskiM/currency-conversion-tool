import type { Currency } from '../types'

type CurrencySelectProps = {
  id: string
  label: string
  value: string
  currencies: Currency[]
  error?: string
  onChange: (value: string) => void
}

export const CurrencySelect = ({ id, label, value, currencies, error, onChange }: CurrencySelectProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-3">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-white text-gray-900 cursor-pointer"
      >
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  )
}

