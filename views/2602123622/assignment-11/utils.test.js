import { formatDate, generateTaskId } from './utils';

describe('Utils', () => {
  it('returns "Just now" for null or undefined', () => {
    expect(formatDate(null)).toBe('Just now');
    expect(formatDate(undefined)).toBe('Just now');
  });

  it('formats a Date object', () => {
    const date = new Date('2024-06-15T10:30:00Z');
    const result = formatDate(date);
    expect(result).toContain('2024');
  });

  it('formats a Firestore Timestamp', () => {
    const fakeTimestamp = { toDate: () => new Date('2025-01-01T00:00:00Z') };
    const result = formatDate(fakeTimestamp);
    expect(result).toContain('2025');
  });

  it('generates a unique string id', () => {
    const id1 = generateTaskId();
    const id2 = generateTaskId();
    expect(typeof id1).toBe('string');
    expect(id1.length).toBeGreaterThan(0);
    expect(id1).not.toBe(id2);
  });
});
