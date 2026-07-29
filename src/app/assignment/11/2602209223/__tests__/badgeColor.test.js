import { getBadgeColor } from '../utils/badgeColor';

describe('badgeColor utility function', () => {
    it('returns correct classes for home tag', () => {
        expect(getBadgeColor('home')).toBe('bg-[#d1fae5] text-[#047857] border-[#a7f3d0]');
    });

    it('returns correct classes for office tag', () => {
        expect(getBadgeColor('office')).toBe('bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]');
    });

    it('returns correct classes for study tag', () => {
        expect(getBadgeColor('study')).toBe('bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]');
    });

    it('returns correct classes for personal tag', () => {
        expect(getBadgeColor('personal')).toBe('bg-[#fef3c7] text-[#b45309] border-[#fde68a]');
    });

    it('handles uppercase tags correctly', () => {
        expect(getBadgeColor('HOME')).toBe('bg-[#d1fae5] text-[#047857] border-[#a7f3d0]');
    });

    it('returns default classes for unknown tag', () => {
        expect(getBadgeColor('unknown')).toBe('bg-[#fef3c7] text-[#b45309] border-[#fde68a]');
    });

    it('handles null or undefined tags gracefully', () => {
        expect(getBadgeColor(null)).toBe('bg-[#fef3c7] text-[#b45309] border-[#fde68a]');
        expect(getBadgeColor(undefined)).toBe('bg-[#fef3c7] text-[#b45309] border-[#fde68a]');
    });
});
