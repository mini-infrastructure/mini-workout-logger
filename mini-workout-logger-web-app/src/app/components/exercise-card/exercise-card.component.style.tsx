import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
    }),

    name: css({
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),

    divider: css({
        width: '100%',
    }),

    footer: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
};

export default styles;
