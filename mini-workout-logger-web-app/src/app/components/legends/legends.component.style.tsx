import {css} from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
    }),

    item: (clickable: boolean, selected: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        cursor: clickable ? 'pointer' : 'default',
        opacity: !clickable || selected ? 1 : 0.4,
        transition: 'opacity 0.15s ease',
        ...(clickable && { ':hover': { opacity: 1 } }),
    }),

    dot: css({
        width: 8,
        height: 8,
        borderRadius: '50%',
        flexShrink: 0,
    }),

    label: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
    }),
};

export default styles;
