import { css, keyframes } from '@emotion/react';

const fillAnimation = keyframes({
    from: { width: '0%' },
    to: { width: 'var(--progress-width)' },
});

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        width: '100%',
    }),

    header: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),

    label: css({
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
    }),

    value: css({
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-regular)',
    }),

    track: css({
        width: '100%',
        height: 'var(--space-sm)',
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
    }),

    fill: css({
        height: '100%',
        transition: 'width 0.5s ease-out',
    }),

    fillAnimated: css({
        animation: `${fillAnimation} 0.8s ease-out forwards`,
    }),
};

export default styles;
