import { css, Theme } from "@emotion/react";
import {darken, rgba, transparentize} from "polished";

const styles = {
    badge: (theme: Theme) => css({
        fontFamily: theme.fonts.number,
        lineHeight: ' 1.25rem',
        padding: '2px .5rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        backgroundColor: theme.colors.container2,
    }),

    primaryBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.primary),
        color: darken(0.2, theme.colors.primary),
    }),

    dangerBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.red),
        color: theme.colors.red,
    }),
};

export default styles;