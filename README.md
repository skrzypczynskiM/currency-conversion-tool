# Currency Conversion Tool

A modern, responsive currency conversion application built with React, TypeScript, and Vite. This tool allows users to convert between different currencies using real-time exchange rates from the CurrencyBeacon API.

## Features

- 💱 Real-time currency conversion
- 🌍 Support for all major fiat currencies
- ⚡ Fast and responsive UI with debounced input
- ✅ Form validation with clear error messages
- 📱 Fully responsive design
- 🎨 Modern, clean interface

## Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm package manager
- A CurrencyBeacon API key ([Get one here](https://currencybeacon.com/register))

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd currency-conversion-tool
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. **API Key Setup**:
   - For recruitment/testing purposes, the `.env.example` file contains a working API key that can be used immediately.
   - **⚠️ Security Note**: In production applications, API keys should NEVER be committed to version control. This key is included here only to allow recruiters to quickly test the application without needing to register for their own API key.
   - If you prefer to use your own API key, you can obtain one from the [CurrencyBeacon dashboard](https://currencybeacon.com/register) and replace it in your local `.env` file.

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components (AmountInput, ErrorMessage, LoadingState)
├── config/
│   └── env.ts           # Environment variable validation
├── features/
│   └── currency/        # Currency conversion feature
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Custom React hooks for data fetching
│       ├── schemas.ts    # Zod validation schemas
│       └── types.ts      # Feature-specific TypeScript types
├── hooks/
│   └── useDebounce.ts   # Reusable debounce hook
├── services/
│   ├── api/             # API client and endpoint functions
│   └── currencyService.ts # Business logic layer
└── types/
    ├── api/             # API response types
    └── common.ts        # Shared types
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## Design Decisions

### Architecture

- **Feature-based structure**: Code is organized by features (e.g., `currency/`) rather than by file type, making it easier to scale and maintain.
- **Separation of concerns**: Clear separation between API layer (`services/api/`), business logic (`services/currencyService.ts`), and UI components.
- **Type safety**: Full TypeScript coverage with separate types for API responses and domain models.

### API Integration

- **CurrencyBeacon API**: Uses `short_code` field instead of `code` for currency codes, as this is what the API actually returns in the response. This decision was made after carefully studying the actual API responses, as recommended in the requirements.
- **Currency type**: Only fetches fiat currencies (`type: 'fiat'` parameter) - cryptocurrency support is not included.
- **Caching strategy**:
  - Currencies list cached for 10 minutes (rarely changes)
  - Conversion rates cached for 1 minute (frequently updated)
- **Error handling**: Centralized error handling in Axios interceptors with user-friendly error messages.

### User Experience

- **Default values**: Application starts with default values (USD → EUR, amount: 1) to provide immediate feedback, similar to Google's currency converter.
- **Debounced input**: Amount input is debounced (300ms) to reduce unnecessary API calls while typing. This delay was chosen as a balance between responsiveness and API efficiency.
- **Real-time validation**: Form validation occurs on change (`mode: 'onChange'`) for immediate feedback.
- **Input validation**: Amount input blocks invalid characters (non-numeric, multiple decimal points, negative values) at the UI level, while Zod handles numeric and range validation.
- **Decimal precision**: Amount input accepts up to 8 decimal places, which is reasonable for currency calculations.
- **Minimum amount**: Minimum conversion amount is set to 0.01 to prevent invalid conversions.
- **Loading states**: Clear loading indicators for both currency list loading and conversion operations.
- **Error messages**: Contextual error messages with visual indicators (icons and color coding).

### Component Design

- **Reusable components**: Shared UI components (`AmountInput`, `CurrencySelect`, `ErrorMessage`, `LoadingState`) are in `components/ui/`.
- **Barrel exports**: Simplified imports using index files (`index.ts`).
- **Styling**: Centralized component styles using Tailwind CSS `@apply` directive in `styles.css`.

## Assumptions

The following assumptions were made during development:

1. **API Availability**: The application assumes the CurrencyBeacon API is available and returns valid responses. Error handling is in place for network failures and API errors.

2. **Currency Data**: The application assumes that the API returns a consistent structure for currency data. The `short_code` field is used instead of `code` based on actual API response analysis.

3. **User Input**:
   - Users will input positive numeric values only (negative values and non-numeric characters are blocked at the UI level).
   - Users understand that they need to select different currencies for conversion (validation prevents same currency selection).

4. **Browser Support**: The application assumes modern browser support for ES6+ features, React 19, and CSS Grid/Flexbox.

5. **Environment Variables**: The application assumes that the API key is provided via environment variables and will fail fast with a clear error message if missing.

6. **Network Conditions**: The application assumes reasonable network conditions. A 10-second timeout is set for API requests.

7. **Data Freshness**: Exchange rates are considered fresh for 1 minute, after which they are refetched. This balances between real-time accuracy and API rate limits.

8. **Currency List Stability**: The list of available currencies is considered stable and cached for 10 minutes, as currencies rarely change.

9. **Form Behavior**: The form uses automatic conversion (no submit button) - conversions happen automatically when valid input is provided, similar to modern currency converter tools.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## API Documentation

This application uses the CurrencyBeacon API. Full documentation can be found at:
https://currencybeacon.com/api-documentation

### Endpoints Used

- `GET /v1/currencies` - Fetch list of available currencies
- `GET /v1/convert` - Convert amount between currencies

## License

This project is created as part of a technical assessment.
