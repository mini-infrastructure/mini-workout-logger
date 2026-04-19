import { css } from '@emotion/react';

const styles = {
    pageWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        gap: 'var(--stack-gap-condensed)',
    }),

    filterBar: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        flexShrink: 0,
    }),

    clearFiltersButton: css({
        marginLeft: 'auto',
    }),

    contentRow: css({
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--stack-gap-normal)',
        overflow: 'hidden',
    }),

    leftColumn: css({
        flex: 1,
        minWidth: 0,
        overflowY: 'auto',

        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--color-border)',
            borderRadius: 'var(--borderRadius-full)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'var(--color-gray)',
        },
        scrollbarWidth: 'auto',
        scrollbarColor: 'var(--color-border) transparent',
    }),

    rightPanel: css({
        flexShrink: 0,
        height: '100%',
    }),

    resultList: css({
        listStyle: 'none',
        padding: 0,
        marginRight: 'var(--stack-gap-tiny)',
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
};

export default styles;
