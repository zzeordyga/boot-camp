import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
  it('should format the date string correctly', () => {
    const date = '2024-01-01T12:00:00Z';
    expect(formatDate(date)).toBe('1/1/2024');
  });

  it('should handle another date string', () => {
    const date = '2025-07-26T10:30:00Z';
    expect(formatDate(date)).toBe('7/26/2025');
  });
});