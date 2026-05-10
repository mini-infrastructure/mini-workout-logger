import {css} from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
    }),

    date: css({
        flex: 1,
        fontSize: 'var(--size-small)',
        color: 'var(--color-text)',
    }),

    statsWrapper: css({
        overflow: 'hidden',
        transition: 'max-height var(--transition-expand)',
    }),

    statsContent: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        paddingTop: 'var(--stack-gap-condensed)',
    }),

    statsTitle: css({
        fontSize: 'var(--size-small)',
        fontWeight: 600,
        color: 'var(--color-text)',
    }),
};

export default styles;
