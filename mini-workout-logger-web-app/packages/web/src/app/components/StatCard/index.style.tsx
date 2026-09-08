import { css } from '@emotion/react';

const styles = {
    card: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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

    value: css({
        margin: 0,
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-tight)',
    }),

    label: css({
        margin: 0,
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-regular)',
        opacity: 0.9,
    }),
};

export default styles;
