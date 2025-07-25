import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '@/components/TaskItem'

describe('TaskItem', () => {
  const sampleTask = {
    id: '1',
    title: 'Test Task'
  }

  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    mockUpdate.mockClear()
    mockDelete.mockClear()
  })

  test('renders task title', () => {
    render(
      <TaskItem task={sampleTask} onUpdate={mockUpdate} onDelete={mockDelete} />
    )
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem task={sampleTask} onUpdate={mockUpdate} onDelete={mockDelete} />
    )

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledWith('1')
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })

  test('edits and saves task title', () => {
    render(
      <TaskItem task={sampleTask} onUpdate={mockUpdate} onDelete={mockDelete} />
    )

    // Klik tombol Edit
    fireEvent.click(screen.getByText('Edit'))

    // Ubah input
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: 'Updated Task' } })

    // Klik Save
    fireEvent.click(screen.getByText('Save'))

    expect(mockUpdate).toHaveBeenCalledWith('1', {
      id: '1',
      title: 'Updated Task'
    })
  })
})
