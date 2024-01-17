import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 40px;
  width: 280px;
  border: 1px solid black;
  padding: 2px 8px;
  border-radius: 0;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.primary};

  &:focus,
  &:focus-visible {
    outline: 1px solid black;
  }
`;
