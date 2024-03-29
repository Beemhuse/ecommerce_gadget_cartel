import { useMemo } from 'react';

const useCurrencyFormatter = (currency = 'USD') => {
  const formatToCurrency = (amount) => {
    // Check if amount is a valid number
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Invalid Amount';
    }

    // Format the amount to currency string
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
    });
  };

  // Memoize the formatting function to prevent unnecessary recalculations
  const formatCurrency = useMemo(() => formatToCurrency, [currency]);

  return formatCurrency;
};

export default useCurrencyFormatter;
