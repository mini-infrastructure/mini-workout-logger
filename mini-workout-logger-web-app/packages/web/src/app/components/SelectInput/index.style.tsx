import { css, keyframes } from '@emotion/react';

const rotateUp = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(180deg)' },
});

const rotateDown = keyframes({
    from: { transform: 'rotate(180deg)' },
    to: { transform: 'rotate(0deg)' },
});

const styles = {
    wrapper: css({
        position: 'relative',
    }),

    inputContainer: css({
        cursor: 'pointer',
    }),

    arrowIcon: css({
        transition: 'transform var(--transition-fast)',
    }),

    arrowIconOpen: css({
        animation: `${rotateUp} var(--transition-fast) forwards`,
    }),

    arrowIconClosed: css({
        animation: `${rotateDown} var(--transition-fast) forwards`,
    }),

    // For the display value inside the input
    displayValue: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
    }),

    displayIcon: css({
        flexShrink: 0,
        width: '1.25rem',
        height: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),

    displayImage: css({
        flexShrink: 0,
        width: '1.25rem',
        height: '1.25rem',
        borderRadius: 'var(--radius-sm)',
        objectFit: 'cover',
    }),
};

export default styles;
