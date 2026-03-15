import type {PropsWithChildren} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./card.component.style";

export type CardProps = {
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    onClick?: (() => void);
};

const Card = ({
                  customCss,
                  onClick,
                  children }: PropsWithChildren<CardProps>) => {
    return (
        <div
            onClick={onClick}
            css={[
                styles.baseCard(!!onClick),
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