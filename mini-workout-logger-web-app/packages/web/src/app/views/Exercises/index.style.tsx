import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }),

    title: css({
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-lg)',
    }),

    placeholder: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: 'var(--color-gray)',
        fontSize: 'var(--font-size-lg)',
    }),
};

export default styles;
