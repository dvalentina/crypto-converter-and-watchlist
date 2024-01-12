'use client';

import { useState } from 'react';

import useCurrencies from '@/hooks/useCurrencies';

import Pagination from '../Pagination';

import { Table } from './CurrenciesTable.styled';

function CurrenciesTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const limit = 10;

  const { currencies, isError, isLoading } = useCurrencies({
    pageIndex,
    limit,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

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

  const rows = currencies?.data.map((currency, index) => (
    <tr key={`currencies row ${index + 1}`}>
      <td>{currency.name}</td>
      <td>{currency.circulatingSupply}</td>
      <td>{currency.category}</td>
      <td>{currency.values.USD.price}</td>
      <td>{currency.values.USD.marketCap}</td>
      <td>{currency.values.USD.percentChange24h}</td>
      <td>{currency.values.USD.percentChange7d}</td>
    </tr>
  ));

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Circulating supply</th>
            <th>Category</th>
            <th>Price (USD)</th>
            <th>Market cap</th>
            <th>% change, 24 hours</th>
            <th>% change, 7 days</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        handlePageIndexChange={handlePageChange}
        pageIndex={pageIndex}
        maxPageIndex={maxPageIndex}
      />
    </>
  );
}

export default CurrenciesTable;
