import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskItem from '@/TaskItem';


jest.mock('../firebase', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('TaskItem component', () => {

  it('renders the task text correctly', () => {
    const task = { id: '123', text: 'Belajar Testing dengan Jest', completed: false };
    
    render(<TaskItem task={task} />);
    
    const taskElement = screen.getByText(/Belajar Testing dengan Jest/i);
    
    expect(taskElement).toBeInTheDocument();
  });

  it('applies a line-through style when the task is completed', () => {
    const task = { id: '456', text: 'Tugas yang Sudah Selesai', completed: true };
    
    render(<TaskItem task={task} />);
    
    const taskElement = screen.getByText(/Tugas yang Sudah Selesai/i);
    
    expect(taskElement).toHaveClass('line-through');
  });
});
