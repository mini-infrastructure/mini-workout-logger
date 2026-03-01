import { css, Theme, keyframes } from "@emotion/react";
import { transparentize } from "polished";

export type RandomValues = {
    top: number;
    left: number;
    size1: number;
    size2: number;
};

const float = keyframes`
    0%   { transform: translate(-50%, -50%) translate(0px, 0px); }
    50%  { transform: translate(-50%, -50%) translate(20px, -15px); }
    100% { transform: translate(-50%, -50%) translate(0px, 0px); }
`;

const styles = {
    baseCard: (theme: Theme) =>
        css({
            position: "relative",
            overflow: "hidden",
            borderRadius: 15,
            padding: "2rem",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            backgroundColor: transparentize(0.6, theme.colors.container1),
            border: `1px solid ${transparentize(0.8, theme.colors.border1)}`,
        }),

    /**
     * Blob card.
     */

    blobCard: (random: RandomValues) => (theme: Theme) => {
        const second = {
            top: 100 - random.top,
            left: 100 - random.left,
        };

        return css({
            "&::before": {
                content: '""',
                position: "absolute",
                width: random.size1,
                height: random.size1,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                filter: "blur(70px)",
                top: `${random.top}%`,
                left: `${random.left}%`,
                transform: "translate(-50%, -50%)",
                animation: `${float} 8s ease-in-out infinite`,
                zIndex: -1,
            },

            "&::after": {
                content: '""',
                position: "absolute",
                width: random.size2,
                height: random.size2,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
                filter: "blur(60px)",
                top: `${second.top}%`,
                left: `${second.left}%`,
                transform: "translate(-50%, -50%)",
                animation: `${float} 10s ease-in-out infinite`,
                animationDelay: "2s",
                zIndex: -1,
            },
        });
    },

    /**
     * Label card.
     */

    labelCard: css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    }),

    label: (theme: Theme) => css({
        position: "relative",
        height: '6rem',
        borderRadius: 20,
        background: theme.colors.primary,
        overflow: "hidden",

        '& svg': {
            color: transparentize(0.4, theme.colors.white),
            // fontSize: theme.fontSizes.x_large,
            // position: "absolute",
            // top: 10,
            // right: 10,
            // transform: "rotate(15deg)",
        }
    }),

    labelCardContainer: css({
        marginTop: -65,
        position: "relative",
        zIndex: 2,
    }),

};

export default styles;