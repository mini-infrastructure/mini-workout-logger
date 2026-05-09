import {css} from '@emotion/react';

const styles = {
    track: css({
        width: '100%',
        height: '8px',
        borderRadius: 'var(--borderRadius-full)',
        backgroundColor: 'var(--color-container2)',
        overflow: 'hidden',
        flexShrink: 0,
    }),

    fill: (percentage: number) => css({
        height: '100%',
        width: `${percentage}%`,
        borderRadius: 'var(--borderRadius-full)',
        backgroundColor: 'var(--color-blue)',
        transition: 'width 0.4s ease',
    }),
};

export default styles;
