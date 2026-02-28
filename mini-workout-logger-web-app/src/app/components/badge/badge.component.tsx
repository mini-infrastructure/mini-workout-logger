import type {ReactNode} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./badge.component.style.tsx";

export type BadgeProps = {
    key?: string | number;
    children: ReactNode;
    icon?: ReactNode;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    variant?: BadgeVariant;
};

export type BadgeVariant =
    | "success"
    | "primary"
    | "danger"
    | "warning";

export const badgeVariants: BadgeVariant[] = [
    "success",
    "primary",
    "danger",
    "warning",
];

export function getRandomBadgeVariant(): BadgeVariant {
    const randomIndex = Math.floor(Math.random() * badgeVariants.length);
    return badgeVariants[randomIndex];
}

export const badgeVariantStyles: Record<
    BadgeVariant,
    Interpolation<Theme>
> = {
    success: styles.successBadge,
    primary: styles.primaryBadge,
    danger: styles.dangerBadge,
    warning: styles.warningBadge,
};

const Badge = ({
                   icon,
                   customCss,
                    variant = "primary",
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
        </span>
    );
};

export default Badge;
