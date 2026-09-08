import { useState } from 'react';
import styles from './index.style';
import type { AccentColor } from '../../themes/tokens';

type FolderCardProps = {
    color: AccentColor;
    title?: string;
    description?: string;
    onClick?: () => void;
    backgroundImage?: string;
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

const FolderCard = ({
    color,
    title,
    description,
    onClick,
    backgroundImage,
}: FolderCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const isClickable = !!onClick;

    return (
        <div
            css={styles.container}
            onMouseEnter={() => isClickable && setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsActive(false);
            }}
            onMouseDown={() => isClickable && setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
        >
            {/* Back card (rotated) */}
            <div
                css={[
                    styles.backCard,
                    styles.square,
                    isClickable && isHovered && styles.backCardHover,
                ]}
                style={{ backgroundColor: contrastColorMap[color] }}
            />

            {/* Front card */}
            <div
                css={[
                    styles.frontCard,
                    styles.square,
                    isClickable && styles.clickable,
                    isClickable && isHovered && !isActive && styles.clickableHover,
                    isClickable && isActive && styles.clickableActive,
                ]}
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
                </div>
            </div>
        </div>
    );
};

export default FolderCard;
