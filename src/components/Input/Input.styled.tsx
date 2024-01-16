import styled from 'styled-components';

import { kayPhoDu } from '../Grid/Grid.styled';

export const StyledInput = styled.input`
  height: 40px;
  width: 280px;
  font-size: 20px;
  border: 1px solid black;
  padding: 2px 8px;
  border-radius: 0;
  box-sizing: border-box;
  font-family: ${kayPhoDu.style.fontFamily};

  &:focus,
  &:focus-visible {
    outline: 1px solid black;
  }
`;
