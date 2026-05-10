import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders portfolio positioning', () => {
  const { getAllByText, getByText } = render(<App />);
  expect(getAllByText(/Senior Software Engineer/i).length).toBeGreaterThan(0);
  expect(getByText(/Engineering Focus/i)).toBeInTheDocument();
});
