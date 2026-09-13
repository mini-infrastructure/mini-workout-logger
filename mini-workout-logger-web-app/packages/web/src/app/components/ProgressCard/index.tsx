import styles from './index.style';
import type { AccentColor } from '../../themes/tokens';

type ProgressCardProps = {
    color: AccentColor;
    title: string;
    value: string | number;
    progressLabel: string;
    current: number;
    total: number;
    displayMode: 'percentage' | 'fraction';
    backgroundImage?: string;
    onClick?: () => void;
};

const colorMap: Record<AccentColor, string> = {
    red: 'var(--color-red)',
    yellow: 'var(--color-yellow)',
    blue: 'var(--color-blue)',
    green: 'var(--color-green)',
    pink: 'var(--color-pink)',
};

const contrastColorMap: Record<AccentColor, string> = {
    red: 'var(--color-red-contrast)',
    yellow: 'var(--color-yellow-contrast)',
    blue: 'var(--color-blue-contrast)',
    green: 'var(--color-green-contrast)',
    pink: 'var(--color-pink-contrast)',
};

const textColorMap: Record<AccentColor, string> = {
    red: 'var(--color-black)',
    yellow: 'var(--color-black)',
    blue: 'var(--color-white)',
    green: 'var(--color-black)',
    pink: 'var(--color-black)',
};

const ProgressCard = ({
    color,
    title,
    value,
    progressLabel,
    current,
    total,
    displayMode,
    backgroundImage,
    onClick,
}: ProgressCardProps) => {
    const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
    const displayValue = displayMode === 'percentage'
        ? `${Math.round(percentage)}%`
        : `${current}/${total}`;

    return (
        <div
            css={[styles.card, onClick && styles.clickable]}
            style={{
                backgroundColor: colorMap[color],
                color: textColorMap[color],
            }}
            onClick={onClick}
        >
            {backgroundImage && (
                <div
                    css={styles.backgroundImage}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}
            <div css={styles.content}>
                <h3 css={styles.title}>{title}</h3>
                <span css={styles.value}>{value}</span>
                <div css={styles.progressSection}>
                    <div css={styles.progressHeader}>
                        <span css={styles.progressLabel} style={{ color: contrastColorMap[color] }}>{progressLabel}</span>
                        <span css={styles.progressValue} style={{ color: contrastColorMap[color] }}>{displayValue}</span>
                    </div>
                    <div css={styles.track}>
                        <div
                            css={styles.fill}
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: contrastColorMap[color],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;
