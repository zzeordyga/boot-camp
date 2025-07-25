import { render, screen } from '@testing-library/react';
import TaskList from '../src/components/TaskList';

jest.mock('../src/services/firebase', () => ({
  getTasksRealtime: (callback) => {
    callback([
      { id: '1', title: 'Test Task 1' },
      { id: '2', title: 'Test Task 2' }
    ]);
    return () => {}; // mock unsubscribe
  }
}));

describe('TaskList', () => {
  it('renders tasks from Firestore', async () => {
    render(<TaskList />);
    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Task 2')).toBeInTheDocument();
  });
});