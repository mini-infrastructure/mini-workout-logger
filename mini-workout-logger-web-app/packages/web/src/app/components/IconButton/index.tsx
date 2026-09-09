import { useRef, type ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';
import styles from './index.style';

type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonProps = {
    icon: ReactNode;
    onClick?: () => void;
    selectedIcon?: ReactNode;
    isSelected?: boolean;
    animateIcon?: boolean;
    disabled?: boolean;
    tooltip?: string;
    size?: IconButtonSize;
    customCss?: SerializedStyles | (SerializedStyles | false | undefined)[];
};

const IconButton = ({
    icon,
    onClick,
    selectedIcon,
    isSelected = false,
    animateIcon = false,
    disabled = false,
    tooltip,
    size = 'md',
    customCss,
}: IconButtonProps) => {
    const wasSelectedRef = useRef(isSelected);
    const currentIcon = isSelected && selectedIcon ? selectedIcon : icon;

    const getIconAnimationStyle = () => {
        if (!animateIcon || !selectedIcon) return undefined;
        if (isSelected && !wasSelectedRef.current) {
            wasSelectedRef.current = true;
            return styles.iconAnimateIn;
        }
        if (!isSelected && wasSelectedRef.current) {
            wasSelectedRef.current = false;
            return styles.iconAnimateOut;
        }
        return undefined;
    };

    const iconCss = [styles.icon, styles.iconSize[size], getIconAnimationStyle()];

    return (
        <button
            css={[styles.button, styles.buttonSize[size], isSelected && styles.buttonSelected, customCss]}
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            aria-label={tooltip}
        >
            <span css={iconCss}>{currentIcon}</span>
        </button>
    );
};

export default IconButton;
