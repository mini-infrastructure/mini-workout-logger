import type {ReactNode} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./badge.component.style.tsx";

export type BadgeProps = {
    key?: string | number;
    children: ReactNode;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Badge = ({
                   children,
                   customCss,
               }: BadgeProps) => {
    return (
        <span
            css={[
                styles.badge,
                styles.primaryBadge,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
        >
            {children}
        </span>
    );
};

export default Badge;
