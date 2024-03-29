'use client';

import { useEffect, useState } from 'react';

import Pagination from '@/components/Pagination';
import useCurrencies from '@/hooks/useCurrencies';
import { calculateAllHistoricalPrices, formatNumberToSI } from '@/utils';

import TextSkeleton from '../TextSkeleton';

import { Container, StyledCard, Table, Td, Th } from './CurrenciesTable.styled';

function CurrenciesTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const limit = 10;

  const { currencies, isError, isLoading } = useCurrencies({
    pageIndex,
    limit,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      const count = currencies?.meta.count;
      if (count) {
        setMaxPageIndex(Math.ceil(count / limit));
      }
    }
  }, [currencies, isLoading, isError]);

  if (isError) {
    console.log(isError);
    return <p>error</p>;
  }

  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex < 1 || newPageIndex > maxPageIndex) {
      return;
    }

    setPageIndex(newPageIndex);
  };

  const skeletonWrap = (text?: string | number) => {
    return isLoading ? <TextSkeleton /> : text;
  };

  const formatPrice = (price?: string) => {
    return price
      ? `$${formatNumberToSI({
          value: price,
        })}`
      : '-';
  };

  const rows = Array.from(Array(limit)).map((el, index) => {
    const currency = currencies?.data[index];
    const valuesUSD = currency?.values.USD;

    const name = currency?.name;
    const circulatingSupply = currency?.circulatingSupply
      ? formatNumberToSI({
          value: currency?.circulatingSupply.toString(),
        })
      : '-';
    const category = currency?.category;
    const priceUSD = formatPrice(valuesUSD?.price.toString());
    const marketCapUSD = formatPrice(valuesUSD?.marketCap.toString());

    const {
      historicalPrice24h,
      historicalPrice7d,
      historicalPrice30d,
      historicalPrice3m,
      historicalPrice6m,
    } = calculateAllHistoricalPrices({
      price: valuesUSD?.price.toString(),
      percentChange24h: valuesUSD?.percentChange24h?.toString(),
      percentChange7d: valuesUSD?.percentChange7d?.toString(),
      percentChange30d: valuesUSD?.percentChange30d?.toString(),
      percentChange3m: valuesUSD?.percentChange3m?.toString(),
      percentChange6m: valuesUSD?.percentChange6m?.toString(),
    });

    const formattedPrice24h = formatPrice(historicalPrice24h);
    const formattedPrice7d = formatPrice(historicalPrice7d);
    const formattedPrice30d = formatPrice(historicalPrice30d);
    const formattedPrice3m = formatPrice(historicalPrice3m);
    const formattedPrice6m = formatPrice(historicalPrice6m);

    return (
      <tr key={`currencies row ${index + 1}`}>
        <Td data-testid='table-currency-name'>{skeletonWrap(name)}</Td>
        <Td $number>{skeletonWrap(priceUSD)}</Td>
        <Td $number>{skeletonWrap(circulatingSupply)}</Td>
        <Td $number>{skeletonWrap(marketCapUSD)}</Td>
        <Td>{skeletonWrap(category)}</Td>
        <Td $number>{skeletonWrap(formattedPrice24h)}</Td>
        <Td $number>{skeletonWrap(formattedPrice7d)}</Td>
        <Td $number>{skeletonWrap(formattedPrice30d)}</Td>
        <Td $number>{skeletonWrap(formattedPrice3m)}</Td>
        <Td $number>{skeletonWrap(formattedPrice6m)}</Td>
      </tr>
    );
  });

  return (
    <Container>
      <StyledCard>
        <Table data-testid='currencies-table'>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th $number>Price</Th>
              <Th $number>Circulating supply</Th>
              <Th $number>Market cap</Th>
              <Th>Category</Th>
              <Th $number>Historical price, 24h</Th>
              <Th $number>Historical price, 7d</Th>
              <Th $number>Historical price, 30d</Th>
              <Th $number>Historical price, 3m</Th>
              <Th $number>Historical price, 6m</Th>
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
