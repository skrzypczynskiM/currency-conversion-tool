import type { ApiError } from '../types/common'

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'message' in error
}

export const getErrorMessage = (error: unknown): string | undefined => {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return undefined
}
