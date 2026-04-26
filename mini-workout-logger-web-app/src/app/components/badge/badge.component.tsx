import type {ReactNode} from "react";

export function capitalize(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./badge.component.style.tsx";
import Button from "../button/button.component.tsx";
import {IoMdClose} from "react-icons/io";
import type {ColorVariant} from "../../utils/colorsVariants.tsx";
import {colorVariants} from "../../utils/colorsVariants.tsx";
import * as React from "react";

export type BadgeProps = {
    key?: string | number;
    children: ReactNode;
    icon?: ReactNode;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    variant?: ColorVariant;
    onRemove?: () => void;
    onClick?: (() => void);
    selected?: boolean;
};

export function getRandomBadgeVariant(): ColorVariant {
    const randomIndex = Math.floor(Math.random() * colorVariants.length);
    return colorVariants[randomIndex];
}

export const badgeVariantStyles: Record<
    ColorVariant,
    Interpolation<Theme>
> = {
    gray: styles.grayBadge,
    success: styles.successBadge,
    primary: styles.primaryBadge,
    danger: styles.dangerBadge,
    warning: styles.warningBadge,
    pink: styles.pinkBadge,
    purple: styles.purpleBadge,
    orange: styles.orangeBadge,
};

const Badge = ({
                   icon,
                   customCss,
                   variant = "gray",
                   onRemove,
                   onClick,
                   selected = false,
                   children,
               }: BadgeProps) => {

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <span
            onClick={handleClick}
            data-selected={selected}
            css={[
                styles.badge,
                badgeVariantStyles[variant],
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
        >
            {icon && (
                <span css={styles.icon}>
                    {icon}
                </span>
            )}
            {children}

            {onRemove && (
                <span onClick={(e) => e.stopPropagation()}>
                    <Button
                        icon={<IoMdClose />}
                        onClick={onRemove}
                        noBorder
                        customCss={styles.removeButton}
                        customIconCss={styles.removeButtonIcon}
                    />
                </span>
            )}
        </span>
    );
};

export default Badge;
