import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

interface IStyledInput {
  $error?: boolean;
}

export const StyledInput = styled.input<IStyledInput>`
  height: 40px;
  width: 280px;
  border: ${({ $error, theme }) =>
    $error ? `1px solid ${theme.colors.error}` : '1px solid black'};
  padding: 2px 8px;
  border-radius: 0;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.primary};

  &:focus,
  &:focus-visible {
    outline: ${({ $error, theme }) =>
      $error ? `1px solid ${theme.colors.error}` : '1px solid black'};
  }
`;

export const ErrorText = styled.p`
  position: absolute;
  top: -12px;
  left: 4px;
  margin: 0;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.error};
  background: white;
  font-size: ${({ theme }) => theme.fontSize.error};
`;
