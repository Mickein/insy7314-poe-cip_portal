import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Employee Dashboard heading', () => {
  render(<App />);
  const heading = screen.getByText(/Employee Dashboard/i);
  expect(heading).toBeInTheDocument();
});
