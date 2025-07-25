import { formatDate } from '../utils/formatDate'

test('formats a date string', () => {
  expect(formatDate('2025-01-01')).toBe('1/1/2025')
})