import type {PropsWithChildren} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./card.component.style.tsx";
import {useMemo} from "react";

export type CardProps = {
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const Card = ({
                  customCss,
                  children
              }: PropsWithChildren<CardProps>) => {
    const randomValues = useMemo(() => {
        return {
            top: Math.random() * 100,
            left: Math.random() * 100,
            moveX: Math.random() * 60 - 30,
            moveY: Math.random() * 60 - 30,
        };
    }, []);

    return (
        <div
            css={[
                styles.cardWrapper(randomValues),
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
}

export default Card;
