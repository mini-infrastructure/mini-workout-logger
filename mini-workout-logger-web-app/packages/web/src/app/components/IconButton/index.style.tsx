import { css, keyframes } from '@emotion/react';

const rotateIn = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(180deg)' },
});

const rotateOut = keyframes({
    from: { transform: 'rotate(180deg)' },
    to: { transform: 'rotate(360deg)' },
});

const styles = {
    button: css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,

        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)',
        border: 'var(--border-medium) solid var(--color-black)',
        borderRadius: 'var(--radius-full)',

        cursor: 'pointer',
        transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-white)',
        },

        '&:disabled': {
            backgroundColor: 'var(--color-gray-light)',
            borderColor: 'var(--color-gray-light)',
            color: 'var(--color-gray)',
            cursor: 'not-allowed',
        },
    }),

    buttonSize: {
        sm: css({
            width: 'var(--space-lg)',
            height: 'var(--space-lg)',
        }),
        md: css({
            width: 'var(--space-xl)',
            height: 'var(--space-xl)',
        }),
        lg: css({
            width: '3.5rem',
            height: '3.5rem',
        }),
    },

    buttonSelected: css({
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        borderColor: 'var(--color-white)',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            borderColor: 'var(--color-black)',
        },
    }),

    icon: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),

    iconSize: {
        sm: css({
            fontSize: 'var(--font-size-sm)',
        }),
        md: css({
            fontSize: 'var(--font-size-md)',
        }),
        lg: css({
            fontSize: 'var(--font-size-2xl)',
        }),
    },

    iconAnimateIn: css({
        animation: `${rotateIn} 0.3s ease forwards`,
    }),

    iconAnimateOut: css({
        animation: `${rotateOut} 0.3s ease forwards`,
    }),
};

export default styles;
