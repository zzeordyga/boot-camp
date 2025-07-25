import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

test('renders task title', () => {
  render(<TaskItem task={{ id: '1', title: 'Test Task', completed: false }} />);
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});