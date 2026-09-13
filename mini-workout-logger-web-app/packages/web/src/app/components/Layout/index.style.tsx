import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-black)',
    }),

    main: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--space-md)',
        paddingInline: 'var(--space-xl)',
        paddingBottom: 'var(--space-xl)',
        overflow: 'auto',
    }),
};

export default styles;
