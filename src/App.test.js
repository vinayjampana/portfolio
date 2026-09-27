import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { CASE_STUDIES } from './content';

beforeAll(() => { window.scrollTo = () => {}; });

test('home lists every case study', () => {
  window.history.pushState({}, '', '/');
  const { getAllByText, getByText } = render(<App />);
  expect(getAllByText(/Vinay Jampana/i).length).toBeGreaterThan(0);
  CASE_STUDIES.forEach(cs => expect(getByText(cs.title)).toBeInTheDocument());
});

test('a case study route renders its title', () => {
  window.history.pushState({}, '', `/work/${CASE_STUDIES[0].slug}`);
  const { container } = render(<App />);
  expect(container.querySelector('h1')).toHaveTextContent(CASE_STUDIES[0].title);
});
