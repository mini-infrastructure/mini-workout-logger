import type {CSSProperties, PropsWithChildren} from 'react';
import Background, {type BackgroundProps} from '../background.component.tsx';
import styles from './glass.component.style.tsx';

export type GlassBackgroundProps = BackgroundProps & {
    /** Backdrop blur in px. Maps to --bg-glass-blur. Default: 30 */
    blur?: number;
    /** Background opacity as a percentage 0–100. Maps to --bg-glass-opacity. Default: 8 */
    opacity?: number;
};

const GlassBackground = ({
    blur,
    opacity,
    customCss,
    style,
    childrenInFront,
    children,
}: PropsWithChildren<GlassBackgroundProps>) => (
    <Background
        customCss={[styles.glass, customCss]}
        childrenInFront={childrenInFront}
        style={{
            ...(blur != null ? { '--bg-glass-blur': `${blur}px` } as CSSProperties : {}),
            ...(opacity != null ? { '--bg-glass-opacity': `${opacity}%` } as CSSProperties : {}),
            ...style,
        }}
    >
        {children}
    </Background>
);

export default GlassBackground;
