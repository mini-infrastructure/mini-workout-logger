import { css, Theme } from "@emotion/react";

const styles = {
    description: (theme: Theme) => css({
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "1rem 0",
        padding: "0.6rem 0.8rem",
        borderRadius: "6px",
        backgroundColor: theme.colors.container1,
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

    copyButton: (theme: Theme) => css({
        backgroundColor: 'transparent',

        ':hover': {
            backgroundColor: theme.colors.background,
        },

        ':focus': {
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
        },
    }),
};

export default styles;