import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrencies, useCurrencyConversion } from '../hooks/useCurrencyConversion'
import { CurrencySelect } from './CurrencySelect'
import { ConversionResult } from './ConversionResult'
import { conversionSchema, type ConversionFormData } from '../schemas'
import { canConvert } from '../utils/conversionHelpers'
import { AmountInput, ErrorMessage, LoadingState } from '../../../components/ui'
import { useDebounce } from '../../../hooks/useDebounce'
import { getErrorMessage } from '../../../utils/errorHelpers'

export const CurrencyConverter = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
    mode: 'onChange',
    defaultValues: {
      amount: 1,
      from: 'USD',
      to: 'EUR',
    },
  })

  const { data: currencies = [], isLoading: isLoadingCurrencies } = useCurrencies()
  const [fromCurrency, toCurrency, amount] = watch(['from', 'to', 'amount'])

  const debouncedAmount = useDebounce(amount, 300)

  const isValidForConversion = canConvert({ from: fromCurrency, to: toCurrency }, debouncedAmount, !!errors.root)

  const {
    data: conversion,
    isLoading: isLoadingConversion,
    error: conversionError,
  } = useCurrencyConversion(
    isValidForConversion && debouncedAmount ? { from: fromCurrency, to: toCurrency, amount: debouncedAmount } : null
  )

  const handleCurrencyChange = (field: 'from' | 'to', value: string) => {
    setValue(field, value)
    trigger()
  }

  if (isLoadingCurrencies) {
    return <LoadingState message="Loading currencies..." size="lg" />
  }

  if (currencies.length === 0) {
    return <ErrorMessage message="No currencies available. Please try refreshing the page or check your connection." />
  }

  return (
    <form className="space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <AmountInput
            id="amount"
            label="Amount"
            {...register('amount', {
              valueAsNumber: true,
            })}
            error={errors.amount?.message}
          />
        </div>

        <div className="flex-1 min-w-0">
          <CurrencySelect
            id="from"
            label="From"
            value={fromCurrency}
            currencies={currencies}
            error={errors.from?.message}
            onChange={value => handleCurrencyChange('from', value)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <CurrencySelect
            id="to"
            label="To"
            value={toCurrency}
            currencies={currencies}
            error={errors.to?.message}
            onChange={value => handleCurrencyChange('to', value)}
          />
        </div>
      </div>

      {errors.root && <ErrorMessage message={errors.root.message} />}

      {conversionError && <ErrorMessage message={getErrorMessage(conversionError)} />}

      {conversion && <ConversionResult result={conversion} toCurrency={toCurrency} fromCurrency={fromCurrency} />}

      {isLoadingConversion && !conversion && <LoadingState message="Converting..." size="md" />}
    </form>
  )
}
