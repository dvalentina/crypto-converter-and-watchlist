import styled, { css } from 'styled-components';

import Card from '@/components/Card';

interface IColumn {
  $number?: boolean;
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
  table-layout: fixed;

  th,
  td {
    border: 1px solid black;
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const columnCSS = css<IColumn>`
  text-align: ${({ $number }) => ($number ? 'right' : 'left')};
  width: ${({ $number }) => ($number ? '110px' : 'unset')};
`;

export const Th = styled.th<IColumn>`
  ${columnCSS};
  vertical-align: bottom;
`;

export const Td = styled.td<IColumn>`
  ${columnCSS};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
