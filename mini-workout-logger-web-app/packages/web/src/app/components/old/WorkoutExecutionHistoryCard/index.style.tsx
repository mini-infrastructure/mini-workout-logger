import { css } from '@emotion/react';

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
};

export default styles;
