import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }),

    title: css({
        fontSize: 'var(--font-size-h2)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-lg)',
    }),

    placeholder: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: 'var(--color-gray)',
        fontSize: 'var(--font-size-large)',
    }),
};

export default styles;
