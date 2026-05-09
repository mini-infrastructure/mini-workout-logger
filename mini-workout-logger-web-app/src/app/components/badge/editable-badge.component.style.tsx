import {css} from '@emotion/react';

const styles = {
    inner: css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-nano)',
    }),

    input: css({
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        minWidth: 60,
        maxWidth: 160,
        width: '8ch',
    }),

};

export default styles;
