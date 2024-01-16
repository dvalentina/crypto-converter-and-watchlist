'use client';

import Card from '@/components/Card';
import Input from '@/components/Input';
import SearchableDropdown from '@/components/SearchableDropdown';

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
    <Card>
      <Input
        type='number'
        value={value}
        readOnly={variant === 'output'}
        onChange={(event) => handleInputChange(event)}
        min='0'
      />
      <SearchableDropdown
        options={options}
        selected={selected}
        handleSelect={handleSelect}
      />
    </Card>
  );
}

export default CurrencyCard;
