import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid black;
  cursor: pointer;
  background: white;

  &:hover {
    border: 2px solid;
    border-image: linear-gradient(45deg, turquoise, mediumslateblue) 1;
  }

  &:active {
    border: 3px solid;
    border-image: linear-gradient(45deg, turquoise, mediumslateblue) 1;
  }

  &:focus-visible {
    outline: 1px solid black;
  }
`;
