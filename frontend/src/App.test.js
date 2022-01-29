/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cleanup react app message', () => {
  render(<App />);
  const cleanupMessage = screen.getByText(/Cleanedup React App/i);
  expect(cleanupMessage).toBeInTheDocument();
});
