import useSWR from 'swr';

import { CRYPTORANK_API_URL } from '@/constants';

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

function useCurrencies() {
  const { data, error, isLoading } = useSWR(CRYPTORANK_API_URL, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export default useCurrencies;
