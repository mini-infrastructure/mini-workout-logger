import {css} from "@emotion/react";

const styles = {
    wrapper: {
        position: "relative",
    },

    form: (columns: number) => css({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "var(--stack-gap-condensed)",
    }),

    customWrapper: (colSpan: number) => css({
        gridColumn: `span ${colSpan}`,
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

    // raw <input> inside a styled wrapper div
    inputRaw: css({
        flex: 1,
        minWidth: 0,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--color-text)',
        fontSize: 'var(--size-input-text)',
        cursor: 'text',
    }),

    textInputContainer: css({
        position: 'relative',
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

    multiselectSelectedItems: (visible?: boolean) => css({
        padding: visible ? `var(--base-size-16) 0 0 0` : 0,
    }),

    badgeCustomCss: css({
        margin: `0 var(--base-size-4) var(--base-size-8) 0`,
    }),

    multiassociativeSelectBox: (disabled: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        gap: disabled ? 0 : 'var(--stack-gap-condensed)',
    }),

    multiassociativeInputWrapper: css({
        flex: 1,
        minWidth: 0,
    }),

    buttonMultiSelectContainer: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        margin: `0 0 var(--stack-gap-normal) 0`,
    }),

    inputError: css({
        outline: 'var(--borderWidth-thin) solid var(--color-red)',
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
