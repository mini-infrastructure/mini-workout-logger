import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--stack-gap-condensed)',
        marginTop: 'var(--stack-gap-condensed)',
    }),

    button: (disabled: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--base-size-8)',
        borderRadius: 'var(--borderRadius-small)',
        border: 'var(--borderWidth-thin) solid color-mix(in srgb, var(--color-border) 20%, transparent)',
        backgroundColor: 'var(--color-container1)',
        color: disabled ? 'var(--color-text-muted)' : 'var(--color-text)',
        cursor: disabled ? 'default' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
    }),

    label: css({
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
    }),
};

export default styles;
