type LoadingStateProps = {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div
      className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin shadow-sm`}
      role="status"
      aria-label="Loading"
    />
  )
}

export const LoadingState = ({ message, size = 'md' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-8">
      <Spinner size={size} />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  )
}
