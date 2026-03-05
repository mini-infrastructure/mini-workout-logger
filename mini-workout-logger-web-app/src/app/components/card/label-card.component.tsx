/**
 * A card with a top div colored with a label theme.
 */
import type {CardProps} from "./card.component.tsx";
import {PropsWithChildren, ReactNode} from "react";
import Card from "./card.component.tsx";
import type {Theme} from "@emotion/react";
import styles from "./card.component.style.tsx";
import { BsThreeDots } from "react-icons/bs";
import Button from "../button/button.component.tsx";
import DropdownMenu, {DropdownMenuItem} from "../dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import {css} from "@emotion/react";
import {darken} from "polished";

export type LabelCardProps = CardProps & {
    labelColor?: LabelColor,
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

const items: DropdownMenuItem[] = [
    {
        label: "Edit",
        icon: <FiEdit size={14} />,
        iconColor: "primary",
        onClick: () => console.log("Edit"),
    },
    {
        label: "Clone",
        icon: <FiCopy size={14} />,
        iconColor: "info",
        onClick: () => console.log("Clone"),
    },
    {
        dividerBefore: true,
        label: "Delete",
        icon: <FiTrash2 size={14} />,
        iconColor: "danger",
        onClick: () => console.log("Delete"),
    },
];

const LabelCard = ({
                       labelColor = "gray",
                       children,
                   }: PropsWithChildren<LabelCardProps>) => {
    return (
        <Card customCss={styles.labelCard}>
            <div css={[styles.label, setLabelBackgroundColor(labelColor)]} className="label-bar">
                <div className="label-button">
                    <DropdownMenu
                        title="Actions"
                        items={items}
                        trigger="button"
                        customTriggerCss={styles.labelButton}
                    />
                </div>
            </div>
            {children}
        </Card>
    );
};

export default LabelCard;
