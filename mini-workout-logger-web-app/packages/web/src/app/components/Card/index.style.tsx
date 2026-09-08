import { css } from '@emotion/react';

const styles = {
    card: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-thick) solid transparent',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
    }),

    clickable: css({
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-0.125rem)',
            borderColor: 'var(--color-white)',
        },
        '&:active': {
            transform: 'translateY(0)',
            borderColor: 'var(--color-white)',
        },
    }),

    square: css({
        width: '12rem',
        height: '12rem',
    }),

    wide: css({
        width: '18rem',
        height: '12rem',
    }),

    backgroundImage: css({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
        pointerEvents: 'none',
    }),

    content: css({
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        height: '100%',
    }),

    title: css({
        margin: 0,
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-tight)',
    }),

    description: css({
        margin: 0,
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-regular)',
        opacity: 0.9,
        lineHeight: 'var(--line-height-tight)',
    }),
};

export default styles;
