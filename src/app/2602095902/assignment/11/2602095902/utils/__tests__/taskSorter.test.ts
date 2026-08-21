import { sortTasks } from '../taskSorter';
import { Task } from '../../services/taskService';


describe('sortTasks Utility', () => {
    const mockTasks: Task[] = [
        { id: '1', title: 'Task Low', priority: 'low', completed: false, dueDate: '2026-08-10' },
        { id: '2', title: 'Task High', priority: 'high', completed: false, dueDate: '2026-08-01' },
        { id: '3', title: 'Task Medium', priority: 'medium', completed: false, dueDate: '2026-08-05' },
    ];

    it('should sort tasks correctly by priority (high > medium > low)', () => {
        const sorted = sortTasks(mockTasks, 'priority');
        expect(sorted[0].title).toBe('Task High');
        expect(sorted[1].title).toBe('Task Medium');
        expect(sorted[2].title).toBe('Task Low');
    });

    it('should sort tasks correctly by due date (earliest first)', () => {
        const sorted = sortTasks(mockTasks, 'dueDate');
        expect(sorted[0].dueDate).toBe('2026-08-01');
        expect(sorted[1].dueDate).toBe('2026-08-05');
        expect(sorted[2].dueDate).toBe('2026-08-10');
    });
});