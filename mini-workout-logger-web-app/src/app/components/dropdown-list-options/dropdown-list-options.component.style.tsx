import {css} from '@emotion/react';

const styles = {
    container: css({
        position: 'absolute',
        width: '100%',
        borderRadius: 'var(--borderRadius-small)',
        marginTop: 'var(--base-size-4)',
        zIndex: 'var(--base-zIndex-10)' as any,
        maxHeight: 'var(--overlay-maxHeight)',
        overflowY: 'auto',
        border: `var(--borderWidth-thin) solid var(--color-container1)`,
        background: 'var(--color-bg)',
    }),

    containerWide: css({
        minWidth: '100%',
        width: 'max-content',
        whiteSpace: 'nowrap',
    }),

    searchRow: css({
        padding: 'var(--base-size-8)',
        borderBottom: `var(--borderWidth-thin) solid var(--color-container1)`,
    }),

    searchInput: css({
        width: '100%',
        border: 'none',
        background: 'transparent',
        outline: 'none',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        '::placeholder': {color: 'var(--color-gray)'},
    }),

    item: (checked: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        padding: 'var(--base-size-8)',
        cursor: 'pointer',
        backgroundColor: checked
            ? 'color-mix(in srgb, var(--color-blue) 10%, transparent)'
            : 'transparent',

        ':hover': {
            backgroundColor: checked
                ? 'color-mix(in srgb, var(--color-blue) 15%, transparent)'
                : 'var(--color-container2)',
        },
    }),
};

export default styles;
