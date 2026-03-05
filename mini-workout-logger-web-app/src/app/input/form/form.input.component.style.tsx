import { css, Theme } from "@emotion/react";

const styles = {
    form: (columns: number) => (theme: Theme) => css({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1rem",
    }),

    fieldWrapper: (colSpan: number) => (theme: Theme) => css({
        gridColumn: `span ${colSpan}`,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",

        '& label': {
            color: theme.colors.text,
        }
    }),

    input: (theme: Theme) => css({
        padding: "0.6rem 0.8rem",
        borderRadius: "6px",
        backgroundColor: theme.colors.container1,
        border: 'none',
        fontSize: "0.9rem",
    }),
};

export default styles;
