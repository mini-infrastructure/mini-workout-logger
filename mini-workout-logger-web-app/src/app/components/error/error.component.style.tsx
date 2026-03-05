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
        fontSize: theme.fontSizes.xxx_large,
        fontFamily: theme.fonts.number,
    }),

    title: (theme: Theme) => css({
        fontSize: theme.fontSizes.x_large,
        marginBottom: '-1rem',
        fontFamily: theme.fonts.secondary,
    }),

    message: (theme: Theme) => css({
        fontSize: theme.fontSizes.large,
        wordWrap: 'break-word',
        textOverflow: 'ellipsis',
    }),

    action: css({
        cursor: 'pointer',
    }),
};

export default styles;
