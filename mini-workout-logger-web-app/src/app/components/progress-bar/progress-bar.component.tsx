import type {Interpolation, Theme} from '@emotion/react';
import styles from './progress-bar.component.style.tsx';

export type ProgressBarProps = {
    percentage: number;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ProgressBar = ({ percentage, customCss }: ProgressBarProps) => {
    const clamped = Math.min(100, Math.max(0, percentage));
    const customCssArray = customCss
        ? Array.isArray(customCss) ? customCss : [customCss]
        : [];

    return (
        <div css={[styles.track, ...customCssArray]}>
            <div css={styles.fill(clamped)} />
        </div>
    );
};

export default ProgressBar;
