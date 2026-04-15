import { css } from '@emotion/react';

const styles = {
    resultList: css({
        listStyle: 'none',
        padding: 0,
        margin: `var(--stack-gap-condensed) 0 0 0`,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--stack-gap-tiny)',

        '& > li': {
            display: 'flex',
            minWidth: 0,
        },

        '& > li > *': {
            flex: 1,
        },
    }),

    filterBar: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        margin: `var(--stack-gap-condensed) 0 0 0`,
    }),

    clearFiltersButton: css({
        marginLeft: 'auto',
    }),
};

export default styles;
