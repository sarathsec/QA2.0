import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the welcome page initially', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to the QA Team!/i)).toBeInTheDocument();
});

test('proceeds to Test Case Management when button is clicked', () => {
  render(<App />);

  // Click the Proceed button
  fireEvent.click(screen.getByText(/Proceed to Test Cases/i));

  // Check if Test Case Management page is rendered
  expect(screen.getByText(/QA Test Case Management/i)).toBeInTheDocument();
});
