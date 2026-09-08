import { css } from '@emotion/react';

const DASH_LENGTH = '0.75rem';
const GAP_LENGTH = '0.5rem';
const BORDER_WIDTH = '0.1875rem';

const styles = {
    card: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        padding: 'var(--space-lg)',
        width: '12rem',
        height: '12rem',
        borderRadius: 'var(--radius-lg)',
        border: `${BORDER_WIDTH} solid transparent`,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        backgroundImage: `
            repeating-linear-gradient(0deg, var(--color-white), var(--color-white) ${DASH_LENGTH}, transparent ${DASH_LENGTH}, transparent calc(${DASH_LENGTH} + ${GAP_LENGTH})),
            repeating-linear-gradient(90deg, var(--color-white), var(--color-white) ${DASH_LENGTH}, transparent ${DASH_LENGTH}, transparent calc(${DASH_LENGTH} + ${GAP_LENGTH})),
            repeating-linear-gradient(180deg, var(--color-white), var(--color-white) ${DASH_LENGTH}, transparent ${DASH_LENGTH}, transparent calc(${DASH_LENGTH} + ${GAP_LENGTH})),
            repeating-linear-gradient(270deg, var(--color-white), var(--color-white) ${DASH_LENGTH}, transparent ${DASH_LENGTH}, transparent calc(${DASH_LENGTH} + ${GAP_LENGTH}))
        `,
        backgroundSize: `${BORDER_WIDTH} 100%, 100% ${BORDER_WIDTH}, ${BORDER_WIDTH} 100%, 100% ${BORDER_WIDTH}`,
        backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
        backgroundRepeat: 'no-repeat',
        transition: 'border-color 0.2s ease, background-image 0.2s ease',
        '&:hover': {
            borderColor: 'var(--color-white)',
            backgroundImage: 'none',
        },
        '&:active': {
            borderColor: 'var(--color-white)',
            backgroundImage: 'none',
        },
    }),

    title: css({
        margin: 0,
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-tight)',
        color: 'var(--color-white)',
        textAlign: 'center',
    }),

    iconButton: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)',
        fontSize: 'var(--font-size-2xl)',
        border: 'none',
        cursor: 'pointer',
        transition: 'none',
    }),
};

export default styles;
