import { css } from '@emotion/react';

const styles = {
    root: css({
        position: 'relative',
        width: '100%',
        height: '100%',
    }),
    track: css({
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    }),
    slide: (index: number) => css({
        display: index === 0 ? 'block' : 'none',
    }),
    dots: css({
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'var(--stack-gap-nano)',
        alignItems: 'center',
        zIndex: 1,
    }),
    dot: (active: boolean) => css({
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: active ? 'var(--color-blue)' : 'transparent',
        border: `1px solid ${active ? 'var(--color-blue)' : 'var(--color-border)'}`,
        transition: 'background-color 0.2s, border-color 0.2s',
        cursor: 'pointer',
        flexShrink: 0,
    }),
};

export default styles;
