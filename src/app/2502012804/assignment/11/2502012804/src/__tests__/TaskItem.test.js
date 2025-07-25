import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '../components/TaskItem';

jest.mock('../lib/firebase', () => ({
  deleteTask: jest.fn(),
}));

global.confirm = () => true;

describe('TaskItem', () => {
  const task = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test description.',
  };

  it('renders the task title and description', () => {
    render(<TaskItem task={task} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('calls the onEdit function when the Edit button is clicked', () => {
    const handleEdit = jest.fn();
    render(<TaskItem task={task} onEdit={handleEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(handleEdit).toHaveBeenCalledWith(task);
  });
});