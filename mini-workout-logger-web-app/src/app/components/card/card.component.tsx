import type {PropsWithChildren} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./card.component.style";

export type CardProps = {
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Card = ({ customCss, children }: PropsWithChildren<CardProps>) => {
    return (
        <div
            css={[
                styles.baseCard,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
        >
            {children}
        </div>
    );
};

export default Card;