import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '@/components/TaskItem';
import { SettingsProvider } from '@/context/SettingsContext';

const baseTask = { id: 't1', title: 'Belajar Jest', completed: false, createdAt: 1000 };

function setup(taskOverrides = {}) {
  const handlers = {
    onToggle: jest.fn(),
    onRename: jest.fn(),
    onDelete: jest.fn(),
  };
  const task = { ...baseTask, ...taskOverrides };
  render(
    <SettingsProvider>
      <ul>
        <TaskItem task={task} {...handlers} />
      </ul>
    </SettingsProvider>
  );
  return { user: userEvent.setup(), task, ...handlers };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('TaskItem', () => {
  it('menampilkan judul task dan status checkbox', () => {
    setup();
    expect(screen.getByText('Belajar Jest')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('task selesai: checkbox tercentang dan diberi gaya selesai', () => {
    setup({ completed: true });
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('listitem')).toHaveClass('is-done');
  });

  it('memanggil onToggle dengan id dan status saat ini ketika dicentang', async () => {
    const { user, onToggle } = setup();
    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('t1', false);
  });

  it('mengubah judul lewat mode edit lalu Simpan', async () => {
    const { user, onRename } = setup();
    await user.click(screen.getByRole('button', { name: 'Ubah' }));

    const input = screen.getByRole('textbox', { name: 'Ubah judul tugas' });
    expect(input).toHaveValue('Belajar Jest');
    await user.clear(input);
    await user.type(input, '  Belajar React Testing Library  ');
    await user.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(onRename).toHaveBeenCalledWith('t1', 'Belajar React Testing Library');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('tidak bisa menyimpan judul kosong, dan Batal mengembalikan tampilan semula', async () => {
    const { user, onRename } = setup();
    await user.click(screen.getByRole('button', { name: 'Ubah' }));
    await user.clear(screen.getByRole('textbox', { name: 'Ubah judul tugas' }));

    expect(screen.getByRole('button', { name: 'Simpan' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Batal' }));

    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByText('Belajar Jest')).toBeInTheDocument();
  });

  it('meminta konfirmasi sebelum menghapus, lalu memanggil onDelete', async () => {
    const { user, onDelete } = setup();
    await user.click(screen.getByRole('button', { name: 'Hapus' }));

    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.getByText('Hapus tugas ini?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ya, hapus' }));
    expect(onDelete).toHaveBeenCalledWith('t1');
  });

  it('membatalkan penghapusan tidak memanggil onDelete', async () => {
    const { user, onDelete } = setup();
    await user.click(screen.getByRole('button', { name: 'Hapus' }));
    await user.click(screen.getByRole('button', { name: 'Batal' }));

    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.queryByText('Hapus tugas ini?')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hapus' })).toBeInTheDocument();
  });

  it('memakai bahasa Inggris saat preferensi bahasa tersimpan "en"', async () => {
    window.localStorage.setItem('settings-language', JSON.stringify('en'));
    setup();
    expect(await screen.findByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
