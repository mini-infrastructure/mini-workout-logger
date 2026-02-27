import {css, Theme} from "@emotion/react";

const styles = {
    switch: (theme: Theme) => css({
        position: "relative",
        display: "inline-block",
        fontSize: "1.2rrem",
        width: "3.5rem",
        height: "1.8rem",

        "& input": {
            opacity: 0,
            width: 0,
            height: 0,
            position: "absolute",
        },

        "& input:checked + span": {
            backgroundColor: theme.colors.container2,
        },

        /* Move o knob */
        "& input:checked + span > span": {
            transform: "translateX(1.7em)",
        },
    }),

    slider: (theme: Theme) => css({
        position: "absolute",
        inset: 0,
        borderRadius: "2rem",
        backgroundColor: theme.colors.secondary,
        transition: "background-color 0.3s ease",
    }),

    knob: (theme: Theme) => css({
        position: "absolute",
        height: "1.4rem",
        width: "1.4rem",
        left: "0.2rem",
        bottom: "0.2rem",
        borderRadius: "50%",
        backgroundColor: theme.colors.white,
        color: theme.colors.black,
        transition: "transform 0.3s ease",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "0.8rem",
    }),
};

export default styles;