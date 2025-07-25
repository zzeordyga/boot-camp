import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

test('renders input and add button', () => {
  render(<TaskList />);
  expect(screen.getByPlaceholderText(/new task/i)).toBeInTheDocument();
  expect(screen.getByText(/add/i)).toBeInTheDocument();
});
