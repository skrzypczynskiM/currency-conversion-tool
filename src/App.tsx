import { CurrencyConverter } from './features/currency'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Currency Conversion Tool</h1>
          <p className="text-gray-600">Convert between different currencies using real-time exchange rates</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 border border-gray-200">
          <CurrencyConverter />
        </div>
      </div>
    </div>
  )
}

export default App
