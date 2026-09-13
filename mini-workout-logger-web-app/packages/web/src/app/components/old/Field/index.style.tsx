import { css } from "@emotion/react";

const styles = {
    description: css({
        display: "flex",
        alignItems: "center",
        gap: "var(--stack-gap-condensed)",
        padding: "0.6rem 0.8rem",
        borderRadius: "var(--borderRadius-small)",
        backgroundColor: "var(--color-container1)",
        cursor: "pointer",
    }),

    header: css({
        fontWeight: "bold",
        "&::after": {
            content: '":"',
            fontWeight: "bold",
            color: "gray",
        },
    }),

    content: css({
        color: "inherit",
        wordBreak: "break-all",
        flex: 1,
    }),

    copyButton: css({
        backgroundColor: 'transparent',

        ':hover': {
            backgroundColor: "var(--color-container1)",
        },

        ':focus': {
            backgroundColor: "var(--color-blue)",
            color: "var(--color-white)",
        },
    }),
};

export default styles;
