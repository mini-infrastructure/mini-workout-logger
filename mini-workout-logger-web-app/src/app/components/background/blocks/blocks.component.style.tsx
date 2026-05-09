import {css} from '@emotion/react';

const styles = {
    wrapper: css({
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 'var(--stack-gap-spacious)',
        padding: 'var(--base-size-32)',
    }),

    left: css({
        display: 'grid',
        gridTemplateRows: '1fr 2fr',
        gap: 'var(--stack-gap-spacious)',
    }),

    right: css({
        display: 'grid',
        gridTemplateRows: '2fr 1fr',
        gap: 'var(--stack-gap-spacious)',
    }),

    rightTop: css({
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gap: 'var(--stack-gap-spacious)',
    }),

    rightBottom: css({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr',
        gap: 'var(--stack-gap-spacious)',
    }),

    double: css({}),
    half: css({}),
};

export default styles;
