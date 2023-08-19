import { useEffect, useState } from 'react';

const currencies = [
  {
    text: 'USD',
    value: 'USD',
  },
  {
    text: 'EUR',
    value: 'EUR',
  },
  {
    text: 'CAD',
    value: 'CAD',
  },
  {
    text: 'INR',
    value: 'INR',
  },
];

export default function App() {
  return (
    <div className="App">
      <CurrencyConverter />
    </div>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleSetAmount = (amount) => {
    setAmount(amount);
  };
  const handleSetFromCurrency = (currency) => {
    setFromCurrency(currency);
  };
  const handleSetToCurrency = (currency) => {
    setToCurrency(currency);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchConvertedAmount() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error(
            'Something went wrong with fetching converted amount info!'
          );
        const data = await res.json();
        setConvertedAmount(data.rates[toCurrency]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (fromCurrency !== toCurrency) fetchConvertedAmount();
    else setConvertedAmount(amount);

    return () => {
      controller.abort();
    };
  }, [amount, fromCurrency, toCurrency]);

  return (
    <>
      <AmountInput
        loading={isLoading}
        amount={amount}
        onSetAmount={handleSetAmount}
      />
      <CurrencyInput
        loading={isLoading}
        currency={fromCurrency}
        onSetCurrency={handleSetFromCurrency}
      />
      <CurrencyInput
        loading={isLoading}
        currency={toCurrency}
        onSetCurrency={handleSetToCurrency}
      />
      <OutputMessage amount={convertedAmount} currency={toCurrency} />
    </>
  );
}

function AmountInput({ loading, amount, onSetAmount }) {
  return (
    <input
      type="text"
      value={amount}
      onChange={(event) => onSetAmount(+event.target.value)}
      disabled={loading}
    />
  );
}

function CurrencyInput({ loading, currency, onSetCurrency }) {
  return (
    <select
      value={currency}
      onChange={(event) => onSetCurrency(event.target.value)}
      disabled={loading}
    >
      {currencies.map((currency, index) => (
        <option value={currency.value} key={index}>
          {currency.text}
        </option>
      ))}
    </select>
  );
}

function OutputMessage({ amount, currency }) {
  return (
    <p>
      {amount} {currency}
    </p>
  );
}
