import {PropsWithChildren, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './button.component.style';
import type {Interpolation, Theme} from "@emotion/react";
import {css} from "@emotion/react";

export type ButtonProps = {
    key?: any;
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    icon?: ReactNode;
    clickedIcon?: ReactNode;
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
    isClicked?: boolean;
    iconEnd?: boolean;
    type?: "button" | "submit" | "reset";
    title?: string;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
};

const Button = ({
                    onClick,
                    path,
                    disabled,
                    customCss,
                    icon,
                    clickedIcon,
                    customIconCss,
                    isClicked = false,
                    iconEnd = false,
                    type = "button",
                    title,
                    onMouseDown,
                    onMouseUp,
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
                !children && css(styles.onlyIconButton),
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
            onClick={handleClick}
            disabled={disabled}
            type={type}
            title={title}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {!iconEnd && (icon || clickedIcon) && (
                <span
                    css={[
                        styles.icon,
                        !children && css(styles.onlyIcon),
                        ...(customIconCss ?
                            (Array.isArray(customIconCss)
                                ? customIconCss
                                : [customIconCss])
                            : []),
                    ]}
                >
                    {isClicked && clickedIcon ? clickedIcon : icon}
                </span>
            )}
            {children}
            {iconEnd && (icon || clickedIcon) && (
                <span
                    css={[
                        styles.icon,
                        !children && css(styles.onlyIcon),
                        styles.iconEnd,
                        ...(customIconCss ?
                            (Array.isArray(customIconCss)
                                ? customIconCss
                                : [customIconCss])
                            : []),
                    ]}
                >
                    {isClicked && clickedIcon ? clickedIcon : icon}
                </span>
            )}
        </button>
    );
};

export default Button;
