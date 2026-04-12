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
};

export default styles;
