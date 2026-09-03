import { css } from '@emotion/react';
import { cssVar } from '@mini/shared';

const styles = {
    container: css({
        position: 'relative',
    }),

    trigger: css({
        justifyContent: 'space-between',
        whiteSpace: 'nowrap',
    }),

    triggerActive: css({
        border: `var(--borderWidth-thin) solid var(--color-blue)`,
    }),

    dropdown: css({
        position: 'absolute',
        top: 'calc(100% + var(--base-size-4))',
        left: 0,
        zIndex: cssVar<number>('--base-zIndex-10'),
        minWidth: '100%',
        width: 'max-content',
        borderRadius: 'var(--borderRadius-small)',
        border: `var(--borderWidth-thin) solid var(--color-container1)`,
        background: 'var(--color-bg)',
    }),

    dropdownItem: (checked: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        padding: 'var(--base-size-8)',
        cursor: 'pointer',
        background: checked ? 'var(--color-container1)' : 'transparent',
        whiteSpace: 'nowrap',

        ':hover': {
            background: 'var(--color-container2)',
        },
    }),
};

export default styles;
