import { css, Theme } from "@emotion/react";
import { transparentize } from "polished";

type RandomValues = {
    top: number;
    left: number;
    moveX: number;
    moveY: number;
};

const styles = {
    cardWrapper: (random: RandomValues) => (theme: Theme) => css({
        position: "relative",
        overflow: "hidden",
        borderRadius: 15,
        padding: "2rem",
        display: 'flex',
        flexDirection: 'column',

        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",

        backgroundColor: transparentize(0.6, theme.colors.container1),
        border: `1px solid ${transparentize(0.8, theme.colors.border1)}`,
        cursor: "pointer",

        "&::before": {
            content: '""',
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            filter: "blur(60px)",
            zIndex: -1,
            top: `${random.top}%`,
            left: `${random.left}%`,
            transform: "translate(-50%, -50%)",
            transition: "transform 0.6s ease",
        },

        "&:hover::before": {
            transform: `translate(${random.moveX}px, ${random.moveY}px)`,
        },
    }),
};

export default styles;
