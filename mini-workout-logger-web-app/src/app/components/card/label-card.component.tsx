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

export type LabelVariant = "success" | "warning" | "error" | "info";

export const getVariantColor = (theme: Theme, variant: LabelVariant) => {
    switch (variant) {
        case "success":
            return theme.colors.green;
        case "warning":
            return theme.colors.yellow;
        case "error":
            return theme.colors.red;
        case "info":
        default:
            return theme.colors.primary;
    }
};

export type LabelCardProps = CardProps & {};

export const CardHeader = ({children}: PropsWithChildren) => {
    return (
        <div css={styles.header}>
            {children}
        </div>
    );
}

const LabelCard = ({
                       children,
                   }: PropsWithChildren<LabelCardProps>) => {
    return (
        <Card customCss={styles.labelCard}>
            <div css={styles.label} className="label-bar">
                <div className="label-button">
                    {/*<Button icon={<BsThreeDots />} customCss={styles.labelButton} />*/}
                </div>
            </div>
            {children}
        </Card>
    );
};

export default LabelCard;
