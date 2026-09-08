import styles from './index.style';
import type { AccentColor } from '../../themes/tokens';

type ProgressBarProps = {
    label: string;
    current: number;
    total: number;
    color?: AccentColor;
    showPercentage?: boolean;
    animate?: boolean;
};

const colorMap: Record<AccentColor, string> = {
    red: 'var(--color-red-contrast)',
    yellow: 'var(--color-yellow-contrast)',
    blue: 'var(--color-blue-contrast)',
    green: 'var(--color-green-contrast)',
    pink: 'var(--color-pink-contrast)',
};

const ProgressBar = ({
    label,
    current,
    total,
    color = 'blue',
    showPercentage = true,
    animate = true,
}: ProgressBarProps) => {
    const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
    const displayValue = showPercentage ? `${Math.round(percentage)}%` : `${current}/${total}`;

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <span css={styles.label}>{label}</span>
                <span css={styles.value}>{displayValue}</span>
            </div>
            <div css={styles.track}>
                <div
                    css={[styles.fill, animate && styles.fillAnimated]}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: colorMap[color],
                        // CSS variable for animation
                        '--progress-width': `${percentage}%`,
                    } as React.CSSProperties}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
