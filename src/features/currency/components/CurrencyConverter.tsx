import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrencies, useCurrencyConversion } from '../hooks/useCurrencyConversion'
import { CurrencySelect } from './CurrencySelect'
import { ConversionResult } from './ConversionResult'
import { conversionSchema, type ConversionFormData } from '../schemas'
import { AmountInput } from '../../../components/ui/AmountInput'
import { ErrorMessage } from '../../../components/ui/ErrorMessage'
import { LoadingState } from '../../../components/ui/LoadingState'
import { useDebounce } from '../../../hooks/useDebounce'

export const CurrencyConverter = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
    defaultValues: {
      amount: 1,
      from: 'USD',
      to: 'EUR',
    },
  })

  const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies()
  const fromCurrency = watch('from')
  const toCurrency = watch('to')
  const amount = watch('amount')

  const debouncedAmount = useDebounce(amount, 500)

  const {
    data: conversion,
    isLoading: isLoadingConversion,
    error: conversionError,
  } = useCurrencyConversion(
    fromCurrency && toCurrency && debouncedAmount && debouncedAmount > 0
      ? { from: fromCurrency, to: toCurrency, amount: debouncedAmount }
      : null
  )

  // Form submission is handled automatically by React Query hook
  // The hook will automatically refetch when form values change via watch()
  const onSubmit = () => {
    // No-op: conversion happens automatically via useCurrencyConversion hook
  }

  if (isLoadingCurrencies) {
    return <LoadingState message="Loading currencies..." size="lg" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <AmountInput
          id="amount"
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <CurrencySelect
          id="from"
          label="From"
          value={fromCurrency}
          currencies={currencies || []}
          error={errors.from?.message}
          onChange={value => setValue('from', value)}
        />

        <CurrencySelect
          id="to"
          label="To"
          value={toCurrency}
          currencies={currencies || []}
          error={errors.to?.message}
          onChange={value => setValue('to', value)}
        />
      </div>

      {conversionError && (
        <ErrorMessage
          message={conversionError instanceof Error ? conversionError.message : 'Failed to convert currency'}
        />
      )}

      {conversion && <ConversionResult result={conversion} toCurrency={toCurrency} fromCurrency={fromCurrency} />}

      {isLoadingConversion && <LoadingState message="Converting..." size="md" />}
    </form>
  )
}
