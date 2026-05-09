import {css} from '@emotion/react';

const styles = {
    pageWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        gap: 'var(--stack-gap-condensed)',
    }),

    toolbar: css({
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        gap: 'var(--stack-gap-condensed)',
    }),

    search: css({
        flex: 1,
    }),

    buttonWrapper: css({
        padding: 'var(--base-size-8)',
        display: 'flex',
        alignItems: 'stretch',
    }),

    filterBar: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        flexShrink: 0,
    }),

    filterActive: css({
        border: `var(--borderWidth-thin) solid var(--color-blue)`,
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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }),

    resultListWrapper: css({
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
    }),

    rightPanel: css({
        flexShrink: 0,
        height: '100%',
    }),

    resultList: css({
        listStyle: 'none',
        padding: 0,
        marginRight: 'var(--stack-gap-tiny)',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: 'var(--stack-gap-tiny)',

        '& > li': {
            flex: '0 1 calc(50% - 4px)',
            minWidth: 0,
            display: 'flex',
        },

        '& > li > *': {
            flex: 1,
            minWidth: 0,
        },
    }),
};

export default styles;
