import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItems from '../TaskItems';
import { Task, updateTask, deleteTask } from '../../services/taskService';

jest.mock('../../services/taskService', () => ({
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
}));

describe('TaskItem Component', () => {
    const mockTask: Task = {
        id: 'task-123',
        title: 'Test Component Task',
        description: 'Task description testing',
        completed: false,
        priority: 'high',
        dueDate: '2026-08-15',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders task details correctly', () => {
        render(<TaskItems task={mockTask} />);

        expect(screen.getByText('Test Component Task')).toBeInTheDocument();
        expect(screen.getByText('Task description testing')).toBeInTheDocument();
        expect(screen.getByText('HIGH')).toBeInTheDocument();
        expect(screen.getByText('Due: 2026-08-15')).toBeInTheDocument();
    });

    it('calls updateTask when checkbox is clicked', () => {
        render(<TaskItems task={mockTask} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(updateTask).toHaveBeenCalledWith('task-123', { completed: true });
    });

    it('calls deleteTask when Delete button is clicked', () => {
        render(<TaskItems task={mockTask} />);

        const deleteButton = screen.getByRole('button', { name: /delete task/i });
        fireEvent.click(deleteButton);

        expect(deleteTask).toHaveBeenCalledWith('task-123');
    });
});