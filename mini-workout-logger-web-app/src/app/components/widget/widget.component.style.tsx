import { css } from '@emotion/react';

const styles = {
    root: css({
        position: 'relative',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        isolation: 'isolate',
    }),

    card: css({
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
    }),

    editBar: css({
        position: 'absolute',
        top: 'var(--base-size-8)',
        right: 'var(--base-size-8)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        zIndex: 10,
    }),

    cardGlass: css({
        backgroundColor: 'transparent',
        border: 'none',
    }),

    content: css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
    }),
};

export default styles;
