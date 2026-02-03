require('@jest/globals')
import {expect, jest, test} from '@jest/globals';
import calculateTotal from "../utils/calculateTotal"

test('Count Total Price', () => {
    expect(calculateTotal(9321, 8923)).toBe(83171283);
});
