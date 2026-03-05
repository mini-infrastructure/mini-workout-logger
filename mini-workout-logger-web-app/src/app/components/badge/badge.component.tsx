import type {ReactNode} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./badge.component.style.tsx";
import Button from "../button/button.component.tsx";
import {IoMdClose} from "react-icons/io";

export type BadgeProps = {
    key?: string | number;
    children: ReactNode;
    icon?: ReactNode;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    variant?: BadgeVariant;
    onRemove?: () => void;
};

export type BadgeVariant =
    | "gray"
    | "success"
    | "primary"
    | "danger"
    | "warning"
    | "pink"
    | "purple"
    | "orange"
    ;

export const badgeVariants: BadgeVariant[] = [
    "gray",
    "success",
    "primary",
    "danger",
    "warning",
    "pink",
    "purple",
    "orange",
];

export function getRandomBadgeVariant(): BadgeVariant {
    const randomIndex = Math.floor(Math.random() * badgeVariants.length);
    return badgeVariants[randomIndex];
}

export const badgeVariantStyles: Record<
    BadgeVariant,
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
                   children,
               }: BadgeProps) => {
    return (
        <span
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
                <Button
                    icon={<IoMdClose />}
                    onClick={onRemove}
                    customCss={styles.removeButton}
                />
            )}
        </span>
    );
};

export default Badge;
