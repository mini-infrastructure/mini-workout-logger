import { css, Theme } from "@emotion/react";

const styles = {
    switch: (theme: Theme) => css({
        "--toggle-width": "3.5rem",
        "--toggle-height": "1.8rem",
        "--knob-size": "1.4rem",
        "--knob-offset": "0.2rem",
        "--icon-size": "0.9rem",

        position: "relative",
        display: "inline-block",

        width: "var(--toggle-width)",
        height: "var(--toggle-height)",

        "& input": {
            opacity: 0,
            width: 0,
            height: 0,
            position: "absolute",
        },

        "& input:checked + span": {
            backgroundColor: theme.colors.container2,
        },

        "& input:checked + span > span:last-of-type": {
            transform: `
                translateX(
                  calc(
                    var(--toggle-width)
                    - var(--knob-size)
                    - (var(--knob-offset) * 2)
                  )
                )
              `,
        },

        "& input:checked + span > span:first-of-type": {
            left: "var(--icon-offset)",
            right: "auto",
        },
    }),

    slider: (theme: Theme) => css({
        position: "absolute",
        inset: 0,

        borderRadius: "999rem",
        backgroundColor: theme.colors.container2,
        transition: "background-color 0.3s ease",
    }),

    icon: (theme: Theme) => css({
        position: "absolute",
        top: "58%",
        transform: "translateY(-50%)",

        right: "var(--icon-offset)",

        fontSize: "var(--icon-size)",
        zIndex: 1,
        pointerEvents: "none",
        color: theme.colors.text,
    }),

    knob: (theme: Theme) => css({
        position: "absolute",

        height: "var(--knob-size)",
        width: "var(--knob-size)",

        left: "var(--knob-offset)",
        bottom: "var(--knob-offset)",

        borderRadius: "50%",
        backgroundColor: theme.colors.white,

        transition: "transform 0.3s ease",
        zIndex: 2,
    }),

    /**
     * Theme toggle.
     */

    iconOnCustom: (theme: Theme) => ({
        color: theme.colors.secondary,
    }),

    offIconCustomCss: (theme: Theme) => ({
        color: theme.colors.yellow,
    }),

    sliderOffCustom: (theme: Theme) => ({
        backgroundColor: theme.colors.secondary,
    }),

};

export default styles;