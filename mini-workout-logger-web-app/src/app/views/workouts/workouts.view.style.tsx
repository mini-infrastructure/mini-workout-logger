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
        alignItems: 'center',
        flexShrink: 0,
        gap: 'var(--stack-gap-condensed)',
    }),

    search: css({
        flex: 1,
    }),

    tagFilterBar: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
        flexShrink: 0,
    }),

    grid: css({
        flex: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--stack-gap-normal)',
        alignContent: 'start',

        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--color-border)',
            borderRadius: 'var(--borderRadius-full)',
        },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'var(--color-gray)' },
        scrollbarWidth: 'auto',
        scrollbarColor: 'var(--color-border) transparent',
    }),
};

export default styles;
