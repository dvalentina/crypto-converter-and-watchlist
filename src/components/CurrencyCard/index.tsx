'use client';

import { useState } from 'react';

import SearchableDropdown from '@/components/SearchableDropdown';

import { Container, Input } from './CurrencyCard.styled';

interface ICurrencyCard {
  options: string[];
  selected: string;
  value: string;
  handleSelect: (option: string) => void;
  variant: 'input' | 'output';
  handleValueChange?: (value: string) => void;
}

function CurrencyCard({
  options,
  selected,
  value,
  handleSelect,
  variant,
  handleValueChange,
}: ICurrencyCard) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleValueChange) {
      handleValueChange(event.target.value);
    }
  };

  return (
    <Container>
      <Input
        type='number'
        value={value}
        readOnly={variant === 'output'}
        onChange={(event) => handleInputChange(event)}
        min={0}
      />
      <SearchableDropdown
        options={options}
        selected={selected}
        handleSelect={handleSelect}
      />
    </Container>
  );
}

export default CurrencyCard;
