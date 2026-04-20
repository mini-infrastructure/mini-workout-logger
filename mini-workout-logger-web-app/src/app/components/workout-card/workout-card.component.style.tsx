import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        width: '100%',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--stack-gap-condensed)',
    }),

    name: css({
        fontSize: 'var(--size-title-sm)',
        fontWeight: 600,
        color: 'var(--color-text)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),

    exerciseList: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    }),

    exerciseItem: css({
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--stack-gap-condensed)',
    }),

    exerciseName: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 0,
    }),

    exerciseSets: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        fontWeight: 500,
        flexShrink: 0,
    }),
};

export default styles;
