import {css, Theme} from "@emotion/react";
import {darken, transparentize} from "polished";

const styles = {
    editCancelBtn: (clicked: boolean) => (theme: Theme) => css({
        minWidth: '6rem',
        marginRight: '0.5rem',
        border: `1px solid ${clicked ? transparentize(0.8, darken(0.2, theme.colors.red)): theme.colors.border1}`,
        backgroundColor: clicked ? transparentize(0.9, theme.colors.red) : 'transparent',
    }),

    editCancelIconBtn: (clicked: boolean) => (theme: Theme) => css({
        color: clicked ? theme.colors.red : theme.colors.text,
    }),

    wrap: css({
        display: "flex",
    }),

    exerciseDescriptionWrapper: css({
        flex: 2
    }),

    right: css({
        flex: 2
    }),

};

export default styles;
