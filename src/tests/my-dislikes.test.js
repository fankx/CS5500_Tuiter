import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyDislikes from '../components/profile/my-dislikes';

test('renders dislike screen', async () => {
  render(<MyDislikes />);
  const linkElement = screen.getByText(/MOCKED/i);
  expect(linkElement).toBeInTheDocument();
});
