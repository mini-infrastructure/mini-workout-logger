import { css } from '@emotion/react';

const styles = {
    /**
     * Glass morphism overlay.
     *
     * Override the defaults per-instance via CSS variables:
     *   --bg-glass-blur    backdrop blur amount  (default: 30px)
     *   --bg-glass-opacity glass background mix  (default: 8%)
     */
    glass: css({
        backdropFilter: 'blur(var(--bg-glass-blur, 30px))',
        WebkitBackdropFilter: 'blur(var(--bg-glass-blur, 30px))',
        backgroundColor: 'color-mix(in srgb, var(--color-container1) var(--bg-glass-opacity, 8%), transparent)',
    }),
};

export default styles;
