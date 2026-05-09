import {css} from "@emotion/react";

const styles = {
    wrapper: {
        position: "relative",
    },

    form: (columns: number) => css({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "var(--stack-gap-normal)",
    }),

    fieldWrapper: (colSpan: number) => css({
        gridColumn: `span ${colSpan}`,
        display: "flex",
        flexDirection: "column",
        gap: "var(--stack-gap-condensed)",

        '& label': {
            color: "var(--color-text)",
        }
    }),

    input: css({
        padding: "0.2rem 0.8rem",
        minHeight: "var(--input-height)",
        borderRadius: "var(--borderRadius-small)",
        backgroundColor: `var(--color-container2)`,
        border: 'none',
        fontSize: "var(--size-input-text)",
        minWidth: 'var(--control-minWidth)',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        color: "var(--color-text)",
    }),

    inputButton: css({
        border: "none",
        background: "transparent",
        padding: 0,
    }),

    inputButtonIcon: css({
        color: "var(--color-text)",
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-icon-sm)',
    }),

    dropdown: css({
        position: "absolute",
        width: "100%",
        borderRadius: "var(--borderRadius-small)",
        marginTop: "var(--base-size-4)",
        zIndex: 'var(--base-zIndex-10)' as any,
        maxHeight: "var(--overlay-maxHeight)",
        overflowY: "auto",
    }),

    dropdownContainer: css({
        border: `var(--borderWidth-thin) solid var(--color-container1)`,
        background: `var(--color-bg)`,
    }),

    dropdownItem: (checked?: boolean) => css({
        display: "flex",
        alignItems: "center",
        padding: "var(--base-size-8)",
        cursor: "pointer",
        gap: "var(--stack-gap-condensed)",
        background: checked ? `var(--color-container1)` : "transparent",

        ":hover": {
            background: "var(--color-container2)",
        }
    }),

    multiselectSelectedItems: (visible?: boolean) => css({
        padding: visible ? `var(--base-size-16) 0 0 0` : 0,
    }),

    badgeCustomCss: css({
        margin: `0 var(--base-size-4) var(--base-size-8) 0`,
    }),

    multiassociativeSelectBox: (disabled: boolean) => css({
        display: 'flex',
        justifyContent: 'stretch',

        '& button': {
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
        },

        '& input': {
            width: disabled ? '100%' : '80%',
            margin: disabled ? '0' : `0 var(--base-size-16) 0 0`,
        }
    }),

    buttonMultiSelectContainer: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        margin: `0 0 var(--stack-gap-normal) 0`,
    }),

    submitRow: css({
        marginTop: 'var(--base-size-8)',
    }),

    buttonMultiSelectAddButton: css({
        display: 'flex',
        justifyContent: 'center',
        '& button': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
    }),

};

export default styles;
