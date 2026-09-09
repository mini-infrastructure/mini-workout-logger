import styles from './index.style';
import type { AccentColor } from '../../themes/tokens';

type StatCardProps = {
    value: string | number;
    label: string;
    color: AccentColor;
    size?: 'square' | 'wide';
    onClick?: () => void;
};

const colorMap: Record<AccentColor, string> = {
    red: 'var(--color-red)',
    yellow: 'var(--color-yellow)',
    blue: 'var(--color-blue)',
    green: 'var(--color-green)',
    pink: 'var(--color-pink)',
};

const textColorMap: Record<AccentColor, string> = {
    red: 'var(--color-black)',
    yellow: 'var(--color-black)',
    blue: 'var(--color-white)',
    green: 'var(--color-black)',
    pink: 'var(--color-black)',
};

const StatCard = ({
    value,
    label,
    color,
    size = 'square',
    onClick,
}: StatCardProps) => {
    const sizeStyle = size === 'wide' ? styles.wide : styles.square;

    return (
        <div
            css={[styles.card, sizeStyle, onClick && styles.clickable]}
            style={{
                backgroundColor: colorMap[color],
                color: textColorMap[color],
            }}
            onClick={onClick}
        >
            <span css={styles.value}>{value}</span>
            <span css={styles.label}>{label}</span>
        </div>
    );
};

export default StatCard;
