const getEnvVar = (key: string): string => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`${key} is not set in environment variables`)
  }
  return value
}

export const env = {
  currencyBeaconApiKey: getEnvVar('VITE_CURRENCY_BEACON_API_KEY'),
} as const
