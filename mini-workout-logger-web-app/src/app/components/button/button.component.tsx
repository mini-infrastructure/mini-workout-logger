import {PropsWithChildren, ReactNode, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './button.component.style';
import type {Interpolation, Theme} from "@emotion/react";

export type ButtonProps = {
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    icon?: ReactNode;
    clickedIcon?: ReactNode;
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
    isClicked?: boolean;
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
                    : []),
            ]}
            onClick={handleClick}
            disabled={disabled}>
            {(icon || clickedIcon) && (
                <span
                    css={[styles.icon, ...(customIconCss ? (Array.isArray(customIconCss) ? customIconCss : [customIconCss]) : [])]}
                >
                    {isClicked && clickedIcon ? clickedIcon : icon}
                </span>
            )}
            {children}
        </button>
    );
};

export default Button;
