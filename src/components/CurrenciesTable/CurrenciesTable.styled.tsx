import styled from 'styled-components';

import Card from '@/components/Card';

interface IAlign {
  $align?: 'right' | 'left';
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: -webkit-fill-available;
`;

export const StyledCard = styled(Card)`
  width: -webkit-fill-available;
  padding: 32px 40px;
`;

export const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid black;
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const Th = styled.th<IAlign>`
  text-align: ${({ $align }) => $align};
`;

export const Td = styled.td<IAlign>`
  text-align: ${({ $align }) => $align};
`;
