import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingInline: 'var(--space-xl)',
        backgroundColor: 'var(--color-black)',
    }),

    side: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        flex: 1,
    }),

    left: css({
        justifyContent: 'flex-start',
    }),

    right: css({
        justifyContent: 'flex-end',
    }),

    center: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    }),
};

export default styles;
