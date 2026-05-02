import { useMemo } from 'react';
import type { Keyframes } from '@emotion/react';
import GlassBackground, { type GlassBackgroundProps } from '../glass/glass.component.tsx';
import styles from './blob-glass.component.style.tsx';

export type BlobGlassBackgroundProps = GlassBackgroundProps & {
    /** Color of the blobs. Accepts any CSS color value or variable. Default: var(--color-blue) */
    color?: string;
    /** Optional animation keyframe for the blobs. Pass floatAnimation for the default float. */
    animation?: Keyframes;
    /** Render a single centered blob instead of two random blobs. Default: false */
    single?: boolean;
};

const BlobGlassBackground = ({
    color = 'var(--color-blue)',
    animation,
    single = false,
    blur,
    opacity,
    customCss,
    style,
    childrenInFront,
    children,
}: BlobGlassBackgroundProps) => {
    const randomValues = useMemo(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size1: 120 + Math.random() * 120,
        size2: 80 + Math.random() * 100,
    }), []);

    const blobCss = single
        ? styles.single(color, animation)
        : styles.dual(color, randomValues, animation);

    return (
        <GlassBackground
            blur={blur}
            opacity={opacity}
            customCss={[blobCss, customCss]}
            style={style}
            childrenInFront={childrenInFront}
        >
            {children}
        </GlassBackground>
    );
};

export default BlobGlassBackground;
