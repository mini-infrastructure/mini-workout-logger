import { css, Theme } from "@emotion/react";

const styles = {
    wrapper: {
        position: "relative",
    },

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
        minWidth: '10rem',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
    }),

    inputButton: css({
        border: "none",
        background: "transparent",
        padding: 0,
    }),

    inputButtonIcon: (theme: Theme) => css({
        color: theme.colors.text,
        width: 'auto',
        height: 'auto',
        fontSize: '1.2rem',
    }),

    dropdown: css({
        position: "absolute",
        width: "100%",
        borderRadius: "6px",
        marginTop: "4px",
        zIndex: 10,
        maxHeight: "200px",
        overflowY: "auto",
    }),

    dropdownContainer: (theme: Theme) => css({
        border: `1px solid ${theme.colors.container1}`,
        background: theme.colors.background,
    }),

    dropdownItem: (checked?: boolean) => (theme: Theme) => css({
        display: "flex",
        alignItems: "center",
        padding: "8px",
        cursor: "pointer",
        gap: "8px",
        background: checked ? theme.colors.container1 : "transparent",

        ":hover": {
            background: theme.colors.container2,
        }
    }),

    multiselectSelectedItems: (theme: Theme) => css({
        padding: '1rem 0 0 0',
    }),

    badgeCustomCss: (theme: Theme) => css({
        margin: '0 0.25rem 0.5rem 0',
    }),
};

export default styles;
