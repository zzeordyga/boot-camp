import { add } from '@/utils/someUtility'

describe('add()', () => {
  test('returns correct result', () => {
    expect(add(2, 3)).toBe(5)
  })
})
