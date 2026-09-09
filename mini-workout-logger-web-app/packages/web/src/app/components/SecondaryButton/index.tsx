import { useRef, type ReactNode } from 'react';
import styles from './index.style';

type SecondaryButtonProps = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
    icon?: ReactNode;
    selectedIcon?: ReactNode;
    iconPosition?: 'left' | 'right';
    isSelected?: boolean;
    animateIcon?: boolean;
};

const SecondaryButton = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
    icon,
    selectedIcon,
    iconPosition = 'left',
    isSelected = false,
    animateIcon = false,
}: SecondaryButtonProps) => {
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

    const iconCss = [styles.icon, getIconAnimationStyle()];

    return (
        <button
            css={[styles.button, isSelected && styles.buttonSelected]}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {currentIcon && iconPosition === 'left' && (
                <span css={iconCss}>{currentIcon}</span>
            )}
            {label}
            {currentIcon && iconPosition === 'right' && (
                <span css={iconCss}>{currentIcon}</span>
            )}
        </button>
    );
};

export default SecondaryButton;
