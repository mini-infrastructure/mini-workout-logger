import type { ReactNode } from 'react';
import styles from './index.style';
import type { AccentColor } from '../../themes/tokens';

type CardProps = {
    color: AccentColor;
    size?: 'square' | 'wide';
    title?: string;
    description?: string;
    onClick?: () => void;
    backgroundImage?: string;
    children?: ReactNode;
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

const Card = ({
    color,
    size = 'square',
    title,
    description,
    onClick,
    backgroundImage,
    children,
}: CardProps) => {
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
            {backgroundImage && (
                <div
                    css={styles.backgroundImage}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}
            <div css={styles.content}>
                {title && <h3 css={styles.title}>{title}</h3>}
                {description && <p css={styles.description}>{description}</p>}
                {children}
            </div>
        </div>
    );
};

export default Card;
