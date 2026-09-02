import { css } from '@emotion/react';

const styles = {
    wrapper: css({
        borderRadius: 'var(--borderRadius-large)',
        padding: 'var(--base-size-8)',
    }),

    container: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        backgroundColor: 'var(--color-container1)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-12)',
    }),

    icon: css({
        color: 'var(--color-text)',
        fontSize: 'var(--size-icon-sm)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
    }),

    clearButton: css({
        flexShrink: 0,
        padding: 'var(--base-size-2)',
        borderRadius: 'var(--borderRadius-small)',
        background: 'transparent',
        border: 'none',
        color: 'var(--color-border)',
        ':hover': {
            background: 'transparent',
            color: 'var(--color-text)',
        },
    }),

    clearIcon: css({
        width: 'var(--base-size-14)',
        height: 'var(--base-size-14)',
        fontSize: 'var(--base-size-14)',
        margin: 0,
    }),

    input: css({
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--color-text)',
        fontSize: 'var(--size-input-text)',
        width: '100%',

        '&::placeholder': {
            color: 'var(--color-border)',
        },
    }),
};

export default styles;
