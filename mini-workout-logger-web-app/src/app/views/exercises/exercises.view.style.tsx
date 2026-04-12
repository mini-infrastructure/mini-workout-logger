import { css } from '@emotion/react';

const styles = {
    resultList: css({
        listStyle: 'none',
        padding: 0,
        margin: `var(--stack-gap-condensed) 0 0 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
    }),

    resultItem: css({
        padding: `var(--base-size-8) var(--base-size-12)`,
        borderRadius: 'var(--borderRadius-small)',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-container1)',
    }),
};

export default styles;
