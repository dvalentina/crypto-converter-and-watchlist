'use client';

import { useState } from 'react';

import Pagination from '@/components/Pagination';
import useCurrencies from '@/hooks/useCurrencies';
import { calculateAllHistoricalPrices, formatNumberToSI } from '@/utils';

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

  const formatPrice = (price?: number) => {
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
          value: currency?.circulatingSupply,
        })
      : '-';
    const category = currency?.category;
    const priceUSD = formatPrice(valuesUSD?.price);
    const marketCapUSD = formatPrice(valuesUSD?.marketCap);

    const {
      historicalPrice24h,
      historicalPrice7d,
      historicalPrice30d,
      historicalPrice3m,
      historicalPrice6m,
    } = calculateAllHistoricalPrices({
      price: valuesUSD?.price,
      percentChange24h: valuesUSD?.percentChange24h,
      percentChange7d: valuesUSD?.percentChange7d,
      percentChange30d: valuesUSD?.percentChange30d,
      percentChange3m: valuesUSD?.percentChange3m,
      percentChange6m: valuesUSD?.percentChange6m,
    });

    const formattedPrice24h = formatPrice(historicalPrice24h);
    const formattedPrice7d = formatPrice(historicalPrice7d);
    const formattedPrice30d = formatPrice(historicalPrice30d);
    const formattedPrice3m = formatPrice(historicalPrice3m);
    const formattedPrice6m = formatPrice(historicalPrice6m);

    return (
      <tr key={`currencies row ${index + 1}`}>
        <Td>{skeletonWrap(name)}</Td>
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
        <Table>
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
