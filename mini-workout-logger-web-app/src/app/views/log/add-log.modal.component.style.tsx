import {css} from '@emotion/react';

const styles = {
    body: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        padding: 'var(--base-size-16)',
        minWidth: '380px',
    }),

    footer: css({
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 'var(--stack-gap-condensed)',
        paddingTop: 'var(--base-size-8)',
    }),

};

export default styles;
