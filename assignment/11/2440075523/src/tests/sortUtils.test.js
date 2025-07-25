import { sortTasks } from '../src/utils/sortUtils';

describe('sortTasks', () => {
  const mockTasks = [
    { id: 1, title: 'Banana', createdAt: '2023-01-02' },
    { id: 2, title: 'Apple', createdAt: '2023-01-01' },
    { id: 3, title: 'Cherry', createdAt: '2023-01-03' }
  ];

  test('sorts tasks by title in ascending order', () => {
    const result = sortTasks(mockTasks, 'title', 'asc');
    expect(result[0].title).toBe('Apple');
    expect(result[1].title).toBe('Banana');
    expect(result[2].title).toBe('Cherry');
  });

  test('sorts tasks by title in descending order', () => {
    const result = sortTasks(mockTasks, 'title', 'desc');
    expect(result[0].title).toBe('Cherry');
    expect(result[1].title).toBe('Banana');
    expect(result[2].title).toBe('Apple');
  });
});