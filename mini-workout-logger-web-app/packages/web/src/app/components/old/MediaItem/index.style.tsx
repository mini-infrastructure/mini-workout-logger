import { css } from '@emotion/react';

const styles = {
    root: (size: number) => css({
        width: size,
        height: size,
        borderRadius: 'var(--borderRadius-medium)',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        backgroundColor: 'var(--color-container2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    clickable: css({
        cursor: 'pointer',
        '&:hover .media-overlay': {
            opacity: 1,
        },
    }),
    img: css({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    }),
    placeholder: css({
        color: 'var(--color-gray)',
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    overlay: css({
        position: 'absolute',
        inset: 0,
        backgroundColor: 'color-mix(in srgb, var(--color-black) 40%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'opacity 0.15s',
        color: 'var(--color-white)',
        fontSize: 20,
    }),
    hiddenInput: css({
        display: 'none',
    }),
};

export default styles;
