import {PropsWithChildren, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './button.component.style';
import type {Interpolation, Theme} from "@emotion/react";

export type ButtonProps = {
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    icon?: ReactNode;
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Button = ({
                    onClick,
                    path,
                    disabled,
                    customCss,
                    icon,
                    customIconCss,
                    children
                }: PropsWithChildren<ButtonProps>) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();
        if (path) navigate(path);
    };

    return (
        <button
            css={[
                styles.button,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : [styles.buttonPrimary]),
            ]}
            onClick={handleClick}
            disabled={disabled}>
            {icon && <span
                css={[
                    ...(customIconCss
                        ? Array.isArray(customIconCss)
                            ? customIconCss
                            : [customIconCss]
                        : []),
                ]}>
                    {icon}
                </span>}
            {children}
        </button>
    );
};

export default Button;
