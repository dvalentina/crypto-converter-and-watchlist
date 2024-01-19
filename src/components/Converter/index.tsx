'use client';

import { useEffect, useState } from 'react';
import Big from 'big.js';

import useCurrencies from '@/hooks/useCurrencies';
import { formatNumberToSI } from '@/utils';

import CurrencyCard from '../CurrencyCard';
import IconButton from '../IconButton';

import { Container } from './Converter.styled';

function Converter() {
  const { currencies, isError, isLoading } = useCurrencies({
    pageIndex: 1,
    limit: 100,
  });

  const [inputCurrency, setInputCurrency] = useState('Bitcoin');
  const [inputValue, setInputValue] = useState('1');
  const [outputCurrency, setOutputCurrency] = useState('Ethereum');
  const [outputValue, setOutputValue] = useState('1');

  const [exchangeRate, setExchangeRate] = useState('1');

  const calculateExchangeRate = () => {
    if (inputCurrency === outputCurrency) {
      setExchangeRate('1');
      return;
    }

    const inputPriceUSD = currencies?.data.find(
      (currency) => currency.name === inputCurrency
    )?.values.USD.price;

    const outputPriceUSD = currencies?.data.find(
      (currency) => currency.name === outputCurrency
    )?.values.USD.price;

    if (inputPriceUSD === undefined || outputPriceUSD === undefined) {
      return;
    }

    const inputPriceUSDBig = new Big(inputPriceUSD);
    const outputPriceUSDBig = new Big(outputPriceUSD);

    setExchangeRate(inputPriceUSDBig.div(outputPriceUSDBig).toString());
  };

  const handleSelectInputCurrency = (option: string) => {
    setInputCurrency(option);
  };

  const handleSelectOutputCurrency = (option: string) => {
    setOutputCurrency(option);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const inputValueBig = new Big(inputValue);
    const exchangeRateBig = new Big(exchangeRate);
    const outputValueBig = inputValueBig.times(exchangeRateBig);
    setOutputValue(outputValueBig.toString());
  }, [inputValue, exchangeRate]);

  useEffect(() => {
    calculateExchangeRate();
  }, [inputCurrency, outputCurrency, isLoading]);

  const handleSwitchCurrencies = () => {
    const prevInputCurrency = inputCurrency;
    const prevOutputCurrency = outputCurrency;
    setInputCurrency(prevOutputCurrency);
    setOutputCurrency(prevInputCurrency);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    console.log(isError);
    return <p>error</p>;
  }

  const options = currencies?.data.map((currency) => currency.name);

  if (options === undefined) {
    return;
  }

  return (
    <Container>
      <CurrencyCard
        variant='input'
        options={options}
        selected={inputCurrency}
        value={inputValue}
        handleSelect={handleSelectInputCurrency}
        handleValueChange={handleInputValueChange}
        dataTestId='input-card'
      />
      <IconButton
        onClick={handleSwitchCurrencies}
        src='images/swapIcon.svg'
        alt='swap'
        dataTestId='switch-button'
      />
      <CurrencyCard
        variant='output'
        options={options}
        selected={outputCurrency}
        value={formatNumberToSI({
          value: outputValue,
          precision: 3,
        })}
        handleSelect={handleSelectOutputCurrency}
        dataTestId='output-card'
      />
    </Container>
  );
}

export default Converter;
