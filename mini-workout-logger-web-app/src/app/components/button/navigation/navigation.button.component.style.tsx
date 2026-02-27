import { css, Theme } from '@emotion/react';

const styles = {
    wrapper: css({
        display: 'flex',
        height: '50%',
        gap: '0.3rem',
    }),

    navigationButtonWrapper: (theme: Theme) => css({
        padding: '0.6rem',
        borderRadius: 8,
    }),

};

export default styles;
