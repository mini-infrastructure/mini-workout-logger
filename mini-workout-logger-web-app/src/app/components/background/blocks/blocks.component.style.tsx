import { css } from '@emotion/react';
import theme from "../../../themes/theme.ts";

const styles = {
    wrapper: css({
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', // 1/3 | 2/3
        gap: '1.5rem',
        padding: '2rem',
        zIndex: -1,
        margin: '4rem',
    }),

    /* LEFT SIDE */
    left: css({
        display: 'grid',
        gridTemplateRows: '1fr 2fr', // 1/3 | 2/3
        gap: '1.5rem',
    }),

    /* RIGHT SIDE */
    right: css({
        display: 'grid',
        gridTemplateRows: '2fr 1fr', // 2/3 | 1/3
        gap: '1.5rem',
    }),

    /* RIGHT TOP */
    rightTop: css({
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr', // 1/4 | 2/4 | 1/4
        gap: '1.5rem',
    }),

    /* RIGHT BOTTOM */
    rightBottom: css({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr', // 1/4 | 1/4 | 1/2
        gap: '1.5rem',
    }),

    /* Modifiers */
    double: css({}),
    half: css({}),
};

export default styles;
