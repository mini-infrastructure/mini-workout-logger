import {css, Theme} from '@emotion/react';

const styles = {
    wrapper: css({
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        position: 'relative',
    }),

    content: css({
        margin: '0 2rem',
    }),

    left: css({
        textAlign: 'right',
    }),

    right: css({
        textAlign: 'left',
    }),

    status: (theme: Theme) => css({
        fontSize: '15rem',
        fontFamily: theme.fonts.number,
    }),

    title: (theme: Theme) => css({
        fontSize: '2.5rem',
        marginBottom: '-1rem',
        fontFamily: theme.fonts.secondary,
    }),

    message: css({
        fontSize: '1.5rem',
        wordWrap: 'break-word',
        maxWidth: '80%',
        textOverflow: 'ellipsis',
    }),

    action: css({
        cursor: 'pointer',
    }),
};

export default styles;
