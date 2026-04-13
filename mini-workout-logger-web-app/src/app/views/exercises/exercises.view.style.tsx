import { css } from '@emotion/react';

const styles = {
    resultList: css({
        listStyle: 'none',
        padding: 0,
        margin: `var(--stack-gap-condensed) 0 0 0`,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-tiny)',

        '& > li': {
            flex: '1 1 calc(50% - var(--stack-gap-tiny))',
            minWidth: '280px',
        },
    }),
};

export default styles;
