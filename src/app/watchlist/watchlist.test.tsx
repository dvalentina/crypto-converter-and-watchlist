import { act } from 'react-dom/test-utils';

import WatchlistPage from '@/app/watchlist/page';
import ThemeClient from '@/components/ThemeClient';
import {
  getAllByTestId,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<ThemeClient>{jsx}</ThemeClient>),
  };
}

describe('watchlist page', () => {
  test('renders currencies table and pagination buttons', async () => {
    setup(<WatchlistPage />);

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const currenciesTable = screen.getByTestId('currencies-table');
    const previousButton = screen.getByTestId('previous-button');
    const nextButton = screen.getByTestId('next-button');

    expect(currenciesTable).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('changes page back and forth', async () => {
    setup(<WatchlistPage />);

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const pagination = screen.getByTestId('pagination');
    expect(pagination.innerHTML).toContain('1 of');

    const previousButton = screen.getByTestId('previous-button');
    const nextButton = screen.getByTestId('next-button');

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });

    const currencyNameCells = screen.getAllByTestId('table-currency-name');
    expect(currencyNameCells.length).toEqual(10);

    const currenciesNames = currencyNameCells.map(
      (element) => element.innerHTML
    );

    // go to the second page

    act(() => {
      userEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(pagination.innerHTML).toContain('2 of');
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });

    const nextCurrencyNameCells = screen.getAllByTestId('table-currency-name');
    expect(nextCurrencyNameCells.length).toEqual(10);

    const nextCurrenciesNames = nextCurrencyNameCells.map(
      (element) => element.innerHTML
    );

    // expect next names to be totally different from the first page

    expect(nextCurrenciesNames.some((e) => currenciesNames.includes(e))).toBe(
      false
    );

    // go back to the first page

    act(() => {
      userEvent.click(previousButton);
    });

    await waitFor(() => {
      expect(pagination.innerHTML).toContain('1 of');
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });

    const previousCurrencyNameCells = screen.getAllByTestId(
      'table-currency-name'
    );
    expect(previousCurrencyNameCells.length).toEqual(10);

    const previousCurrenciesNames = previousCurrencyNameCells.map(
      (element) => element.innerHTML
    );

    // expect previous names to be equal to the first page

    expect(previousCurrenciesNames).toEqual(
      expect.arrayContaining(currenciesNames)
    );
  });
});
