'use client';

import { useState } from 'react';

import SearchableDropdown from '@/components/SearchableDropdown';

import { Container, Input } from './CurrencyCard.styled';

const options = ['Bitcoin', 'Uniswap', 'Ethereum'];

function CurrencyCard() {
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <Container>
      <Input type='number'></Input>
      <SearchableDropdown
        options={options}
        selected={selected}
        handleSelect={handleSelect}
      />
    </Container>
  );
}

export default CurrencyCard;
