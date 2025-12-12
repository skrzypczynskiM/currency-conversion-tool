import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrencies, useCurrencyConversion } from '../hooks/useCurrencyConversion'
import { CurrencySelect } from './CurrencySelect'
import { ConversionResult } from './ConversionResult'
import { conversionSchema, type ConversionFormData } from '../schemas'
import { AmountInput, ErrorMessage, LoadingState } from '../../../components/ui'
import { useDebounce } from '../../../hooks/useDebounce'

export const CurrencyConverter = () => {
  const {
    register,
    handleSubmit,
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

  const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies()
  const fromCurrency = watch('from')
  const toCurrency = watch('to')
  const amount = watch('amount')

  const debouncedAmount = useDebounce(amount, 300)

  const canConvert = fromCurrency && toCurrency && debouncedAmount && debouncedAmount > 0 && !errors.root

  const {
    data: conversion,
    isLoading: isLoadingConversion,
    error: conversionError,
  } = useCurrencyConversion(canConvert ? { from: fromCurrency, to: toCurrency, amount: debouncedAmount } : null)

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
            currencies={currencies || []}
            error={errors.from?.message}
            onChange={value => {
              setValue('from', value)
              trigger()
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <CurrencySelect
            id="to"
            label="To"
            value={toCurrency}
            currencies={currencies || []}
            error={errors.to?.message}
            onChange={value => {
              setValue('to', value)
              trigger()
            }}
          />
        </div>
      </div>

      {errors.root && <ErrorMessage message={errors.root.message} />}

      {conversionError && (
        <ErrorMessage message={conversionError instanceof Error ? conversionError.message : undefined} />
      )}

      {conversion && <ConversionResult result={conversion} toCurrency={toCurrency} fromCurrency={fromCurrency} />}

      {isLoadingConversion && <LoadingState message="Converting..." size="md" />}
    </form>
  )
}
