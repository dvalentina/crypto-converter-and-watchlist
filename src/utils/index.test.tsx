import { calculateHistoricalPrice } from '.';

describe('test calculateHistoricalPrice function', () => {
  // [current price, percent change, expected historical price]
  const cases = [
    ['1', '0', '1'],
    ['0', '0.5', '0'],
    ['1.92', '0.43', '1.9118'],
    ['2740', '-0.78', '2761.54'],
    ['120', '8', '111.11'],
    ['120', '-2.4', '122.95'],
    ['8.98', '59', '5.65'],
    ['42100', '-12', '47840.91'],
    ['0.11', '166', '0.041'],
    ['9.18e-6', '5', '8.74e-6'],
  ];

  test.each(cases)(
    'given %p as a current price and %p as percent change, result is close to %p',
    (price, percentChange, expectedResult) => {
      const result = calculateHistoricalPrice({ price, percentChange });

      expect(result).toBeDefined();
      if (result) {
        expect(parseFloat(result)).toBeCloseTo(parseFloat(expectedResult));
      }
    }
  );
});
