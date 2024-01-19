import { act } from 'react-dom/test-utils';

import ThemeClient from '@/components/ThemeClient';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '.';

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<ThemeClient>{jsx}</ThemeClient>),
  };
}

describe('header', () => {
  test('changes paths when clicked on page titles', async () => {
    setup(<Header />);

    waitFor(() => {
      expect(location.pathname).toContain('converter');
    });

    // click on watchlist title

    const watchlistTitle = screen.getByText(/watchlist/i);
    expect(watchlistTitle).toBeInTheDocument();

    act(() => {
      userEvent.click(watchlistTitle);
    });

    waitFor(() => {
      expect(location.pathname).toContain('watchlist');
    });

    // click on converter title

    const converterTitle = screen.getByText(/converter/i);
    expect(converterTitle).toBeInTheDocument();

    act(() => {
      userEvent.click(converterTitle);
    });

    waitFor(() => {
      expect(location.pathname).toContain('converter');
    });
  });
});
