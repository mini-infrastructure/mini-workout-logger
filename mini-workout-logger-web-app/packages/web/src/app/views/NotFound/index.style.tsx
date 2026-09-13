import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'var(--space-xl)',
        backgroundColor: 'var(--color-black)',
        textAlign: 'center',
    }),

    title: css({
        fontSize: 'var(--font-size-h1)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-white)',
        marginBottom: 'var(--space-md)',
    }),

    message: css({
        fontSize: 'var(--font-size-large)',
        color: 'var(--color-gray)',
        marginBottom: 'var(--space-xl)',
    }),
};

export default styles;
