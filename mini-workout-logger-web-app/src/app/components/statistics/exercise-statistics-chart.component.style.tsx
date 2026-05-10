import {css} from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none',
        padding: 'var(--base-size-8) 0',
    }),

    headerLeft: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        fontSize: 'var(--size-small)',
        fontWeight: 600,
        color: 'var(--color-text)',
    }),

    chevron: css({
        fontSize: 'var(--size-icon-xs)',
        color: 'var(--color-gray)',
        transition: 'transform 0.2s ease',
    }),

    chevronOpen: css({
        transform: 'rotate(180deg)',
    }),

    body: css({
        overflow: 'hidden',
        transition: 'max-height var(--transition-expand, 0.25s ease)',
    }),

    bodyOpen: css({
        maxHeight: '400px',
    }),

    bodyClosed: css({
        maxHeight: '0px',
    }),

    empty: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        paddingBottom: 'var(--base-size-8)',
    }),

    exerciseLabel: css({
        fontSize: 'var(--size-small)',
        fontWeight: 600,
        color: 'var(--color-text)',
        marginBottom: 'var(--base-size-4)',
    }),

    seriesLabel: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        marginBottom: 'var(--base-size-4)',
    }),

    chartWrapper: css({
        width: '100%',
        height: 180,
    }),
};

export default styles;
