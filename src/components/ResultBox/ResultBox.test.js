import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

const testCases = [
  { amount: 100, from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57' },
  { amount: 200, from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14' },
  { amount: 50, from: 'USD', to: 'PLN', expected: '$50.00 = PLN 175.00' },
  { amount: 345, from: 'USD', to: 'PLN', expected: '$345.00 = PLN 1,207.50' },
  { amount: 123, from: 'PLN', to: 'PLN', expected: 'PLN 123.00 = PLN 123.00' },
  { amount: 456, from: 'USD', to: 'USD', expected: '$456.00 = $456.00' },
];

for (const { amount, from, to, expected } of testCases) {
  it(`should render proper info about conversion when ${from} -> ${to} for amount ${amount}`, () => {
    render(<ResultBox from={from} to={to} amount={amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(expected);
    cleanup();
  });
  it('Wrong value..." for negative amounts', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value...');
    cleanup();
  });
}
