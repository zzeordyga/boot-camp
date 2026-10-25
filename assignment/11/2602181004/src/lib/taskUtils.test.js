import { countTasks, filterTasks, sortTasks, validateTask } from './taskUtils';

const tasks = [
  { id: 'a', title: 'banana', priority: 'low', completed: false, createdAt: new Date('2026-10-01T10:00:00Z') },
  { id: 'b', title: 'Apple', priority: 'high', completed: true, createdAt: new Date('2026-10-03T10:00:00Z') },
  { id: 'c', title: 'cherry', priority: 'medium', completed: false, createdAt: new Date('2026-10-02T10:00:00Z') },
  { id: 'd', title: 'date', priority: 'high', completed: false, createdAt: new Date('2026-10-04T10:00:00Z') },
];

const ids = (list) => list.map((task) => task.id);

describe('sortTasks', () => {
  test('sorts newest first by default', () => {
    expect(ids(sortTasks(tasks, 'newest'))).toEqual(['d', 'b', 'c', 'a']);
    expect(ids(sortTasks(tasks, 'unknown'))).toEqual(['d', 'b', 'c', 'a']);
  });

  test('sorts oldest first', () => {
    expect(ids(sortTasks(tasks, 'oldest'))).toEqual(['a', 'c', 'b', 'd']);
  });

  test('sorts by priority, newest first within the same priority', () => {
    expect(ids(sortTasks(tasks, 'priority'))).toEqual(['d', 'b', 'c', 'a']);
  });

  test('sorts by title without caring about upper or lower case', () => {
    expect(ids(sortTasks(tasks, 'title'))).toEqual(['b', 'a', 'c', 'd']);
  });

  test('puts a task still waiting for its server timestamp first when sorting newest', () => {
    const pending = { id: 'p', title: 'pending', priority: 'low', completed: false, createdAt: null };
    expect(ids(sortTasks([...tasks, pending], 'newest'))[0]).toBe('p');
  });

  test('does not change the original array', () => {
    const copy = [...tasks];
    sortTasks(tasks, 'title');
    expect(tasks).toEqual(copy);
  });
});

describe('filterTasks', () => {
  test('returns every task for all', () => {
    expect(ids(filterTasks(tasks, 'all'))).toEqual(['a', 'b', 'c', 'd']);
  });

  test('returns only unfinished tasks for active', () => {
    expect(ids(filterTasks(tasks, 'active'))).toEqual(['a', 'c', 'd']);
  });

  test('returns only finished tasks for done', () => {
    expect(ids(filterTasks(tasks, 'done'))).toEqual(['b']);
  });
});

describe('countTasks', () => {
  test('counts all, active and done tasks', () => {
    expect(countTasks(tasks)).toEqual({ all: 4, active: 3, done: 1 });
    expect(countTasks([])).toEqual({ all: 0, active: 0, done: 0 });
  });
});

describe('validateTask', () => {
  const valid = { title: 'Buy milk', description: '', priority: 'medium' };

  test('accepts a valid task', () => {
    expect(validateTask(valid)).toEqual({});
  });

  test('requires a title that is not only spaces', () => {
    expect(validateTask({ ...valid, title: '' })).toEqual({ title: 'titleRequired' });
    expect(validateTask({ ...valid, title: '   ' })).toEqual({ title: 'titleRequired' });
  });

  test('limits the title to 100 characters after trimming', () => {
    expect(validateTask({ ...valid, title: 'x'.repeat(100) })).toEqual({});
    expect(validateTask({ ...valid, title: ` ${'x'.repeat(100)} ` })).toEqual({});
    expect(validateTask({ ...valid, title: 'x'.repeat(101) })).toEqual({ title: 'titleTooLong' });
  });

  test('limits the description to 500 characters', () => {
    expect(validateTask({ ...valid, description: 'x'.repeat(501) })).toEqual({ description: 'descriptionTooLong' });
  });

  test('only allows low, medium or high priority', () => {
    expect(validateTask({ ...valid, priority: 'urgent' })).toEqual({ priority: 'priorityInvalid' });
    expect(validateTask({ ...valid, priority: undefined })).toEqual({ priority: 'priorityInvalid' });
  });

  test('reports every problem at once', () => {
    expect(validateTask({ title: '', description: 'x'.repeat(501), priority: 'none' })).toEqual({
      title: 'titleRequired',
      description: 'descriptionTooLong',
      priority: 'priorityInvalid',
    });
  });
});
