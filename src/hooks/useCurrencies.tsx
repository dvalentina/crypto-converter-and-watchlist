import useSWR from 'swr';

import { CRYPTORANK_API_CURRENCIES_LIST } from '@/constants';

interface ICurrencies {
  data: ICurrencyData[];
  status: Object;
  meta: IMeta;
}

interface IMeta {
  count: number;
}

interface ICurrencyData {
  id: number;
  name: string;
  category: string;
  circulatingSupply: number;
  values: ICurrencyValues;
}

interface ICurrencyValues {
  USD: ICurrencyValue;
}

interface ICurrencyValue {
  price: number;
  marketCap: number;
  percentChange24h: number;
  percentChange7d: number;
}

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

interface IUseCurrencies {
  pageIndex: number;
  limit: number;
}

function useCurrencies({ pageIndex, limit }: IUseCurrencies) {
  const offset = limit * (pageIndex - 1);

  const { data, error, isLoading } = useSWR<ICurrencies>(
    `${CRYPTORANK_API_CURRENCIES_LIST}&limit=${limit}&offset=${offset}`,
    fetcher
  );

  return {
    currencies: data,
    isLoading,
    isError: error,
  };
}

export default useCurrencies;
