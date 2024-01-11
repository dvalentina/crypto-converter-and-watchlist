'use client';

import useCurrencies from '@/hooks/useCurrencies';

function Table() {
  const { data, isError, isLoading } = useCurrencies();

  console.log(data);

  return <div>table</div>;
}

export default Table;
