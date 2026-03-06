/**
 * A card with a top div colored with a label theme.
 */
import type {CardProps} from "./card.component.tsx";
import Card from "./card.component.tsx";
import {PropsWithChildren} from "react";
import type {Theme} from "@emotion/react";
import {css} from "@emotion/react";
import styles from "./card.component.style.tsx";
import DropdownMenu, {DropdownMenuItem} from "../dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";

export type LabelCardProps = CardProps & {
    labelColor?: LabelColor,
    dropdownItems: DropdownMenuItem[],
};

export const CardHeader = ({children}: PropsWithChildren) => {
    return (
        <div css={styles.header}>
            {children}
        </div>
    );
}

export type LabelColor =
    | "gray"
    | "success"
    | "primary"
    | "danger"
    | "warning"
    | "pink"
    | "purple"
    | "orange"
    ;

export const setLabelBackgroundColor = (color: LabelColor | undefined) => (theme: Theme) => {
    if (!color) return css({});

    const map = {
        gray: theme.colors.border1,
        success: theme.colors.green,
        primary: theme.colors.secondary,
        danger: theme.colors.pastelRed,
        warning: theme.colors.pastelYellow,
        pink: theme.colors.pink,
        purple: theme.colors.purple,
        orange: theme.colors.orange,
    };

    return css({
        backgroundColor: map[color],
    });
};

const LabelCard = ({
                       labelColor = "gray",
                       dropdownItems,
                       children,
                   }: PropsWithChildren<LabelCardProps>) => {
    return (
        <Card customCss={styles.labelCard}>
            <div css={styles.label}>
                <div className="label-button">
                    <DropdownMenu
                        title="Actions"
                        items={dropdownItems}
                        trigger="button"
                        customTriggerCss={styles.labelButton}
                        customIconTriggerCss={styles.labelIconButton}
                    />
                </div>
            </div>
            {children}
        </Card>
    );
};

export default LabelCard;
