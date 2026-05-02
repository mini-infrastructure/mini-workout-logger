import {css} from '@emotion/react';

const styles = {
    wrapper: css({
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        isolation: 'isolate',
    }),

    content: css({
        margin: `0 var(--base-size-32)`,
    }),

    left: css({
        textAlign: 'right',
    }),

    right: css({
        textAlign: 'left',
    }),

    status: css({
        fontSize: "var(--size-xxxl)",
        fontFamily: "var(--font-number)",
    }),

    title: css({
        fontSize: "var(--size-xl)",
        marginBottom: '-1rem',
        fontFamily: "var(--font-secondary)",
    }),

    message: css({
        fontSize: "var(--size-large)",
        wordWrap: 'break-word',
        textOverflow: 'ellipsis',
    }),

    action: css({
        cursor: 'pointer',
    }),
};

export default styles;
