import { formatDate } from '@/formatDate';

describe('formatDate utility function', () => {

  it('should format a valid Firestore timestamp object correctly', () => {
    const timestamp = { seconds: 1672531200, nanoseconds: 0 };

    const result = formatDate(timestamp);

    expect(result).toBe('1/1/2023');
  });

  it('should return "No date" if the input is null or invalid', () => {
    expect(formatDate(null)).toBe('No date');

    expect(formatDate(undefined)).toBe('No date');

    expect(formatDate({})).toBe('No date');
  });
});
