import { forwardRef } from 'react'

type AmountInputProps = {
  id: string
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(({ id, label, error, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-3">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type="number"
        step="0.01"
        min="0.01"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-white text-gray-900 placeholder:text-gray-400"
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  )
})

AmountInput.displayName = 'AmountInput'
