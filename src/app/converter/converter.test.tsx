import { act } from 'react-dom/test-utils';

import ConverterPage from '@/app/converter/page';
import ThemeClient from '@/components/ThemeClient';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<ThemeClient>{jsx}</ThemeClient>),
  };
}

describe('converter page', () => {
  test('renders input and output cards after loading the page', async () => {
    setup(<ConverterPage />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const inputCard = screen.getByTestId('input-card');
    const outputCard = screen.getByTestId('output-card');

    expect(inputCard).toBeInTheDocument();
    expect(outputCard).toBeInTheDocument();
  });

  test('allows to search and pick currencies and the output changes', async () => {
    setup(<ConverterPage />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const inputCard = screen.getByTestId('input-card');
    const outputCard = screen.getByTestId('output-card');

    const outputCurrencyValue = within(outputCard)
      .getByTestId('currency-value')
      .getAttribute('value');

    const inputCurrencyNameInput =
      within(inputCard).getByTestId('currency-name');

    act(() => {
      userEvent.type(inputCurrencyNameInput, 'usdc');
    });

    await waitFor(() => {
      const dropdown = (inputCard as HTMLElement).querySelector('ul');
      expect(dropdown).toBeInTheDocument();

      const option = (inputCard as HTMLElement).querySelector('li');
      expect(option).toBeInTheDocument();
      expect(option?.innerHTML.toLowerCase()).toContain('usdc');
    });

    act(() => {
      const option = (inputCard as HTMLElement).querySelector('li');
      if (option) {
        userEvent.click(option);
      }
    });

    await waitFor(() => {
      const newInputCurrencyName = within(inputCard)
        .getByTestId('currency-name')
        .getAttribute('value');

      expect(newInputCurrencyName?.toLowerCase()).toContain('usdc');

      const newOutputCurrencyValue = within(outputCard)
        .getByTestId('currency-value')
        .getAttribute('value');

      expect(newOutputCurrencyValue).not.toEqual(outputCurrencyValue);
    });
  });

  test('changes the output if the input is changed', async () => {
    setup(<ConverterPage />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const inputCard = screen.getByTestId('input-card');
    const outputCard = screen.getByTestId('output-card');

    const outputCurrencyValue = within(outputCard)
      .getByTestId('currency-value')
      .getAttribute('value');

    const inputCurrencyValueInput =
      within(inputCard).getByTestId('currency-value');

    act(() => {
      userEvent.type(inputCurrencyValueInput, '0');
    });

    await waitFor(() => {
      const newOutputCurrencyValue = within(outputCard)
        .getByTestId('currency-value')
        .getAttribute('value');

      if (newOutputCurrencyValue !== null && outputCurrencyValue !== null) {
        expect(parseFloat(newOutputCurrencyValue)).toBeCloseTo(
          parseFloat(outputCurrencyValue) * 10
        );
      }
    });
  });

  test('switches currencies', async () => {
    setup(<ConverterPage />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    const switchButton = screen.getByTestId('switch-button');
    expect(switchButton).toBeInTheDocument();

    const inputCard = screen.getByTestId('input-card');
    const outputCard = screen.getByTestId('output-card');

    const inputNumber = within(inputCard)
      .getByTestId('currency-value')
      .getAttribute('value');
    const outputNumber = within(outputCard)
      .getByTestId('currency-value')
      .getAttribute('value');

    expect(inputNumber).not.toBeNull();
    expect(outputNumber).not.toBeNull();

    const inputCurrencyName = within(inputCard)
      .getByTestId('currency-name')
      .getAttribute('value');
    const outputCurrencyName = within(outputCard)
      .getByTestId('currency-name')
      .getAttribute('value');

    expect(inputCurrencyName).not.toBeNull();
    expect(outputCurrencyName).not.toBeNull();

    act(() => {
      userEvent.click(switchButton);
    });

    await waitFor(() => {
      const newInputCurrencyName = within(inputCard)
        .getByTestId('currency-name')
        .getAttribute('value');
      const newOutputCurrencyName = within(outputCard)
        .getByTestId('currency-name')
        .getAttribute('value');

      // check that currencies' names switches places
      expect(newInputCurrencyName).toEqual(outputCurrencyName);
      expect(newOutputCurrencyName).toEqual(inputCurrencyName);

      const newInputNumber = within(inputCard)
        .getByTestId('currency-value')
        .getAttribute('value');
      const newOutputNumber = within(outputCard)
        .getByTestId('currency-value')
        .getAttribute('value');

      expect(newInputNumber).toEqual(inputNumber);

      // check that the exchange rate switched correctly
      if (
        inputNumber !== null &&
        outputNumber !== null &&
        newOutputNumber !== null
      ) {
        expect(parseFloat(newOutputNumber)).toBeCloseTo(
          parseFloat(inputNumber) / parseFloat(outputNumber)
        );
      }
    });
  });
});
