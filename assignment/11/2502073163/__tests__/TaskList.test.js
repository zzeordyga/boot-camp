import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

test('renders Add Task button', () => {
  render(<TaskList />);
  expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
});