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
    <div className="flex flex-col">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className="input-field">
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
      {error && <p className="input-error">{error}</p>}
    </div>
  )
}
