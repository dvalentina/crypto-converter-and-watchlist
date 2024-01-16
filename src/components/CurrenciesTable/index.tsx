'use client';

import { useState } from 'react';

import Pagination from '@/components/Pagination';
import useCurrencies from '@/hooks/useCurrencies';

import TextSkeleton from '../TextSkeleton';

import { Container, StyledCard, Table, Td, Th } from './CurrenciesTable.styled';

function CurrenciesTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const limit = 10;

  const { currencies, isError, isLoading } = useCurrencies({
    pageIndex,
    limit,
  });

  if (isError) {
    console.log(isError);
    return <p>error</p>;
  }

  const count = currencies?.meta.count;
  const maxPageIndex = count ? Math.ceil(count / limit) : 1;

  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex < 1 || newPageIndex > maxPageIndex) {
      return;
    }

    setPageIndex(newPageIndex);
  };

  const skeletonWrap = (text?: string | number) => {
    return isLoading ? <TextSkeleton /> : text;
  };

  const rows = Array.from(Array(limit)).map((el, index) => {
    const currency = currencies?.data[index];
    const valuesUSD = currency?.values.USD;

    return (
      <tr key={`currencies row ${index + 1}`}>
        <Td $align='left'>{skeletonWrap(currency?.name)}</Td>
        <Td $align='right'>{skeletonWrap(currency?.circulatingSupply)}</Td>
        <Td $align='left'>{skeletonWrap(currency?.category)}</Td>
        <Td $align='right'>{skeletonWrap(valuesUSD?.price)}</Td>
        <Td $align='right'>{skeletonWrap(valuesUSD?.marketCap)}</Td>
        <Td $align='right'>{skeletonWrap(valuesUSD?.percentChange24h)}</Td>
        <Td $align='right'>{skeletonWrap(valuesUSD?.percentChange7d)}</Td>
      </tr>
    );
  });

  return (
    <Container>
      <StyledCard>
        <Table>
          <thead>
            <tr>
              <Th $align='left'>Name</Th>
              <Th $align='right'>Circulating supply</Th>
              <Th $align='left'>Category</Th>
              <Th $align='right'>Price (USD)</Th>
              <Th $align='right'>Market cap</Th>
              <Th $align='right'>% change, 24 hours</Th>
              <Th $align='right'>% change, 7 days</Th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </StyledCard>
      <Pagination
        handlePageIndexChange={handlePageChange}
        pageIndex={pageIndex}
        maxPageIndex={maxPageIndex}
      />
    </Container>
  );
}

export default CurrenciesTable;
