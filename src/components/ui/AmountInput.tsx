import { forwardRef } from 'react'

type AmountInputProps = {
  id: string
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(({ id, label, error, ...props }, ref) => {
  const CONTROL_KEYS = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
  ] as const

  const isControlKey = (key: string) => CONTROL_KEYS.includes(key as (typeof CONTROL_KEYS)[number])
  const isNumber = (key: string) => key >= '0' && key <= '9'
  const isDecimalPoint = (key: string) => key === '.'
  const isComma = (key: string) => key === ','
  const hasDecimalPoint = (value: string) => value.includes('.')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isControlKey(e.key)) {
      return
    }

    if (isNumber(e.key)) {
      return
    }

    if (isDecimalPoint(e.key) && !hasDecimalPoint(e.currentTarget.value)) {
      return
    }

    if (isComma(e.key)) {
      return
    }

    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '')

    const parts = value.split('.')
    let cleanedValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : value

    if (parts.length === 2 && parts[1].length > 8) {
      cleanedValue = parts[0] + '.' + parts[1].substring(0, 8)
    }

    e.target.value = cleanedValue

    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className="input-field"
        {...props}
      />
      {error && <p className="input-error">{error}</p>}
    </div>
  )
})
