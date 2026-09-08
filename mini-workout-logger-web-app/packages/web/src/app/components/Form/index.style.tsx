import { css } from '@emotion/react';

const gapValues = {
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
} as const;

const styles = {
    form: (gap: 'sm' | 'md' | 'lg') => css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: gapValues[gap],
        width: '100%',
        height: '100%',
        alignContent: 'flex-start',
    }),

    field: (slots: number, totalSlots: number, gap: 'sm' | 'md' | 'lg') => {
        const gapVar = gapValues[gap];
        const percentage = (slots / totalSlots) * 100;

        // Calculate width accounting for gaps
        // When we have N items in a row, there are (N-1) gaps between them
        // Each item should subtract its proportional share of those gaps
        const gapFactor = (totalSlots - slots) / totalSlots;

        return css({
            flex: `0 0 calc(${percentage}% - ${gapVar} * ${gapFactor})`,
            minWidth: 0, // Allow fields to shrink below content size
        });
    },
};

export default styles;
