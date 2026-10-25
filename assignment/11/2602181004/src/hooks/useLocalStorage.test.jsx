import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

const key = 'test-preferences';

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test('starts with the initial value when nothing is saved', () => {
  const { result } = renderHook(() => useLocalStorage(key, { sort: 'newest' }));
  expect(result.current[0]).toEqual({ sort: 'newest' });
});

test('loads a saved value', () => {
  localStorage.setItem(key, JSON.stringify({ sort: 'title' }));
  const { result } = renderHook(() => useLocalStorage(key, { sort: 'newest' }));
  expect(result.current[0]).toEqual({ sort: 'title' });
});

test('saves new values to localStorage', () => {
  const { result } = renderHook(() => useLocalStorage(key, { sort: 'newest' }));

  act(() => result.current[1]({ sort: 'oldest' }));

  expect(result.current[0]).toEqual({ sort: 'oldest' });
  expect(JSON.parse(localStorage.getItem(key))).toEqual({ sort: 'oldest' });
});

test('supports updater functions that build on the latest value', () => {
  const { result } = renderHook(() => useLocalStorage(key, 0));

  act(() => {
    result.current[1]((count) => count + 1);
    result.current[1]((count) => count + 1);
  });

  expect(result.current[0]).toBe(2);
  expect(localStorage.getItem(key)).toBe('2');
});

test('falls back to the initial value when the saved data is broken', () => {
  localStorage.setItem(key, '{not json');
  const { result } = renderHook(() => useLocalStorage(key, 'fallback'));
  expect(result.current[0]).toBe('fallback');
});

test('picks up changes made in another tab', () => {
  const { result } = renderHook(() => useLocalStorage(key, 'newest'));

  act(() => {
    localStorage.setItem(key, JSON.stringify('priority'));
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify('priority') }));
  });

  expect(result.current[0]).toBe('priority');
});

test('keeps working when localStorage cannot be written', () => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('QuotaExceededError');
  });
  const { result } = renderHook(() => useLocalStorage(key, 'newest'));

  act(() => result.current[1]('title'));

  expect(result.current[0]).toBe('title');
});
