import { PropsWithChildren, useMemo } from "react";
import Card, { CardProps } from "./card.component";
import styles from "./card.component.style";

const BlobCard = ({
                      children,
                  }: PropsWithChildren<CardProps>) => {
    const randomValues = useMemo(() => {
        return {
            top: Math.random() * 100,
            left: Math.random() * 100,
            size1: 120 + Math.random() * 120,
            size2: 80 + Math.random() * 100,
        };
    }, []);

    return (
        <Card customCss={[styles.blobCard(randomValues)]}>
            {children}
        </Card>
    );
};

export default BlobCard;
