'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import useCurrencies from '@/hooks/useCurrencies';

// import swapIcon from '@/images/swapIcon.svg';
import CurrencyCard from '../CurrencyCard';

import { Button, Container } from './Converter.styled';

function Converter() {
  const { currencies, isError, isLoading } = useCurrencies({
    pageIndex: 1,
    limit: 100,
  });

  const [inputCurrency, setInputCurrency] = useState('Bitcoin');
  const [inputValue, setInputValue] = useState('1');
  const [outputCurrency, setOutputCurrency] = useState('Ethereum');
  const [outputValue, setOutputValue] = useState('1');

  const [exchangeRate, setExchangeRate] = useState(1);

  const calculateExchangeRate = () => {
    if (inputCurrency === outputCurrency) {
      setExchangeRate(1);
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

    setExchangeRate(inputPriceUSD / outputPriceUSD);
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
    const inputNumber = parseFloat(inputValue);
    const outputNumber = inputNumber * exchangeRate;
    const outputValue = outputNumber.toString();
    setOutputValue(outputValue);
  }, [inputValue, exchangeRate]);

  useEffect(() => {
    calculateExchangeRate();
  }, [inputCurrency, outputCurrency]);

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
      />
      <Button onClick={handleSwitchCurrencies}>
        <Image src='images/swapIcon.svg' alt='swap' width={32} height={32} />
      </Button>
      <CurrencyCard
        variant='output'
        options={options}
        selected={outputCurrency}
        value={outputValue}
        handleSelect={handleSelectOutputCurrency}
      />
    </Container>
  );
}

export default Converter;
