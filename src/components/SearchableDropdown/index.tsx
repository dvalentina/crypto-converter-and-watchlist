import { useEffect, useRef, useState } from 'react';

import Input from '@/components/Input';

import { Container, List, Option } from './SearchableDropdown.styled';

interface ISearchableDropdown {
  options: string[];
  selected: string;
  handleSelect: (option: string) => void;
  dataTestId?: string;
}

function SearchableDropdown({
  options,
  selected,
  handleSelect,
  dataTestId,
}: ISearchableDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const listRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    handleSelect(option);
    setIsOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current?.contains(event.target as Node) &&
        event.target !== listRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = (options: string[]) => {
    return options.filter(
      (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const optionsComponents = filterOptions(options).map((option) => (
    <Option
      key={option}
      onClick={() => handleOptionClick(option)}
      data-testid='option'
    >
      {option}
    </Option>
  ));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const notFound = <Option $notFound>Not found</Option>;

  return (
    <Container ref={listRef}>
      <Input
        onClick={handleInputClick}
        value={isOpen ? query : selected}
        onChange={(event) => handleInputChange(event)}
        readOnly={!isOpen}
        placeholder='type here to search'
        data-testid={dataTestId}
      />
      {isOpen ? (
        <List>
          {optionsComponents.length > 0 ? optionsComponents : notFound}
        </List>
      ) : null}
    </Container>
  );
}

export default SearchableDropdown;
