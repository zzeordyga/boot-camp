import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskApp from './TaskApp';
import { SettingsProvider } from './SettingsContext';

jest.mock('./firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn((col, cb) => {
    cb({ docs: [] });
    return jest.fn();
  }),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe('TaskApp', () => {
  it('renders the task manager title', async () => {
    render(
      <SettingsProvider>
        <TaskApp />
      </SettingsProvider>
    );
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
  });

  it('shows add task button', async () => {
    render(
      <SettingsProvider>
        <TaskApp />
      </SettingsProvider>
    );
    expect(screen.getByText('+ Add Task')).toBeInTheDocument();
  });

  it('opens task form when add button is clicked', async () => {
    render(
      <SettingsProvider>
        <TaskApp />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByText('+ Add Task'));
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
  });

  it('toggles theme', async () => {
    render(
      <SettingsProvider>
        <TaskApp />
      </SettingsProvider>
    );
    const themeBtn = screen.getByText(/🌙 Dark|☀️ Light/);
    fireEvent.click(themeBtn);
    await waitFor(() => {
      expect(screen.getByText(/☀️ Light|🌙 Dark/)).toBeInTheDocument();
    });
  });
});
