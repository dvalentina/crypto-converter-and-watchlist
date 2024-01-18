import Big from 'big.js';

interface IAllHistoricalPrices {
  price?: string;
  percentChange24h?: string;
  percentChange7d?: string;
  percentChange30d?: string;
  percentChange3m?: string;
  percentChange6m?: string;
}

interface IHistoricalPrice {
  price?: string;
  percentChange?: string;
}

export function calculateHistoricalPrice({
  price,
  percentChange,
}: IHistoricalPrice) {
  if (price === undefined || percentChange === undefined) {
    return undefined;
  }

  const priceBig = new Big(price);
  const percentChangeBig = new Big(percentChange);

  const historicalPriceBig = priceBig
    .times(100)
    .div(percentChangeBig.plus(100));
  return historicalPriceBig.toString();
}

export function calculateAllHistoricalPrices({
  price,
  percentChange24h,
  percentChange7d,
  percentChange30d,
  percentChange3m,
  percentChange6m,
}: IAllHistoricalPrices) {
  const historicalPrice24h = calculateHistoricalPrice({
    price,
    percentChange: percentChange24h,
  });
  const historicalPrice7d = calculateHistoricalPrice({
    price,
    percentChange: percentChange7d,
  });
  const historicalPrice30d = calculateHistoricalPrice({
    price,
    percentChange: percentChange30d,
  });
  const historicalPrice3m = calculateHistoricalPrice({
    price,
    percentChange: percentChange3m,
  });
  const historicalPrice6m = calculateHistoricalPrice({
    price,
    percentChange: percentChange6m,
  });

  return {
    historicalPrice24h,
    historicalPrice7d,
    historicalPrice30d,
    historicalPrice3m,
    historicalPrice6m,
  };
}

interface IFormatNumberToSI {
  value: string;
  precision?: number;
}

export function formatNumberToSI({ value, precision = 2 }: IFormatNumberToSI) {
  const map = [
    { suffix: 'T', threshold: '1e12' },
    { suffix: 'B', threshold: '1e9' },
    { suffix: 'M', threshold: '1e6' },
    { suffix: 'K', threshold: '1e3' },
    { suffix: '', threshold: '1' },
  ];

  const valueBig = new Big(value);

  const found = map.find((x) => valueBig.abs().gte(x.threshold));
  if (found) {
    const formatted =
      valueBig.div(found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  if (valueBig.gte('1e-2')) {
    return valueBig.toPrecision(precision);
  }

  if (valueBig.eq('0')) {
    return '0';
  }

  return valueBig.toExponential(precision);
}
