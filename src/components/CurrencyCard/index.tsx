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
  dataTestId?: string;
}

function CurrencyCard({
  options,
  selected,
  value,
  handleSelect,
  variant,
  handleValueChange,
  dataTestId,
}: ICurrencyCard) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleValueChange) {
      handleValueChange(event.target.value);
    }
  };

  return (
    <Card dataTestId={dataTestId}>
      <Input
        type={variant === 'output' ? 'text' : 'number'}
        value={value}
        readOnly={variant === 'output'}
        onChange={(event) => handleInputChange(event)}
        min='0'
        data-testid='currency-value'
      />
      <SearchableDropdown
        options={options}
        selected={selected}
        handleSelect={handleSelect}
        dataTestId='currency-name'
      />
    </Card>
  );
}

export default CurrencyCard;
