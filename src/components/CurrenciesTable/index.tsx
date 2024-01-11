'use client';

import useCurrencies from '@/hooks/useCurrencies';

import { Table } from './CurrenciesTable.styled';

function CurrenciesTable() {
  const { currencies, isError, isLoading } = useCurrencies();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    console.log(isError);
    return <p>error</p>;
  }

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
  );
}

export default CurrenciesTable;
