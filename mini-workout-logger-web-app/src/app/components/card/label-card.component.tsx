/**
 * A card with a top div colored with a label theme.
 */
import type {CardProps} from "./card.component.tsx";
import {PropsWithChildren, ReactNode, useMemo} from "react";
import Card from "./card.component.tsx";
import styles from "./card.component.style.tsx";

export type LabelCardProps = CardProps & {
    icon: ReactNode;
};

const LabelCard = ({
                       icon,
                       children,
                   }: PropsWithChildren<LabelCardProps>) => {
    return (
        <div css={styles.labelCard}>
            <div css={styles.label}></div>
            <Card customCss={styles.labelCardContainer}>
                {children}
            </Card>
        </div>
    );
};

export default LabelCard;
