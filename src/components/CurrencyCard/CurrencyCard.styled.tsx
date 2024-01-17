import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 4px solid;
  border-image: ${({ theme }) => `${theme.gradient} 1`};
  padding: 24px 32px;
  gap: 12px;
`;
