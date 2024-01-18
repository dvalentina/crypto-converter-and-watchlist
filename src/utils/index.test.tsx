import { calculateHistoricalPrice, formatNumberToSI } from '.';

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

describe('test formatNumberToSI', () => {
  const cases = [
    ['765400300200100', '765.40T'],
    ['1000000000000', '1.00T'],
    ['5364900000', '5.36B'],
    ['1000000000', '1.00B'],
    ['1e9', '1.00B'],
    ['88765432', '88.77M'],
    ['1000000', '1.00M'],
    ['8080', '8.08K'],
    ['1000', '1.00K'],
    ['23.2323', '23.23'],
    ['1', '1.00'],
    ['0.0679', '0.068'],
    ['0', '0'],
    ['0.0679', '0.068'],
    ['0.0679', '0.068'],
    ['6.79e-6', '6.79e-6'],
    ['0.00000679', '6.79e-6'],
  ];

  test.each(cases)(
    'given %p as a value, result is equal to %p',
    (value, expectedResult) => {
      const result = formatNumberToSI({ value: value });

      expect(result).toBe(expectedResult);
    }
  );
});
