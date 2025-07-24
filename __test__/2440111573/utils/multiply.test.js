import { multiply } from '../../../src/app/2440111573/utils/multiply.js';
// const {multiply} = require('../../../src/app/2440111573/utils/multiply');

test ('multiply function', () => {
    expect(multiply(2, 3)).toBe(6);
    
});

test ('multiply function with zero', () => {
    expect(multiply(0, 5)).toBe(0);
});

test ('multiply function with negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
});