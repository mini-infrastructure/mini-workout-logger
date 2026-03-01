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

    cardsWrapper: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        width: '100%',
    }),

    col: (theme: Theme) => css({
        backgroundColor: theme.colors.container1,
        border: `1px solid ${theme.colors.border1}`,
        borderRadius: 15,
        padding: '1rem',
        boxSizing: 'border-box',
    })
};

export default styles;
