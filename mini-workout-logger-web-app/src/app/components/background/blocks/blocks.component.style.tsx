import {css} from '@emotion/react';

const styles = {
    wrapper: css({
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', // 1/3 | 2/3
        gap: 'var(--stack-gap-spacious)',
        padding: 'var(--base-size-32)',
        zIndex: -1,
        margin: 'var(--base-size-64)',
    }),

    /* LEFT SIDE */
    left: css({
        display: 'grid',
        gridTemplateRows: '1fr 2fr', // 1/3 | 2/3
        gap: 'var(--stack-gap-spacious)',
    }),

    /* RIGHT SIDE */
    right: css({
        display: 'grid',
        gridTemplateRows: '2fr 1fr', // 2/3 | 1/3
        gap: 'var(--stack-gap-spacious)',
    }),

    /* RIGHT TOP */
    rightTop: css({
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr', // 1/4 | 2/4 | 1/4
        gap: 'var(--stack-gap-spacious)',
    }),

    /* RIGHT BOTTOM */
    rightBottom: css({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr', // 1/4 | 1/4 | 1/2
        gap: 'var(--stack-gap-spacious)',
    }),

    /* Modifiers */
    double: css({}),
    half: css({}),
};

export default styles;
