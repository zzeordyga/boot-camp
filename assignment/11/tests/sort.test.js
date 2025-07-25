import { sortTasks } from '../utils/sortTasks';

test('sorts tasks ascending', () => {
  const tasks = ['banana', 'apple', 'cherry'];
  const result = sortTasks(tasks, 'asc');
  expect(result).toEqual(['apple', 'banana', 'cherry']);
});

test('sorts tasks descending', () => {
  const tasks = ['banana', 'apple', 'cherry'];
  const result = sortTasks(tasks, 'desc');
  expect(result).toEqual(['cherry', 'banana', 'apple']);
});
