import { css } from '@emotion/react';

const styles = {
    card: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-thick) solid transparent',
        boxSizing: 'border-box',
        width: '12rem',
        height: '12rem',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
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
    }),

    title: css({
        margin: 0,
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-tight)',
    }),

    value: css({
        margin: 0,
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-tight)',
    }),

    progressSection: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        marginTop: 'var(--space-sm)',
        isolation: 'isolate',
    }),

    progressHeader: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),

    progressLabel: css({
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
    }),

    progressValue: css({
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-regular)',
    }),

    track: css({
        width: '100%',
        height: 'var(--space-sm)',
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        flexShrink: 0,
    }),

    fill: css({
        height: '100%',
        transition: 'width 0.5s ease-out',
        willChange: 'width',
    }),
};

export default styles;
