import { css } from '@emotion/react';

const styles = {
    wrapper: css({
        width: '100%',
        height: '100%',
        display: 'flex',
    }),

    content: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }),

    status: css({
        fontSize: '4rem',
    }),

    title: css({}),

    message: css({
        maxWidth: '40rem',
    }),

    action: css({
        cursor: 'pointer',
    }),
};

export default styles;
