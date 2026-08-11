import {css} from "@emotion/react";
import {lighten, rgba} from "polished";

const styles = {
    switch: css({
        "--toggle-width": "3.5rem",
        "--toggle-height": "1.8rem",
        "--button-size": "1.4rem",
        "--button-offset": "0.2rem",
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
            backgroundColor: "var(--color-container2)",
        },

        "& input:checked + span > span:last-of-type": {
            transform: `
                translateX(
                  calc(
                    var(--toggle-width)
                    - var(--button-size)
                    - (var(--button-offset) * 2)
                  )
                )
              `,
        },

        "& input:checked + span > span:first-of-type": {
            left: "var(--icon-offset)",
            right: "auto",
        },
    }),

    slider: css({
        position: "absolute",
        inset: 0,

        borderRadius: "var(--borderRadius-full)",
        backgroundColor: "var(--color-container2)",
        transition: "background-color 0.3s ease",
    }),

    icon: css({
        position: "absolute",
        top: "58%",
        transform: "translateY(-50%)",

        right: "var(--icon-offset)",

        fontSize: "var(--icon-size)",
        zIndex: 'var(--base-zIndex-1)' as any,
        pointerEvents: "none",
        color: "var(--color-text)",
    }),

    button: css({
        position: "absolute",

        height: "var(--button-size)",
        width: "var(--button-size)",

        left: "var(--button-offset)",
        bottom: "var(--button-offset)",

        borderRadius: "50%",
        backgroundColor: "var(--color-white)",

        transition: "transform 0.3s ease",
        zIndex: 'var(--base-zIndex-2)' as any,
    }),

    /**
     * Theme toggle.
     */

    iconOnCustom: css({
        color: "var(--color-border)",
        filter: `drop-shadow(0 0 4px ${rgba('#FFFFFF', 0.3)})`,
    }),

    offIconCustomCss: css({
        color: lighten(0.2, '#FFCD50'),
    }),

    sliderOffCustom: css({
        backgroundColor: "var(--color-border)",
    }),

};

export default styles;
