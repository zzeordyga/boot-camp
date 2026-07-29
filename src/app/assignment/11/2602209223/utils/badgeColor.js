export const getBadgeColor = (tag) => {
    switch (tag?.toLowerCase()) {
        case 'home':
            return 'bg-[#d1fae5] text-[#047857] border-[#a7f3d0]';
        case 'office':
            return 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
        case 'study':
            return 'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]';
        case 'personal':
            return 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]';
        default:
            return 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]';
    }
};
