import { type PropsWithChildren } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { Link } from 'react-router-dom';
import styles from './button.component.style';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';

export type ButtonProps = {
    key?: any;
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    icon?: JSX.Element;
    clickedIcon?: JSX.Element;
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
    isClicked?: boolean;
    iconEnd?: boolean;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    noBorder?: boolean;
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
    type = 'button',
    title,
    onMouseDown,
    onMouseUp,
    noBorder = false,
    children,
}: PropsWithChildren<ButtonProps>) => {
    const cssProp = [
        styles.button,
        !children && css(styles.onlyIconButton),
        noBorder ? css({ border: 'none', ':hover': { borderColor: 'transparent' } }) : undefined,
        ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : []),
    ];

    const iconSpanCss = [
        styles.icon,
        !children && css(styles.onlyIcon),
        ...(customIconCss ? (Array.isArray(customIconCss) ? customIconCss : [customIconCss]) : []),
    ];

    const iconEndSpanCss = [
        styles.icon,
        !children && css(styles.onlyIcon),
        styles.iconEnd,
        ...(customIconCss ? (Array.isArray(customIconCss) ? customIconCss : [customIconCss]) : []),
    ];

    const content = (
        <>
            {!iconEnd && (icon || clickedIcon) && (
                <span css={iconSpanCss}>
                    {isClicked && clickedIcon ? clickedIcon : icon}
                </span>
            )}
            {children}
            {iconEnd && (icon || clickedIcon) && (
                <span css={iconEndSpanCss}>
                    {isClicked && clickedIcon ? clickedIcon : icon}
                </span>
            )}
        </>
    );

    if (path) {
        return (
            <Link to={path} css={cssProp} title={title} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <button
            css={cssProp}
            onClick={onClick}
            disabled={disabled}
            type={type}
            title={title}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {content}
        </button>
    );
};

export default Button;
