import styled from 'styled-components';

import StyledButton from '@/components/Button';

export const Container = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

export const Button = styled(StyledButton)`
  width: 40px;
  height: 40px;
`;
