import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsProvider } from '@/context/SettingsContext';
import { SETTINGS_KEY } from '@/lib/settings';
import TaskItem from './TaskItem';

const baseTask = {
  id: 'task-1',
  title: 'Write report',
  description: 'Quarterly numbers',
  priority: 'high',
  completed: false,
  createdAt: new Date('2026-10-20T09:30:00'),
};

function setup({ task = {}, ...handlers } = {}) {
  const props = {
    task: { ...baseTask, ...task },
    onToggle: jest.fn().mockResolvedValue(),
    onUpdate: jest.fn().mockResolvedValue(),
    onDelete: jest.fn().mockResolvedValue(),
    ...handlers,
  };
  const user = userEvent.setup();
  render(
    <SettingsProvider>
      <ul>
        <TaskItem {...props} />
      </ul>
    </SettingsProvider>,
  );
  return { user, props };
}

beforeEach(() => {
  localStorage.clear();
});

test('shows the title, description and priority', () => {
  setup();
  expect(screen.getByRole('heading', { name: 'Write report' })).toBeInTheDocument();
  expect(screen.getByText('Quarterly numbers')).toBeInTheDocument();
  expect(screen.getByText('High')).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Mark “Write report” as done' })).not.toBeChecked();
});

test('ticking the checkbox calls onToggle with the task', async () => {
  const { user, props } = setup();
  await user.click(screen.getByRole('checkbox', { name: 'Mark “Write report” as done' }));
  expect(props.onToggle).toHaveBeenCalledWith(props.task);
});

test('a completed task is shown as checked', () => {
  setup({ task: { completed: true } });
  expect(screen.getByRole('checkbox', { name: 'Mark “Write report” as not done' })).toBeChecked();
});

test('asks for confirmation before deleting', async () => {
  const { user, props } = setup();

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  expect(screen.getByText('Delete this task?')).toBeInTheDocument();
  expect(props.onDelete).not.toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.queryByText('Delete this task?')).not.toBeInTheDocument();
  expect(props.onDelete).not.toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  await user.click(screen.getByRole('button', { name: 'Delete' }));
  expect(props.onDelete).toHaveBeenCalledWith('task-1');
});

test('shows a readable error when deleting fails', async () => {
  const onDelete = jest.fn().mockRejectedValue(Object.assign(new Error('denied'), { code: 'permission-denied' }));
  const { user } = setup({ onDelete });

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  await user.click(screen.getByRole('button', { name: 'Delete' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Firestore rejected the request');
  expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
});

test('validates the edit form and saves trimmed values', async () => {
  const { user, props } = setup();

  await user.click(screen.getByRole('button', { name: 'Edit' }));
  const title = screen.getByLabelText('Title');
  expect(title).toHaveValue('Write report');

  await user.clear(title);
  await user.click(screen.getByRole('button', { name: 'Save' }));
  expect(screen.getByText('Title is required.')).toBeInTheDocument();
  expect(props.onUpdate).not.toHaveBeenCalled();

  await user.type(title, '  Write final report  ');
  await user.selectOptions(screen.getByLabelText('Priority'), 'low');
  await user.click(screen.getByRole('button', { name: 'Save' }));

  expect(props.onUpdate).toHaveBeenCalledWith('task-1', {
    title: 'Write final report',
    description: 'Quarterly numbers',
    priority: 'low',
  });
  expect(await screen.findByRole('button', { name: 'Edit' })).toBeInTheDocument();
});

test('cancelling an edit keeps the task unchanged', async () => {
  const { user, props } = setup();

  await user.click(screen.getByRole('button', { name: 'Edit' }));
  await user.type(screen.getByLabelText('Title'), ' changed');
  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  expect(props.onUpdate).not.toHaveBeenCalled();
  expect(screen.getByRole('heading', { name: 'Write report' })).toBeInTheDocument();
});

test('uses the language saved in settings', async () => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ theme: 'system', language: 'id' }));
  setup();

  const item = screen.getByRole('listitem');
  expect(await within(item).findByRole('button', { name: 'Ubah' })).toBeInTheDocument();
  expect(within(item).getByRole('button', { name: 'Hapus' })).toBeInTheDocument();
  expect(within(item).getByText('Tinggi')).toBeInTheDocument();
});
