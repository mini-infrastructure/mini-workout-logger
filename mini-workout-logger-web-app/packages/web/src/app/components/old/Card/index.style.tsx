import { css } from "@emotion/react";

const styles = {
    baseCard: (clicked: boolean) => css({
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-16)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        backgroundColor: 'var(--color-container1)',
        border: 'var(--borderWidth-thin) solid color-mix(in srgb, var(--color-border) 20%, transparent)',
        cursor: clicked ? 'pointer' : 'default',
        width: '100%',
        boxSizing: 'border-box',
    }),
};

export default styles;
