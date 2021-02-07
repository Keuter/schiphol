import { getClosestValue } from './challenge-1';

describe('getClosestValue', () => {
    const uniqueNumbers = [42, 21, 2, 5, 25, 52];

    it('Should return closest value when its bigger', () => {
        expect(getClosestValue(1, uniqueNumbers)).toBe(2);
    });

    it('Should return closest value when its smaller', () => {
        expect(getClosestValue(33, uniqueNumbers)).toBe(25);
    });

    it('Should return first value when input is exactly between two values', () => {
        expect(getClosestValue(47, uniqueNumbers)).toBe(42);
    });

    it('Should return the value when input is an exact match', () => {
        expect(getClosestValue(42, uniqueNumbers)).toBe(42);
    });
});
