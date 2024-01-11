import useSWR from 'swr';

import { CRYPTORANK_API_URL } from '@/constants';

interface ICurrencies {
  data: ICurrencyData[];
  status: Object;
  meta: Object;
}

interface ICurrencyData {
  id: number;
  name: string;
  category: string;
  circulatingSupply: number;
  values: ICurrencyValues;
  // others
}

interface ICurrencyValues {
  USD: ICurrencyValue;
  // others
}

interface ICurrencyValue {
  price: number;
  marketCap: number;
  percentChange24h: number;
  percentChange7d: number;
  // others
}

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

function useCurrencies() {
  const { data, error, isLoading } = useSWR<ICurrencies>(
    CRYPTORANK_API_URL,
    fetcher
  );

  return {
    currencies: data,
    isLoading,
    isError: error,
  };
}

export default useCurrencies;
