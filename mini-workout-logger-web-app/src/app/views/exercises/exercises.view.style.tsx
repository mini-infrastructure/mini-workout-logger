import {css, Theme} from '@emotion/react';

const styles = {

    actionsWrapper: css({
        padding: '1rem',
    }),

    cardsWrapper: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '1rem',
        width: '100%',
    }),

    col: (theme: Theme) => css({
        backgroundColor: theme.colors.container1,
        border: `1px solid ${theme.colors.border1}`,
        borderRadius: 15,
        padding: '1rem',
        boxSizing: 'border-box',
    }),
};

export default styles;
