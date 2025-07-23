import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

test('renders task title and delete button', () => {
  const mockDelete = jest.fn();
  render(<TaskItem title="My Test Task" onDelete={mockDelete} />);

  expect(screen.getByText('My Test Task')).toBeInTheDocument();

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(mockDelete).toHaveBeenCalledTimes(1);
});