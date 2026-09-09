import { css } from '@emotion/react';

const styles = {
    base: css({
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
    }),

    behind: css({
        position: 'absolute',
        inset: 0,
        zIndex: -1,
    }),

    front: css({
        position: 'relative',
        zIndex: 1,
    }),
};

export default styles;
