interface IAllHistoricalPrices {
  price?: number;
  percentChange24h?: number;
  percentChange7d?: number;
  percentChange30d?: number;
  percentChange3m?: number;
  percentChange6m?: number;
}

interface IHistoricalPrice {
  price?: number;
  percentChange?: number;
}

export function calculateHistoricalPrice({
  price,
  percentChange,
}: IHistoricalPrice) {
  if (price === undefined || percentChange === undefined) {
    return undefined;
  }
  const historicalPrice = (price * 100) / (100 + percentChange);
  return historicalPrice;
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
  value: number;
  precision?: number;
}

export function formatNumberToSI({ value, precision = 2 }: IFormatNumberToSI) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(value) >= x.threshold);
  if (found) {
    const formatted =
      (value / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  if (value >= 1e-2) {
    return value.toPrecision(precision);
  }

  if (value === 0) {
    return '0';
  }

  return value.toExponential(precision);
}
