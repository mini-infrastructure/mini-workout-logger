import { css, Theme } from '@emotion/react';

const styles = {
    emptyWrapper: (theme: Theme) => css({
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.fontSizes.xxx_large,
        backgroundColor: theme.colors.container1,
        borderRadius: 15,
        border: `1px solid ${theme.colors.border1}`,
        color: theme.colors.text2,

        height: '99%',
        padding: '0',
        margin: '0',
    }),

    cardsWrapper: (theme: Theme) => css({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        gap: '1rem 0',
    }),

    col: (theme: Theme) => css({
        width: 'calc(23%)',
        backgroundColor: theme.colors.container1,
        border: `1px solid ${theme.colors.border1}`,
        borderRadius: 15,


        '@media(max-width: 1700px)': {
            width: 'calc(22.5%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 1450px)': {
            width: 'calc(22%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 1200px)': {
            width: 'calc(30%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 970px)': {
            width: 'calc(46%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 850px)': {
            width: 'calc(45%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 750px)': {
            width: 'calc(44%)',
            backgroundColor: theme.colors.container1,
        },

        '@media(max-width: 650px)': {
            width: 'calc(100%)',
            backgroundColor: theme.colors.yellow,
        },
    }),
};

export default styles;
