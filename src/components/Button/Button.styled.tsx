import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid black;
  cursor: pointer;
  background: white;
  font-size: ${({ theme }) => theme.fontSize.primary};

  &:hover {
    border: 2px solid;
    border-image: ${({ theme }) => `${theme.gradient} 1`};
  }

  &:active {
    border: 3px solid;
    border-image: ${({ theme }) => `${theme.gradient} 1`};
  }

  &:focus-visible {
    outline: 1px solid black;
  }
`;
