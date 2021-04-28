import { render, screen } from '@testing-library/react';
import { Header } from 'components';


test('renders my studio logo text', () => {
  render(<Header />);
  const innerText = screen.getByText(/My Studio/i);
  expect(innerText).toBeInTheDocument();
});

test('renders my studio logo image', () => {
  render(<Header />);
  const innerLogo = screen.getByAltText(/logo/i);
  expect(innerLogo).toBeInTheDocument();
});
