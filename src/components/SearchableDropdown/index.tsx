import { useState } from 'react';

import { Container, List, Option } from './SearchableDropdown.styled';

interface ISearchableDropdown {
  options: string[];
  selected: string;
  handleSelect: (option: string) => void;
}

function SearchableDropdown({
  options,
  selected,
  handleSelect,
}: ISearchableDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    handleSelect(option);
    setIsOpen(false);
    setQuery('');
  };

  const filterOptions = (options: string[]) => {
    return options.filter(
      (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const optionsComponents = filterOptions(options).map((option) => (
    <Option key={option} onClick={() => handleOptionClick(option)}>
      {option}
    </Option>
  ));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Container>
      <input
        onClick={handleInputClick}
        value={isOpen ? query : selected}
        onChange={(event) => handleInputChange(event)}
        readOnly={!isOpen}
      />
      {isOpen ? <List>{optionsComponents}</List> : null}
    </Container>
  );
}

export default SearchableDropdown;
